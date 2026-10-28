# Ghost EC2 Automation

This folder contains a PowerShell automation script for provisioning a Ghost blog server on AWS.

Default target:

```text
https://blog.thinkalternate.com
```

The script creates:

- EC2 key pair: `ghost-key`
- Security group for SSH, HTTP, and HTTPS
- Ubuntu 24.04 LTS EC2 instance
- Elastic IP
- Optional Route53 `A` record
- Server bootstrap for Nginx, Node.js 20, MySQL, Ghost CLI, and Ghost

## Prerequisites

Install and authenticate AWS CLI on this machine:

```powershell
aws configure
aws sts get-caller-identity
```

The AWS user needs permissions for EC2, SSM parameter read, and optionally Route53.

## Run

```powershell
powershell -ExecutionPolicy Bypass -File .\ghost\provision-ghost-ec2.ps1
```

For Route53 DNS automation, pass the hosted zone ID:

```powershell
powershell -ExecutionPolicy Bypass -File .\ghost\provision-ghost-ec2.ps1 -HostedZoneId ZONE_ID_HERE
```

By default SSH is open to `0.0.0.0/0`. To restrict it:

```powershell
powershell -ExecutionPolicy Bypass -File .\ghost\provision-ghost-ec2.ps1 -AdminCidr "YOUR_IP/32"
```

## After DNS Points To The Server

SSH into the server:

```powershell
ssh -i .\ghost\ghost-key.pem ubuntu@SERVER_PUBLIC_IP
```

Then enable SSL:

```bash
sudo -iu ghostuser
cd /var/www/ghost
ghost setup ssl
```

Bootstrap logs:

```bash
sudo tail -f /var/log/cloud-init-output.log
```
