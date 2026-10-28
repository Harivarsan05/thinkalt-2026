"use client";
import ServicePage from "../../../components/ServicePage";

const data = {
  id: "devops",
  title: "DevOps & Cloud\nOptimization",
  subtitle: "CI/CD · IaC · FinOps · Observability",
  tagline: "Ship faster. Spend less. Sleep better.",
  heroDesc: "We transform chaotic deployments into fully automated, self-healing infrastructure. Zero-downtime releases, cost-optimised cloud spend, and complete observability — from day one.",
  heroImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1920&auto=format&fit=crop",
  color: "from-[#4682B4] to-[#00CED1]",
  colorRGB: "0,206,209",
  accent: "#00CED1",
  lightAccent: "#48D1CC",
  ctaHeading: "Let's automate your infrastructure.",
  ctaDesc: "Book a free cloud audit call. We'll review your current setup, identify cost leaks and deployment bottlenecks, and present a prioritised remediation roadmap.",
  stats: [
    { value: "40+", label: "Cloud Migrations", sub: "AWS & GCP" },
    { value: "80%", label: "Faster Deploys", sub: "Avg across clients" },
    { value: "40%", label: "Cost Reduction", sub: "FinOps savings" },
    { value: "99.99%", label: "Uptime SLA", sub: "Multi-region" },
    { value: "< 5 min", label: "Deploy Pipeline", sub: "Commit to prod" },
    { value: "0", label: "Downtime Deploys", sub: "Blue/green strategy" },
  ],
  capabilities: [
    { icon: "🔄", title: "GitOps Pipelines", desc: "Fully declarative GitOps with ArgoCD and GitHub Actions — every infrastructure change is a pull request, reviewed, tested, and rolled back automatically on failure.", tags: ["ArgoCD", "GitHub Actions", "GitLab CI"] },
    { icon: "☸️", title: "Kubernetes Orchestration", desc: "Production-grade K8s clusters with Helm chart management, horizontal pod autoscaling, RBAC policies, network policies, and multi-cluster federation.", tags: ["Kubernetes", "Helm", "Kustomize"] },
    { icon: "💰", title: "FinOps & Cost Governance", desc: "Real-time cloud cost dashboards, rightsizing recommendations, reserved instance planning, and automated anomaly alerts that catch spend spikes immediately.", tags: ["AWS Cost Explorer", "Infracost", "Kubecost"] },
    { icon: "🏗️", title: "Infrastructure as Code", desc: "Every cloud resource defined in Terraform or AWS CDK — modular, reusable, peer-reviewed, and drift-detected. No more snowflake servers.", tags: ["Terraform", "AWS CDK", "Pulumi"] },
    { icon: "📊", title: "Full-Stack Observability", desc: "Unified metrics, logs, and traces with Datadog or Grafana — custom dashboards, SLO tracking, alert fatigue reduction, and on-call runbooks.", tags: ["Datadog", "Grafana", "OpenTelemetry"] },
    { icon: "🛡️", title: "Security & Compliance", desc: "SOC 2, ISO 27001, and GDPR compliance automation — secret scanning, IAM least-privilege enforcement, vulnerability scanning, and audit trail logging.", tags: ["Trivy", "OPA", "AWS Security Hub"] },
    { icon: "🔵", title: "Zero-Downtime Deployments", desc: "Blue/green and canary deployment strategies with automated traffic shifting, smoke tests, and instant rollback on health check failures.", tags: ["Blue/Green", "Canary", "Feature Flags"] },
    { icon: "🗄️", title: "Database DevOps", desc: "Automated schema migrations, database backup validation, read replica management, connection pooling, and point-in-time recovery setup.", tags: ["Flyway", "Atlas", "pgBouncer"] },
  ],
  process: [
    { step: "01", title: "Cloud Audit", desc: "Full inventory of your current cloud estate — cost breakdown, security posture, deployment maturity, and a prioritised improvement roadmap.", duration: "3–5 days" },
    { step: "02", title: "IaC Blueprint", desc: "Terraform or CDK modules designed for your environment — VPC, IAM, compute, database, and networking — reviewed and approved before apply.", duration: "1–2 weeks" },
    { step: "03", title: "Pipeline Setup", desc: "CI/CD pipelines with automated testing gates, security scans, Docker builds, and environment promotion from dev → staging → prod.", duration: "1–2 weeks" },
    { step: "04", title: "K8s Migration", desc: "Containerise your services, build Helm charts, configure autoscaling, set resource limits, and migrate traffic with zero downtime.", duration: "2–4 weeks" },
    { step: "05", title: "Observability Stack", desc: "Instrument every service with OpenTelemetry, configure dashboards, define SLOs, and build on-call runbooks for your team.", duration: "1 week" },
    { step: "06", title: "FinOps Governance", desc: "Monthly cost review cadence, automated rightsizing, reserved instance purchasing strategy, and a FinOps dashboard for your finance team.", duration: "Ongoing" },
  ],
  caseStudies: [
    { tag: "FinTech", title: "Cloud Migration — 40% Cost Saving", desc: "Migrated a monolithic FinTech platform to AWS EKS with Terraform IaC, reducing monthly cloud spend by 40% and deploy frequency from weekly to 20× per day.", results: ["40% cloud cost reduction", "20× deploy frequency", "99.99% uptime achieved", "SOC 2 compliance unlocked"], image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "E-Commerce", title: "Black Friday — Zero Downtime", desc: "Rebuilt a retail platform's infrastructure to handle 50× normal traffic during Black Friday with auto-scaling, CDN optimisation, and chaos engineering validation.", results: ["50× traffic spike handled", "Zero downtime events", "< 200ms p99 response", "35% infra cost saving"], image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "HealthTech", title: "HIPAA-Compliant AWS Platform", desc: "Designed a fully HIPAA-compliant AWS architecture with encrypted data-at-rest, audit logging, VPC isolation, and automated compliance evidence collection.", results: ["HIPAA compliant", "Automated audit trails", "VPC-isolated workloads", "100% IaC coverage"], image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
  ],
  techStack: [
    { category: "Cloud", items: ["AWS", "GCP", "Azure", "Cloudflare"] },
    { category: "IaC", items: ["Terraform", "AWS CDK", "Pulumi", "Ansible"] },
    { category: "Containers", items: ["Docker", "Kubernetes", "Helm", "Podman"] },
    { category: "CI/CD", items: ["GitHub Actions", "ArgoCD", "Jenkins", "GitLab CI"] },
    { category: "Observability", items: ["Datadog", "Grafana", "Prometheus", "OpenTelemetry"] },
    { category: "Security", items: ["Trivy", "OPA", "Vault", "AWS Security Hub"] },
    { category: "FinOps", items: ["Infracost", "Kubecost", "AWS Cost Explorer"] },
    { category: "Databases", items: ["RDS", "Aurora", "DynamoDB", "Redis"] },
  ],
  faqs: [
    { q: "How quickly can you reduce our cloud bill?", a: "In most cases we identify 20–30% savings within the first 2-week audit through rightsizing, eliminating idle resources, and switching to reserved/savings plan pricing. Structural savings of 40%+ come over 2–3 months." },
    { q: "Do you work with our existing CI/CD tools?", a: "Yes. We can enhance what you have (Jenkins, CircleCI, GitLab CI) or migrate to GitHub Actions + ArgoCD if starting fresh. We document every pipeline so your team owns it fully." },
    { q: "Terraform vs AWS CDK — which do you recommend?", a: "Terraform for multi-cloud environments or teams that prefer HCL. AWS CDK for AWS-only shops that prefer TypeScript/Python. We're proficient in both and will recommend based on your team's background." },
    { q: "What's your approach to Kubernetes for smaller teams?", a: "For teams under 10 engineers, we often recommend ECS or App Runner over Kubernetes to reduce operational overhead. We right-size the solution to your team's capacity, not the latest trend." },
    { q: "Can you set up observability for our existing production system?", a: "Yes. We instrument your services with OpenTelemetry in a non-breaking way, configure Datadog or Grafana, define SLOs, and build runbooks — typically completed in 1–2 weeks." },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}

