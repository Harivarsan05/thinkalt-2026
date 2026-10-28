/**
 * About.jsx
 *
 * About section for the Think Alternate landing page.
 *
 * Features:
 * - Animated company introduction
 * - Statistics counter cards
 * - AI showcase panel
 * - Floating decorative elements
 * - Scroll-triggered animations
 * - Responsive layout
 *
 * Dependencies:
 * - React Hooks
 * - Framer Motion
 */
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// Global font family used throughout the About section
const f = "'Inter',sans-serif";

/**
 * Statistics displayed in the About section.
 *
 * Each item contains:
 * - value: Statistic value
 * - suffix: Value suffix (+, %, /7)
 * - label: Description
 * - icon: Display icon
 * - bg: Card background
 * - accent: Highlight color
 */
const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    icon: "🚀",
    bg: "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(240, 244, 255, 0.9))",
    val: "#0f172a",
    sub: "#475569",
    accent: "#0d9488",
  },
  {
    value: 20,
    suffix: "+",
    label: "Enterprise Clients",
    icon: "🏢",
    bg: "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(240, 244, 255, 0.9))",
    val: "#0f172a",
    sub: "#475569",
    accent: "#0369a1",
  },
  {
    value: 99.9,
    suffix: "%",
    label: "Uptime Reliability",
    icon: "⚡",
    bg: "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(240, 244, 255, 0.9))",
    val: "#0f172a",
    sub: "#475569",
    accent: "#0d9488",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Technical Support",
    icon: "🛡️",
    bg: "linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(240, 244, 255, 0.9))",
    val: "#0f172a",
    sub: "#475569",
    accent: "#0369a1",
  },
];

/**
 * Service category tags displayed below
 * the company description.
 */
const tags = ["AI Solutions", "Cloud Engineering", "DevOps", "Mobile Apps", "UI/UX Design", "QA Automation"];

/**
 * Decorative floating labels shown
 * around the About section.
 */
const shapeBoxes = [
  { label: "AI", color: "#4682B4", top: "10%", left: "49%", rotate: -12, radius: "28px 10px 28px 10px" },
  { label: "API", color: "#00CED1", top: "68%", left: "46%", rotate: 11, radius: "12px 28px 12px 28px" },
  { label: "UX", color: "#48D1CC", top: "23%", left: "86%", rotate: 10, radius: "999px" },
  { label: "QA", color: "#4682B4", top: "77%", left: "82%", rotate: -8, radius: "16px" },
];

/**
 * AI capability cards displayed
 * inside the AI visual panel.
 */
const aiTiles = [
  { title: "Predict", mark: "01", color: "#7c3aed" },
  { title: "Automate", mark: "02", color: "#00CED1" },
  { title: "Scale", mark: "03", color: "#2ab7a9" },
];

/**
 * Custom hook for animated counting.
 *
 * Animates numbers from 0 to target value
 * when the component enters the viewport.
 *
 * @param {number} target - Final value
 * @param {boolean} inView - Visibility state
 * @param {number} duration - Animation duration
 *
 * @returns {number} Current animated count
 */
function Counter({ value, inView }) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!inView || !elementRef.current) return;

    let startTimestamp = null;
    const duration = 350; // ms
    const startValue = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = startValue + progress * (value - startValue);
      
      if (elementRef.current) {
        const isDecimal = value % 1 !== 0;
        elementRef.current.textContent = isDecimal 
          ? currentValue.toFixed(1) 
          : Math.floor(currentValue);
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        if (elementRef.current) {
          elementRef.current.textContent = value;
        }
      }
    };

    window.requestAnimationFrame(step);
  }, [value, inView]);

  return <span ref={elementRef}>0</span>;
}

/**
 * FloatingShape Component
 *
 * Displays decorative animated
 * technology labels such as:
 * AI, API, UX and QA.
 *
 * Props:
 * @param {Object} shape
 * @param {number} i
 */
function FloatingShape({ shape, i }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6, rotate: shape.rotate }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: shape.rotate,
        y: 0,
      }}
      transition={{
        delay: 0.05 + i * 0.03,
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: "absolute",
        top: shape.top,
        left: shape.left,
        width: 74,
        height: 54,
        borderRadius: shape.radius,
        background: `${shape.color}14`,
        border: `1px solid ${shape.color}35`,
        boxShadow: `0 18px 50px ${shape.color}24`,
        color: shape.color,
        display: "grid",
        placeItems: "center",
        fontFamily: f,
        fontSize: 12,
        fontWeight: 900,
        letterSpacing: "0.14em",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {shape.label}
    </motion.div>
  );
}

/**
 * AiVisualPanel Component
 *
 * Displays AI capability showcase
 * with animated feature cards.
 *
 * Props:
 * @param {boolean} inView
 */
function AiVisualPanel({ inView }) {
  return (
    <motion.div
      className="about-ai-panel"
      initial={{ opacity: 0, y: 22, scale: 0.94 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: 0.25, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        marginTop: 22,
        borderRadius: 22,
        padding: 18,
        minHeight: 156,
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f172a 0%, #172554 48%, #111827 100%)",
        boxShadow: "0 24px 70px rgba(15,23,42,0.18)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-20% auto -20% 0",
          width: "34%",
          transform: "skewX(-14deg)",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 14, alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: f, color: "#64748b", fontSize: 12, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
            AI operating layer
          </div>
          <div style={{ fontFamily: f, color: "#ffffff", fontSize: 24, lineHeight: 1.06, fontWeight: 900, maxWidth: 230 }}>
            Smart systems that keep moving.
          </div>
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {aiTiles.map((tile, i) => {
            let bg, border, textColor;
            if (tile.title === "Predict") {
              bg = "rgba(124, 58, 237, 0.05)";
              border = "1px solid rgba(124, 58, 237, 0.18)";
              textColor = "#7c3aed";
            } else if (tile.title === "Automate") {
              bg = "rgba(13, 148, 136, 0.05)";
              border = "1px solid rgba(13, 148, 136, 0.18)";
              textColor = "#0d9488";
            } else {
              bg = "rgba(38, 166, 154, 0.05)";
              border = "1px solid rgba(38, 166, 154, 0.18)";
              textColor = "#26a69a";
            }
            return (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, x: 14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.05, duration: 0.2 }}
                whileHover={{ scale: 1.03, y: -1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  padding: "9px 12px",
                  borderRadius: 999,
                  background: bg,
                  border: border,
                  fontFamily: f,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "default",
                }}
              >
                <span style={{ color: textColor }}>{tile.title}</span>
                <span style={{ color: textColor }}>{tile.mark}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * CountStat Component
 *
 * Animated statistic card.
 *
 * Features:
 * - Count-up animation
 * - Hover effects
 * - Decorative backgrounds
 *
 * Props:
 * @param {Object} stat
 * @param {boolean} inView
 * @param {number} i
 */
const renderDiagnosticGraphic = (index, accentColor) => {
  switch (index) {
    case 0: // Projects Delivered - Upward Trend Sparkline
      return (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" className="animate-pulse">
          <path d="M4 24 L10 18 L16 20 L22 10 L28 14" stroke={accentColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="28" cy="14" r="3.5" fill={accentColor} />
        </svg>
      );
    case 1: // Enterprise Clients - Multi-node Network
      return (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="8" r="4.5" fill={accentColor} />
          <circle cx="7" cy="22" r="4.5" fill={accentColor} />
          <circle cx="25" cy="22" r="4.5" fill={accentColor} />
          <line x1="16" y1="12" x2="9.5" y2="18.5" stroke={accentColor} strokeWidth="2.5" strokeDasharray="2 2" />
          <line x1="16" y1="12" x2="22.5" y2="18.5" stroke={accentColor} strokeWidth="2.5" strokeDasharray="2 2" />
        </svg>
      );
    case 2: // Uptime Reliability - High-frequency Pulse
      return (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <path d="M2 16 H8 L11 8 L14 24 L17 12 L20 18 L22 16 H30" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 3: // Technical Support - Security shield
      return (
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none" className="transition-transform duration-1000 hover:rotate-12">
          <path d="M16 4 L6 8 V16 C6 22 10 26 16 28 C22 26 26 22 26 16 V8 L16 4 Z" stroke={accentColor} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M11 15 L14 18 L21 11" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
};

function CountStat({ stat, inView, i }) {
  const handleMouseEnter = (e) => {
    e.currentTarget._cachedRect = e.currentTarget.getBoundingClientRect();
    e.currentTarget._cachedTrail = e.currentTarget.querySelector(".liquid-diamond-trail");
    const trail = e.currentTarget._cachedTrail;
    if (trail) {
      trail.style.opacity = "0.42";
    }
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
    
    // Update the hover glow trail
    const trail = card._cachedTrail || card.querySelector(".liquid-diamond-trail");
    if (trail) {
      trail.style.transform = `translate3d(${x - 70}px, ${y - 70}px, 0)`;
    }

    // 3D perspective tilt effect
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tiltX = x - rect.width / 2;
    const tiltY = y - rect.height / 2;
    const factorX = tiltX / (rect.width / 2);
    const factorY = tiltY / (rect.height / 2);
    card.style.transform = `perspective(1000px) rotateY(${factorX * 8}deg) rotateX(${-factorY * 8}deg) translateY(-8px) scale(1.045)`;
    card.style.transition = "box-shadow 0.4s, border-color 0.4s";
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const trail = card._cachedTrail || card.querySelector(".liquid-diamond-trail");
    if (trail) {
      trail.style.opacity = "0";
    }
    delete card._cachedRect;
    delete card._cachedTrail;
    // Reset 3D perspective tilt
    card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)`;
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, border-color 0.4s";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 38, scale: 0.86, rotate: i % 2 === 0 ? -2 : 2 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
      transition={{ delay: 0.05 + i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="about-stat-card"
      style={{
        background: stat.bg,
        borderRadius: i === 0 ? "24px 24px 24px 8px" : i === 1 ? "24px 8px 24px 24px" : i === 2 ? "8px 24px 24px 24px" : "24px 24px 8px 24px",
        padding: "32px 24px",
        minHeight: 178,
        boxShadow: i < 2 ? "0 22px 64px rgba(0,0,0,0.18)" : "0 14px 36px rgba(15,23,42,0.08)",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        border: `1px solid ${stat.accent}20`,
      }}
    >
      {/* Liquid diamond water-flow light trail */}
      <div
        className="liquid-diamond-trail"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 140,
          height: 140,
          background: "linear-gradient(135deg, #4682B4, #00CED1, #48D1CC)",
          backgroundSize: "200% 200%",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          filter: "blur(28px)",
          opacity: 0,
          pointerEvents: "none",
          transform: "translate3d(-140px, -140px, 0)",
          transition: "transform 0.22s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.35s ease",
          zIndex: 0,
          animation: "liquidDiamondFlow 4s ease infinite",
        }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.18 } : {}}
        transition={{ delay: 0.1 + i * 0.04, duration: 0.25 }}
        style={{
          position: "absolute",
          top: -34,
          right: -24,
          width: 118,
          height: 118,
          borderRadius: "38% 62% 44% 56%",
          background: stat.accent,
          filter: "blur(23px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ rotate: i % 2 === 0 ? -12 : 12, opacity: 0 }}
        animate={inView ? { rotate: 0, opacity: 0.85 } : {}}
        transition={{ delay: 0.15 + i * 0.04, duration: 0.25 }}
        style={{
          position: "absolute",
          right: 18,
          bottom: 16,
          width: 52,
          height: 52,
          borderRadius: "16px",
          border: `1px solid ${stat.accent}65`,
          opacity: 0.85,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {renderDiagnosticGraphic(i, stat.accent)}
      </motion.div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.span
          initial={{ opacity: 0, y: -10, scale: 0.7 }}
          animate={inView ? { opacity: 1, y: 0, scale: [1, 1.18, 1] } : {}}
          transition={{ delay: 0.1 + i * 0.04, duration: 0.25 }}
          style={{ fontSize: 27, display: "block", marginBottom: 14 }}
        >
          {stat.icon}
        </motion.span>
        <motion.div
          style={{
            fontFamily: f,
            fontSize: "clamp(36px, 4vw, 50px)",
            fontWeight: 900,
            color: stat.val,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          <Counter value={stat.value} inView={inView} />
          {stat.suffix}
        </motion.div>
        <div style={{ fontFamily: f, fontSize: 13, fontWeight: 700, color: stat.sub }}>
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * SplitHeading Component
 *
 * Displays animated headline text
 *
 * Props:
 * @param {boolean} inView
 */
function SplitHeading({ inView }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="premium-gradient-text"
      style={{
        fontFamily: f,
        fontSize: "clamp(34px, 4.4vw, 58px)",
        fontWeight: 900,
        lineHeight: 1.04,
        marginBottom: 24,
        maxWidth: 560,
      }}
    >
      Enterprise-grade engineering with a growth mindset.
    </motion.h2>
  );
}

/**
 * About Component
 *
 * Main About section of the homepage.
 *
 * Responsibilities:
 * - Detect viewport visibility
 * - Trigger animations
 * - Display company overview
 * - Display service tags
 * - Display AI showcase panel
 * - Display animated statistics
 *
 * Returns:
 * JSX About section
 */
export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "150px 0px 150px 0px" });

  return (
    <section ref={ref} style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%)", padding: "100px 0", overflow: "hidden", position: "relative" }}>
      {/* Dynamic slow-motion floating glass bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1, contain: "paint" }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={`about-bubble-${i}`}
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

      <style jsx>{`
        @keyframes liquidDiamondFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes textGradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .special-text {
          display: inline-block;
          background: linear-gradient(90deg, #51316A, #B957BB, #F4C980);
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: textGradientMove 4s ease infinite;
        }
        .about-stat-card {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, border-color 0.4s !important;
          will-change: transform;
        }
        .about-stat-card:hover {
          box-shadow: 0 30px 70px rgba(15,23,42,0.18) !important;
        }
        .about-ai-panel {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s !important;
          will-change: transform;
        }
        .about-ai-panel:hover {
          transform: translateY(-5px) scale(1.015) !important;
        }
      `}</style>
      <div className="cyber-grid-3d" />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7 }}
        style={{
          position: "absolute",
          top: "2%",
          right: "-7%",
          width: 430,
          height: 430,
          borderRadius: "44% 56% 35% 65%",
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0.04) 46%, transparent 72%)",
          filter: "blur(28px)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.12 }}
        style={{
          position: "absolute",
          bottom: "3%",
          left: "-8%",
          width: 370,
          height: 370,
          borderRadius: "30% 70% 62% 38%",
          background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, rgba(42,183,169,0.05) 45%, transparent 72%)",
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />

      {shapeBoxes.map((shape, i) => (
        <FloatingShape key={shape.label} shape={shape} i={i} />
      ))}

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
        <div className="about-layout" style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 74, alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.72, y: -10 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.3, type: "spring", stiffness: 320 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 19px",
                borderRadius: 999,
                background: "rgba(98, 206, 193, 0.08)",
                border: "1px solid rgba(98, 206, 193, 0.22)",
                color: "#0d9488",
                fontFamily: f,
                fontSize: 12,
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: 20,
              }}
            >
              <motion.span
                initial={{ rotate: -12, scale: 0.82 }}
                animate={inView ? { rotate: 0, scale: 1 } : {}}
                transition={{ delay: 0.12, duration: 0.3 }}
              >
                ⚡
              </motion.span>
              About ThinkAlternate
            </motion.span>

            <SplitHeading inView={inView} />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.25 }}
              style={{ fontFamily: f, fontSize: 15, color: "#000000", lineHeight: 1.85, marginBottom: 30, maxWidth: 500 }}
            >
              We partner with ambitious businesses to modernize software, automate operations,
              and unlock new revenue channels using AI-powered solutions, cloud infrastructure,
              and scalable engineering practices.
            </motion.p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                    backgroundColor: "#0d9488",
                    borderColor: "#0d9488",
                    color: "#ffffff",
                    boxShadow: "0 8px 20px rgba(13, 148, 136, 0.22)",
                  }}
                  transition={{
                    default: { duration: 0.2, delay: 0 },
                    opacity: { delay: 0.2 + i * 0.03, duration: 0.2 },
                    scale: { delay: 0.2 + i * 0.03, duration: 0.2, type: "spring", stiffness: 290 },
                    y: { delay: 0.2 + i * 0.03, duration: 0.2 },
                  }}
                  style={{
                    padding: "9px 18px",
                    borderRadius: 999,
                    background: "rgba(255, 255, 255, 0.5)",
                    border: "1px solid rgba(13, 148, 136, 0.22)",
                    color: "#0d9488",
                    fontFamily: f,
                    fontSize: 13,
                    fontWeight: 800,
                    cursor: "default",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.02)",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <AiVisualPanel inView={inView} />
          </motion.div>

          <div>
            <div className="about-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {stats.map((s, i) => (
                <CountStat key={s.label} stat={s} inView={inView} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
