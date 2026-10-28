"use client";
import ServicePage from "../../../components/ServicePage";

const data = {
  id: "maintenance",
  title: "App Maintenance\n& Optimization",
  subtitle: "Performance · Security · SLA · Monitoring",
  tagline: "Always fast. Always secure. Always on.",
  heroDesc: "Proactive health management for your live product — performance tuning, security patching, dependency upgrades, and SLA-backed incident response so you never miss a beat.",
  heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1920&auto=format&fit=crop",
  color: "from-[#4682B4] to-[#00CED1]",
  colorRGB: "0,206,209",
  accent: "#00CED1",
  lightAccent: "#48D1CC",
  ctaHeading: "Let's keep your app healthy.",
  ctaDesc: "Book a free production health check. We'll run a Lighthouse audit, dependency scan, and uptime analysis — then give you a prioritised optimisation roadmap.",
  stats: [
    { value: "99.99%", label: "Uptime Delivered", sub: "SLA-backed" },
    { value: "< 1hr", label: "Incident Response", sub: "P1 SLA" },
    { value: "100%", label: "Patch Coverage", sub: "CVE remediation" },
    { value: "45%", label: "Perf Improvement", sub: "Avg after first sprint" },
    { value: "0", label: "Missed SLAs", sub: "Across all clients" },
    { value: "24/7", label: "Monitoring", sub: "PagerDuty coverage" },
  ],
  capabilities: [
    { icon: "📡", title: "24/7 Uptime Monitoring", desc: "Multi-region synthetic monitoring, real user monitoring, and PagerDuty escalation policies — catching downtime before your users notice it.", tags: ["Datadog", "PagerDuty", "Synthetic Monitoring"] },
    { icon: "🔐", title: "Security Patch Management", desc: "Monthly CVE scanning, automated dependency upgrade PRs, OWASP Top 10 regression testing, and zero-day response protocols.", tags: ["Snyk", "Dependabot", "OWASP"] },
    { icon: "⚡", title: "Core Web Vitals Tuning", desc: "LCP, CLS, INP optimisation through image compression, code splitting, font loading strategy, and server response time improvements.", tags: ["Lighthouse CI", "WebPageTest", "CrUX"] },
    { icon: "🔄", title: "Dependency Management", desc: "Automated weekly dependency audits with breaking-change detection, tested upgrade PRs, and semantic versioning governance.", tags: ["Renovate", "Dependabot", "npm audit"] },
    { icon: "🗄️", title: "Database Optimisation", desc: "Query analysis and N+1 detection, index optimisation, connection pool tuning, slow query remediation, and backup validation.", tags: ["pg_stat_statements", "EXPLAIN ANALYZE", "pgBouncer"] },
    { icon: "📊", title: "Performance Sprints", desc: "Quarterly 1-week performance sprints — profiling, bottleneck identification, and targeted optimisations that produce measurable score improvements.", tags: ["Chrome DevTools", "clinic.js", "0x"] },
    { icon: "💬", title: "Dedicated Support Channel", desc: "A dedicated Slack or Teams channel with named engineers — not ticket queues. Real people who know your codebase responding within SLA.", tags: ["< 1hr P1 SLA", "< 4hr P2 SLA", "Slack/Teams"] },
    { icon: "📋", title: "Monthly Audit Reports", desc: "Comprehensive monthly report covering uptime, incident log, security findings, Lighthouse trends, dependency health, and recommended next actions.", tags: ["Monthly Report", "SLA Dashboard", "Incident Log"] },
  ],
  process: [
    { step: "01", title: "Codebase Audit", desc: "Full health assessment — Lighthouse scores, dependency vulnerabilities, dead code, bundle size analysis, and infrastructure cost review.", duration: "3–5 days" },
    { step: "02", title: "Monitoring Setup", desc: "Datadog or New Relic instrumentation, synthetic monitors, uptime checks, custom dashboards, and PagerDuty escalation policies.", duration: "3–5 days" },
    { step: "03", title: "Hotfix Retainer", desc: "Dedicated sprint capacity reserved for urgent production issues — guaranteed response and resolution within agreed SLA windows.", duration: "Ongoing" },
    { step: "04", title: "Monthly Security Scan", desc: "CVE dependency audit, OWASP ZAP scan, access control review, and secret detection — with remediation PRs delivered within the same sprint.", duration: "Monthly" },
    { step: "05", title: "Performance Sprints", desc: "Quarterly focused optimisation sprints targeting the highest-impact performance improvements based on real user data.", duration: "Quarterly" },
    { step: "06", title: "Quarterly Review", desc: "60-minute strategic review call covering SLA performance, upcoming risks, roadmap recommendations, and contract renewal discussion.", duration: "Quarterly" },
  ],
  caseStudies: [
    { tag: "E-Commerce", title: "Lighthouse 100 — From Score 41", desc: "Took a legacy e-commerce app from Lighthouse 41 to 100 through image optimisation, critical CSS extraction, code splitting, and edge caching.", results: ["Lighthouse 41 → 100", "Page load 4.2s → 0.8s", "32% conversion increase", "Core Web Vitals all green"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "SaaS", title: "Zero Downtime — 24 Months Running", desc: "Maintained 99.99% uptime for a mission-critical SaaS platform across 24 months — managing 3 major framework upgrades and 2 infrastructure migrations with zero customer impact.", results: ["99.99% uptime 24 months", "3 major framework upgrades", "Zero customer impact", "< 45min avg MTTR"], image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "FinTech", title: "Security Hardening — SOC 2 Ready", desc: "Remediated 8 high-severity CVEs, eliminated 3 secret leaks in git history, and hardened the entire dependency tree — enabling SOC 2 Type II certification.", results: ["8 CVEs remediated", "SOC 2 Type II certified", "Zero secrets in codebase", "Monthly automated scans"], image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
  ],
  techStack: [
    { category: "Monitoring", items: ["Datadog", "New Relic", "Grafana", "Prometheus"] },
    { category: "Error Tracking", items: ["Sentry", "Rollbar", "Bugsnag"] },
    { category: "Alerting", items: ["PagerDuty", "OpsGenie", "Slack Alerts"] },
    { category: "Security", items: ["Snyk", "Dependabot", "OWASP ZAP", "Trivy"] },
    { category: "Performance", items: ["Lighthouse CI", "WebPageTest", "k6", "clinic.js"] },
    { category: "DB Ops", items: ["pgBouncer", "RDS Performance Insights", "pt-query-digest"] },
    { category: "Dependency Mgmt", items: ["Renovate", "npm audit", "Dependabot"] },
    { category: "Uptime", items: ["Datadog Synthetics", "Pingdom", "StatusPage"] },
  ],
  faqs: [
    { q: "What does a maintenance retainer actually include?", a: "Typically: dedicated engineering hours (8–40hrs/month depending on tier), 24/7 monitoring, monthly security audit, quarterly performance sprint, dependency upgrades, hotfix coverage within SLA, and a monthly health report." },
    { q: "How quickly can you respond to a production incident?", a: "Our P1 SLA is < 1 hour acknowledgement with a named engineer on it. P2 (degraded performance) is < 4 hours. P3 (cosmetic/non-blocking) is < 1 business day. All tracked in a transparent SLA dashboard." },
    { q: "Can you maintain a product built by a different agency?", a: "Yes — this is common. We begin with a 3–5 day codebase audit to understand the architecture, identify risks, and document the system before taking on any changes. We've successfully maintained codebases in React, Vue, Angular, Laravel, Django, and Ruby on Rails." },
    { q: "Do you handle both frontend and backend maintenance?", a: "Yes. Our retainers cover the full stack — frontend performance, backend API optimisation, database tuning, infrastructure cost management, and CI/CD pipeline health." },
    { q: "What happens if our app goes down at 3am?", a: "PagerDuty will page our on-call engineer within 1 minute of the alert. They'll acknowledge within 15 minutes, begin diagnosis immediately, and have a status update to your Slack channel within 30 minutes." },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}

