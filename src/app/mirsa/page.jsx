"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DarkNavbar from "../../components/DarkNavbar";

const f = "'Inter',sans-serif";

const mirsaList = [
  {
    id: "performax",
    title: "Performax Engine",
    icon: "⚡",
    subtitle: "Real-time Telemetry & Profiling",
    tagline: "AI-powered performance profiling.",
    desc: "Performax monitors frame-by-frame rendering and system execution across native Compose, SwiftUI, and React Native runtimes, automatically trapping regressions and memory growth offsets.",
    stats: [
      { value: "68%", label: "Startup speedup" },
      { value: "60fps", label: "Render tree" },
      { value: "Zero", label: "OOM incidents" },
      { value: "<16ms", label: "Frame budget" },
    ],
    capabilities: [
      { icon: "🚀", title: "Cold Start Analysis", desc: "Profiles every millisecond of launch paint paths, identifying lazy initialization targets and pre-warming assets." },
      { icon: "📱", title: "Render tree inspection", desc: "Compose and SwiftUI recomposition triggers monitored dynamically to eliminate jank." },
      { icon: "🔋", title: "Battery & Network check", desc: "Highlights redundant polling loops and CPU lock times draining device battery." },
      { icon: "📊", title: "Regression gates", desc: "Automated baseline check on every pull request to ensure performance holds." }
    ],
    techStack: ["Compose Profiler", "SwiftUI Instrument", "Heap Snapshots", "Telemetry Core"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/performax-engine",
  },
  {
    id: "ghost",
    title: "Ghost Bugs",
    icon: "👻",
    subtitle: "Elusive Bug Reproduction",
    tagline: "Track down the bugs that vanish.",
    desc: "Ghost Bugs intercepts production crashes, uncaught exceptions, and detaching modules, compiling timestamped session replays overlaid with network state and CPU metrics.",
    stats: [
      { value: "95%", label: "Debug success" },
      { value: "2 min", label: "Triage speed" },
      { value: "87%", label: "Dev time saved" },
      { value: "100%", label: "Session capture" },
    ],
    capabilities: [
      { icon: "🎥", title: "Session Replay logs", desc: "Captures user scroll journeys, active console logs, and views leading to failure." },
      { icon: "📡", title: "Fault Injection sandbox", desc: "Simulates poor signal paths and server latency to provoke bugs in test environments." },
      { icon: "🤖", title: "ML Crash Clustering", desc: "Deduplicates thousands of crash logs into 12 actionable key issue clusters automatically." },
      { icon: "🛎️", title: "Smart alerting alerts", desc: "Sends custom slack alerts only when crash velocity spikes above limits." }
    ],
    techStack: ["Signal Hooking", "Detox sandbox", "Session Recorder", "ML cluster engine"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/ghost-bugs",
  },
  {
    id: "cost",
    title: "Cloud Cost Optimization",
    icon: "💸",
    subtitle: "FinOps & Rightsizing",
    tagline: "Slash cloud waste. Maintain speed.",
    desc: "Rightsize container instances, locate abandoned storage partitions, automate reserved billing structures, and set policy gates to prevent cloud bill shock.",
    stats: [
      { value: "43%", label: "Average savings" },
      { value: "RI", label: "Automation active" },
      { value: "Zero", label: "SLA regressions" },
      { value: "Live", label: "Anomaly checks" },
    ],
    capabilities: [
      { icon: "🧹", title: "Idle Resource Sweep", desc: "Identifies underutilized nodes, orphaned clusters, and unattached databases instantly." },
      { icon: "📐", title: "Rightsizing Simulator", desc: "Models product workload memory/CPU targets to suggest downsized instances safely." },
      { icon: "🚨", title: "Anomaly detection", desc: "Triggers Slack alerts when database or compute costs show unexpected usage spikes." },
      { icon: "🔐", title: "Governance Policies", desc: "Enforce tagging policies and shutdown schedules for dev and staging resources." }
    ],
    techStack: ["AWS Cost Explorer", "Kubecost", "GCP Billing", "FinOps Scheduler"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/cloud-cost-optimization",
  },
  {
    id: "apptron",
    title: "AppTron Agent",
    icon: "🤖",
    subtitle: "Autonomous Maintenance",
    tagline: "Your always-on AI engineer.",
    desc: "AppTron monitors support pipelines, customer rating comments, and crash dumps 24/7, auto-assigning triage tickets and generating stack fixes.",
    stats: [
      { value: "90%", label: "Faster triage" },
      { value: "Zero", label: "Critical escapes" },
      { value: "24/7", label: "Monitoring watch" },
      { value: "<30s", label: "Incident match" },
    ],
    capabilities: [
      { icon: "🤖", title: "Automated Triage", desc: "Classifies production issues, maps code owners, and links Jira tickets in seconds." },
      { icon: "🏥", title: "Self-Healing Checks", desc: "Triggers rollback scripts if API vitals degrade after build deployments." },
      { icon: "🔇", title: "Alert Suppression", desc: "Filters false alerts to prevent PagerDuty alert fatigue." },
      { icon: "🎫", title: "Context generation", desc: "Provides developers with git references and error locations automatically." }
    ],
    techStack: ["LangChain Agents", "GitHub Integration", "Jira API Connect", "Triage Hooks"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/apptron",
  },
  {
    id: "rca",
    title: "Root Cause Engine",
    icon: "🎯",
    subtitle: "Correlation & Diagnosis",
    tagline: "Explain what broke and why.",
    desc: "Correlates server metrics, deployment version drift, client exception telemetry, and database queries to locate failure origin in minutes.",
    stats: [
      { value: "2 min", label: "Avg RCA time" },
      { value: "8", label: "Telemetry channels" },
      { value: "Zero", label: "Manual searches" },
      { value: "98%", label: "Accuracy score" },
    ],
    capabilities: [
      { icon: "🕒", title: "Time-Series Sync", desc: "Aligns error spikes with deploy timestamps and environment changes instantly." },
      { icon: "🔍", title: "Query Audit loops", desc: "Pinpoints locks, transaction timeouts, and slow queries provoking client failures." },
      { icon: "🗺️", title: "Incident Maps", desc: "Generates clear visual flowcharts tracing dependencies affected during outages." },
      { icon: "⚡", title: "Log Correlation", desc: "Matches client-side errors with backend server traces automatically." }
    ],
    techStack: ["OpenTelemetry", "Log Aggregator", "Query Tracer", "RCA Grapher"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/root-cause-engine",
  },
  {
    id: "sentiment",
    title: "Sentiment Analyzer",
    icon: "💬",
    subtitle: "Customer Opinion Mining",
    tagline: "Feedback turned into roadmap targets.",
    desc: "Processes customer tickets, App Store feedback, and social mentions to cluster reviews into distinct feature themes and urgency levels.",
    stats: [
      { value: "40+", label: "Languages" },
      { value: "94%", label: "Inference accuracy" },
      { value: "18ms", label: "NLP latency" },
      { value: "6", label: "Unified channels" },
    ],
    capabilities: [
      { icon: "🗣️", title: "Opinion Mining", desc: "Categorizes reviews into feature categories and tracks positive/negative sentiment." },
      { icon: "🚨", title: "Urgency Weighting", desc: "Flags negative sentiment review spikes on new build releases automatically." },
      { icon: "📂", title: "Roadmap Export", desc: "Groups support tickets into clean backlogs for product design alignment." },
      { icon: "🔄", title: "Keyword Clustering", desc: "Identifies trending bugs using vector density mapping models." }
    ],
    techStack: ["NLP Transformers", "Store Scrapers", "Vector Clustering", "Urgency Weights"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/sentiment-analyzer",
  },
  {
    id: "health",
    title: "App Health Dashboard",
    icon: "📊",
    subtitle: "Unified Command Center",
    tagline: "Executive status at a glance.",
    desc: "Displays product stability scores, daily ratings, release quality, security compliance metrics, and DevOps vitals in one board-ready panel.",
    stats: [
      { value: "10+", label: "Live channels" },
      { value: "A+", label: "Target grade" },
      { value: "Daily", label: "Metric updates" },
      { value: "1", label: "AI Console view" },
    ],
    capabilities: [
      { icon: "📈", title: "Scorecards", desc: "Aggregates complex telemetry into simple, readable health score metrics." },
      { icon: "🚪", title: "Release Gates", desc: "Ensures builds meet core web vitals and crash rate thresholds before promotion." },
      { icon: "📝", title: "Exec Reports", desc: "Generates high-level summaries explaining changes in stability, cost, and design reviews." },
      { icon: "📡", title: "Cross-Engine Feed", desc: "Displays outputs from Performax, Ghost Bugs, and Sentiment Analyzer." }
    ],
    techStack: ["Telemetry UI", "Release Controller", "Health Reporter", "Board Summary"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/app-health-dashboard",
  },
  {
    id: "copilot",
    title: "CoPilot Assistant",
    icon: "💬",
    subtitle: "AI Support Assistant",
    tagline: "Ask plain language diagnostics.",
    desc: "Query application diagnostics, database indices, cloud spend spikes, and release changelogs using natural-language questions.",
    stats: [
      { value: "Sub-1s", label: "Answer times" },
      { value: "99%", label: "Query accuracy" },
      { value: "Live", label: "API queries" },
      { value: "Full", label: "Telemetry sync" },
    ],
    capabilities: [
      { icon: "🗣️", title: "Natural Language", desc: "Query stability trends like 'Why did API latency spike in yesterday's build?'." },
      { icon: "⚙️", title: "Automated Audits", desc: "Trigger commands like 'Produce an executive cost audit report for last week'." },
      { icon: "📂", title: "Vector Index search", desc: "Locate code ownership details and API documentation references." },
      { icon: "🔄", title: "Action Triggers", desc: "Create monitoring filters or trigger alert configurations on demand." }
    ],
    techStack: ["RAG LLM Engine", "Vector Database", "Diagnostics API", "Incident Tracer"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/copilot-assistant",
  },
  {
    id: "audit",
    title: "App Audit Engine",
    icon: "🔍",
    subtitle: "Static & Dynamic Analysis",
    tagline: "Continuous compliance and package health.",
    desc: "Static security manifest audits, dependency health verification, package size budget tracing, and licensing compliance gates.",
    stats: [
      { value: "Continuous", label: "CVE scans" },
      { value: "Active", label: "Size gates" },
      { value: "99.2%", label: "Policy accuracy" },
      { value: "100%", label: "Dependency audits" },
    ],
    capabilities: [
      { icon: "🔍", title: "CVE Scanner", desc: "Detects outdated dependencies containing security risks before code merges." },
      { icon: "📦", title: "Package size check", desc: "Ensures builds stay within cellular download limit budgets on mobile stores." },
      { icon: "📜", title: "Store Compliance", desc: "Verifies privacy manifests, local sandboxing permissions, and SDK limits." },
      { icon: "🛡️", title: "Risk Scoring", desc: "Calculates overall codebase risk metrics across dependencies and licensing." }
    ],
    techStack: ["Static SAST Tool", "Dependency Audit", "Compliance Checker", "License Auditor"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/app-audit-engine",
  },
  {
    id: "pricing",
    title: "MIRSA Pricing",
    icon: "💳",
    subtitle: "Transparent Engagement Tiers",
    tagline: "Flexible models built for all scales.",
    desc: "From small developer teams shipping MVPs to enterprise groups managing millions of active sessions with custom private VPC servers.",
    stats: [
      { value: "$299", label: "Dev Tier base" },
      { value: "$999", label: "Scale Tier base" },
      { value: "SLA", label: "Guarantees included" },
      { value: "VPC", label: "Enterprise options" },
    ],
    capabilities: [
      { icon: "👨‍💻", title: "Developer Tier", desc: "Includes crash telemetry, monthly health baseline summaries, and standard Slack integrations." },
      { icon: "📈", title: "Scale Tier", desc: "Includes session replay logs, cost simulations, 24/7 AppTron watch, and sub-12hr SLA support." },
      { icon: "🏢", title: "Enterprise Tier", desc: "Dedicated single-tenant VPC, private RAG pipelines, custom red-team checks, and 1hr support." },
      { icon: "💳", title: "Transparent Billing", desc: "Dynamic pricing scales with session volume. No hidden APIs or setup surcharges." }
    ],
    techStack: ["SLA Retainers", "Billing APIs", "Private Deployments", "Custom Integrations"],
    color: "from-[#105DA1] to-[#14b8a6]",
    accent: "#14b8a6",
    href: "/mirsa-pricing",
  },
];

export default function MirsaPage() {
  const [activeTab, setActiveTab] = useState(mirsaList[0].id);
  const activeService = mirsaList.find((s) => s.id === activeTab);

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: f }}>
      <DarkNavbar />

      <div className="max-w-[1720px] mx-auto px-6 md:px-12 pt-32 pb-24">
        {/* Header Section */}
        <div className="text-center md:text-left mb-12">
          <span className="inline-block px-3 py-1 rounded-full border border-teal-200 bg-teal-50 text-teal-600 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            MIRSA Platform vertical
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none text-gray-950">
            MIRSA App Intelligence
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-xl">
            Inspect our AI command center diagnostics, pricing plans, and individual performance engines from the navigation vertical.
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
            {mirsaList.map((item) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl border text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal shrink-0 lg:w-full ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} border-transparent text-white shadow-xl shadow-teal-950/20`
                      : "bg-gray-50/60 border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm lg:text-base leading-tight">{item.title}</span>
                    <span className={`text-[10px] uppercase tracking-wider font-semibold mt-0.5 ${isActive ? "text-white/80" : "text-gray-400"}`}>
                      {item.id === "pricing" ? "Pricing Plans" : "MIRSA Module"}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeMirsaGlow"
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
                    Technical Specifications
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 mb-10">
                    {activeService.capabilities.map((cap) => (
                      <div
                        key={cap.title}
                        className="bg-gray-50/60 border border-gray-100 rounded-2xl p-5 hover:bg-gray-100 hover:border-gray-200 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-lg font-bold" style={{ color: activeService.accent }}>{cap.icon}</span>
                          <h4 className="text-sm font-bold text-gray-900">{cap.title}</h4>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{cap.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
                    Key Infrastructure Modules
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
                    className={`px-8 py-3.5 rounded-full bg-gradient-to-r ${activeService.color} text-white text-xs font-black uppercase tracking-wider hover:brightness-110 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-teal-950/10`}
                  >
                    Deploy MIRSA Module
                  </Link>
                  {activeService.id !== "pricing" && (
                    <Link
                      href={activeService.href}
                      className="px-6 py-3.5 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 text-xs font-black uppercase tracking-wider text-gray-650 hover:text-gray-900 transition-all duration-350"
                    >
                      Read Technical Docs & Demos →
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
