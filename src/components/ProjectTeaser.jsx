"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const f = "'Inter',sans-serif";

export default function ProjectTeaser() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [logs, setLogs] = useState([]);
  let rect = null;

  const handleMouseEnter = (e) => {
    rect = e.currentTarget.getBoundingClientRect();
    setIsHovered(true);
  };

  const handleMouseMove = (e) => {
    let box = rect;
    if (!box) {
      box = e.currentTarget.getBoundingClientRect();
      rect = box;
    }
    const x = (e.clientX - box.left) / box.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - box.top) / box.height - 0.5; // -0.5 to 0.5
    if (cardRef.current) {
      cardRef.current.style.setProperty('--rx', `${y * -14}deg`);
      cardRef.current.style.setProperty('--ry', `${x * 14}deg`);
    }
  };

  const handleMouseLeave = () => {
    rect = null;
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.setProperty('--rx', '0deg');
      cardRef.current.style.setProperty('--ry', '0deg');
    }
  };

  // Simulated log output
  useEffect(() => {
    if (!inView) return;
    const initialLogs = [
      "⚡ Connecting to live server cluster...",
      "🔍 Running diagnostic checks on primary nodes...",
      "🟢 All 12 cluster servers stable and responsive.",
    ];
    setLogs(initialLogs);

    const extraLogs = [
      "📡 Live server data sync completed: 0ms lag.",
      "🚀 Deploying update patch v2.4.1 to prod nodes...",
      "🔄 Rolling update completed: Zero downtime achieved.",
      "📈 Traffic spike detected on load balancer US-West (scaling up).",
      "🐳 Auto-scaler active: Spawned 3 new node instances.",
      "✅ Status 200 OK: 100% of server requests serving successfully.",
      "🔒 SSL certificates verified. Security shield fully armed.",
    ];

    let count = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const updated = [...prev, extraLogs[count]];
        if (updated.length > 5) updated.shift();
        return updated;
      });
      count = (count + 1) % extraLogs.length;
    }, 1500);

    return () => clearInterval(interval);
  }, [inView]);

  // Text split into words for cinematic entry
  const titleWords = ["Real-Time", "Live", "Server", "Analytics"];

  return (
    <section
      ref={containerRef}
      style={{
        background: "linear-gradient(180deg, #09090b 0%, #030712 100%)",
        position: "relative",
        overflow: "hidden",
        padding: "120px 24px",
      }}
      className="flex flex-col items-center justify-center border-t border-b border-gray-800/40"
    >
      {/* Background glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none blur-[160px]"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(16,93,161,0.22) 0%, rgba(20,184,166,0.06) 70%, transparent 100%)",
        }}
      />

      {/* Cyber Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dynamic slow-motion floating glass bubbles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ contain: "paint" }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={`teaser-bubble-${i}`}
            className={`hero-glass-bubble-${(i % 4) + 1} absolute rounded-full`}
            style={{
              width: 80 + i * 16,
              height: 80 + i * 16,
              left: `${i % 2 === 0 ? -2 + i * 2.5 : 82 + (i % 3) * 3.5}%`,
              top: `${10 + i * 15}%`,
              animationDelay: `${i * -2.5}s`,
              animationDuration: `${4 + i * 1}s`,
            }}
          />
        ))}
      </div>

      {/* Outer elements: floating dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal-500/20"
            style={{
              width: i % 2 === 0 ? 8 : 12,
              height: i % 2 === 0 ? 8 : 12,
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 22}%`,
              filter: "blur(2px)",
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 3 + i * 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        {/* Intro Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, type: "spring" }}
          className="mb-6"
        >
          <span
            style={{
              fontFamily: f,
              letterSpacing: "0.24em",
              boxShadow: "0 0 25px rgba(20, 184, 166, 0.15)",
            }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/5 px-4.5 py-1.5 text-[10px] font-black uppercase text-teal-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            MIRSA Live Server Monitor
          </span>
        </motion.div>

        {/* Slow Build Cinematic Header */}
        <h2
          style={{ fontFamily: f }}
          className="text-4xl md:text-6xl font-black text-center text-white mb-6 tracking-tight max-w-3xl leading-tight"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 40, opacity: 0, filter: "blur(6px)", rotateX: -45 }}
              animate={inView ? { y: 0, opacity: 1, filter: "blur(0px)", rotateX: 0 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-gray-400 text-base md:text-lg max-w-xl text-center mb-16 leading-relaxed"
        >
          Watch how MIRSA tracks live server load, rolls out updates, and resolves traffic bottlenecks in real time.
        </motion.p>

        {/* Cinematic Teaser Card Container with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.94, filter: "blur(18px)" }}
          animate={inView ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            perspective: 1200,
          }}
          className="w-full flex justify-center cursor-default"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              width: "100%",
              maxWidth: "880px",
              background: "rgba(10, 10, 15, 0.72)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "20px",
              boxShadow: isHovered
                ? "0 40px 100px rgba(16, 93, 161, 0.22), 0 0 45px rgba(20, 184, 166, 0.08)"
                : "0 25px 65px rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
              overflow: "hidden",
              transform: `perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(${isHovered ? 1.025 : 1})`,
              transition: isHovered
                ? "box-shadow 0.3s"
                : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s",
            }}
            className="relative"
          >
            {/* Holographic scanner sweep */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400 to-transparent pointer-events-none opacity-40 z-20"
              style={{
                animation: "scannerSweep 4s linear infinite",
                willChange: "transform",
              }}
            />

            {/* Inner Dashboard Window */}
            {/* Header / Title bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <span className="text-[11px] font-mono text-gray-500 ml-4">mirsa_server_monitor.sh</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  LIVE STREAMING
                </span>
              </div>
            </div>

            {/* Main Area layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
              {/* Left Navigation bar */}
              <div className="md:col-span-1 border-r border-white/5 pr-4 flex flex-col gap-4">
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Workspace</div>
                <div className="flex flex-col gap-2">
                  <Link href="/monitor/nodes" className="flex items-center gap-3 text-xs text-white bg-white/5 px-3 py-2 rounded-lg font-semibold hover:bg-white/10 transition">
                    <span>⚡</span> Live Node Monitor
                  </Link>
                  <Link href="/monitor/traffic" className="flex items-center gap-3 text-xs text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition">
                    <span>📊</span> Traffic Metrics
                  </Link>
                  <Link href="/monitor/deployments" className="flex items-center gap-3 text-xs text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition">
                    <span>📡</span> Deployment Logs
                  </Link>
                  <Link href="/monitor/api-performance" className="flex items-center gap-3 text-xs text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition">
                    <span>🛡️</span> API Response Times
                  </Link>
                </div>

                <div className="mt-auto pt-6">
                  <div className="p-3 bg-teal-500/5 border border-teal-500/15 rounded-xl text-center">
                    <p className="text-[10px] text-gray-500 font-mono">STATUS</p>
                    <p className="text-sm font-extrabold text-teal-400 mt-1">100% ONLINE</p>
                  </div>
                </div>
              </div>

              {/* Central Graph & Terminal Area */}
              <div className="md:col-span-3 flex flex-col gap-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "SERVER LATENCY", val: "18ms avg", delta: "-12%", color: "text-emerald-400" },
                    { label: "SERVER LOAD", val: "28.4%", delta: "Stable", color: "text-blue-400" },
                    { label: "TRAFFIC REQUESTS", val: "14.8k/sec", delta: "+11.4%", color: "text-teal-400" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white/2 border border-white/5 rounded-xl flex flex-col justify-between"
                    >
                      <span className="text-[9px] text-gray-500 font-mono">{item.label}</span>
                      <span className="text-base md:text-lg font-black text-white mt-1.5">{item.val}</span>
                      <span className={`text-[10px] font-mono mt-1 ${item.color}`}>{item.delta}</span>
                    </div>
                  ))}
                </div>

                {/* Animated Interactive Graph */}
                <div className="bg-white/2 border border-white/5 rounded-xl p-5 relative overflow-hidden h-40">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] text-gray-500 font-mono">LIVE SERVER TRAFFIC WORKLOAD</span>
                  </div>
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    <span className="text-[9px] font-mono text-teal-400">AUTO-BALANCING ENABLED</span>
                  </div>

                  {/* Simulated SVG Graph Path */}
                  <svg className="w-full h-full absolute inset-0 pt-8" viewBox="0 0 600 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M 0 100 Q 80 40, 160 80 T 320 20 T 480 60 T 600 10"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth={2}
                      initial={{ pathLength: 0 }}
                      animate={inView ? { pathLength: 1 } : {}}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    <motion.path
                      d="M 0 100 Q 80 40, 160 80 T 320 20 T 480 60 T 600 10 L 600 120 L 0 120 Z"
                      fill="url(#gradient-area)"
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8, duration: 1 }}
                    />
                  </svg>
                </div>

                {/* Live Terminal Output Console */}
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[11px] h-32 flex flex-col justify-end overflow-hidden">
                  <div className="text-gray-500 mb-2 border-b border-white/5 pb-1">
                    System console output stream
                  </div>
                  <div className="flex flex-col gap-1.5 select-none">
                    <AnimatePresence>
                      {logs.map((log, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.28 }}
                          className={`${
                            log.includes("Warning")
                              ? "text-amber-400"
                              : log.includes("✅") || log.includes("🟢")
                              ? "text-emerald-400"
                              : "text-gray-300"
                          }`}
                        >
                          {log}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive glow CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-14"
        >
          <Link
            href="/login"
            style={{
              padding: "14px 34px",
              fontFamily: f,
              fontWeight: 900,
              fontSize: 13,
              borderRadius: "999px",
              boxShadow: "0 0 25px rgba(20, 184, 166, 0.18)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              background: "linear-gradient(90deg, #105da1 0%, #0d9488 100%)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 35px rgba(20, 184, 166, 0.35)";
              e.currentTarget.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 0 25px rgba(20, 184, 166, 0.18)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            className="text-white uppercase tracking-wider transition-all duration-300 inline-block text-center"
          >
            Start Free Performance Audit →
          </Link>
        </motion.div>
      </div>

      {/* Styled JSX scanning scanner sweep animation keyframe */}
      <style jsx global>{`
        @keyframes scannerSweep {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(540px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      `}</style>
    </section>
  );
}
