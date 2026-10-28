"use client";
import ServicePage from "../../../components/ServicePage";

const data = {
  id: "web",
  title: "Web App\nDevelopment",
  subtitle: "SaaS · Enterprise Portals · Marketplaces",
  tagline: "Lighthouse 100. Every time.",
  heroDesc: "We engineer web products that are blazing fast, pixel-perfect, and built to convert. From complex SaaS dashboards to high-traffic marketplaces — delivered on time, every time.",
  heroImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1920&auto=format&fit=crop",
  color: "from-[#4682B4] to-[#00CED1]",
  colorRGB: "0,206,209",
  accent: "#00CED1",
  lightAccent: "#48D1CC",
  ctaHeading: "Let's build your web product.",
  ctaDesc: "Book a free 30-minute architecture call. We'll review your requirements, suggest the ideal stack, and outline a delivery timeline — no commitment needed.",
  stats: [
    { value: "100", label: "Lighthouse Score", sub: "Performance & SEO" },
    { value: "< 50ms", label: "API Response", sub: "Edge-deployed" },
    { value: "80+", label: "Web Products", sub: "Shipped to production" },
    { value: "3x", label: "Conversion Lift", sub: "Avg across clients" },
    { value: "99.99%", label: "Uptime SLA", sub: "Multi-region deploys" },
    { value: "0", label: "Accessibility Fails", sub: "WCAG 2.2 AA" },
  ],
  capabilities: [
    { icon: "⚡", title: "Next.js 14 App Router", desc: "Server components, streaming SSR, and Partial Pre-rendering for sub-second page loads and unbeatable Core Web Vitals scores.", tags: ["RSC", "PPR", "Edge Runtime"] },
    { icon: "🔐", title: "Auth & Multi-Tenancy", desc: "Role-based access control, SSO (Google, SAML), multi-tenant data isolation, and session management with JWT + refresh token rotation.", tags: ["NextAuth", "RBAC", "SSO / SAML"] },
    { icon: "📊", title: "Real-Time Dashboards", desc: "Live data dashboards with WebSocket subscriptions, optimistic UI updates, infinite scroll, and complex data visualisation using Recharts / D3.", tags: ["WebSockets", "React Query", "D3 / Recharts"] },
    { icon: "🏗️", title: "Scalable Architecture", desc: "Micro-frontend monorepos with Nx, module federation, shared design systems, and independent deployment pipelines per team.", tags: ["Nx", "Module Federation", "Turborepo"] },
    { icon: "🌐", title: "GraphQL & REST APIs", desc: "Type-safe API layers with tRPC or GraphQL, Prisma ORM, connection pooling, N+1 query prevention, and automatic API documentation.", tags: ["tRPC", "GraphQL", "Prisma"] },
    { icon: "🔍", title: "SEO & Performance", desc: "Structured data, dynamic OG images, sitemap generation, Core Web Vitals optimisation, and Lighthouse CI gates on every PR.", tags: ["Schema.org", "OG Images", "Lighthouse CI"] },
    { icon: "💳", title: "Payments & Billing", desc: "Stripe integration with subscription management, usage-based billing, invoicing, failed payment recovery, and tax compliance.", tags: ["Stripe", "Webhooks", "Tax Handling"] },
    { icon: "🧪", title: "Testing & Quality", desc: "Playwright E2E, Vitest unit tests, Storybook component isolation, Percy visual regression, and automated accessibility checks.", tags: ["Playwright", "Vitest", "Storybook"] },
  ],
  process: [
    { step: "01", title: "Tech Architecture", desc: "We design the full system — data models, API contracts, auth flows, and deployment topology — before any code is written.", duration: "1 week" },
    { step: "02", title: "Design System", desc: "Figma component library with tokens, responsive grids, and motion specs — built for handoff to your engineering team.", duration: "2 weeks" },
    { step: "03", title: "Frontend Build", desc: "Component-driven development with continuous Storybook previews, live staging URL after every sprint.", duration: "4–12 weeks" },
    { step: "04", title: "API Integration", desc: "Type-safe API wiring, real-time subscriptions, edge functions, and end-to-end data flow validation.", duration: "Parallel" },
    { step: "05", title: "Performance Audit", desc: "Lighthouse CI, bundle analysis, image optimisation, CDN configuration, and Core Web Vitals green across all routes.", duration: "1 week" },
    { step: "06", title: "Go-Live & CDN", desc: "Vercel / AWS deployment, DNS cutover, monitoring setup, and 30-day hypercare with daily check-ins.", duration: "1 week" },
  ],
  caseStudies: [
    { tag: "SaaS", title: "Analytics Platform — 50K DAU", desc: "Built a real-time analytics SaaS with multi-tenant architecture, custom dashboard builder, and white-label exports — reaching 50K DAU in 6 months.", results: ["50K daily active users", "Lighthouse 100 on all routes", "3× conversion rate lift", "99.99% uptime"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "E-Commerce", title: "Marketplace — $12M GMV", desc: "Full-stack B2B marketplace with seller onboarding, payment escrow, dispute resolution, and real-time inventory management driving $12M GMV.", results: ["$12M GMV in Year 1", "< 800ms page load", "98% seller satisfaction", "Zero P0 incidents"], image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "Enterprise", title: "HR Portal — 200 Companies", desc: "Multi-tenant HR platform with payroll, leave management, performance reviews, and HRIS integrations deployed across 200 enterprise clients.", results: ["200 enterprise clients", "GDPR & SOC 2 compliant", "< 50ms API response", "40% admin time saved"], image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
  ],
  techStack: [
    { category: "Frontend", items: ["React", "Next.js 14", "TypeScript", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "tRPC", "GraphQL", "REST"] },
    { category: "Database", items: ["PostgreSQL", "Prisma", "Redis", "PlanetScale"] },
    { category: "Auth", items: ["NextAuth", "Auth0", "Clerk", "Supabase Auth"] },
    { category: "Infrastructure", items: ["Vercel", "AWS", "Cloudflare", "Docker"] },
    { category: "Testing", items: ["Playwright", "Vitest", "Storybook", "Percy"] },
    { category: "Payments", items: ["Stripe", "Paddle", "Chargebee"] },
    { category: "Monitoring", items: ["Datadog", "Sentry", "LogRocket"] },
  ],
  faqs: [
    { q: "Next.js vs a traditional SPA — which is right for my project?", a: "Next.js with App Router is the default choice for SEO-sensitive products, dashboards needing SSR, or any app with authenticated routes. Pure SPAs still make sense for internal tools where SEO doesn't matter." },
    { q: "How do you handle multi-tenant SaaS architecture?", a: "We use row-level security in PostgreSQL (or schema-per-tenant for strict isolation), combined with middleware-based tenant resolution at the edge — giving you both security and performance." },
    { q: "Can you integrate with our existing backend?", a: "Yes. We can wrap any REST, GraphQL, or gRPC backend with a type-safe adapter layer and build the full frontend on top — no need to rewrite your existing services." },
    { q: "What does a Lighthouse 100 score actually involve?", a: "Server-side rendering, image optimisation with next/image, code splitting, critical CSS inlining, font display swap, and Lighthouse CI gates that fail the build if scores drop below threshold." },
    { q: "Do you build design systems from scratch?", a: "Yes. We deliver Figma component libraries with design tokens, a Storybook component catalogue, and a Tailwind CSS theme — all aligned and ready for multi-team use." },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}

