"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import DarkNavbar from "../../components/DarkNavbar";
import KenBurnsSlider from "../../components/KenBurnsSlider";
import Link from "next/link";

const slides = [
  { title: "Cloud Cost Optimization", badge: "MIRSA · Cloud FinOps", desc: "Cut your AWS & GCP bill by 30–50% without touching a single feature. Continuous rightsizing, waste elimination and reserved instance intelligence.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "43%", label: "Avg cost reduction" }, { value: "$180K", label: "Saved per client/yr" }, { value: "24h", label: "First savings found" }], cta: "Analyse My Cloud", ctaHref: "/login" },
  { title: "Rightsizing Engine", badge: "Compute Intelligence", desc: "Real CPU and memory utilisation vs provisioned capacity — get precise rightsizing recommendations for every EC2, RDS, and EKS node.", image: "/projects/Leak Detection.jpg", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "60%", label: "Over-provisioned avg" }, { value: "1-click", label: "Apply fix" }], cta: "Get Report", ctaHref: "/login" },
  { title: "Reserved Instance Planner", badge: "Commitment Intelligence", desc: "ML-driven RI and Savings Plan recommendations based on your actual usage patterns — covering EC2, RDS, ElastiCache and more.", image: "/projects/foundry.jpg", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "30%", label: "Extra RI savings" }, { value: "3-yr", label: "Projection modelling" }], cta: "Start Saving", ctaHref: "/login" },
];

const features = [
  { icon: "💰", title: "Waste Finder", desc: "Identifies idle resources — unattached EBS volumes, zombie load balancers, unused Elastic IPs, and orphaned snapshots — with one-click remediation scripts.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "📐", title: "Rightsizing Advisor", desc: "Analyses 30 days of CPU, memory, network and disk utilisation to recommend the exact instance type and size — covering EC2, RDS, ElastiCache and EKS nodes.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🎯", title: "RI & Savings Plans", desc: "ML models predict your future usage patterns and recommend the optimal mix of Reserved Instances and Compute Savings Plans — updated monthly.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🏷️", title: "Tagging Governance", desc: "Enforces your tagging strategy across all resources — untagged resources are quarantined and owners are automatically notified for cost allocation accuracy.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "📊", title: "Unit Economics Dashboard", desc: "Breaks cloud spend down by team, feature, customer tier and environment — giving engineering and finance a shared language for cost decisions.", color: "from-[#105DA1] to-[#14b8a6]" },
  { icon: "🔔", title: "Anomaly Alerts", desc: "Real-time spend anomaly detection fires Slack alerts the moment a cost spike is detected — before it hits your monthly invoice.", color: "from-[#105DA1] to-[#14b8a6]" },
];

const metrics = [{ value: "43%", label: "Avg cost reduction", icon: "💰" }, { value: "$180K", label: "Saved/client/yr", icon: "📊" }, { value: "24h", label: "First savings found", icon: "⚡" }, { value: "Multi", label: "AWS + GCP + Azure", icon: "☁️" }];

export default function CloudCostOptimizationPage() {
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-60px" });
  return (
    <div className="min-h-screen bg-[#f7fafa]">
      <DarkNavbar /><div className="mt-16"><KenBurnsSlider slides={slides} /></div>
      <section className="bg-white border-b border-cyan-900/40"><div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">{metrics.map((m, i) => (<motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.05, y: -3 }} className="text-center cursor-default"><motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity }} className="text-3xl mb-2">{m.icon}</motion.div><p className="text-3xl font-extrabold text-gray-900">{m.value}</p><p className="text-xs text-gray-500 mt-1">{m.label}</p></motion.div>))}</div></section>
      <section ref={featRef} className="max-w-6xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-14"><span className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#105DA1] to-[#14b8a6] text-white text-xs font-bold uppercase tracking-widest mb-3 shadow-sm">FinOps Intelligence</span><h2 className="text-4xl font-extrabold text-gray-900">Every Dollar Accounted For</h2><p className="mt-3 text-gray-500 max-w-xl mx-auto">Continuous cloud cost intelligence — not a one-time audit.</p></motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">{features.map((f, i) => (<Link key={f.title} href={"/features/" + f.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")} className="block"><motion.div initial={{ opacity: 0, y: 40 }} animate={featInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.4 }} whileHover={{ y: -8 }} className="group relative bg-white border border-gray-100 rounded-3xl p-7 shadow-sm cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"><motion.div initial={{ scaleX: 0 }} animate={featInView ? { scaleX: 1 } : {}} transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }} style={{ transformOrigin: "left" }} className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${f.color}`} /><div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 bg-gradient-to-br ${f.color}`} /><motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity }} className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-xl mb-5`}>{f.icon}</motion.div><h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-400 transition">{f.title}</h3><p className="mt-2 text-sm text-gray-500 leading-7">{f.desc}</p></motion.div></Link>))}</div>
      </section>
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto px-6 pb-24"><div className="relative rounded-3xl overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500" /><div className="relative z-10 py-14 px-10 text-center"><h2 className="text-3xl font-extrabold text-white">Find your first $10K in savings today</h2><p className="mt-3 text-white/80 max-w-lg mx-auto">Connect your AWS account in 5 minutes. Read-only access. No agents.</p><Link href="/login" className="mt-8 inline-flex items-center gap-2 bg-white text-cyan-400 font-bold px-8 py-4 rounded-full hover:bg-cyan-950/20 transition shadow-lg">Analyse My Cloud →</Link></div></div></motion.section>
    </div>
  );
}
