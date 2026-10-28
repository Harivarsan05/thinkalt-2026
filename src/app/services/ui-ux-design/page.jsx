"use client";
import ServicePage from "../../../components/ServicePage";

const data = {
  id: "uiux",
  title: "UI/UX\nDesign",
  subtitle: "Research · Systems · Prototyping · Motion",
  tagline: "Design that converts, not just impresses.",
  heroDesc: "We create research-driven design systems that speak your brand language and convert visitors into customers. Every interaction is purposeful — backed by data, refined by craft.",
  heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1920&auto=format&fit=crop",
  color: "from-[#4682B4] to-[#00CED1]",
  colorRGB: "0,206,209",
  accent: "#00CED1",
  lightAccent: "#48D1CC",
  ctaHeading: "Let's design your product.",
  ctaDesc: "Book a free design review. We'll critique your current product experience, identify the top 3 conversion blockers, and share quick-win recommendations — no engagement needed.",
  stats: [
    { value: "50+", label: "Design Systems", sub: "Shipped to production" },
    { value: "38%", label: "Avg CRO Uplift", sub: "Post-redesign average" },
    { value: "500+", label: "Figma Components", sub: "Per design system" },
    { value: "4.9★", label: "Client Satisfaction", sub: "Avg engagement score" },
    { value: "< 2 wks", label: "First Prototype", sub: "From kickoff" },
    { value: "100%", label: "Dev-Ready Handoff", sub: "Storybook documented" },
  ],
  capabilities: [
    { icon: "🔬", title: "User Research", desc: "Moderated usability tests, user interviews, card sorting, tree testing, and heatmap analysis — grounding every design decision in real user behaviour.", tags: ["Usability Testing", "Interviews", "Hotjar"] },
    { icon: "🗂️", title: "Design Systems", desc: "Figma component libraries with design tokens, variants, auto-layout, and interactive states — aligned with your Tailwind or CSS-in-JS implementation.", tags: ["Figma", "Design Tokens", "Component Variants"] },
    { icon: "✨", title: "Motion & Micro-interactions", desc: "Lottie animations, transition choreography, loading states, gesture responses, and micro-interaction specs that make your product feel alive.", tags: ["Framer Motion", "Lottie", "After Effects"] },
    { icon: "📱", title: "Responsive Design", desc: "Mobile-first, fluid layouts across all breakpoints — with separate mobile, tablet, and desktop component variants and platform-specific interaction patterns.", tags: ["Mobile-First", "Responsive Grids", "Platform Patterns"] },
    { icon: "🧪", title: "A/B Testing & CRO", desc: "Data-driven conversion optimisation — hypothesis design, A/B test setup, statistical significance analysis, and iterative UI improvements based on real results.", tags: ["A/B Testing", "Optimizely", "VWO"] },
    { icon: "🤝", title: "Developer Handoff", desc: "Storybook component documentation, CSS variable exports, motion spec sheets, and asset delivery pipelines that engineering teams actually love.", tags: ["Storybook", "Zeplin", "CSS Variables"] },
    { icon: "♿", title: "Accessibility Design", desc: "WCAG 2.2 AA compliant designs — accessible colour contrast, focus states, screen reader annotations, and keyboard navigation flows built into every component.", tags: ["WCAG 2.2", "ARIA Annotations", "Contrast Checker"] },
    { icon: "🗺️", title: "Information Architecture", desc: "Card sorting, tree testing, sitemap design, user flow mapping, and navigation structure optimisation — ensuring users always know where they are and where to go.", tags: ["IA Design", "Tree Testing", "Card Sorting"] },
  ],
  process: [
    { step: "01", title: "User Research", desc: "Stakeholder interviews, user interviews, competitor analysis, heuristic evaluation, and analytics review to build a shared understanding of the problem.", duration: "1–2 weeks" },
    { step: "02", title: "IA & Flows", desc: "Information architecture, user flow diagrams, and task flow mapping — defining the navigational skeleton before any visual design begins.", duration: "1 week" },
    { step: "03", title: "Wireframing", desc: "Low-fidelity wireframes for all key screens — reviewed with stakeholders and iterated rapidly before progressing to visual design.", duration: "1–2 weeks" },
    { step: "04", title: "Visual Design", desc: "High-fidelity screens with brand-aligned visual language, typography, colour, imagery, and iconography — including all states and edge cases.", duration: "2–4 weeks" },
    { step: "05", title: "Prototype & Test", desc: "Interactive Figma prototypes used in moderated usability sessions — findings incorporated before final sign-off.", duration: "1 week" },
    { step: "06", title: "Dev Handoff", desc: "Organised Figma file with auto-layout, design tokens, Storybook specs, motion documentation, and asset exports ready for engineering.", duration: "3–5 days" },
  ],
  caseStudies: [
    { tag: "SaaS", title: "Dashboard Redesign — 42% Activation Lift", desc: "Redesigned a complex SaaS analytics dashboard using jobs-to-be-done research — reducing time-to-first-insight from 8 minutes to 90 seconds and lifting activation by 42%.", results: ["42% activation lift", "90s time-to-first-insight", "NPS improved +28pts", "60% support ticket reduction"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "E-Commerce", title: "Checkout Redesign — 31% More Conversions", desc: "Redesigned a 5-step checkout into a single-page flow with progress indicators, address autocomplete, and trust signals — lifting purchase conversion by 31%.", results: ["31% checkout conversion lift", "Cart abandonment -24%", "Mobile conversion +45%", "A/B tested to 500K users"], image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "HealthTech", title: "Patient App — WCAG AA Compliant", desc: "End-to-end UX for a patient-facing health app with WCAG 2.2 AA accessibility, large-print mode, screen reader support, and multi-language RTL layouts.", results: ["WCAG 2.2 AA certified", "RTL layout support", "4.8★ App Store rating", "28% task completion lift"], image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
  ],
  techStack: [
    { category: "Design", items: ["Figma", "Framer", "Sketch", "Adobe XD"] },
    { category: "Prototyping", items: ["Figma Prototype", "Framer", "ProtoPie", "Principle"] },
    { category: "Research", items: ["Maze", "UserTesting", "Hotjar", "FullStory"] },
    { category: "Motion", items: ["Lottie", "After Effects", "Framer Motion", "GSAP"] },
    { category: "Dev Handoff", items: ["Storybook", "Zeplin", "Supernova", "Token Studio"] },
    { category: "A/B Testing", items: ["Optimizely", "VWO", "Google Optimize", "Statsig"] },
    { category: "Accessibility", items: ["axe DevTools", "Stark", "Colour Contrast", "NVDA"] },
    { category: "Collaboration", items: ["FigJam", "Miro", "Notion", "Loom"] },
  ],
  faqs: [
    { q: "Do you work with our existing brand guidelines?", a: "Yes. We ingest your brand guidelines, existing component library, and design history before starting — extending what works rather than starting from scratch unless a full rebrand is needed." },
    { q: "What's the difference between a UI refresh and a design system?", a: "A UI refresh updates the visual layer of existing screens. A design system creates a reusable component library, design tokens, and documentation that governs all future UI consistently. Most growing products need a design system, not just a refresh." },
    { q: "How do you ensure designs are actually buildable?", a: "We embed an engineer in design reviews from week 1. Every component is designed with implementation constraints in mind, using auto-layout, design tokens, and documented interaction states that map to real CSS/component props." },
    { q: "Can you help improve an existing product's usability without a full redesign?", a: "Absolutely. A focused UX audit identifies the top 10 friction points in your current product. We then deliver a prioritised improvement backlog with low/medium/high effort estimates — you pick what to tackle first." },
    { q: "Do you do brand identity / logo design?", a: "Our core strength is product UI/UX. For brand identity, we partner with specialist brand studios. However, if you have an existing brand identity, we're experts at translating it into a cohesive product design language." },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}

