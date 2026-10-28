"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DarkNavbar from "../../components/DarkNavbar";
import KenBurnsSlider from "../../components/KenBurnsSlider";
import Link from "next/link";

const slides = [
  { title: "AppTron", badge: "MIRSA · Autonomous Agent", desc: "AppTron is your 24/7 autonomous app maintenance agent — it detects regressions, triages issues, and assigns them to the right engineer before users notice.", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1400&auto=format&fit=crop", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "90%", label: "Faster issue triage" }, { value: "Zero", label: "P0 user escapes" }, { value: "24/7", label: "Always watching" }], cta: "Deploy AppTron", ctaHref: "/login" },
  { title: "Autonomous Triage", badge: "AI Responder", desc: "AppTron reads crash reports, correlates them with deploys and PRs, assigns severity, and creates a Jira ticket — all before your on-call engineer picks up their phone.", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1400&auto=format&fit=crop", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "4 min", label: "Avg triage time" }, { value: "Auto-assign", label: "Right engineer" }], cta: "See It Live", ctaHref: "/login" },
  { title: "Proactive Monitoring", badge: "Prevention First", desc: "AppTron doesn't wait for crashes — it monitors build quality, dependency health, ANR rates and store ratings continuously, flagging risks before they become incidents.", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1400&auto=format&fit=crop", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "Proactive", label: "Not reactive" }, { value: "8 signals", label: "Monitored" }], cta: "Start Monitoring", ctaHref: "/login" },
];

const features = [
  { icon: "🤖", title: "Autonomous Issue Triage", desc: "AppTron reads every crash, ANR and performance regression — correlates with recent deploys, classifies severity and creates a ticket with full context in under 4 minutes.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🎯", title: "Smart Engineer Assignment", desc: "Uses git blame, PR history and team ownership maps to route issues to the engineer most likely to fix them — reducing reassignment loops by 80%.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🔮", title: "Predictive Regression Detection", desc: "Analyses build diffs and test coverage gaps to predict which features are likely to regress before the release — so you fix it in the PR, not in production.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "📡", title: "8-Signal Health Monitoring", desc: "Monitors crash rate, ANR rate, store ratings, install velocity, CI pass rate, dependency CVEs, test coverage and performance baselines — all in one feed.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "⚡", title: "Instant Slack & Jira Integration", desc: "Every triage decision appears as a rich Slack message with context and a pre-filled Jira ticket. Engineers click once to accept the assignment.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🧠", title: "Learns Your Codebase", desc: "AppTron improves over time — learning your team's escalation patterns, fix times and preferred resolution paths to get smarter with every incident.", color: "from-[#105DA1] to-[#14b8a6]" },
];

const metrics = [{ value: "90%", label: "Faster triage", icon: "⚡" }, { value: "Zero", label: "P0 user escapes", icon: "🛡️" }, { value: "4 min", label: "Issue assigned", icon: "⏱️" }, { value: "8", label: "Signals monitored", icon: "📡" }];

export default function AppTronPage() {
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-60px" });
  return (
    <div className="min-h-screen bg-[#f7fafa]">
      <DarkNavbar /><div className="mt-16"><KenBurnsSlider slides={slides} /></div>
      <section className="bg-white border-b border-cyan-900/40"><div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">{metrics.map((m, i) => (<motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05, y: -3 }} className="text-center cursor-default"><motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity }} className="text-3xl mb-2">{m.icon}</motion.div><p className="text-3xl font-extrabold text-gray-900">{m.value}</p><p className="text-xs text-gray-500 mt-1">{m.label}</p></motion.div>))}</div></section>
      <section ref={featRef} className="max-w-6xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-14"><span className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#105DA1] to-[#14b8a6] text-white text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">Autonomous Agent</span><h2 className="text-4xl font-extrabold text-gray-900">Your App's 24/7 Guardian</h2><p className="mt-3 text-gray-500 max-w-xl mx-auto">AppTron never sleeps, never misses an issue, never needs onboarding.</p></motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">{features.map((f, i) => (<Link key={f.title} href={"/features/" + f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")} className="block"><motion.div initial={{ opacity: 0, y: 40 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} whileHover={{ y: -8 }} className="group relative bg-white border border-gray-100 rounded-3xl p-7 shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"><motion.div initial={{ scaleX: 0 }} animate={featInView ? { scaleX: 1 } : {}} transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }} style={{ transformOrigin: "left" }} className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${f.color}`} /><div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 bg-gradient-to-br ${f.color}`} /><motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity }} className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-xl mb-5`}>{f.icon}</motion.div><h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-400 transition">{f.title}</h3><p className="mt-2 text-sm text-gray-500 leading-7">{f.desc}</p></motion.div></Link>))}</div>
      </section>
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-6 pb-24"><div className="relative rounded-3xl overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600" /><div className="relative z-10 py-14 px-10 text-center"><h2 className="text-3xl font-extrabold text-white">Deploy AppTron in 10 minutes</h2><p className="mt-3 text-white/80 max-w-lg mx-auto">No SDK. Connect your repo and CI — AppTron does the rest.</p><Link href="/login" className="mt-8 inline-flex items-center gap-2 bg-white text-cyan-400 font-bold px-8 py-4 rounded-full hover:bg-cyan-950/20 transition shadow-lg">Deploy AppTron →</Link></div></div></motion.section>
    </div>
  );
}
