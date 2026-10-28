"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import DarkNavbar from "../../../components/DarkNavbar";

const f = "'Inter',sans-serif";

const monitorData = {
  nodes: {
    title: "Live Node Monitor",
    heading: "Global Compute Nodes & CPU Load Allocation",
    desc: "Real-time thread orchestration and capacity analytics across active MIRSA deployment clusters.",
    image: "/images/monitor-nodes.png",
    accent: "#38bdf8",
    color: "from-blue-600 to-sky-400",
    stats: [
      { name: "US-West Master Node", value: "42%", detail: "Active workload, auto-scaling operational", shape: "rounded-[36px_8px_36px_8px]" },
      { name: "EU-Central Replica Node", value: "28%", detail: "Steady state, query cache replication active", shape: "rounded-[8px_36px_8px_36px]" },
      { name: "AP-South Edge Node", value: "18%", detail: "Routing client requests, low latency load", shape: "rounded-[24px_24px_8px_24px]" },
      { name: "Standby/Spare Nodes", value: "12%", detail: "Cold pooling standby, ready for scaling event", shape: "rounded-[24px_8px_24px_8px]" }
    ]
  },
  traffic: {
    title: "Traffic Metrics",
    heading: "Real-Time Traffic Network Workload",
    desc: "Ingress bandwidth distribution and request classification of live API traffic.",
    image: "/images/monitor-traffic.png",
    accent: "#10b981",
    color: "from-emerald-600 to-teal-400",
    stats: [
      { name: "Public API Requests", value: "52%", detail: "Secure ingress endpoints, JSON validation active", shape: "rounded-[40px_10px_40px_10px]" },
      { name: "Client Web Telemetry", value: "24%", detail: "Next-gen clickstream analytics logs streaming", shape: "rounded-[10px_40px_10px_40px]" },
      { name: "Third-Party Webhooks", value: "14%", detail: "Payment and event notifications webhook threads", shape: "rounded-[32px_32px_10px_32px]" },
      { name: "Diagnostic Heartbeats", value: "10%", detail: "Uptime checking network pings", shape: "rounded-[32px_10px_32px_10px]" }
    ]
  },
  deployments: {
    title: "Deployment Logs",
    heading: "Rolling Cluster Deployment Status & Log Analytics",
    desc: "System health classification from automated CI/CD canary rollouts.",
    image: "/images/monitor-deployments.png",
    accent: "#ec4899",
    color: "from-pink-600 to-rose-400",
    stats: [
      { name: "Successful Deployments", value: "92.4%", detail: "Zero-downtime rolling node promotions", shape: "rounded-[48px_12px_48px_12px]" },
      { name: "Configuration Warnings", value: "5.2%", detail: "Dependency deprecation warnings ignored", shape: "rounded-[12px_48px_12px_48px]" },
      { name: "Diagnostic Errors", value: "1.8%", detail: "Automatically caught and self-healed node rollbacks", shape: "rounded-[28px_28px_12px_28px]" },
      { name: "Handled Exceptions", value: "0.6%", detail: "Safe runtime exceptions logged to diagnostic heap", shape: "rounded-[28px_12px_28px_12px]" }
    ]
  },
  "api-performance": {
    title: "API Response Times",
    heading: "API Gateway Latency Distribution",
    desc: "Response time profiling and rate metrics across high-throughput endpoints.",
    image: "/images/monitor-api.png",
    accent: "#a855f7",
    color: "from-purple-600 to-indigo-400",
    stats: [
      { name: "Fast Responses (<20ms)", value: "68%", detail: "Cached DB operations and static assets", shape: "rounded-[44px_10px_44px_10px]" },
      { name: "Normal Responses (20-100ms)", value: "22%", detail: "Write operations and transaction logic", shape: "rounded-[10px_44px_10px_44px]" },
      { name: "Slow Responses (100-250ms)", value: "8%", detail: "Complex report queries and payment integrations", shape: "rounded-[26px_26px_10px_26px]" },
      { name: "Network Timeout Exceptions", value: "2%", detail: "Safe failsafe rate-limiting blockades", shape: "rounded-[26px_10px_26px_10px]" }
    ]
  }
};

export default function MonitorPage() {
  const params = useParams();
  const router = useRouter();
  const rawTopic = params.topic || "nodes";
  const topic = monitorData[rawTopic] ? rawTopic : "nodes";
  const activeData = monitorData[topic];

  return (
    <div className="min-h-screen bg-[#070a13] text-gray-150 overflow-hidden relative" style={{ fontFamily: f }}>
      <DarkNavbar />

      {/* Cyber Grid Background */}
      <div className="cyber-grid-3d absolute inset-0 opacity-20 pointer-events-none z-0" />

      {/* Brand Ambient Lights */}
      <div
        className="pointer-events-none absolute right-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[150px]"
        style={{ willChange: "transform" }}
      />
      <div
        className="pointer-events-none absolute left-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[140px]"
        style={{ willChange: "transform" }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-24 relative z-10">
        
        {/* Navigation back and header tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition mb-2">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
              MIRSA Diagnostics
            </h1>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex flex-wrap gap-2.5 bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
            {Object.entries(monitorData).map(([key, data]) => {
              const isActive = key === topic;
              return (
                <button
                  key={key}
                  onClick={() => router.push(`/monitor/${key}`)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-white/10 text-white border border-white/15 shadow-md"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {data.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left info panel and illustration */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-teal-400">
              {activeData.title}
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight">
              {activeData.heading}
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {activeData.desc}
            </p>

            {/* Glowing Illustration Wrapper */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-950/60 shadow-2xl flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-[#070a13] to-transparent z-10 opacity-70" />
              <Image
                src={activeData.image}
                alt={activeData.title}
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 768px) 100vw, 500px"
                priority
              />
              <div className="absolute inset-0 bg-teal-400/5 mix-blend-color-dodge z-20 pointer-events-none" />
            </div>
          </div>

          {/* Right percentage breakdown cards with distinct geometric shapes */}
          <div className="lg:col-span-7">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
              Percentage Resource Allocation Breakdown
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeData.stats.map((item, idx) => (
                <div
                  key={item.name}
                  className={`p-6 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 relative overflow-hidden group shadow-lg ${item.shape}`}
                >
                  {/* Subtle hover gradient glow */}
                  <div className={`absolute -right-16 -bottom-16 w-36 h-36 rounded-full blur-[30px] opacity-10 group-hover:opacity-30 transition-all duration-500 bg-gradient-to-br ${activeData.color}`} />
                  
                  {/* Card Title & Icon */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <span className="text-xs font-bold text-gray-400 leading-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-bold font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      SYS-{idx+1}
                    </span>
                  </div>

                  {/* Percentage Counter */}
                  <div className="text-5xl font-black text-white tracking-tight mb-2 flex items-baseline gap-1">
                    {item.value}
                  </div>

                  {/* Custom progress loading bar */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-4 border border-white/5">
                    <div
                      className={`h-full bg-gradient-to-r ${activeData.color}`}
                      style={{ width: item.value }}
                    />
                  </div>

                  {/* Details text */}
                  <p className="text-xs text-gray-400 leading-relaxed font-semibold">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Total Load Panel */}
            <div className="mt-8 p-6 rounded-2xl border border-teal-500/20 bg-teal-950/10 backdrop-blur-md flex items-center justify-between gap-6">
              <div>
                <p className="text-[10px] font-black uppercase text-teal-400 tracking-wider mb-1">
                  Overall System Health Status
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Resource scheduling validation matches optimal performance profiles. Active thread pools executing without lock bottlenecks.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">AGGREGATE LOAD</span>
                <span className="text-2xl font-black text-teal-400">100% OK</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
