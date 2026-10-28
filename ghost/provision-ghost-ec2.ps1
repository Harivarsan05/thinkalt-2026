param(
  [string]$Region = "ap-south-1",
  [string]$InstanceType = "t3.micro",
  [string]$Domain = "blog.thinkalternate.com",
  [string]$KeyName = "ghost-key",
  [string]$SecurityGroupName = "ghost-blog-server-sg",
  [string]$InstanceName = "ghost-blog-server",
  [string]$AdminCidr = "0.0.0.0/0",
  [string]$HostedZoneId = ""
)

$ErrorActionPreference = "Stop"

function Require-Command($Name) {
  if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
    throw "$Name is not installed or not available on PATH."
  }
}

function Write-Step($Message) {
  Write-Host ""
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Join-ProcessArguments([object[]]$Arguments) {
  $Quoted = foreach ($Argument in $Arguments) {
    $Value = [string]$Argument
    if ($Value -match '[\s"]') {
      '"' + $Value.Replace('"', '\"') + '"'
    } else {
      $Value
    }
  }
  return ($Quoted -join " ")
}

function Invoke-Aws {
  $ProcessInfo = New-Object System.Diagnostics.ProcessStartInfo
  $ProcessInfo.FileName = "aws"
  $ProcessInfo.Arguments = Join-ProcessArguments $args
  $ProcessInfo.UseShellExecute = $false
  $ProcessInfo.RedirectStandardOutput = $true
  $ProcessInfo.RedirectStandardError = $true
  $ProcessInfo.CreateNoWindow = $true

  $Process = [System.Diagnostics.Process]::Start($ProcessInfo)
  $Stdout = $Process.StandardOutput.ReadToEnd()
  $Stderr = $Process.StandardError.ReadToEnd()
  $Process.WaitForExit()

  if ($Process.ExitCode -ne 0) {
    throw $Stderr.Trim()
  }
  return $Stdout.TrimEnd()
}

if (-not (Get-Command "aws" -ErrorAction SilentlyContinue)) {
  $AwsCliDir = "C:\Program Files\Amazon\AWSCLIV2"
  if (Test-Path (Join-Path $AwsCliDir "aws.exe")) {
    $env:Path = "$AwsCliDir;$env:Path"
  }
}

Require-Command "aws"

$Caller = Invoke-Aws sts get-caller-identity --region $Region | ConvertFrom-Json
Write-Host "Using AWS account $($Caller.Account) as $($Caller.Arn)"

$PemPath = Join-Path $PSScriptRoot "$KeyName.pem"
if (-not (Test-Path $PemPath)) {
  Write-Step "Creating EC2 key pair $KeyName"
  $KeyMaterial = Invoke-Aws ec2 create-key-pair `
    --region $Region `
    --key-name $KeyName `
    --query "KeyMaterial" `
    --output text
  $KeyMaterial | Set-Content -NoNewline -Encoding ascii $PemPath
  Write-Host "Saved private key to $PemPath"
} else {
  Write-Host "Using existing key file $PemPath"
}

$VpcId = Invoke-Aws ec2 describe-vpcs `
  --region $Region `
  --filters "Name=isDefault,Values=true" `
  --query "Vpcs[0].VpcId" `
  --output text

if ($VpcId -eq "None" -or [string]::IsNullOrWhiteSpace($VpcId)) {
  throw "No default VPC found in $Region. Create a VPC first or adjust this script."
}

$SecurityGroupId = Invoke-Aws ec2 describe-security-groups `
  --region $Region `
  --filters "Name=group-name,Values=$SecurityGroupName" "Name=vpc-id,Values=$VpcId" `
  --query "SecurityGroups[0].GroupId" `
  --output text

if ($SecurityGroupId -eq "None" -or [string]::IsNullOrWhiteSpace($SecurityGroupId)) {
  Write-Step "Creating security group $SecurityGroupName"
  $SecurityGroupId = Invoke-Aws ec2 create-security-group `
    --region $Region `
    --group-name $SecurityGroupName `
    --description "Ghost blog server HTTP HTTPS SSH" `
    --vpc-id $VpcId `
    --query "GroupId" `
    --output text
}

Write-Step "Opening SSH, HTTP, and HTTPS"
foreach ($Port in 22, 80, 443) {
  try {
    $Cidr = if ($Port -eq 22) { $AdminCidr } else { "0.0.0.0/0" }
    Invoke-Aws ec2 authorize-security-group-ingress `
      --region $Region `
      --group-id $SecurityGroupId `
      --protocol tcp `
      --port $Port `
      --cidr $Cidr | Out-Null
  } catch {
    if ($_.Exception.Message -notmatch "InvalidPermission.Duplicate") {
      throw
    }
  }
}

Write-Step "Finding latest Ubuntu 24.04 LTS AMI"
$AmiId = Invoke-Aws ssm get-parameter `
  --region $Region `
  --name "/aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id" `
  --query "Parameter.Value" `
  --output text

$CloudInitPath = Join-Path $PSScriptRoot "user-data-ghost.sh"
$CloudInit = Get-Content $CloudInitPath -Raw
$CloudInit = $CloudInit.Replace("__GHOST_DOMAIN__", $Domain)
$TempUserData = Join-Path $env:TEMP "ghost-user-data-$([guid]::NewGuid()).sh"
Set-Content -Path $TempUserData -Value $CloudInit -Encoding utf8

Write-Step "Launching EC2 instance"
$InstanceId = Invoke-Aws ec2 run-instances `
  --region $Region `
  --image-id $AmiId `
  --instance-type $InstanceType `
  --key-name $KeyName `
  --security-group-ids $SecurityGroupId `
  --user-data "file://$TempUserData" `
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$InstanceName}]" `
  --query "Instances[0].InstanceId" `
  --output text

Remove-Item $TempUserData -Force

Write-Step "Waiting for instance to run"
Invoke-Aws ec2 wait instance-running --region $Region --instance-ids $InstanceId | Out-Null

Write-Step "Allocating and associating Elastic IP"
$AllocationId = Invoke-Aws ec2 allocate-address `
  --region $Region `
  --domain vpc `
  --query "AllocationId" `
  --output text

Invoke-Aws ec2 associate-address `
  --region $Region `
  --instance-id $InstanceId `
  --allocation-id $AllocationId | Out-Null

$PublicIp = Invoke-Aws ec2 describe-addresses `
  --region $Region `
  --allocation-ids $AllocationId `
  --query "Addresses[0].PublicIp" `
  --output text

if (-not [string]::IsNullOrWhiteSpace($HostedZoneId)) {
  Write-Step "Creating Route53 A record for $Domain"
  $ChangeBatchPath = Join-Path $env:TEMP "ghost-route53-$([guid]::NewGuid()).json"
  @"
{
  "Changes": [
    {
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "$Domain",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [
          { "Value": "$PublicIp" }
        ]
      }
    }
  ]
}
"@ | Set-Content -Path $ChangeBatchPath -Encoding ascii

  Invoke-Aws route53 change-resource-record-sets `
    --hosted-zone-id $HostedZoneId `
    --change-batch "file://$ChangeBatchPath" | Out-Null

  Remove-Item $ChangeBatchPath -Force
}

Write-Host ""
Write-Host "Ghost EC2 provisioning started." -ForegroundColor Green
Write-Host "Instance ID: $InstanceId"
Write-Host "Public IP:   $PublicIp"
Write-Host "Domain:      $Domain"
Write-Host "SSH:         ssh -i `"$PemPath`" ubuntu@$PublicIp"
Write-Host ""
Write-Host "Bootstrap logs on the server:"
Write-Host "  sudo tail -f /var/log/cloud-init-output.log"
Write-Host ""
Write-Host "When DNS points to the IP, SSH in and run:"
Write-Host "  sudo -iu ghostuser"
Write-Host "  cd /var/www/ghost"
Write-Host "  ghost setup ssl"
