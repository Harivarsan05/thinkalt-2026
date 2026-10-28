"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import DarkNavbar from "../../components/DarkNavbar";

/* ─── DATA ─────────────────────────────────────────── */

const plans = [
  {
    name: "Starter",
    tagline: "For early-stage startups",
    price: { monthly: "$1,499", annual: "$1,199" },
    color: "from-[#105DA1] to-[#00D4FF]",
    border: "border-teal-200",
    glow: "shadow-teal-200",
    badge: null,
    features: [
      "1 dedicated engineer",
      "Up to 2 active projects",
      "React / Next.js / Node.js",
      "Weekly sprint reviews",
      "Slack & email support",
      "Basic CI/CD setup",
      "Monthly health report",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    tagline: "For scaling product teams",
    price: { monthly: "$3,999", annual: "$3,199" },
    color: "from-[#105DA1] to-[#00D4FF]",
    border: "border-blue-300",
    glow: "shadow-blue-200",
    badge: "Most Popular",
    features: [
      "3 dedicated engineers",
      "Unlimited projects",
      "Full-stack + Mobile (RN/Flutter)",
      "AWS Cloud management",
      "Daily standups",
      "Figma UI/UX design",
      "Full CI/CD + Kubernetes",
      "MIRSA app monitoring",
      "Bi-weekly CTO sessions",
    ],
    cta: "Start Growing",
  },
  {
    name: "Enterprise",
    tagline: "For funded companies at scale",
    price: { monthly: "Custom", annual: "Custom" },
    color: "from-[#105DA1] to-[#00D4FF]",
    border: "border-orange-200",
    glow: "shadow-orange-200",
    badge: "White Glove",
    features: [
      "Dedicated squad (5–15 engineers)",
      "Fractional CTO embedded",
      "AI/ML integrations",
      "Multi-cloud (AWS + GCP + Azure)",
      "24/7 on-call support",
      "GCC setup support",
      "QA Automation team",
      "Full MIRSA platform access",
      "SLA-backed uptime guarantee",
      "Quarterly board-level reporting",
    ],
    cta: "Talk to Us",
  },
];

const engagements = [
  {
    title: "Time & Material",
    icon: "⏱️",
    color: "from-[#105DA1] to-[#00D4FF]",
    desc: "Pay only for hours worked. Best for exploratory projects, MVPs, and R&D spikes where scope evolves rapidly.",
    points: ["Hourly billing", "Flexible scope", "Weekly timesheets", "Ideal for MVPs"],
  },
  {
    title: "Fixed Price",
    icon: "🎯",
    color: "from-[#105DA1] to-[#00D4FF]",
    desc: "Defined deliverables, fixed budget, predictable timeline. Best for well-scoped products with clear requirements.",
    points: ["Scope locked upfront", "Milestone payments", "Risk-free delivery", "Ideal for v1 products"],
  },
  {
    title: "Dedicated Team",
    icon: "👥",
    color: "from-[#105DA1] to-[#00D4FF]",
    desc: "Your team, our engineers. A fully embedded squad that operates as your in-house dev team at a fraction of the cost.",
    points: ["Full-time engineers", "Your processes", "Scales up/down", "Long-term engagements"],
  },
  {
    title: "Fractional CTO",
    icon: "🧠",
    color: "from-[#105DA1] to-[#00D4FF]",
    desc: "Senior tech leadership without full-time cost. We define architecture, hire your team, and own the roadmap.",
    points: ["10–20 hrs/week", "Architecture ownership", "Hiring support", "Investor-ready tech"],
  },
  {
    title: "On-Demand Audit",
    icon: "🔍",
    color: "from-[#105DA1] to-[#00D4FF]",
    desc: "One-time deep-dive into your codebase, cloud infra, or mobile app — with a prioritised action plan.",
    points: ["Code quality audit", "Security review", "Cloud cost audit", "Delivered in 5 days"],
  },
  {
    title: "Retainer Support",
    icon: "🛡️",
    color: "from-[#105DA1] to-[#00D4FF]",
    desc: "Monthly block of hours for ongoing maintenance, bug fixes, dependency updates, and feature iterations.",
    points: ["20–80 hrs/month", "Priority queue", "Rollover hours", "Ideal for post-launch"],
  },
];

const addons = [
  { name: "MIRSA Platform Access", price: "$299/mo", icon: "📊" },
  { name: "Extra Engineer", price: "$1,200/mo", icon: "👨‍💻" },
  { name: "App Store Optimisation", price: "$499/mo", icon: "📈" },
  { name: "Pen Testing & Security Audit", price: "$1,800 one-time", icon: "🔐" },
  { name: "Dedicated QA Engineer", price: "$900/mo", icon: "🧪" },
  { name: "UI/UX Design Sprint", price: "$2,500 one-time", icon: "🎨" },
];

const faqs = [
  { q: "Can I upgrade or downgrade my plan?", a: "Yes — plans are month-to-month with no lock-in. Upgrades are instant, downgrades take effect next billing cycle." },
  { q: "What timezone do your engineers work in?", a: "Primarily IST (India) with 4-hour overlap with UK and 2-hour overlap with US East Coast. Enterprise clients get flexible timezone coverage." },
  { q: "Do you work with funded startups only?", a: "No — we work with bootstrapped founders, Series A–C companies, and large enterprises. We adapt our engagement model to your stage." },
  { q: "How quickly can you start?", a: "We can onboard in as little as 48 hours for Starter plans. Dedicated teams are assembled within 5–7 business days." },
  { q: "Is there a free trial or discovery call?", a: "We offer a complimentary 30-minute architecture review and scoping call before any engagement begins." },
  { q: "What if I'm not happy with the work?", a: "We offer a 2-week satisfaction guarantee on all plans. If you're not happy, we refund the first two weeks, no questions asked." },
];

/* ─── FLIP CARD ─────────────────────────────────────── */
function FlipCard({ item, i, inView }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.45, ease: "easeOut" }}
      className="relative h-64 cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-3xl border border-gray-100 bg-white shadow-md p-7 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}>
          <div>
            <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4`}>
              {item.icon}
            </motion.div>
            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-6">{item.desc}</p>
          </div>
          <p className="text-xs text-teal-600 font-semibold">Hover to see details →</p>
        </div>

        {/* Back */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} p-7 flex flex-col justify-between`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div>
            <p className="text-white font-bold text-lg mb-4">{item.title}</p>
            <ul className="space-y-2">
              {item.points.map((p, j) => (
                <motion.li key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: j * 0.07 }}
                  className="flex items-center gap-2 text-white text-sm">
                  <span className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center text-[10px]">✓</span>
                  {p}
                </motion.li>
              ))}
            </ul>
          </div>
          <Link href="/login" className="mt-4 inline-block text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition text-center">
            Get a Quote →
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PricingCard({ plan, i, inView, billing }) {
  const handleMouseEnter = (e) => {
    e.currentTarget._cachedRect = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    let rect = card._cachedRect;
    if (!rect) {
      rect = card.getBoundingClientRect();
      card._cachedRect = rect;
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiltX = x - rect.width / 2;
    const tiltY = y - rect.height / 2;
    const factorX = tiltX / (rect.width / 2);
    const factorY = tiltY / (rect.height / 2);
    
    card.style.transform = `perspective(1000px) rotateY(${factorX * 7}deg) rotateX(${-factorY * 7}deg) translateY(-12px) scale(1.035)`;
    card.style.transition = "transform 0.1s ease-out, box-shadow 0.4s, border-color 0.4s";
    
    // Glowing border and shadow accents based on plan
    if (plan.name === "Starter") {
      card.style.borderColor = "#0d9488";
      card.style.boxShadow = "0 30px 65px rgba(13, 148, 136, 0.15)";
    } else if (plan.name === "Growth") {
      card.style.borderColor = "#105DA1";
      card.style.boxShadow = "0 30px 65px rgba(16, 93, 161, 0.15)";
    } else {
      card.style.borderColor = "#f97316";
      card.style.boxShadow = "0 30px 65px rgba(249, 115, 22, 0.15)";
    }
  };

  const handleMouseLeave = (e) => {
    delete e.currentTarget._cachedRect;
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)";
    card.style.borderColor = "";
    card.style.boxShadow = "";
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, border-color 0.4s";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: i * 0.12, duration: 0.45, ease: "easeOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border-2 ${plan.border} bg-white shadow-xl ${plan.glow} p-8 flex flex-col cursor-default`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {plan.badge && (
        <motion.span animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r ${plan.color} text-white text-xs font-bold px-4 py-1 rounded-full shadow`}>
          {plan.badge}
        </motion.span>
      )}

      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center text-white font-extrabold text-lg mb-5`}>
        {plan.name[0]}
      </div>

      <p className={`text-xs font-bold uppercase tracking-widest bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>{plan.name}</p>
      <p className="text-gray-400 text-sm mt-1 mb-5">{plan.tagline}</p>

      <div className="mb-6">
        <span className="text-4xl font-extrabold text-gray-900">
          {billing === "annual" ? plan.price.annual : plan.price.monthly}
        </span>
        {plan.price.monthly !== "Custom" && <span className="text-gray-400 text-sm ml-1">/month</span>}
        {billing === "annual" && plan.price.monthly !== "Custom" && (
          <p className="text-teal-600 text-xs font-semibold mt-1">Save 20% with annual billing</p>
        )}
      </div>

      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map((f, j) => (
          <motion.li key={j} initial={{ opacity: 0, x: -8 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1 + j * 0.04 }}
            className="flex items-start gap-2 text-sm text-gray-600">
            <span className={`mt-0.5 w-4 h-4 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center text-white text-[9px] shrink-0`}>✓</span>
            {f}
          </motion.li>
        ))}
      </ul>

      <Link href="/login"
        className={`block text-center py-3.5 rounded-2xl bg-gradient-to-r ${plan.color} text-white font-bold text-sm hover:opacity-90 transition`}>
        {plan.cta}
      </Link>
    </motion.div>
  );
}

/* ─── PAGE ───────────────────────────────────────────── */
export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);
  const plansRef = useRef(null);
  const engRef = useRef(null);
  const addonsRef = useRef(null);
  const faqRef = useRef(null);
  const plansInView = useInView(plansRef, { once: true, margin: "-60px" });
  const engInView = useInView(engRef, { once: true, margin: "-60px" });
  const addonsInView = useInView(addonsRef, { once: true, margin: "-60px" });
  const faqInView = useInView(faqRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-[#f7fafa]">
      <DarkNavbar />

      {/* Hero Banner */}
      <div className="relative h-56 overflow-hidden mt-16">
        <motion.div animate={{ scale: [1, 1.08, 1], x: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #105DA1 0%, #1a73e8 50%, #14b8a6 100%)" }} />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
        {/* floating glass bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div key={i}
            animate={{
              y: [0, -35, 0],
              x: [0, -15, 0],
              scale: [1, 1.05, 1],
              opacity: [0.45, 0.85, 0.45]
            }}
            transition={{ duration: 15 + i * 3.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            className="absolute rounded-full bg-gradient-to-tr from-[#105DA1]/42 to-[#14b8a6]/42 border border-white/45 backdrop-blur-[2px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),_0_8px_20px_rgba(16,93,161,0.3)] pointer-events-none"
            style={{
              width: 70 + i * 14,
              height: 70 + i * 14,
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 3) * 22}%`
            }}
          />
        ))}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">Transparent. Flexible. Founder-Friendly.</p>
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#ffffff" }}>Pricing & Engagement</h1>
          <p className="mt-3 text-white/80 text-sm max-w-xl">
            No hidden fees. No lock-ins. Pick the model that fits how you build.
          </p>
        </motion.div>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mt-12 mb-2">
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full p-1 shadow-sm">
          {["monthly", "annual"].map((b) => (
            <button key={b} onClick={() => setBilling(b)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${billing === b ? "bg-gray-900 text-white" : "text-gray-500 hover:text-gray-800"}`}>
              {b === "monthly" ? "Monthly" : "Annual  (Save 20%)"}
            </button>
          ))}
        </div>
      </div>

      {/* ── PLANS ── */}
      <section ref={plansRef} className="max-w-6xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={plansInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-700 text-xs font-semibold uppercase tracking-widest mb-3">Plans</span>
          <h2 className="text-4xl font-extrabold text-gray-900">Simple, Honest Pricing</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">Scale your team up or down. Cancel any time.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} i={i} inView={plansInView} billing={billing} />
          ))}
        </div>
      </section>

      {/* ── ENGAGEMENT MODELS ── */}
      <section ref={engRef} className="max-w-6xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={engInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-widest mb-3">How We Work</span>
          <h2 className="text-4xl font-extrabold text-gray-900">Engagement Models</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">Every team is different. We fit into how you work — hover each card to explore.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {engagements.map((item, i) => (
            <FlipCard key={item.title} item={item} i={i} inView={engInView} />
          ))}
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Plan Comparison</h2>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="rounded-3xl border border-gray-100 bg-white shadow-md overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-6 py-4 text-gray-500 font-semibold w-1/2">Feature</th>
                {plans.map((p) => (
                  <th key={p.name} className="px-4 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold bg-gradient-to-r ${p.color}`}>{p.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Dedicated Engineers", "1", "3", "5–15"],
                ["Active Projects", "2", "Unlimited", "Unlimited"],
                ["CI/CD Pipeline", "Basic", "Full", "Advanced"],
                ["AWS Cloud Mgmt", "—", "✓", "Multi-cloud"],
                ["MIRSA Monitoring", "—", "✓", "✓ Full"],
                ["UI/UX Design", "—", "✓", "✓"],
                ["Fractional CTO", "—", "Bi-weekly", "Embedded"],
                ["SLA Guarantee", "99%", "99.5%", "99.99%"],
                ["Support", "Email", "Slack + Email", "24/7 On-call"],
              ].map(([feature, ...vals], i) => (
                <motion.tr key={feature} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}>
                  <td className="px-6 py-3.5 text-gray-700 font-medium">{feature}</td>
                  {vals.map((v, j) => (
                    <td key={j} className="px-4 py-3.5 text-center text-gray-500">
                      {v === "—" ? <span className="text-gray-300">—</span> : v === "✓" ? <span className="text-teal-500 font-bold">✓</span> : v}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* ── ADD-ONS ── */}
      <section ref={addonsRef} className="max-w-5xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={addonsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-semibold uppercase tracking-widest mb-3">Add-Ons</span>
          <h2 className="text-3xl font-extrabold text-gray-900">Supercharge Your Plan</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {addons.map((a, i) => (
            <motion.div key={a.name}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={addonsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              whileHover={{ scale: 1.04, y: -4, boxShadow: "0 12px 40px rgba(20,184,166,0.15)" }}
              className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl px-5 py-4 cursor-default shadow-sm">
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3 + i * 0.3, repeat: Infinity }}
                className="text-2xl shrink-0">{a.icon}</motion.span>
              <div>
                <p className="text-sm font-bold text-gray-900">{a.name}</p>
                <p className="text-teal-600 text-sm font-semibold">{a.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} className="max-w-3xl mx-auto px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={faqInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
        </motion.div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={faqInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left">
                <span className="font-semibold text-gray-900 text-sm">{f.q}</span>
                <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}
                  className="text-teal-500 shrink-0 ml-4">▼</motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    className="px-6 pb-5 text-sm text-gray-500 leading-7 border-t border-gray-50">
                    <p className="pt-4">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#105DA1] to-[#00D4FF]" />
          <motion.div animate={{ x: [0, 40, 0], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 6, repeat: Infinity }}
            className="absolute right-0 top-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10 py-14 px-10 text-center">
            <h2 className="text-3xl font-extrabold text-white">Not sure which plan fits?</h2>
            <p className="mt-3 text-white/80 max-w-lg mx-auto">Book a free 30-minute discovery call with our team. We'll scope your project and recommend the right engagement model.</p>
            <Link href="/login"
              className="mt-8 inline-flex items-center gap-2 bg-white text-[#105DA1] font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition shadow-lg">
              Book Free Discovery Call →
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
