"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DarkNavbar from "../../components/DarkNavbar";
import KenBurnsSlider from "../../components/KenBurnsSlider";
import Link from "next/link";

const slides = [
  { title: "Performax Engine", badge: "MIRSA · Performance", desc: "AI-powered performance profiling that eliminates cold starts, memory leaks and jank — before your users notice.", image: "/projects/foundry.jpg", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "68%", label: "Faster cold start" }, { value: "60fps", label: "Smooth UI" }, { value: "3", label: "Leaks fixed avg" }], cta: "Start Free Audit", ctaHref: "/login" },
  { title: "Profile Every Frame", badge: "Deep Inspection", desc: "Frame-by-frame render profiling across iOS and Android — identify dropped frames, over-rendered widgets and layout thrashing.", image: "/projects/Every Frame.jpg", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "<16ms", label: "Target frame time" }, { value: "100%", label: "Frame coverage" }], cta: "See Demo", ctaHref: "/login" },
  { title: "Memory Leak Detection", badge: "Runtime Analysis", desc: "Automated heap snapshots and leak tracing identify retained objects, circular references and unbounded caches in real time.", image: "/projects/Leak Detection.jpg", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "2 min", label: "Leak detected" }, { value: "Zero", label: "OOM crashes" }], cta: "Get Started", ctaHref: "/login" },
];

const features = [
  { icon: "⚡", title: "Cold Start Optimisation", desc: "Performax profiles every millisecond of your app's cold start path — lazy loading suggestions, deferred initialisation and pre-warming strategies cut launch time by up to 68%.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🧠", title: "Heap Snapshot Analysis", desc: "Automated weekly heap snapshots compared against your baseline. Drift alerts fire the moment a new leak is introduced — mapped to the exact class and allocation site.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🎯", title: "Render Tree Profiler", desc: "Full Compose / SwiftUI / React Native render tree inspection. Identifies unnecessary recompositions, expensive list renders and missing memoisation.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "📊", title: "Baseline Benchmarking", desc: "Every build is benchmarked against your performance baseline. PRs that regress startup time or memory by >5% are flagged before merge.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🔋", title: "Battery & Network Drain", desc: "Background work, wakelock abuse and polling loops identified and prioritised by battery impact — critical for fitness and health apps.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "📱", title: "Cross-Device Coverage", desc: "Runs against a real-device cloud spanning 40+ Android + iOS device profiles — low-end to flagship — so you never ship a regression to budget users.", color: "from-[#105DA1] to-[#14b8a6]" },
];

const metrics = [{ value: "68%", label: "Avg cold start reduction", icon: "🚀" }, { value: "3x", label: "Faster debug cycle", icon: "⚡" }, { value: "40+", label: "Device profiles tested", icon: "📱" }, { value: "Zero", label: "OOM crashes post-fix", icon: "💚" }];

export default function PerformaxEnginePage() {
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-60px" });
  return (
    <div className="min-h-screen bg-[#f7fafa]">
      <DarkNavbar />
      <div className="mt-16"><KenBurnsSlider slides={slides} /></div>
      {/* Metrics */}
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
      {/* Features */}
      <section ref={featRef} className="max-w-6xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-14">
          <span className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#105DA1] to-[#14b8a6] text-white text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">
            What It Does
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900">Full-Stack Performance Intelligence</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">Every performance bottleneck, from launch to last scroll.</p>
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
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600" />
          <div className="relative z-10 py-14 px-10 text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to make your app blazing fast?</h2>
            <p className="mt-3 text-white/80 max-w-lg mx-auto">Get your first Performax report in under 3 minutes — no SDK required.</p>
            <Link href="/login" className="mt-8 inline-flex items-center gap-2 bg-white text-cyan-400 font-bold px-8 py-4 rounded-full hover:bg-cyan-950/20 transition shadow-lg">Start Free Audit →</Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
