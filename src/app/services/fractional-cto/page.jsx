"use client";
import ServicePage from "../../../components/ServicePage";

const data = {
  id: "cto",
  title: "CTO+ Fractional\nCTO Services",
  subtitle: "Strategy · Architecture · People · Roadmap",
  tagline: "Senior technical leadership, on demand.",
  heroDesc: "Get a battle-tested CTO without the full-time cost. We own your technical vision, architecture decisions, engineering hiring, and board-level communication — from day one.",
  heroImage: "/projects/skyline.jpg",
  color: "from-[#4682B4] to-[#00CED1]",
  colorRGB: "0,206,209",
  accent: "#00CED1",
  lightAccent: "#48D1CC",
  ctaHeading: "Let's lead your engineering.",
  ctaDesc: "Book a free 45-minute technical leadership call. We'll diagnose your current engineering challenges and show you exactly how a Fractional CTO engagement would look.",
  stats: [
    { value: "25+", label: "Startups Scaled", sub: "Seed to Series C" },
    { value: "< 7 days", label: "Onboarding Time", sub: "Operational immediately" },
    { value: "3×", label: "Team Velocity", sub: "Avg improvement" },
    { value: "Seed–C", label: "Funding Stages", sub: "Full lifecycle coverage" },
    { value: "$200M+", label: "Funding Raised", sub: "By our CTO+ clients" },
    { value: "4.9★", label: "Client Rating", sub: "Avg engagement score" },
  ],
  capabilities: [
    { icon: "🗺️", title: "Technology Roadmap", desc: "12-month technology roadmap aligned to your business OKRs — prioritised by impact, feasibility, and technical risk. Board-ready slides included.", tags: ["OKRs", "Roadmapping", "Prioritisation"] },
    { icon: "🏛️", title: "Architecture Review", desc: "Full system architecture assessment covering scalability, security, performance, and tech debt — with a scored improvement backlog and remediation timeline.", tags: ["System Design", "ADRs", "Tech Debt Scoring"] },
    { icon: "👥", title: "Engineering Hiring", desc: "Job spec creation, sourcing strategy, interview process design, technical assessment design, and offer calibration — we hire engineers that last.", tags: ["Hiring", "Interview Design", "Team Structure"] },
    { icon: "📋", title: "Delivery Governance", desc: "Sprint cadence, definition of done, estimation practices, delivery metrics (DORA), and engineering health dashboards that give you full visibility.", tags: ["DORA Metrics", "Agile", "Sprint Governance"] },
    { icon: "🤝", title: "Investor Relations", desc: "Technical due diligence support for fundraising, board-level technical presentations, R&D narrative for pitch decks, and IP strategy guidance.", tags: ["Due Diligence", "Pitch Support", "IP Strategy"] },
    { icon: "📐", title: "Engineering Culture", desc: "Coding standards, security policies, incident management processes, on-call rotations, and a culture of psychological safety and continuous improvement.", tags: ["Eng Culture", "Security Policy", "Incident Mgmt"] },
    { icon: "🔗", title: "Vendor & Partnership", desc: "Technology vendor evaluation, contract negotiation, API partnership strategy, and build-vs-buy decision frameworks tailored to your growth stage.", tags: ["Vendor Mgmt", "Build vs Buy", "Contracts"] },
    { icon: "📈", title: "Technical M&A Support", desc: "Acquisition target technical due diligence, integration architecture planning, and post-merger engineering team consolidation strategies.", tags: ["M&A Due Diligence", "Integration Planning"] },
  ],
  process: [
    { step: "01", title: "Tech Audit", desc: "Week-1 deep-dive into your codebase, infrastructure, team structure, delivery velocity, and security posture — producing a scored findings report.", duration: "Week 1" },
    { step: "02", title: "Roadmap Design", desc: "Co-creating the 12-month technology roadmap with your leadership team — balancing business priorities against technical foundations.", duration: "Week 2" },
    { step: "03", title: "Team Assessment", desc: "1:1s with every engineer to understand strengths, gaps, and morale — followed by a team structure recommendation and skills matrix.", duration: "Week 2–3" },
    { step: "04", title: "Process Setup", desc: "Implementing sprint governance, definition of done, DORA metrics dashboards, and incident management processes that stick.", duration: "Week 3–4" },
    { step: "05", title: "Hiring Sprints", desc: "Running structured hiring processes to fill critical gaps — from job spec to offer letter, typically closing senior hires in 3–4 weeks.", duration: "Month 2+" },
    { step: "06", title: "Ongoing Advisory", desc: "Weekly leadership syncs, architecture review sessions, board meeting prep, and on-call availability for urgent technical decisions.", duration: "Ongoing" },
  ],
  caseStudies: [
    { tag: "Series A", title: "FinTech — $18M Raise Enabled", desc: "Joined as Fractional CTO 6 months before Series A. Rebuilt the architecture narrative, completed security hardening, and coached the team through investor technical due diligence.", results: ["$18M Series A closed", "Architecture DDQ passed", "Engineering team 2× scaled", "DORA elite tier achieved"], image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "Seed Stage", title: "EdTech — 0 to 50-Engineer Team", desc: "Built the entire engineering organisation from scratch — hiring plan, interview process, onboarding playbook, and tech stack decisions that scaled to 50 engineers.", results: ["50 engineers hired in 14 months", "Engineering handbook created", "3× sprint velocity increase", "Zero senior attrition"], image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "Post-Merger", title: "SaaS — Tech Merger Integration", desc: "Led the technical integration of two acquired SaaS products — unified data model, merged engineering teams, and single-platform migration in 6 months.", results: ["2 products unified in 6 months", "40% infra cost saving", "Zero customer data loss", "Engineering morale maintained"], image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
  ],
  techStack: [
    { category: "Strategy", items: ["OKRs", "Roadmapping", "RICE Scoring", "MoSCoW"] },
    { category: "Architecture", items: ["System Design", "ADRs", "Event Sourcing", "CQRS"] },
    { category: "Engineering Ops", items: ["DORA Metrics", "Linear", "Jira", "Notion"] },
    { category: "Hiring", items: ["Lever", "Greenhouse", "Technical Screening", "Structured Interviews"] },
    { category: "Security", items: ["SOC 2", "ISO 27001", "Pen Testing", "GDPR"] },
    { category: "Due Diligence", items: ["Tech DDQ", "Architecture Review", "IP Audit", "Team Assessment"] },
    { category: "Culture", items: ["Eng Handbook", "Blameless Post-mortems", "1:1 Frameworks"] },
    { category: "Comms", items: ["Board Decks", "Investor Updates", "Tech Narrative", "R&D Reporting"] },
  ],
  faqs: [
    { q: "How many hours per week does a Fractional CTO engagement involve?", a: "Typically 2–3 days per week for an active engagement — covering team leadership, architecture decisions, hiring, and board prep. We also offer lighter advisory retainers (1 day/week) for later-stage companies with strong engineering leads." },
    { q: "At what stage do companies typically engage a Fractional CTO?", a: "Most commonly post-Seed when the founding team needs senior technical leadership but isn't yet ready for a $300K+ full-time CTO hire. Also common post-Series A to prepare for rapid team scaling." },
    { q: "How do you work alongside an existing VP Engineering or Tech Lead?", a: "We position as a strategic partner and mentor, not a replacement. We take on the board/investor-facing and architecture strategy work, freeing your internal lead to focus on execution and team management." },
    { q: "How quickly can you start?", a: "We can start within 5–7 days of contract signing. Day 1 begins with stakeholder interviews and codebase access. By end of Week 1 you have a full findings report and immediate priority list." },
    { q: "Do you take equity?", a: "Engagements are primarily retainer-based (monthly). For early-stage companies, we're open to discussing a small equity component alongside a reduced cash retainer — evaluated case by case." },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}

