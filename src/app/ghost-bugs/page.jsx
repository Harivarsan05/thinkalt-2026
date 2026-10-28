"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DarkNavbar from "../../components/DarkNavbar";
import KenBurnsSlider from "../../components/KenBurnsSlider";
import Link from "next/link";

const slides = [
  { title: "Ghost Bugs", badge: "MIRSA · Debugging", desc: "Track down the elusive bugs that vanish when you reproduce them — crashes that show up only in production, on specific devices, or under specific network conditions.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1400&auto=format&fit=crop", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "95%", label: "Ghost bugs caught" }, { value: "2 min", label: "Avg root cause time" }], cta: "Hunt Your Bugs", ctaHref: "/login" },
  { title: "Reproduce the Irreproducible", badge: "Session Replay", desc: "Full session replay with network logs, device state, memory pressure and CPU load — see exactly what the user experienced when the crash happened.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "100%", label: "Session captured" }, { value: "Zero", label: "Blind spots" }], cta: "See Demo", ctaHref: "/login" },
  { title: "AI-Powered Triage", badge: "Smart Grouping", desc: "ML clustering groups similar crashes across builds, versions and devices — reducing 10,000 crash reports to 12 actionable issue clusters.", image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1400&auto=format&fit=crop", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "10K→12", label: "Reports clustered" }, { value: "87%", label: "Triage time saved" }], cta: "Try Ghost Bugs", ctaHref: "/login" },
];

const features = [
  { icon: "👻", title: "Phantom Crash Detection", desc: "Captures crashes that only occur in production via custom signal handlers, uncaught exception traps and native crash reporters for both Android and iOS.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🎬", title: "Session Replay", desc: "Video-like session replay overlaid with device metrics: network calls, battery %, memory pressure, CPU spikes — timestamped to the exact crash moment.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🤖", title: "ML Crash Clustering", desc: "Transformer-based crash deduplication groups symptoms across stack traces, OS versions and device models — turning thousands of reports into a prioritised shortlist.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🔗", title: "Commit Bisection", desc: "Automatically bisects your git history to identify which commit introduced a regression — no manual binary search needed.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "📡", title: "Network Fault Injection", desc: "Simulates flaky networks, timeouts and 5xx errors in a sandboxed environment to reproduce bugs that only appear under poor connectivity.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🛎️", title: "Smart Alerting", desc: "PagerDuty, Slack and Jira integrations — alerts only fire when crash velocity exceeds your defined threshold, not on every single event.", color: "from-[#105DA1] to-[#14b8a6]" },
];

const metrics = [{ value: "95%", label: "Ghost bugs resolved", icon: "👻" }, { value: "87%", label: "Triage time saved", icon: "⏱️" }, { value: "10K→12", label: "Reports clustered", icon: "📊" }, { value: "2 min", label: "Avg root cause", icon: "🎯" }];

export default function GhostBugsPage() {
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-60px" });
  return (
    <div className="min-h-screen bg-[#f7fafa]">
      <DarkNavbar />
      <div className="mt-16"><KenBurnsSlider slides={slides} /></div>
      <section className="bg-white border-b border-cyan-900/40">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05, y: -3 }} className="text-center cursor-default">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity }} className="text-3xl mb-2">{m.icon}</motion.div>
              <p className="text-3xl font-extrabold text-gray-900">{m.value}</p>
              <p className="text-xs text-gray-500 mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section ref={featRef} className="max-w-6xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-14">
          <span className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#105DA1] to-[#14b8a6] text-white text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">How It Works</span>
          <h2 className="text-4xl font-extrabold text-gray-900">Stop Chasing. Start Catching.</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">Ghost Bugs brings every elusive crash into the open.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {features.map((f, i) => (
            <Link key={f.title} href={"/features/" + f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")} className="block"><motion.div initial={{ opacity: 0, y: 40 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} whileHover={{ y: -8 }} className="group relative bg-white border border-gray-100 rounded-3xl p-7 shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
              <motion.div initial={{ scaleX: 0 }} animate={featInView ? { scaleX: 1 } : {}} transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }} style={{ transformOrigin: "left" }} className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${f.color}`} />
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 bg-gradient-to-br ${f.color}`} />
              <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity }} className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-xl mb-5`}>{f.icon}</motion.div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-400 transition">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-7">{f.desc}</p>
            </motion.div></Link>
          ))}
        </div>
      </section>
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-500" />
          <div className="relative z-10 py-14 px-10 text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to hunt every ghost bug?</h2>
            <p className="mt-3 text-white/80 max-w-lg mx-auto">Connect your app in 5 minutes. No SDK. Just results.</p>
            <Link href="/login" className="mt-8 inline-flex items-center gap-2 bg-white text-cyan-400 font-bold px-8 py-4 rounded-full hover:bg-cyan-950/20 transition shadow-lg">Hunt Bugs Free →</Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
