"use client";

import ServicePage from "../../components/ServicePage";

const data = {
  id: "foundry",
  title: "Foundry Product\nEngineering",
  subtitle: "Apps - AI - Cloud - Scale",
  tagline: "A senior product team that ships like a startup and scales like an enterprise.",
  heroDesc:
    "Foundry turns business ideas into polished software products: discovery, UX, architecture, full-stack engineering, cloud delivery, QA, and growth iterations under one accountable team.",
  heroImage: "/projects/foundry.jpg",
  color: "from-violet-500 to-orange-500",
  colorRGB: "124,58,237",
  accent: "#7c3aed",
  lightAccent: "#ddd6fe",
  ctaHeading: "Let's build your product engine.",
  ctaDesc:
    "Bring us a product idea, messy roadmap, or half-built platform. We will shape the plan, design the experience, and ship the first meaningful release with a clear execution cadence.",
  stats: [
    { value: "50+", label: "Products Shipped", sub: "Web, mobile, AI, and cloud" },
    { value: "8-12 wks", label: "MVP Velocity", sub: "Typical first release" },
    { value: "20+", label: "Industries Served", sub: "SaaS, health, retail, fintech" },
    { value: "99.9%", label: "Launch Reliability", sub: "Production-minded delivery" },
    { value: "4x", label: "Iteration Speed", sub: "After discovery sprint" },
    { value: "1 team", label: "Full Ownership", sub: "Strategy to support" },
  ],
  capabilities: [
    {
      icon: "UX",
      title: "Product Discovery",
      desc:
        "User journeys, feature priority, MVP scope, technical feasibility, and launch plan shaped before code starts.",
      tags: ["Workshops", "MVP Scope", "User Flows"],
    },
    {
      icon: "UI",
      title: "Interface Design",
      desc:
        "Clean, conversion-focused interfaces with design systems that make future features faster to ship.",
      tags: ["Design System", "Prototypes", "Responsive UI"],
    },
    {
      icon: "FE",
      title: "Frontend Engineering",
      desc:
        "Modern, fast web apps built with component architecture, performance budgets, and accessible interactions.",
      tags: ["Next.js", "React", "Performance"],
    },
    {
      icon: "BE",
      title: "Backend Platforms",
      desc:
        "APIs, databases, auth, queues, integrations, and admin tooling built for maintainability and scale.",
      tags: ["APIs", "Databases", "Auth"],
    },
    {
      icon: "AI",
      title: "AI Product Layers",
      desc:
        "AI assistants, workflow automation, recommendation systems, classification, and reporting built into real product flows.",
      tags: ["LLM Apps", "Automation", "Analytics"],
    },
    {
      icon: "CL",
      title: "Cloud Delivery",
      desc:
        "Secure deployment pipelines, monitoring, cost-aware infrastructure, and release processes your team can trust.",
      tags: ["CI/CD", "Cloud", "Monitoring"],
    },
    {
      icon: "QA",
      title: "Quality Automation",
      desc:
        "Regression suites, smoke tests, device checks, and release gates so quality does not depend on manual memory.",
      tags: ["Playwright", "Regression", "Release Gates"],
    },
    {
      icon: "GR",
      title: "Growth Iteration",
      desc:
        "Post-launch experiments, analytics review, funnel improvements, performance tuning, and roadmap acceleration.",
      tags: ["Analytics", "A/B Ideas", "Optimization"],
    },
  ],
  process: [
    {
      step: "01",
      title: "Map",
      desc:
        "We clarify users, business goals, constraints, risks, and the sharpest version of the product promise.",
      duration: "2-4 days",
    },
    {
      step: "02",
      title: "Design",
      desc:
        "Key screens, flows, system states, and interaction patterns are prototyped before the build sprint begins.",
      duration: "1-2 weeks",
    },
    {
      step: "03",
      title: "Architect",
      desc:
        "We define data models, APIs, integrations, hosting, security rules, and the technical route to scale.",
      duration: "Parallel",
    },
    {
      step: "04",
      title: "Build",
      desc:
        "Frontend, backend, cloud, and QA run in tight delivery loops with visible weekly demos.",
      duration: "4-8 weeks",
    },
    {
      step: "05",
      title: "Launch",
      desc:
        "We harden performance, analytics, monitoring, security, and release readiness before go-live.",
      duration: "1 week",
    },
    {
      step: "06",
      title: "Grow",
      desc:
        "After launch, we improve conversion, reliability, features, and operational tooling from real usage data.",
      duration: "Ongoing",
    },
  ],
  caseStudies: [
    {
      tag: "SaaS",
      title: "Analytics Platform - From Idea to Revenue",
      desc:
        "Designed and built a multi-tenant analytics product with custom dashboards, billing, role-based access, and white-label reporting.",
      results: ["MVP in 10 weeks", "50K daily events", "3x demo conversion", "Board-ready metrics"],
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
      color: "from-violet-500 to-orange-500",
    },
    {
      tag: "HealthTech",
      title: "Patient Workflow App - Faster Operations",
      desc:
        "Built a mobile-first workflow product for appointment handling, patient notes, reminders, and operational reporting.",
      results: ["42% admin time saved", "HIPAA-minded flows", "Mobile-first UX", "Live usage analytics"],
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=900&auto=format&fit=crop",
      color: "from-violet-500 to-orange-500",
    },
    {
      tag: "AI Ops",
      title: "Support Automation - AI Inside the Product",
      desc:
        "Added an AI triage layer that classified tickets, recommended replies, and surfaced product issues from customer language.",
      results: ["55% faster response", "8 intent classes", "Human review queue", "Weekly insight reports"],
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=900&auto=format&fit=crop",
      color: "from-violet-500 to-orange-500",
    },
  ],
  techStack: [
    { category: "Frontend", items: ["Next.js", "React", "Tailwind", "Framer Motion"] },
    { category: "Backend", items: ["Node.js", "Django", "Postgres", "Redis"] },
    { category: "Mobile", items: ["React Native", "Flutter", "Expo", "Native APIs"] },
    { category: "AI", items: ["OpenAI", "RAG", "Embeddings", "Agents"] },
    { category: "Cloud", items: ["AWS", "GCP", "Docker", "Vercel"] },
    { category: "Quality", items: ["Playwright", "Cypress", "Jest", "CI Gates"] },
    { category: "Product", items: ["Figma", "Analytics", "Hotjar", "Linear"] },
    { category: "Ops", items: ["Sentry", "Datadog", "PagerDuty", "GitHub Actions"] },
  ],
  faqs: [
    {
      q: "Can Foundry start from only an idea?",
      a: "Yes. We can begin with a discovery sprint, turn the idea into user flows and MVP scope, then move into design and build.",
    },
    {
      q: "Do you work with an existing internal team?",
      a: "Yes. We can act as the full product team or plug into your team for design, frontend, backend, AI, QA, or cloud ownership.",
    },
    {
      q: "How do you avoid building the wrong product?",
      a: "We use short discovery loops, prototype review, milestone demos, analytics planning, and explicit success metrics before major build effort.",
    },
    {
      q: "Can you modernize an existing app?",
      a: "Yes. We handle redesigns, architecture cleanup, performance work, cloud migration, feature rebuilds, and gradual rewrites.",
    },
    {
      q: "What happens after launch?",
      a: "We can continue through growth sprints, maintenance, monitoring, feature development, and MIRSA-powered app health support.",
    },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}
