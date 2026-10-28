/**
 * Services.jsx
 *
 * Services showcase section for the website.
 *
 * Features:
 * - Displays company services and solutions
 * - Interactive service cards
 * - Scroll-based animations
 * - Hover effects and transitions
 * - Statistics overview panel
 * - Process workflow section
 * - Responsive grid layout
 *
 * Dependencies:
 * - React Hooks
 * - Framer Motion
 * - Next.js Link
 */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const f = "'Inter','DM Sans',sans-serif";
const accent = "#F4C980";
const lightAccent = "#105DA1";
const colorRGB = "16,93,161";

/**
 * Services catalog data.
 *
 * Each service contains:
 * - href: Navigation route
 * - title: Service name
 * - category: Service category
 * - badge: Client/business type
 * - image: Service banner image
 * - desc: Service description
 * - features: Key capabilities
 * - stats: Performance metrics
 */
const services = [
  {
    href: "/performax-engine",
    title: "Performax Engine",
    category: "AI / NLP",
    badge: "SaaS Startup",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=65",
    desc: "Fine-tunes every layer of your digital product for unmatched speed, efficiency, and reliability.",
    features: ["Cold-start profiling", "Memory leak detection", "Batch rules"],
    stats: ["+58% efficiency", "24/7 load testing", "60fps UI"],
  },
  {
    href: "/ghost-bugs",
    title: "Ghost Bugs",
    category: "Cloud / DevOps",
    badge: "Manufacturing",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=65",
    desc: "Finds and fixes elusive QA issues before they reach customers, safeguarding your app experience.",
    features: ["Bug triage", "Repro extraction", "Regression proofing"],
    stats: ["+43% cost cut", "12 min deploys", "99.99% uptime"],
  },
  {
    href: "/cloud-cost-optimization",
    title: "Cloud Cost Optimizer",
    category: "FinOps",
    badge: "Global Retail",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=65",
    desc: "Slash cloud spend while protecting performance with intelligent rightsizing and waste elimination.",
    features: ["RI automation", "Waste cleanup", "Spend alerts"],
    stats: ["43% savings", "Auto rightsizing", "Policy control"],
  },
  {
    href: "/apptron",
    title: "AppTron",
    category: "Autonomous Agent",
    badge: "FinTech App",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=65",
    desc: "A 24/7 autonomous app maintenance agent that detects regressions and triages issues fast.",
    features: ["Issue detection", "Context tickets", "Auto-assign"],
    stats: ["90% faster", "Zero P0 escapes", "Always-on"],
  },
  {
    href: "/root-cause-engine",
    title: "Root Cause Engine",
    category: "Diagnostics",
    badge: "AI Ops",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=400&q=65",
    desc: "Correlates crashes, deploys, and logs to identify the root cause in minutes.",
    features: ["Log correlation", "Release drift", "Heatmaps"],
    stats: ["2 min RCA", "8 data sources", "No manual triage"],
  },
  {
    href: "/sentiment-analyzer",
    title: "Sentiment Analyzer",
    category: "Analytics",
    badge: "Mobile Studio",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=65",
    desc: "Turns user feedback into product insights so teams can improve retention and satisfaction.",
    features: ["Opinion mining", "Feature signals", "Experience score"],
    stats: ["Live signals", "4x insight", "Customer pulse"],
  },
  {
    href: "/app-health-dashboard",
    title: "App Health Dashboard",
    category: "Command Center",
    badge: "Enterprise",
    image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=65",
    desc: "Real-time performance, stability, and UX telemetry all on one executive dashboard.",
    features: ["Crash metrics", "Release impact", "Scorecards"],
    stats: ["10 sources", "Live sync", "Board-ready"],
  },
  {
    href: "/services/ui-ux-design",
    title: "UI/UX Design",
    category: "Design System",
    badge: "Super-app",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=65",
    desc: "Designed a scalable design system and accessible UI library for a high-growth product.",
    features: ["WCAG 2.1 AA", "Component library", "Handoff"],
    stats: ["400+ components", "Cross-platform", "Velocity"],
  },
  {
    href: "/services/mobile-app-development",
    title: "Mobile App Development",
    category: "Mobile / Fintech",
    badge: "Digital Bank",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=65&w=400&auto=format&fit=crop",
    desc: "Built a secure mobile banking experience with biometric auth, real-time payments, and analytics.",
    features: ["Biometric auth", "Live payments", "Compliance"],
    stats: ["500K downloads", "4.8 star", "RBI-ready"],
  },
  {
    href: "/services/devops-cloud-optimization",
    title: "DevOps Automation",
    category: "CI/CD",
    badge: "Scale-up",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=65",
    desc: "Streamlined GitHub Actions and ArgoCD to deliver daily releases with rollback safety.",
    features: ["Pipelines", "Canary rollout", "Observability"],
    stats: ["2x releases", "Zero downtime", "90% automation"],
  },
];

/**
 * Card hover animation configurations.
 *
 * Controls:
 * - Glow color
 * - Scale effect
 * - Rotation
 * - Image movement
 * - Sweep animation
 */
const hoverEffects = [
  { rgb: "16,93,161", color: "#105DA1", y: -18, scale: 1.04, rotate: -1.4, imageX: -16, imageScale: 1.14, sweep: "35deg" },
  { rgb: "20,184,166", color: "#14b8a6", y: -12, scale: 1.045, rotate: 1.6, imageX: 14, imageScale: 1.13, sweep: "145deg" },
  { rgb: "16,93,161", color: "#105DA1", y: -20, scale: 1.035, rotate: -0.8, imageX: -10, imageScale: 1.16, sweep: "90deg" },
  { rgb: "20,184,166", color: "#14b8a6", y: -14, scale: 1.05, rotate: 1.2, imageX: 10, imageScale: 1.12, sweep: "20deg" },
  { rgb: "16,93,161", color: "#105DA1", y: -16, scale: 1.04, rotate: -1.8, imageX: -14, imageScale: 1.15, sweep: "120deg" },
  { rgb: "20,184,166", color: "#14b8a6", y: -13, scale: 1.045, rotate: 1.4, imageX: 16, imageScale: 1.12, sweep: "60deg" },
  { rgb: "16,93,161", color: "#105DA1", y: -19, scale: 1.035, rotate: -1.1, imageX: -12, imageScale: 1.14, sweep: "155deg" },
  { rgb: "20,184,166", color: "#14b8a6", y: -15, scale: 1.05, rotate: 1.7, imageX: 12, imageScale: 1.13, sweep: "75deg" },
  { rgb: "16,93,161", color: "#105DA1", y: -17, scale: 1.04, rotate: -1.3, imageX: -18, imageScale: 1.16, sweep: "30deg" },
  { rgb: "20,184,166", color: "#14b8a6", y: -14, scale: 1.05, rotate: 1.1, imageX: 18, imageScale: 1.13, sweep: "135deg" },
];

/**
 * Company performance statistics
 * displayed in the side panel.
 */
const overviewStats = [
  ["60+", "Apps shipped"],
  ["4.8", "Avg rating"],
  ["99.9%", "Crash-free"],
  ["12ms", "Frame render"],
];

/**
 * Company delivery workflow steps.
 *
 * Process:
 * Discover → Prototype → Sprint
 * → QA → Launch → Support
 */
const process = ["Discover", "Prototype", "Sprint", "QA", "Launch", "Support"];

/**
 * Framer Motion animation variants
 * for service card entrance effects.
 */
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, delay: i * 0.03, ease: [0.215, 0.61, 0.355, 1] },
  }),
  hover: (index) => {
    const fx = hoverEffects[index % hoverEffects.length];
    return {
      y: fx.y,
      scale: fx.scale,
      rotate: 0,
      borderColor: `rgba(${fx.rgb},0.72)`,
      boxShadow: `0 32px 90px rgba(${fx.rgb},0.26), 0 22px 70px rgba(0,0,0,0.38)`,
      transition: { type: "spring", stiffness: 130, damping: 22 }
    };
  }
};

const glowVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 0, scale: 1, transition: { duration: 0.4 } },
  hover: (index) => {
    return {
      opacity: 0.6,
      scale: 1.45,
      x: -18,
      y: -14,
      transition: { duration: 0.4, ease: "easeOut" }
    };
  }
};

const sweepVariants = {
  hidden: { opacity: 0, x: "-80%" },
  visible: { opacity: 0, x: "-80%" },
  hover: {
    opacity: [0, 0.5, 0],
    x: "120%",
    transition: { duration: 0.9, ease: "easeInOut" }
  }
};

const imageVariants = {
  hidden: { scale: 1, x: 0 },
  visible: { scale: 1, x: 0 },
  hover: (index) => {
    const fx = hoverEffects[index % hoverEffects.length];
    return {
      scale: fx.imageScale,
      x: fx.imageX,
      transition: { duration: 0.4, ease: "easeOut" }
    };
  }
};


/**
 * Services Component
 *
 * Main services showcase section.
 *
 * Responsibilities:
 * - Render service cards
 * - Handle scroll animations
 * - Display company stats
 * - Display workflow process
 * - Provide navigation to service pages
 *
 * Returns:
 * JSX Services Section
 */
export default function Services() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  let servicesRect = null;

  const handleMouseEnter = (e) => {
    servicesRect = e.currentTarget.getBoundingClientRect();
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
    }
  };

  const handleMouseMove = (e) => {
    if (!servicesRect) {
      servicesRect = e.currentTarget.getBoundingClientRect();
    }
    const x = e.clientX - servicesRect.left;
    const y = e.clientY - servicesRect.top;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(244, 201, 128, 0.18), transparent 80%)`;
    }
  };

  const handleMouseLeave = () => {
    servicesRect = null;
    if (glowRef.current) {
      glowRef.current.style.opacity = "0";
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        background: "#09090b",
        color: "#ffffff",
        minHeight: "100svh",
        padding: "116px 0 128px",
        overflow: "hidden",
        fontFamily: f,
      }}
    >
      {/* Dynamic slow-motion floating glass bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 15, contain: "paint" }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={`services-bubble-${i}`}
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
        .service-card {
          will-change: transform;
          transition: box-shadow 0.5s, border-color 0.5s;
        }
        .tag-hover-transition {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s, color 0.3s;
        }
        .category-tag:hover {
          transform: translateY(-3px);
          background-color: var(--hover-color) !important;
          color: #fff !important;
        }
        .badge-tag:hover {
          transform: translateY(-3px);
          background-color: #111827 !important;
          color: #fff !important;
        }
        .feature-tag:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #105DA1 0%, #1a73e8 50%, #14b8a6 100%) !important;
          color: #fff !important;
          border-color: transparent !important;
          box-shadow: 0 4px 12px rgba(16, 93, 161, 0.2);
        }
        .stat-tag:hover {
          transform: scale(1.08);
          background: linear-gradient(135deg, #105DA1 0%, #1a73e8 50%, #14b8a6 100%) !important;
          color: #fff !important;
          border-color: transparent !important;
          box-shadow: 0 4px 12px rgba(20, 184, 166, 0.2);
        }
        .tag-row-hover {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s;
        }
        .tag-row-hover:hover {
          transform: translateY(-3px) scale(1.03);
          background-color: #0d9488 !important;
          border-color: #0d9488 !important;
          color: #ffffff !important;
          box-shadow: 0 8px 20px rgba(13, 148, 136, 0.22);
        }
        .process-row {
          transition: transform 0.2s ease-out;
        }
        .process-row:hover {
          transform: translateX(6px);
        }
        .image-overlay {
          transition: background 0.3s ease;
        }
        .service-card:hover .image-overlay {
          background: var(--image-hover-gradient) !important;
        }
        .service-title {
          transition: transform 0.3s ease, color 0.3s ease;
        }
        .service-card:hover .service-title {
          transform: translateX(6px);
          color: var(--title-hover-color) !important;
        }
      `}</style>
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: 1.05, willChange: "transform", pointerEvents: "none" }}>
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1920&auto=format&fit=crop"
            alt=""
            fill
            style={{ objectFit: "cover", opacity: 0.15 }}
            loading="lazy"
            sizes="100vw"
          />
        </div>
      </motion.div>

      <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "linear-gradient(180deg, rgba(9,9,11,0.85), transparent 100%)", pointerEvents: "none" }} />

      {/* Interactive Background Spotlight Glow */}
      <div
        ref={glowRef}
        className="spotlight-glow-bg"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 12,
          background: "radial-gradient(700px circle at 50% 50%, rgba(244, 201, 128, 0.35), transparent 80%)",
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10%",
          bottom: "6%",
          width: "58vw",
          height: "58vh",
          zIndex: 11,
          background: `radial-gradient(circle, ${accent}, transparent 70%)`,
          filter: "blur(90px)",
          opacity: 0.34,
          pointerEvents: "none",
        }}
      />


      <div style={{ position: "relative", zIndex: 30, maxWidth: 1720, margin: "0 auto", padding: "0 64px" }}>
        <div
          className="services-cinematic-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 360px",
            gap: 54,
            alignItems: "start",
            marginBottom: 54,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-90px" }}
            transition={{ duration: 0.42, delay: 0.08, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ maxWidth: 850, paddingTop: 12 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 }}
              style={{
                display: "inline-block",
                marginBottom: 16,
                padding: "8px 12px",
                borderRadius: 999,
                background: "rgba(20, 184, 166, 0.06)",
                border: "1px solid rgba(20, 184, 166, 0.22)",
                color: "#2dd4bf",
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              Next-gen product engineering for growth-stage teams
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28, duration: 0.58 }}
              style={{
                fontSize: "clamp(52px, 6vw, 88px)",
                fontWeight: 900,
                lineHeight: 1.03,
                letterSpacing: "-0.04em",
                maxWidth: 850,
                margin: "0 0 24px",
                background: "linear-gradient(135deg, #ffffff 10%, #38bdf8 60%, #2dd4bf 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Enterprise-grade engineering with a bold, modern tech edge.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.38 }}
              style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.72, maxWidth: 760, marginBottom: 28 }}
            >
              We combine AI-powered engineering systems, product strategy, and cloud ops to help high-growth companies move faster and stay ahead.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.46 }}
              style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}
            >
              {["React Native", "Flutter", "AI Apps", "Cloud Ops", "QA Automation", "Design Systems"].map((tag) => (
                <motion.span
                  key={tag}
                  whileHover={{
                    y: -3,
                    scale: 1.03,
                    backgroundColor: "#0d9488",
                    borderColor: "#0d9488",
                    color: "#ffffff",
                    boxShadow: "0 8px 20px rgba(13, 148, 136, 0.22)",
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    padding: "9px 16px",
                    borderRadius: 999,
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    background: "rgba(255, 255, 255, 0.03)",
                    color: "#2dd4bf",
                    fontSize: 12,
                    fontWeight: 800,
                    cursor: "default",
                    display: "inline-block",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
 
          <aside className="services-side-panel" style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {overviewStats.map(([value, label], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 26, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.22 + i * 0.06, duration: 0.36 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  style={{
                    minHeight: 96,
                    borderRadius: 18,
                    background: "rgba(10, 15, 30, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                    display: "grid",
                    placeItems: "center",
                    textAlign: "center",
                    padding: 14,
                    willChange: "transform",
                  }}
                >
                  <div style={{
                    background: "linear-gradient(135deg, #105DA1 0%, #1a73e8 50%, #14b8a6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    color: "transparent",
                    fontSize: 34,
                    lineHeight: 1.1,
                    fontWeight: 900,
                  }}>{value}</div>
                  <div style={{ color: "#94a3b8", fontSize: 11, fontWeight: 900, textTransform: "uppercase", marginTop: 8 }}>{label}</div>
                </motion.div>
              ))}
            </div>
 
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.42, duration: 0.42 }}
              style={{
                borderRadius: 20,
                background: "rgba(10, 15, 30, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                padding: "24px 26px",
              }}
            >
               <div style={{
                background: "linear-gradient(135deg, #105DA1 0%, #1a73e8 50%, #14b8a6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}>
                Our process
              </div>
              <div style={{ display: "grid", gap: 13 }}>
                {process.map((item, i) => (
                  <div
                    key={item}
                    className="process-row"
                    style={{ display: "grid", gridTemplateColumns: "28px 1fr 22px", gap: 12, alignItems: "center", cursor: "default" }}
                  >
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background: "linear-gradient(135deg, #105DA1 0%, #14b8a6 100%)",
                        color: "#ffffff",
                        fontSize: 11,
                        fontWeight: 900,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 800 }}>{item}</span>
                    <span style={{ height: 1, background: "rgba(16, 93, 161, 0.18)" }} />
                  </div>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>

        <div
          className="mirsa-services-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 22,
            maxWidth: 1500,
          }}
        >
          {services.map((service, index) => {
            const fx = hoverEffects[index % hoverEffects.length];

            return (
              <motion.article
                key={service.title}
                className="service-card"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-70px" }}
                variants={cardVariants}
                whileHover="hover"
                style={{
                  position: "relative",
                  minHeight: 430,
                  borderRadius: 24,
                  overflow: "hidden",
                  padding: 14,
                  background: "#ffffff",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.04)",
                  willChange: "transform",
                }}
              >
              <motion.div
                aria-hidden="true"
                custom={index}
                variants={glowVariants}
                style={{
                  position: "absolute",
                  right: -36,
                  bottom: -42,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(${fx.rgb},0.58), transparent 68%)`,
                  filter: "blur(18px)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
              <motion.div
                aria-hidden="true"
                variants={sweepVariants}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "70%",
                  transform: `skewX(-16deg) rotate(${fx.sweep})`,
                  background: `linear-gradient(90deg, transparent, rgba(${fx.rgb},0.28), transparent)`,
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ position: "relative", height: 172, overflow: "hidden", borderRadius: 18, marginBottom: 18 }}>
                  <motion.div
                    custom={index}
                    variants={imageVariants}
                    style={{ position: "absolute", inset: 0, willChange: "transform" }}
                  >
                    <Image
                      src={service.image}
                      alt={`${service.title} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      style={{ objectFit: "cover" }}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </motion.div>
                  <div
                    className="image-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.62))",
                      "--image-hover-gradient": `linear-gradient(180deg, rgba(${fx.rgb},0.06), rgba(0,0,0,0.44))`,
                    }}
                  />
                  <span
                    className="tag-hover-transition category-tag"
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      padding: "6px 9px",
                      borderRadius: 999,
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "#0d9488",
                      fontSize: 9,
                      fontWeight: 900,
                      cursor: "default",
                      "--hover-color": fx.color,
                    }}
                  >
                    {service.category}
                  </span>
                  <span
                    className="tag-hover-transition badge-tag"
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      padding: "6px 9px",
                      borderRadius: 999,
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "#0d9488",
                      fontSize: 9,
                      fontWeight: 900,
                      cursor: "default",
                    }}
                  >
                    {service.badge}
                  </span>
                </div>

                 <h3
                  className="service-title"
                  style={{
                    color: "#0f172a",
                    fontSize: 24,
                    fontWeight: 900,
                    lineHeight: 1.08,
                    letterSpacing: "-0.02em",
                    marginBottom: 8,
                    "--title-hover-color": fx.color,
                  }}
                >
                  {service.title}
                </h3>
                <p style={{ color: "#0d9488", fontSize: 11, fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
                  {service.category} / {service.badge}
                </p>
                <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>
                  {service.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="tag-hover-transition feature-tag"
                      style={{
                        padding: "6px 8px",
                        borderRadius: 7,
                        border: "1px solid rgba(16, 93, 161, 0.22)",
                        background: "linear-gradient(135deg, rgba(16, 93, 161, 0.08) 0%, rgba(20, 184, 166, 0.08) 100%)",
                        color: lightAccent,
                        fontSize: 10,
                        fontWeight: 800,
                        cursor: "default",
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {service.stats.map((stat) => (
                    <span
                      key={stat}
                      className="tag-hover-transition stat-tag"
                      style={{
                        padding: "6px 8px",
                        borderRadius: 999,
                        background: "linear-gradient(135deg, rgba(16, 93, 161, 0.08) 0%, rgba(20, 184, 166, 0.08) 100%)",
                        border: "1px solid rgba(20, 184, 166, 0.22)",
                        color: "#0d9488",
                        fontSize: 10,
                        fontWeight: 800,
                        cursor: "default",
                      }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={service.href}
                aria-label={`Explore more about ${service.title}`}
                style={{ position: "absolute", inset: 0, zIndex: 3, textIndent: "-9999px" }}
              >
                Explore More
              </Link>
            </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
