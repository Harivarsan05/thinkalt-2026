"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import DarkNavbar from "../../components/DarkNavbar";
import { caseStudies } from "../../data/caseStudies";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import WebPageSchema from "../../components/seo/WebPageSchema";

const filters = ["All", "Foundry", "MIRSA"];

const colorMap = {
  "CTO+": "border-teal-500/30 text-teal-600 bg-teal-50/50",
  "MIRSA": "border-blue-500/30 text-blue-600 bg-blue-50/50",
  "Foundry": "border-purple-500/30 text-purple-600 bg-purple-50/50",
};

export default function CaseStudyPage() {
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState(null);
  
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      if (heroRef.current) {
        heroRef.current.style.setProperty('--mx', x);
        heroRef.current.style.setProperty('--my', y);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filtered = active === "All" ? caseStudies : caseStudies.filter((c) => c.category === active);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 relative overflow-hidden font-sans select-none">
      {/* Dynamic Background Noise & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(16,93,161,0.04),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_45%,transparent_100%)] opacity-70 pointer-events-none" />
      
      {/* Scanline CRT overlay for Hero banner only */}
      <div className="absolute inset-x-0 top-0 h-[85vh] md:h-[90vh] pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(16,93,161,0.06),rgba(20,184,166,0.02),rgba(16,93,161,0.06))] bg-[size:100%_4px,3px_100%] opacity-30" />

      <WebPageSchema name="ThinkAlternate Case Studies" description="Explore product engineering, AI, cloud, and app modernization results delivered by ThinkAlternate." path="/case-study" type="CollectionPage" />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-study" }]} />
      <DarkNavbar />

      {/* Cyber Hero Banner (Remains dark for premium tech command center visual appeal) */}
      <div ref={heroRef} className="relative h-[85vh] md:h-[90vh] w-full flex flex-col justify-between overflow-hidden pt-24 pb-8 border-b border-slate-200 bg-[#030406]">
        {/* Holographic grid and depth layer */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        
        {/* Parallax Background tech command center */}
        <div 
          style={{
            transform: "translate3d(calc(var(--mx, 0) * 25px), calc(var(--my, 0) * 25px), 0) scale(1.05)",
            transition: "transform 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)",
          }}
          className="absolute inset-0 bg-[url('/projects/cyber-command-center.png')] bg-cover bg-center opacity-70"
        />

        {/* Space Ship Instrument panel / Cockpit framing overlays */}
        <div className="absolute inset-x-0 top-0 h-1 border-t border-white/10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-1 border-r border-white/5 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-1 border-l border-white/5 pointer-events-none" />

        {/* Top bar indicators */}
        <div className="w-full px-6 flex justify-between items-center text-[10px] font-mono tracking-[0.3em] text-cyan-400/60 z-20">
          <div className="flex items-center gap-4">
            <svg className="w-4 h-4 text-cyan-400 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 22 22 22" />
            </svg>
            <span>SYS STATUS: ACTIVE</span>
          </div>
          <div />
          <div>
            <span>PROTOCOLS: (15)</span>
          </div>
        </div>

        {/* Giant Layered Text & Depth Effect */}
        <div className="relative flex-1 flex flex-col items-center justify-center z-20 select-none">
          <div
            style={{
              transform: "translate3d(calc(var(--mx, 0) * -20px), calc(var(--my, 0) * -20px), 0)",
              transition: "transform 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)",
            }}
            className="text-center px-4"
          >
            <p className="text-[10px] md:text-xs font-mono font-bold tracking-[0.5em] text-cyan-400 uppercase mb-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              ✦ THINKALTERNATE PROJECT ARCHIVE ✦
            </p>
            
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black uppercase tracking-tighter leading-none bg-gradient-to-r from-[#105DA1] via-[#1a73e8] to-[#14b8a6] bg-clip-text text-transparent select-none font-sans drop-shadow-[0_2px_15px_rgba(26,115,232,0.35)]">
              CASE
              <br />
              STUDIES
            </h1>

            <p className="max-w-md mx-auto mt-6 text-xs md:text-sm font-mono tracking-widest text-neutral-400 leading-relaxed uppercase">
              REVOLUTIONIZING DIGITIZATION & INTELLIGENCE. PROVEN IN ACTION.
            </p>
          </div>

          {/* Holographic scanner laser line animation */}
          <motion.div 
            animate={{
              y: ["0%", "100%", "0%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute left-0 right-0 h-[2px] bg-cyan-500/20 blur-[2px] pointer-events-none"
            style={{ top: "30%" }}
          />
        </div>

        {/* Bottom bar metadata */}
        <div className="w-full px-6 flex justify-between items-center text-[10px] font-mono tracking-[0.3em] text-cyan-400/60 z-20">
          <div>
            <span>CREATED BY: ALTHUMANS</span>
          </div>
          <div className="hidden sm:block">
            <span>GRID: CORE_SYS_ALPHA</span>
          </div>
          <div>
            <span>THINKALTERNATE © 2026</span>
          </div>
        </div>
      </div>

      {/* Cyber Dashboard System Navigation / Filters */}
      <div className="relative z-30 max-w-6xl mx-auto px-6 mt-16 mb-12">
        <div className="flex flex-col items-center gap-4">
          <span className="text-[10px] font-mono tracking-[0.4em] text-slate-400 uppercase">CONSOLE INTERFACE FILTER</span>
          
          <div className="flex bg-white border border-slate-200 p-1.5 rounded-xl gap-2 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`relative px-6 py-2.5 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-[0_4px_12px_rgba(16,93,161,0.2)] border border-cyan-500/20"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#105DA1] to-[#14b8a6] rounded-lg z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Holographic Card Grid */}
      <div ref={gridRef} className="max-w-6xl mx-auto px-6 pb-32 relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((c, i) => (
              <Link href={`/case-study/${c.id}`} key={c.id} className="flex">
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={gridInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onHoverStart={() => setHovered(c.id)}
                  onHoverEnd={() => setHovered(null)}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-[#105DA1]/40 shadow-sm flex flex-col w-full transition-all duration-300"
                  style={{
                    boxShadow: hovered === c.id 
                      ? "0 20px 40px -15px rgba(16,93,161,0.15), inset 0 1px 0 rgba(255,255,255,1)"
                      : "inset 0 1px 0 rgba(255,255,255,1)"
                  }}
                >
                  {/* Cyber Grid Corner Accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-slate-300 group-hover:border-[#105DA1] transition-colors" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-300 group-hover:border-[#105DA1] transition-colors" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-300 group-hover:border-[#105DA1] transition-colors" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-slate-300 group-hover:border-[#105DA1] transition-colors" />

                  {/* Image Display */}
                  <div className="relative overflow-hidden h-48 w-full border-b border-slate-100 bg-slate-50">
                    <motion.img
                      src={c.image}
                      alt={c.title}
                      animate={{ scale: hovered === c.id ? 1.08 : 1 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    
                    {/* Holographic matrix scanlines overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_95%,rgba(16,93,161,0.03)_95%)] bg-[size:100%_15px] pointer-events-none opacity-40" />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-100/20 via-transparent to-transparent opacity-60" />

                    {/* Cyber Tag Badge */}
                    <span className={`absolute top-4 left-4 border text-[9px] font-mono tracking-widest font-bold px-3 py-1 rounded-full uppercase z-20 ${colorMap[c.category] || "border-slate-300 text-slate-600 bg-white"}`}>
                      {c.category}
                    </span>

                    {/* Top Right Project Number */}
                    <span className="absolute top-4 right-4 text-[10px] font-mono text-slate-400 tracking-wider z-20">
                      ID // 0{c.id}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-1 relative bg-white">
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2">{c.client}</p>
                    
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#105DA1] transition-colors leading-snug">
                      {c.title}
                    </h3>
                    
                    <p className="mt-3 text-xs text-slate-600 leading-relaxed font-sans line-clamp-3 flex-1">{c.desc}</p>
                    
                    {/* Metrics Section */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-2.5">CORE SYSTEMS METRIC</p>
                      <div className="flex flex-wrap gap-2">
                        {c.metrics.map((m, idx) => (
                          <span key={idx} className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[#105DA1] uppercase">
                            ✦ {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-slate-400">DECRYPT RECORD</span>
                      <motion.div
                        animate={{ x: hovered === c.id ? 5 : 0 }}
                        className="text-xs font-mono font-black text-[#105DA1] inline-flex items-center gap-1.5 group-hover:drop-shadow-[0_2px_4px_rgba(16,93,161,0.2)]"
                      >
                        ACCESS FILE <span className="text-sm">→</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
