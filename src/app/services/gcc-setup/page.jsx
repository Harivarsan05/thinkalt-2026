"use client";
import ServicePage from "../../../components/ServicePage";

const data = {
  id: "gcc",
  title: "GCC Setup\nSupport",
  subtitle: "India · UAE · Southeast Asia · Compliance",
  tagline: "Your offshore engineering centre, built right.",
  heroDesc: "We handle every layer of Global Capability Centre setup — legal entity, payroll, compliance, talent pipeline, and governance — so you get a running team in 90 days.",
  heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop",
  color: "from-[#4682B4] to-[#00CED1]",
  colorRGB: "0,206,209",
  accent: "#00CED1",
  lightAccent: "#48D1CC",
  ctaHeading: "Let's build your GCC.",
  ctaDesc: "Book a free GCC feasibility call. We'll assess the right location for your needs, outline the setup timeline, and give you a cost-benefit analysis vs alternative hiring models.",
  stats: [
    { value: "10+", label: "GCCs Launched", sub: "Across 4 countries" },
    { value: "90 days", label: "To Operational", sub: "Team fully running" },
    { value: "4", label: "Countries", sub: "India, UAE, SG, MY" },
    { value: "500+", label: "Hires Facilitated", sub: "Engineers & leaders" },
    { value: "60%", label: "Cost Saving", sub: "vs onshore hiring" },
    { value: "100%", label: "Compliance Rate", sub: "Zero regulatory issues" },
  ],
  capabilities: [
    { icon: "🏢", title: "Legal Entity Setup", desc: "Company incorporation, registered office, director appointments, shareholder structure, and banking setup — handled end-to-end in your chosen jurisdiction.", tags: ["Incorporation", "Banking", "Company Law"] },
    { icon: "💼", title: "HR & Payroll", desc: "Payroll processing, statutory compliance (PF, ESI, gratuity), benefits administration, ESOP setup, and employment contract templates for each jurisdiction.", tags: ["Payroll", "PF / ESI", "ESOP"] },
    { icon: "🎓", title: "Talent Acquisition", desc: "Senior engineering hiring across frontend, backend, mobile, DevOps, and QA — with structured interview processes, technical assessments, and background checks.", tags: ["Engineering Hiring", "Leadership Hiring", "ATS Setup"] },
    { icon: "📜", title: "Compliance & Governance", desc: "GDPR, SOC 2, ISO 27001, SEBI/RBI (India), DIFC (UAE) compliance blueprints, data localisation strategy, and contract review for IP protection.", tags: ["GDPR", "SOC 2", "Data Localisation"] },
    { icon: "🌐", title: "IT Infrastructure", desc: "Network design, laptop provisioning, identity management (Okta/Google), VPN setup, cloud access configuration, and collaboration tool rollout.", tags: ["Okta", "VPN", "MDM"] },
    { icon: "📊", title: "Delivery Governance", desc: "KPI dashboards, OKR alignment with HQ, sprint governance frameworks, time zone overlap optimisation, and quarterly business review templates.", tags: ["KPIs", "OKRs", "QBR Framework"] },
    { icon: "🏙️", title: "Office & Workspace", desc: "Co-working space identification, managed office setup, ergonomic standards, visitor policy, and eventual transition to owned/leased office planning.", tags: ["Co-working", "Office Setup", "Facilities"] },
    { icon: "🔄", title: "Knowledge Transfer", desc: "Structured onboarding playbooks, documentation standards, shadow-and-own handoff processes, and cross-timezone collaboration protocols.", tags: ["Onboarding", "Documentation", "Collaboration"] },
  ],
  process: [
    { step: "01", title: "Feasibility Study", desc: "Location analysis covering talent market depth, cost benchmarking, regulatory complexity, time zone overlap, and infrastructure quality across target cities.", duration: "1 week" },
    { step: "02", title: "Entity Formation", desc: "Incorporation, registered office, banking, and all statutory registrations — coordinated with local legal partners in your chosen jurisdiction.", duration: "3–6 weeks" },
    { step: "03", title: "HR & Payroll Setup", desc: "Payroll processor selection, statutory registration (PF, ESI, TAN), employment contract templates, and benefits structure design.", duration: "2–3 weeks" },
    { step: "04", title: "Talent Acquisition", desc: "Job descriptions, sourcing strategy activation, interview process, offer management, and onboarding coordination for your first 5–20 hires.", duration: "4–8 weeks" },
    { step: "05", title: "IT & Office Setup", desc: "Laptop provisioning, identity management, VPN, cloud access, co-working or office setup, and security policy rollout.", duration: "2–4 weeks" },
    { step: "06", title: "Go-Live & Governance", desc: "First sprint kickoff, KPI dashboard activation, HQ alignment call cadence, and 90-day post-launch review with remediation plan.", duration: "Month 3+" },
  ],
  caseStudies: [
    { tag: "FinTech UK", title: "Bangalore GCC — 45 Engineers in 90 Days", desc: "End-to-end GCC setup for a London FinTech — entity formation, office in Koramangala, and 45 engineers hired and onboarded within 90 days of project start.", results: ["45 engineers hired in 90 days", "60% cost saving vs UK hiring", "SOC 2 compliant from Day 1", "Zero regulatory issues"], image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "SaaS US", title: "Dubai Tech Hub — DIFC Structure", desc: "Established a DIFC-regulated technology hub for a US SaaS company to serve MENA clients — entity setup, licensing, and a 12-person engineering team in 60 days.", results: ["DIFC license obtained", "12-person team in 60 days", "MENA clients onboarded", "Full IP protection structure"], image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "HealthTech EU", title: "Hyderabad GCC — GDPR Compliant", desc: "Set up a GDPR-compliant engineering GCC in Hyderabad for a Dutch HealthTech, including data localisation architecture and DPA agreements with all staff.", results: ["GDPR DPAs in place", "30 engineers onboarded", "Data residency compliant", "50% faster product delivery"], image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
  ],
  techStack: [
    { category: "Legal", items: ["MCA / ACRA / DIFC", "Company Secretarial", "IP Protection", "Employment Law"] },
    { category: "HR Tech", items: ["Darwinbox", "Keka", "Workday", "BambooHR"] },
    { category: "Payroll", items: ["ADP", "Razorpay Payroll", "GreytHR", "Deel"] },
    { category: "Hiring", items: ["LinkedIn Recruiter", "Naukri", "iimjobs", "Greenhouse"] },
    { category: "IT / IAM", items: ["Okta", "Google Workspace", "Jamf", "CrowdStrike"] },
    { category: "Compliance", items: ["GDPR", "SOC 2", "ISO 27001", "RBI/SEBI"] },
    { category: "Governance", items: ["Notion", "Linear", "Confluence", "QBR Templates"] },
    { category: "Workspace", items: ["WeWork", "BHIVE", "IWG", "Custom Office"] },
  ],
  faqs: [
    { q: "India vs UAE vs Singapore — which location is right for us?", a: "India (Bangalore, Hyderabad, Pune) offers the deepest engineering talent pool at the lowest cost. UAE suits MENA-facing businesses needing a regulated hub. Singapore is ideal for APAC expansion with premium talent and English-first culture. We'll run a full location analysis based on your hiring plan and client geography." },
    { q: "How do you protect our IP when hiring offshore?", a: "We implement watertight employment contracts with IP assignment clauses, NDAs, non-solicitation agreements, and data handling policies — reviewed by local IP lawyers. For regulated industries we also advise on data localisation architecture." },
    { q: "Can we start with 3–5 people and scale later?", a: "Absolutely. We recommend starting with a co-working-based setup for your first 5–10 hires, then transitioning to managed/leased office space once you're confident in the location. This minimises upfront commitment." },
    { q: "How long does entity formation take in India?", a: "A Private Limited Company (Pvt Ltd) registration in India typically takes 3–4 weeks from document submission. We manage the entire process — MCA filings, PAN, TAN, GST, professional tax, and PF/ESI registration." },
    { q: "What ongoing support do you provide after go-live?", a: "Monthly compliance reviews, payroll processing support, quarterly HR health checks, annual statutory filings coordination, and on-call advisory for employment issues — all available as a post-launch retainer." },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}

