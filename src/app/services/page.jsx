"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DarkNavbar from "../../components/DarkNavbar";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import ServiceSchema from "../../components/seo/ServiceSchema";
import WebPageSchema from "../../components/seo/WebPageSchema";

const f = "'Inter',sans-serif";

const servicesList = [
  {
    id: "mobile",
    title: "Mobile App Development",
    icon: "📱",
    subtitle: "Cross-Platform · Native iOS & Android",
    tagline: "Apps that feel native, perform globally.",
    desc: "We architect and deliver high-performance mobile applications that scale from MVP to millions of daily active users. Every pixel is intentional, every interaction buttery-smooth.",
    stats: [
      { value: "60+", label: "Apps Shipped" },
      { value: "4.8★", label: "Avg Store Rating" },
      { value: "99.9%", label: "Crash-Free Rate" },
      { value: "12ms", label: "Frame Render" },
    ],
    capabilities: [
      { icon: "⚡", title: "High-Performance UI", desc: "Buttery-smooth 60fps interfaces using React Native Reanimated 3 and Flutter Skia — even on budget Android devices." },
      { icon: "🔐", title: "Security & Auth", desc: "Biometric login (Face ID, fingerprint), JWT + OAuth2 flows, encrypted Keychain/Keystore storage, and MFA integration." },
      { icon: "📡", title: "Offline-First Architecture", desc: "Apps that work flawlessly with zero connectivity — local-first storage with background sync and conflict resolution." },
      { icon: "🚀", title: "CI/CD & Store Delivery", desc: "Automated pipelines from commit to App Store / Play Store — code signing, Fastlane triggers, and OTA updates." }
    ],
    techStack: ["React Native", "Flutter", "SwiftUI / Swift", "Kotlin / Compose", "Fastlane", "Maestro / Detox"],
    color: "from-[#4682B4] to-[#00CED1]",
    accent: "#00CED1",
    href: "/services/mobile-app-development",
  },
  {
    id: "web",
    title: "Web App Development",
    icon: "🌐",
    subtitle: "Modern Web Stack · Next.js · React",
    tagline: "Uncompromising speed, SEO, and developer velocity.",
    desc: "We build modern React applications leveraging layout streaming, dynamic pre-rendering, and advanced caching architectures for the best web experience.",
    stats: [
      { value: "100/100", label: "Lighthouse Score" },
      { value: "< 45ms", label: "TTFB" },
      { value: "62%", label: "Bundle Savings" },
      { value: "All Green", label: "Core Web Vitals" },
    ],
    capabilities: [
      { icon: "⚡", title: "React Server Components", desc: "Render-blocking data fetch logic runs on high-speed edge servers, keeping client bundle weight tiny." },
      { icon: "🎨", title: "Interactive UX", desc: "Fluid, framer-motion powered design patterns layered over stable, responsive CSS architectures." },
      { icon: "🛡️", title: "Secure Edge Middleware", desc: "Global routing, GeoIP redirection, rate limiting, and page personalization executed at the edge." },
      { icon: "📦", title: "Modern State Management", desc: "Optimized React Context and Zustand stores that prevent component render thrashing." }
    ],
    techStack: ["Next.js", "React", "Tailwind CSS", "Zustand", "TypeScript", "Node.js"],
    color: "from-[#4682B4] to-[#00CED1]",
    accent: "#00CED1",
    href: "/services/web-app-development",
  },
  {
    id: "devops",
    title: "DevOps & Cloud Automation",
    icon: "☁️",
    subtitle: "CI/CD · Infrastructure as Code · Scaling",
    tagline: "Automate delivery. Eliminate downtime.",
    desc: "Build developer self-service platforms, automated rollback pipelines, and cost-controlled autoscaling Kubernetes clusters.",
    stats: [
      { value: "2x", label: "Deployment Velocity" },
      { value: "Zero", label: "Downtime Deploy" },
      { value: "90%", label: "CI/CD Automation" },
      { value: "Daily", label: "Release Cadence" },
    ],
    capabilities: [
      { icon: "🔄", title: "GitOps Pipelines", desc: "ArgoCD and GitHub Actions pipelines that verify, sign, package, and release your code." },
      { icon: "⚓", title: "Container Orchestration", desc: "Highly available EKS/GKE configurations utilizing automated node provisioning and scaling." },
      { icon: "🏗️", title: "Infrastructure as Code", desc: "Modular Terraform scripts versioning VPCs, clusters, databases, and firewall layers." },
      { icon: "📈", title: "Telemetry & Tracing", desc: "Centralized logging, OpenTelemetry tracers, and automated alerts detecting errors instantly." }
    ],
    techStack: ["Terraform", "GitHub Actions", "Docker / K8s", "AWS / GCP", "ArgoCD", "Datadog"],
    color: "from-[#4682B4] to-[#00CED1]",
    accent: "#00CED1",
    href: "/services/devops-cloud-optimization",
  },
  {
    id: "ai",
    title: "AI & Product Intelligence",
    icon: "🧠",
    subtitle: "LLMs · RAG · Vision · Predictive Analytics",
    tagline: "Your product, now with a brain.",
    desc: "Deeply embed AI into your product workflows — automating decisions, surfacing insights, and creating experiences that feel like magic to your users.",
    stats: [
      { value: "35+", label: "AI Products Live" },
      { value: "< 200ms", label: "RAG Latency" },
      { value: "92%", label: "Model Accuracy" },
      { value: "5B+", label: "Monthly Tokens" },
    ],
    capabilities: [
      { icon: "🧠", title: "LLM Integration", desc: "GPT-4o, Claude 3.5 Sonnet, and Gemini integrations with structured outputs and function calling." },
      { icon: "📚", title: "RAG Pipelines", desc: "Production RAG systems with hybrid search, re-ranking, and hallucination mitigation layers." },
      { icon: "🔁", title: "Agentic Workflows", desc: "Multi-step autonomous agents with LangGraph — planning, tool use, and memory loops." },
      { icon: "👁️", title: "Computer Vision", desc: "Document OCR, ID verification, object tracking, and image classification pipelines." }
    ],
    techStack: ["OpenAI / Anthropic", "LangChain / LangGraph", "Pinecone / pgvector", "PyTorch / HuggingFace", "FastAPI"],
    color: "from-[#4682B4] to-[#00CED1]",
    accent: "#00CED1",
    href: "/services/ai-integrations",
  },
  {
    id: "qa",
    title: "QA Automation & Testing",
    icon: "🧪",
    subtitle: "End-to-End Testing · Playwright · Cypress",
    tagline: "Release daily without fear.",
    desc: "Eliminate manual testing bottlenecks. Implement end-to-end regression test suites that run automatically on every pull request.",
    stats: [
      { value: "95%", label: "QA Coverage" },
      { value: "< 10m", label: "Test Run Times" },
      { value: "80%", label: "Time Savings" },
      { value: "Zero", label: "Regression Escapes" },
    ],
    capabilities: [
      { icon: "🎭", title: "Playwright Automation", desc: "Fast, reliable end-to-end testing across Chromium, WebKit, and Firefox engines." },
      { icon: "📸", title: "Visual Regression", desc: "Pixel-perfect screenshot comparison checks to flag design regressions automatically." },
      { icon: "⚡", title: "API Verification", desc: "Automated schema validation, load checks, and boundary value testing for microservices." },
      { icon: "🔀", title: "Parallel Execution", desc: "Sharded test runs in cloud environments for sub-10 minute complete QA feedback." }
    ],
    techStack: ["Playwright", "Cypress", "Jest / Vitest", "GitHub Actions", "Percy / Chromatic"],
    color: "from-[#4682B4] to-[#00CED1]",
    accent: "#00CED1",
    href: "/services/qa-automation",
  },
  {
    id: "cto",
    title: "CTO+ – Fractional CTO",
    icon: "💼",
    subtitle: "Strategic Technical Leadership",
    tagline: "Enterprise strategy for growing startups.",
    desc: "Navigate critical architectural decisions, security audits, technical debt assessments, and engineering growth roadmaps with experienced leaders.",
    stats: [
      { value: "12+", label: "Teams Scaled" },
      { value: "$50M+", label: "Funded Projects" },
      { value: "100%", label: "Audit Success" },
      { value: "Strategic", label: "Roadmaps Defined" },
    ],
    capabilities: [
      { icon: "🛠️", title: "Tech Stack Strategy", desc: "Audit your product's performance and choose the right languages, databases, and servers." },
      { icon: "🏗️", title: "Architecture Audits", desc: "Evaluate database design, bottleneck areas, API specifications, and service coupling." },
      { icon: "🛡️", title: "Security Compliance", desc: "Prepare your engineering team, processes, and code for SOC2, HIPAA, and GDPR audits." },
      { icon: "👥", title: "Team Recruiting", desc: "Establish high-quality hiring filters, evaluate senior candidates, and structure engineering pipelines." }
    ],
    techStack: ["Security Audits", "SOC2 Compliance", "Jira / Agile", "System Design", "Cloud Architecture"],
    color: "from-[#4682B4] to-[#00CED1]",
    accent: "#00CED1",
    href: "/services/fractional-cto",
  },
  {
    id: "gcc",
    title: "GCC Setup Support",
    icon: "🏢",
    subtitle: "Global Capability Centers",
    tagline: "Your own dedicated offshore engineering office.",
    desc: "Establish, hire, and scale your own Global Capability Center. We manage office setup, legal compliance, and top-tier talent acquisition.",
    stats: [
      { value: "3", label: "GCCs Established" },
      { value: "150+", label: "Engineers Hired" },
      { value: "40%", label: "Savings Realized" },
      { value: "95%", label: "Retention Rate" },
    ],
    capabilities: [
      { icon: "🏢", title: "Infrastructure Setup", desc: "Set up premium office spaces with high-speed networks, access controls, and modern workstations." },
      { icon: "👥", title: "Talent Sourcing", desc: "We recruit, interview, and onboard top 2% local engineering talent tailored to your requirements." },
      { icon: "⚖️", title: "Legal & payroll HR", desc: "Handle local payroll, employee benefits, tax compliance, and local labor laws seamlessly." },
      { icon: "🤝", title: "Cultural Integration", desc: "Ensure remote teams align perfectly with your core company culture, values, and processes." }
    ],
    techStack: ["Talent Sourcing", "Legal Compliance", "HR Operations", "Infrastructure Setup"],
    color: "from-[#4682B4] to-[#00CED1]",
    accent: "#00CED1",
    href: "/services/gcc-setup",
  },
  {
    id: "design",
    title: "UI/UX & Design Systems",
    icon: "🎨",
    subtitle: "Design Systems · Prototypes · WCAG",
    tagline: "Designs that delight. UI that performs.",
    desc: "Create high-fidelity designs, interactive prototypes, and scalable component libraries. Validate layouts before writing code.",
    stats: [
      { value: "400+", label: "Components Library" },
      { value: "WCAG", label: "2.1 AA Compliant" },
      { value: "2x", label: "Handoff Speed" },
      { value: "100%", label: "Tailored Layouts" },
    ],
    capabilities: [
      { icon: "🎛️", title: "Interactive Prototypes", desc: "Build high-fidelity click-through designs to test user journeys and layout validation." },
      { icon: "🧱", title: "Design Systems", desc: "Create cohesive components, color tokens, and styling guidelines that sync directly with code." },
      { icon: "♿", title: "Accessibility Audits", desc: "Ensure full screen reader compatibility, color contrast safety, and responsive scaling." },
      { icon: "📐", title: "Developer Handoff", desc: "Pixel-perfect specifications, assets, and styling attributes exported directly for frontend developers." }
    ],
    techStack: ["Figma", "Adobe CC", "Storybook", "Tailwind Themes", "Accessibility Checks"],
    color: "from-[#4682B4] to-[#00CED1]",
    accent: "#00CED1",
    href: "/services/ui-ux-design",
  },
  {
    id: "maintenance",
    title: "App Maintenance",
    icon: "🔧",
    subtitle: "SLA Support · Bug Retainers",
    tagline: "Keep your product running at peak health.",
    desc: "Rest easy with proactive library updates, dependency upgrades, security patches, log triages, and database indexing.",
    stats: [
      { value: "< 4hr", label: "SLA Response" },
      { value: "24/7", label: "Server Watch" },
      { value: "99.99%", label: "Target Uptime" },
      { value: "Zero", label: "Security Escapes" },
    ],
    capabilities: [
      { icon: "🎫", title: "SLA Support", desc: "Dedicated ticketing portal with guaranteed response times for critical production issues." },
      { icon: "🔄", title: "Dependency Updates", desc: "Automated, verified library version upgrades to avoid deprecation bottlenecks." },
      { icon: "⚙️", title: "Performance Tuning", desc: "Monthly database index optimization, cache tuning, and bundle size reduction audits." },
      { icon: "🛡️", title: "Security Patching", desc: "Continuous scanning for vulnerability CVEs and rapid security patch deployments." }
    ],
    techStack: ["Sentry / Datadog", "GitHub Dependabot", "Database Indexing", "New Relic", "PagerDuty"],
    color: "from-[#4682B4] to-[#00CED1]",
    accent: "#00CED1",
    href: "/services/app-maintenance",
  },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState(servicesList[0].id);
  const activeService = servicesList.find((s) => s.id === activeTab);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: f }}>
      <WebPageSchema name="Software Development & AI Services" description="Explore ThinkAlternate's AI, web, mobile, cloud, DevOps, and product engineering services." path="/services" />
      <ServiceSchema name={activeService.title} description={activeService.desc} path={activeService.href} />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]} />
      <DarkNavbar />

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header Section */}
        <div className="text-center md:text-left mb-12">
          <span className="inline-block px-3 py-1 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            Capabilities Vertical
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-gray-950">
            Our Specialized Services
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-xl">
            Choose a service vertical from the menu to inspect full technical capabilities, outcomes, and tech stacks.
          </p>
        </div>

        {/* Interactive Dashboard Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Navigation Sidebar (Desktop sticky / Mobile horizontal tab bar) */}
          <div className="w-full lg:w-[380px] shrink-0 sticky top-28 z-20 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 flex lg:flex-col gap-2.5 no-scrollbar">
            <style jsx global>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
            {servicesList.map((service) => {
              const isActive = service.id === activeTab;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl border text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal shrink-0 lg:w-full ${
                    isActive
                      ? `bg-gradient-to-r ${service.color} border-transparent text-white shadow-xl shadow-violet-950/20`
                      : "bg-gray-50/60 border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-2xl">{service.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm lg:text-base leading-tight">{service.title}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold mt-0.5 ${isActive ? "text-white/80" : "text-gray-400"}`}>
                      {service.id === "cto" ? "Fractional CTO" : service.id === "gcc" ? "Global Centers" : "Engineering"}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-white hidden lg:block"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Details Panel Canvas */}
          <div className="flex-1 w-full bg-white border border-gray-200 rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-sm min-h-[600px]">
            {/* Ambient dynamic background spot */}
            <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-10 transition-all duration-500 bg-gradient-to-br ${activeService.color}`} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col justify-between h-full"
              >
                <div>
                  {/* Category Header */}
                  <span className="text-xs uppercase tracking-[0.25em] font-black text-gray-400">
                    {activeService.subtitle}
                  </span>
                  
                  {/* Title & Tagline */}
                  <h2 className="text-3xl md:text-5xl font-black mt-2 mb-3 text-gray-900 leading-tight">
                    {activeService.title}
                  </h2>
                  <p className="text-lg font-bold tracking-wide italic mb-6" style={{ color: activeService.accent }}>
                    "{activeService.tagline}"
                  </p>

                  <hr className="border-gray-100 mb-8" />

                  {/* Summary Description */}
                  <p className="text-gray-650 text-sm md:text-base leading-relaxed mb-8 max-w-3xl">
                    {activeService.desc}
                  </p>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-10 text-center">
                    {activeService.stats.map((s) => (
                      <div key={s.label}>
                        <div className="text-2xl font-black" style={{ color: activeService.accent }}>{s.value}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Capabilities List */}
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                    Technical Capabilities
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {activeService.capabilities.map((cap) => {
                      const slug = cap.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                      return (
                        <Link
                          key={cap.title}
                          href={`/features/${slug}`}
                          className="block cursor-pointer hover:scale-[1.015] transition-transform duration-200"
                        >
                          <div className="bg-gray-50/60 border border-gray-100 rounded-2xl p-5 hover:bg-gray-100 hover:border-gray-200 transition-colors duration-200 h-full">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-bold" style={{ color: activeService.accent }}>{cap.icon}</span>
                              <h4 className="text-sm font-bold text-gray-900">{cap.title}</h4>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed">{cap.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Tech Stack Chips */}
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                    Core Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-12">
                    {activeService.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase bg-gray-100 border border-gray-200 text-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-100">
                  <Link
                    href="/contact"
                    className={`px-8 py-3.5 rounded-full bg-gradient-to-r ${activeService.color} text-white text-xs font-black uppercase tracking-wider hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-violet-950/10`}
                  >
                    Start Project Vertical
                  </Link>
                  <Link
                    href={activeService.href}
                    className="px-6 py-3.5 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 text-xs font-black uppercase tracking-wider text-gray-650 hover:text-gray-900 transition-all duration-350"
                  >
                    Read Technical Docs & Case Studies →
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
