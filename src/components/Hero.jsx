/**
 * Hero.jsx
 *
 * Main landing page hero component.
 * Simplified for faster homepage startup and lower runtime cost.
 */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const f = "'Inter',sans-serif";
const VIDEO_ID = "zU6bWoT1ohg";
const CYCLE_MS = 4000;

const slides = [
  {
    label: "Foundry",
    labelColor: "#2dd4bf",
    accentColor: "#38bdf8",
    heading: "Product-Led Engineering That Ships Outcomes",
    desc: "ThinkAlternate is an AI Product Engineering company specializing in Agentic AI, Generative AI, Cloud Engineering, Digital Transformation, and Enterprise Software Development. We help startups and enterprises build intelligent applications, cloud-native platforms, automation systems, and scalable AI-powered products.",
    cta: "Explore Foundry",
    href: "/foundry",
    bg: "transparent",
    thumb: "/projects/foundry.jpg",
    motionOrigin: "center center",
  },
  {
    label: "MIRSA",
    labelColor: "#38bdf8",
    accentColor: "#2dd4bf",
    heading: "AI Led App Maintenance & Growth",
    desc: "MIRSA is your 24/7 App Maintenance Co-Pilot. Dev Support, App Growth, or Business Reports — all in one intelligent dashboard.",
    cta: "Explore MIRSA",
    href: "/mirsa",
    bg: "transparent",
    thumb: "/projects/azure-foundry.jpg",
    motionOrigin: "center center",
  },
  {
    label: "CTO+",
    labelColor: "#2dd4bf",
    accentColor: "#38bdf8",
    heading: "Battle-Tested CTO Leadership, On Demand",
    desc: "Get a senior technical leader without the full-time cost. We own your architecture, engineering culture, hiring and board-level communication.",
    cta: "Explore CTO+",
    href: "/services/fractional-cto",
    bg: "transparent",
    thumb: "/projects/skyline.jpg",
    motionOrigin: "50% 44%",
  },
];

function AnimatedHeading({ text, color }) {
  const words = text.split(" ");

  return (
    <h1
    className="hero-title"
      style={{
        fontFamily: f,
        fontSize: "clamp(26px, 2.8vw, 44px)",
        fontWeight: 900,
        color: "#ffffff",
        lineHeight: 1.08,
        letterSpacing: "-0.04em",
        marginBottom: 18,
      }}
    >
      {words.map((word, index) => (
        <span
          key={`${index}-${word}`}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            color: index === words.length - 1 ? "transparent" : "#ffffff",
            backgroundImage: index === words.length - 1 ? `linear-gradient(135deg, ${color} 0%, #0ea5e9 100%)` : "none",
            WebkitBackgroundClip: index === words.length - 1 ? "text" : "initial",
            WebkitTextFillColor: index === words.length - 1 ? "transparent" : "initial",
            opacity: 0,
            transform: "translateY(15px)",
            animation: "wordSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
            animationDelay: `${index * 0.04}s`,
          }}
        >
          {word}
        </span>
      ))}
    </h1>
  );
}

function StatBadge({ value, label, color }) {
  const handleMouseEnter = (e) => {
    e.currentTarget._cachedRect = e.currentTarget.getBoundingClientRect();
    e.currentTarget._cachedTrail = e.currentTarget.querySelector(".liquid-diamond-trail");
    const trail = e.currentTarget._cachedTrail;
    if (trail) {
      trail.style.opacity = "0.35";
    }
    e.currentTarget.style.transform = "translateY(-8px) scale(1.08)";
    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
    e.currentTarget.style.boxShadow = `0 20px 40px ${color}40, 0 0 25px ${color}20`;
  };

  const handleMouseMove = (e) => {
    let rect = e.currentTarget._cachedRect;
    if (!rect) {
      rect = e.currentTarget.getBoundingClientRect();
      e.currentTarget._cachedRect = rect;
    }
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const trail = e.currentTarget._cachedTrail || e.currentTarget.querySelector(".liquid-diamond-trail");
    if (trail) {
      trail.style.transform = `translate3d(${x - 40}px, ${y - 40}px, 0)`;
    }
  };

  const handleMouseLeave = (e) => {
    const trail = e.currentTarget._cachedTrail;
    if (trail) {
      trail.style.opacity = "0";
    }
    delete e.currentTarget._cachedRect;
    delete e.currentTarget._cachedTrail;
    e.currentTarget.style.transform = "translateY(0) scale(1)";
    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      className="stat-badge"
      style={{
        background: "rgba(255, 255, 255, 0.16)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: 16,
        padding: "10px 16px",
        border: "1px solid rgba(255, 255, 255, 0.22)",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.15)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, border-color 0.4s",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Liquid diamond water-flow light trail */}
      <div
        className="liquid-diamond-trail"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 80,
          height: 80,
          background: "linear-gradient(135deg, #105DA1, #1a73e8, #14b8a6)",
          backgroundSize: "200% 200%",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          filter: "blur(18px)",
          opacity: 0,
          pointerEvents: "none",
          transform: "translate3d(-80px, -80px, 0)",
          transition: "transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 0.3s ease",
          zIndex: 0,
          animation: "liquidDiamondFlow 4s ease infinite",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: f, fontSize: 20, fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
        <div
          style={{
            fontFamily: f,
            fontSize: 10,
            color: "rgba(255, 255, 255, 0.85)",
            fontWeight: 600,
            marginTop: 3,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

const CARD_SHAPE = "polygon(0% 0%, 93% 0%, 100% 7%, 100% 100%, 7% 100%, 0% 93%)";

export default function Hero() {
  const [active, setActive] = useState(0);
  const [visitedSlides, setVisitedSlides] = useState([0]);
  const [playing, setPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!visitedSlides.includes(active)) {
      setVisitedSlides((prev) => [...prev, active]);
    }
  }, [active, visitedSlides]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, CYCLE_MS);

    return () => {
      clearInterval(timerRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const goTo = (index) => {
    setActive(index);
    setPlaying(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, CYCLE_MS);
  };

  const handleMouseEnter = (e) => {
    e.currentTarget._cachedRect = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const card = e.currentTarget;
    let box = card._cachedRect;
    if (!box) {
      box = card.getBoundingClientRect();
      card._cachedRect = box;
    }
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;

    const factorX = x / (box.width / 2);
    const factorY = y / (box.height / 2);

    card.style.transform = `perspective(1000px) rotateY(${factorX * 5}deg) rotateX(${-factorY * 5}deg) translateY(-4px)`;
    card.style.transition = "filter 0.3s ease";
    card.style.filter = `drop-shadow(${factorX * -12}px ${factorY * -12}px 36px rgba(98, 206, 193, 0.22)) drop-shadow(0 4px 12px rgba(0,0,0,0.06))`;
  };

  const handleMouseLeave = (e) => {
    delete e.currentTarget._cachedRect;
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)`;
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease";
    card.style.filter = `drop-shadow(0 24px 60px ${slides[active].labelColor}22) drop-shadow(0 4px 12px rgba(0,0,0,0.06))`;
  };

  const handleMagneticMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const btn = e.currentTarget;
    let rect = btn._cachedRect;
    if (!rect) {
      rect = btn.getBoundingClientRect();
      btn._cachedRect = rect;
    }
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0) scale(1.02)`;
    btn.style.transition = "box-shadow 0.3s, filter 0.3s";
  };

  const handleMagneticLeave = (e) => {
    delete e.currentTarget._cachedRect;
    const btn = e.currentTarget;
    btn.style.transform = `translate3d(0, 0, 0) scale(1)`;
    btn.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s, filter 0.3s";
  };

  const slide = slides[active];

  return (
    <section
      style={{
        background: "transparent",
        overflow: "hidden",
        position: "relative",
        "--grid-color": `${slide.labelColor}0a`,
      }}
      className="min-h-0 md:min-h-[calc(100vh-72px)] flex flex-col md:flex-row"
    >
      {/* Dynamic slow-motion floating glass bubbles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ contain: "paint" }}>
        {/* Left side viewport bubbles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`hero-bubble-left-${i}`}
            className={`hero-glass-bubble-${(i % 4) + 1} absolute rounded-full`}
            style={{
              width: 70 + i * 20,
              height: 70 + i * 20,
              left: `${-2 + i * 2.5}%`,
              top: `${5 + i * 15}%`,
              animationDelay: `${i * -2.2}s`,
              animationDuration: `${4 + i * 1}s`,
            }}
          />
        ))}
        {/* Right side viewport bubbles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`hero-bubble-right-${i}`}
            className={`hero-glass-bubble-${((i + 1) % 4) + 1} absolute rounded-full`}
            style={{
              width: 80 + i * 22,
              height: 80 + i * 22,
              left: `${80 + i * 2.5}%`,
              top: `${10 + i * 12}%`,
              animationDelay: `${i * -3.1}s`,
              animationDuration: `${5 + i * 1}s`,
            }}
          />
        ))}
      </div>

      {/* Dynamic high-tech grid background */}
      <div className="hero-grid-overlay" />
      {/* Smooth cross-fading background gradients */}
      {slides.map((item, index) => (
        <div
          key={`bg-${index}`}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: item.bg,
            opacity: active === index ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
          }}
        />
      ))}

      {/* Slide-specific animated background effects */}
      {active === 0 && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="floating-tech-dot" style={{ top: "15%", left: "12%", width: 14, height: 14, animationDelay: "0s", animationDuration: "5s", background: slide.accentColor }} />
          <div className="floating-tech-dot" style={{ top: "55%", left: "28%", width: 9, height: 9, animationDelay: "1.2s", animationDuration: "6s", background: slide.labelColor }} />
          <div className="floating-tech-dot" style={{ top: "35%", left: "42%", width: 18, height: 18, animationDelay: "2.5s", animationDuration: "7s", background: slide.accentColor }} />
          <div className="floating-tech-dot" style={{ top: "75%", left: "22%", width: 11, height: 11, animationDelay: "4s", animationDuration: "5.5s", background: slide.labelColor }} />
        </div>
      )}

      {active === 1 && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="mirsa-cyber-wave" style={{ background: `linear-gradient(0deg, transparent, ${slide.labelColor}0b 50%, transparent 100%)` }} />
        </div>
      )}

      {active === 2 && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="golden-spark" style={{ bottom: "12%", left: "12%", width: 6, height: 6, animationDelay: "0s", animationDuration: "6.5s", background: slide.accentColor, boxShadow: `0 0 8px ${slide.accentColor}` }} />
          <div className="golden-spark" style={{ bottom: "22%", left: "32%", width: 4, height: 4, animationDelay: "1.8s", animationDuration: "4.8s", background: slide.labelColor, boxShadow: `0 0 8px ${slide.labelColor}` }} />
          <div className="golden-spark" style={{ bottom: "8%", left: "42%", width: 8, height: 8, animationDelay: "0.8s", animationDuration: "7.5s", background: slide.accentColor, boxShadow: `0 0 8px ${slide.accentColor}` }} />
          <div className="golden-spark" style={{ bottom: "18%", left: "28%", width: 5, height: 5, animationDelay: "2.8s", animationDuration: "5.8s", background: slide.labelColor, boxShadow: `0 0 8px ${slide.labelColor}` }} />
        </div>
      )}

      {/* Floating cinematic ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: slide.labelColor,
          filter: "blur(120px)",
          zIndex: 1,
          pointerEvents: "none",
          animation: "floatOrb 12s ease-in-out infinite alternate",
          transition: "background 1.2s ease-in-out",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "50%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: slide.accentColor,
          filter: "blur(130px)",
          zIndex: 1,
          pointerEvents: "none",
          animation: "floatOrb2 16s ease-in-out infinite alternate-reverse",
          transition: "background 1.2s ease-in-out",
        }}
      />

      <div
        style={{
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          position: "relative",
          zIndex: 2,
        }}
        className="w-full md:w-[clamp(340px,42%,520px)] p-5 md:p-12 min-h-0 md:min-h-full"
      >
        {/* Parent container that holds the drop shadow */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            filter: `drop-shadow(0 24px 60px ${slide.labelColor}22) drop-shadow(0 4px 12px rgba(0,0,0,0.06))`,
            transformStyle: "preserve-3d",
            transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s ease",
            "--slide-shadow": `${slide.labelColor}55`,
            width: "100%",
          }}
          className="min-h-[380px] md:min-h-[480px]"
        >
          <div
            style={{
              clipPath: "polygon(0% 4%, 4% 0%, 88% 0%, 100% 12%, 100% 96%, 96% 100%, 12% 100%, 0% 88%)",
              backgroundImage: "linear-gradient(135deg, #105DA1 0%, #1a73e8 50%, #14b8a6 100%)",
              backgroundSize: "200% 200%",
              animation: "rotateGradient 6s linear infinite",
              padding: "1.5px", // acts as the border width
              width: "100%",
              height: "100%",
            }}
          >
             {/* Card inner clipping container */}
             <div
               style={{
                 clipPath: "polygon(0% 4%, 4% 0%, 88% 0%, 100% 12%, 100% 96%, 96% 100%, 12% 100%, 0% 88%)",
                 backgroundImage: "linear-gradient(135deg, rgba(16, 93, 161, 0.94) 0%, rgba(20, 184, 166, 0.90) 100%)",
                 backdropFilter: "blur(28px)",
                 WebkitBackdropFilter: "blur(28px)",
                 border: "1.5px solid rgba(255, 255, 255, 0.22)",
                 position: "relative",
                 overflow: "hidden",
                 width: "100%",
                 height: "100%",
                 transformStyle: "preserve-3d",
                 transition: "backgroundImage 0.8s ease",
               }}
               className="p-6 md:p-10 min-h-[380px] md:min-h-[480px]"
            >
              {/* Inner card floating glass bubbles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={`card-bubble-${i}`}
                    className={`hero-glass-bubble-${((i + 2) % 4) + 1} absolute rounded-full`}
                    style={{
                      width: 60 + i * 20,
                      height: 60 + i * 20,
                      left: `${10 + i * 18}%`,
                      top: `${15 + (i % 2) * 45}%`,
                      animationDelay: `${i * -2.5}s`,
                      animationDuration: `${3 + i * 0.8}s`,
                    }}
                  />
                ))}
              </div>

              {/* Radar Sonar Ripple Wave Effect */}
              <div
                style={{
                  position: "absolute",
                  top: "12%",
                  right: "10%",
                  width: 120,
                  height: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                {/* Expanding Ripple 1 */}
                <div
                  className="radar-ripple"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `1.5px solid ${slide.labelColor}40`,
                    animation: "radarRipple 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
                    animationDelay: "0s",
                  }}
                />
                {/* Expanding Ripple 2 */}
                <div
                  className="radar-ripple"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `1.5px solid ${slide.labelColor}30`,
                    animation: "radarRipple 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
                    animationDelay: "1.3s",
                  }}
                />
                {/* Expanding Ripple 3 */}
                <div
                  className="radar-ripple"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: `1.5px solid ${slide.labelColor}15`,
                    animation: "radarRipple 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
                    animationDelay: "2.6s",
                  }}
                />
                {/* Inner static subtle ring */}
                <div
                  style={{
                    position: "absolute",
                    width: "50%",
                    height: "50%",
                    borderRadius: "50%",
                    border: `1px solid ${slide.labelColor}25`,
                  }}
                />
                {/* Central Solid Dot */}
                <div
                  style={{
                    position: "absolute",
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: slide.labelColor,
                    boxShadow: `0 0 10px ${slide.labelColor}`,
                  }}
                />
              </div>

              {/* Sweep card shine animation */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.15) 80%, transparent)",
                  transform: "translateX(-150%) skewX(-25deg)",
                  animation: "cardShine 8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <div
                key={active}
                style={{
                  position: "relative",
                  zIndex: 2,
                  animation: "slideUpFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: slide.labelColor,
                      boxShadow: `0 0 12px ${slide.labelColor}`,
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: f,
                      fontSize: 13,
                      fontWeight: 800,
                      color: slide.labelColor,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {slide.label}
                  </span>
                </div>

                <AnimatedHeading text={slide.heading} color={slide.accentColor} />
                <h2 className="sr-only">
AI Product Engineering Company
</h2>

                <p
                className="hero-description"
                  style={{
                    fontFamily: f,
                    fontSize: 14,
                    color: "rgba(255, 255, 255, 0.82)",
                    lineHeight: 1.8,
                    marginBottom: 28,
                    maxWidth: 360,
                  }}
                >
                  ThinkAlternate is an AI Product Engineering company specializing in Agentic AI, Generative AI, Cloud Engineering, Digital Transformation, and Enterprise Software Development. We help startups and enterprises design, build, modernize, and scale intelligent applications, cloud-native platforms, automation systems, and AI-powered products that drive innovation, operational efficiency, and long-term business growth.
                </p>
                {/* GEO / AEO Content */}
<div className="sr-only">
  <h2>What does ThinkAlternate do?</h2>

  <p>
    ThinkAlternate is an AI Product Engineering company that helps startups
    and enterprises build AI-powered applications, cloud-native platforms,
    agentic AI systems, automation solutions, and digital transformation
    products.
  </p>

  <h2>Our Services</h2>

  <ul>
    <li>AI Product Development</li>
    <li>Generative AI Solutions</li>
    <li>Agentic AI Development</li>
    <li>AWS Cloud Engineering</li>
    <li>Digital Transformation</li>
    <li>Application Modernization</li>
    <li>Fractional CTO Services</li>
  </ul>

  <h2>Industries We Serve</h2>

  <p>
    Healthcare, FinTech, SaaS, Manufacturing,
    Retail, Logistics, Education and Enterprise Software.
  </p>
</div>

                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginBottom: 28 }}>
                  <Link
                    href={slide.href}
                    className="cta-button-premium"
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "13px 26px",
                      borderRadius: 999,
                      background: "linear-gradient(to right, #105DA1 0%, #1a73e8 50%, #14b8a6 100%)",
                      color: "#0f172a",
                      fontFamily: f,
                      fontSize: 14,
                      fontWeight: 800,
                      textDecoration: "none",
                      boxShadow: "0 8px 28px rgba(98, 206, 193, 0.25)",
                      letterSpacing: "-0.01em",
                      transition: "transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s, filter 0.3s",
                    }}
                  >
                    {slide.cta}
                    <span style={{ display: "inline-block", marginLeft: 8 }}>→</span>
                  </Link>

                  <a
                    href="/case-study"
                    className="secondary-link-premium"
                    style={{
                      fontFamily: f,
                      fontSize: 13,
                      fontWeight: 700,
                      color: slide.labelColor,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      paddingBottom: 2,
                    }}
                  >
                    View Work
                  </a>
                </div>

                {/* Staggered Floating Stat Badges with Decorative Icons */}
                <div
                  style={{
                    position: "relative",
                    height: 180,
                    width: "100%",
                    marginTop: 20,
                    marginBottom: 10,
                    pointerEvents: "none"
                  }}
                >
                  {/* High-Tech Dotted Grid Backdrop */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `radial-gradient(${slide.labelColor}1a 1.2px, transparent 1.2px)`,
                      backgroundSize: "16px 16px",
                      opacity: 0.85,
                      pointerEvents: "none",
                      zIndex: 0,
                      borderRadius: "16px",
                    }}
                  />

                  {/* High-Tech Animated Data Linkage Lines */}
                  <svg
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  >
                    {/* Link 1: Badge 1 (50+ Projects) to Badge 2 (20+ Clients) */}
                    <path
                      d="M 90 35 L 180 48"
                      stroke={`${slide.labelColor}25`}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Glowing crawling spark on Link 1 */}
                    <path
                      d="M 90 35 L 180 48"
                      stroke={slide.accentColor}
                      strokeWidth="2.5"
                      strokeDasharray="8 50"
                      fill="none"
                      style={{
                        animation: "crawlingSpark 3s linear infinite",
                      }}
                    />

                    {/* Link 2: Badge 1 (50+ Projects) to Badge 3 (99.9% Uptime) */}
                    <path
                      d="M 50 60 L 50 115"
                      stroke={`${slide.labelColor}25`}
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {/* Glowing crawling spark on Link 2 */}
                    <path
                      d="M 50 60 L 50 115"
                      stroke={slide.accentColor}
                      strokeWidth="2.5"
                      strokeDasharray="8 40"
                      fill="none"
                      style={{
                        animation: "crawlingSpark 2.5s linear infinite",
                      }}
                    />
                  </svg>

                  {/* Floating Neon Fluid Backdrop Orb */}
                  <div
                    style={{
                      position: "absolute",
                      width: 160,
                      height: 160,
                      borderRadius: "50%",
                      backgroundImage: `radial-gradient(circle, ${slide.labelColor}25 0%, transparent 70%)`,
                      filter: "blur(20px)",
                      animation: "neonOrbMove 12s ease-in-out infinite alternate",
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  />

                  {/* Badge 1: 50+ Projects (Top Left) */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 10,
                      pointerEvents: "auto",
                      animation: "floatBadge1 2s ease-in-out infinite alternate",
                    }}
                  >
                    <div style={{ animation: "badgeEntry 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
                      <StatBadge value="50+" label="Projects" color={slide.labelColor} />
                    </div>
                  </div>

                  {/* Badge 2: 20+ Clients (Top Right, shifted slightly lower/right) */}
                  <div
                    style={{
                      position: "absolute",
                      top: 15,
                      left: "calc(45% + 10px)",
                      zIndex: 10,
                      pointerEvents: "auto",
                      animation: "floatBadge2 2.5s ease-in-out infinite alternate 0.25s",
                    }}
                  >
                    <div style={{ animation: "badgeEntry 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.08s", opacity: 0 }}>
                      <StatBadge value="20+" label="Clients" color={slide.labelColor} />
                    </div>
                  </div>

                  {/* Badge 3: 99.9% Uptime (Bottom Left) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 5,
                      left: 0,
                      zIndex: 10,
                      pointerEvents: "auto",
                      animation: "floatBadge3 2.2s ease-in-out infinite alternate 0.5s",
                    }}
                  >
                    <div style={{ animation: "badgeEntry 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.15s", opacity: 0 }}>
                      <StatBadge value="99.9%" label="Uptime" color={slide.labelColor} />
                    </div>
                  </div>

                  {/* Floating SVG Illustrations with Interactive Wrapper Divs */}
                  {/* Target / Radar Icon (Behind Badge 1 and 2) */}
                  <div
                    style={{
                      position: "absolute",
                      top: -15,
                      left: "35%",
                      zIndex: 1,
                      pointerEvents: "auto",
                      animation: "radarRotation 8s linear infinite",
                    }}
                  >
                    <svg
                      className="floating-svg-interactive"
                      style={{
                        width: 55,
                        height: 55,
                        opacity: 0.8,
                        display: "block",
                        filter: `drop-shadow(0 2px 8px ${slide.labelColor}40)`,
                      }}
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <circle cx="50" cy="50" r="40" stroke={slide.labelColor} strokeWidth="2" strokeDasharray="4 4" style={{ animation: "radarPulse 1.5s ease-in-out infinite alternate", transformOrigin: "50px 50px" }} />
                      <circle cx="50" cy="50" r="28" stroke={slide.labelColor} strokeWidth="1.5" style={{ animation: "radarPulse 1.5s ease-in-out infinite alternate 0.25s", transformOrigin: "50px 50px" }} />
                      <circle cx="50" cy="50" r="16" stroke={slide.labelColor} strokeWidth="1" />
                      <line x1="50" y1="10" x2="50" y2="90" stroke={slide.labelColor} strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="10" y1="50" x2="90" y2="50" stroke={slide.labelColor} strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="5" fill={slide.labelColor} />
                    </svg>
                  </div>

                  {/* Gold Trophy Icon (Next to Uptime badge) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 30,
                      left: "40%",
                      zIndex: 1,
                      pointerEvents: "auto",
                      animation: "trophyBob 2s ease-in-out infinite alternate 0.15s",
                    }}
                  >
                    <svg
                      className="floating-svg-interactive"
                      style={{
                        width: 32,
                        height: 32,
                        opacity: 0.95,
                        display: "block",
                        filter: "drop-shadow(0 2px 8px rgba(234, 179, 8, 0.4))",
                      }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#eab308"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" fill="#fef08a" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" fill="#fef08a" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                      <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z" fill="#facc15" />
                    </svg>
                  </div>

                  {/* Growth Line Chart Icon (Next to Trophy) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 40,
                      left: "52%",
                      zIndex: 1,
                      pointerEvents: "auto",
                      animation: "floatBadge2 3s ease-in-out infinite alternate 0.3s",
                    }}
                  >
                    <svg
                      className="floating-svg-interactive"
                      style={{
                        width: 44,
                        height: 34,
                        opacity: 0.85,
                        display: "block",
                        filter: "drop-shadow(0 2px 8px rgba(0, 206, 209, 0.35))",
                      }}
                      viewBox="0 0 120 90"
                      fill="none"
                    >
                      <defs>
                        <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00CED1" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#00CED1" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Chart Grid Lines */}
                      <line x1="0" y1="15" x2="120" y2="15" stroke="#cbd5e1" strokeWidth="0.8" />
                      <line x1="0" y1="45" x2="120" y2="45" stroke="#cbd5e1" strokeWidth="0.8" />
                      <line x1="0" y1="75" x2="120" y2="75" stroke="#cbd5e1" strokeWidth="0.8" />
                      <line x1="30" y1="0" x2="30" y2="90" stroke="#cbd5e1" strokeWidth="0.8" />
                      <line x1="60" y1="0" x2="60" y2="90" stroke="#cbd5e1" strokeWidth="0.8" />
                      <line x1="90" y1="0" x2="90" y2="90" stroke="#cbd5e1" strokeWidth="0.8" />

                      {/* Chart Area Fill */}
                      <path
                        d="M10 80 L35 65 L60 40 L90 55 L115 15 L115 85 L10 85 Z"
                        fill="url(#chartAreaGradient)"
                        style={{
                          animation: "fillArea 2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.5s",
                          transformOrigin: "center bottom",
                        }}
                      />

                      {/* Chart Line Path */}
                      <path
                        d="M10 80 L35 65 L60 40 L90 55 L115 15"
                        stroke="#00CED1"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          strokeDasharray: 150,
                          strokeDashoffset: 150,
                          animation: "drawLine 2s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.5s",
                        }}
                      />

                      {/* Chart Peak Node */}
                      <circle
                        cx="115"
                        cy="15"
                        r="4.5"
                        fill="#00CED1"
                        style={{
                          animation: "chartDotPulse 1.5s ease-in-out infinite alternate 2.2s",
                          transformOrigin: "115px 15px",
                        }}
                      />

                      {/* Rising Neon Sparks / Particles */}
                      <circle
                        cx="115"
                        cy="15"
                        r="2"
                        fill="#00CED1"
                        style={{
                          animation: "riseParticle1 1.2s infinite ease-out 0.6s",
                          transformOrigin: "115px 15px",
                        }}
                      />
                      <circle
                        cx="115"
                        cy="15"
                        r="1.5"
                        fill="#00CED1"
                        style={{
                          animation: "riseParticle2 1.5s infinite ease-out 0.9s",
                          transformOrigin: "115px 15px",
                        }}
                      />
                    </svg>
                  </div>

                  {/* Briefcase Icon (On the far right) */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 25,
                      right: "6%",
                      zIndex: 1,
                      pointerEvents: "auto",
                      animation: "briefcaseSwing 2.5s ease-in-out infinite alternate 0.3s",
                    }}
                  >
                    <svg
                      className="floating-svg-interactive"
                      style={{
                        width: 32,
                        height: 32,
                        opacity: 0.8,
                        display: "block",
                        filter: "drop-shadow(0 2px 8px rgba(180, 83, 9, 0.3))",
                      }}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#854d0e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" fill="#b45309" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 24, paddingLeft: 4 }}>
          {slides.map((item, index) => (
            <button
              key={item.label}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="hero-dot"
              suppressHydrationWarning
              style={{
                width: active === index ? 32 : 8,
                height: 8,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                padding: 0,
                background: active === index ? "#ffffff" : "rgba(255, 255, 255, 0.35)",
                transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
          cursor: playing ? "default" : "pointer",
          background: "#000",
        }}
        className="min-h-[260px] md:min-h-[500px]"
        onClick={() => !playing && setPlaying(true)}
      >
        <style jsx global>{`
          .hero-glass-bubble {
            background: linear-gradient(135deg, rgba(16, 93, 161, 0.42) 0%, rgba(20, 184, 166, 0.42) 100%);
            border: 1.5px solid rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
            box-shadow: inset 0 2px 5px rgba(255,255,255,0.45), 0 8px 30px rgba(16, 93, 161, 0.35);
            animation: heroBubbleFloat infinite ease-in-out;
            will-change: transform, opacity;
            opacity: 0;
            z-index: 1;
            pointer-events: none;
          }
          @keyframes heroBubbleFloat {
            0% {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 0.45;
            }
            50% {
              transform: translate3d(15px, -45px, 0) scale(1.06);
              opacity: 0.85;
            }
            100% {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 0.45;
            }
          }
          .hero-dot {
            transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.4s ease !important;
          }
          .hero-dot:hover {
            background-color: rgba(255, 255, 255, 0.8) !important;
          }
          .hero-slow-motion {
            will-change: transform, opacity;
          }
          @keyframes liquidDiamondFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes heroSlowMotion {
            0% {
              transform: scale(1.03) translate3d(-0.5%, -0.5%, 0);
            }
            50% {
              transform: scale(1.08) translate3d(0.5%, 0.5%, 0);
            }
            100% {
              transform: scale(1.03) translate3d(-0.5%, -0.5%, 0);
            }
          }

          @keyframes radarRipple {
            0% {
              transform: scale(0.3);
              opacity: 0.8;
            }
            80% {
              opacity: 0.35;
            }
            100% {
              transform: scale(1);
              opacity: 0;
            }
          }

          @keyframes badgeEntry {
            0% { opacity: 0; transform: scale(0.8) translateY(20px); }
            100% { opacity: 1; transform: scale(1) translateY(0px); }
          }

          @keyframes floatBadge1 {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-8px); }
          }

          @keyframes floatBadge2 {
            0% { transform: translate(0px, 0px); }
            100% { transform: translate(6px, -10px); }
          }

          @keyframes floatBadge3 {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-6px); }
          }

          @keyframes radarRotation {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes radarPulse {
            0% { opacity: 0.35; transform: scale(0.96); }
            100% { opacity: 0.95; transform: scale(1.04); }
          }

          @keyframes drawLine {
            from { stroke-dashoffset: 150; }
            to { stroke-dashoffset: 0; }
          }

          @keyframes chartDotPulse {
            0% { r: 4.5; fill-opacity: 0.6; filter: drop-shadow(0 0 1px #ef4444); }
            100% { r: 7.5; fill-opacity: 1; filter: drop-shadow(0 0 10px #ef4444); }
          }

          @keyframes trophyBob {
            0% { transform: translateY(0px) rotate(-3deg); }
            100% { transform: translateY(-12px) rotate(5deg); }
          }

          @keyframes briefcaseSwing {
            0% { transform: translateY(0px) rotate(-4deg); }
            100% { transform: translateY(-9px) rotate(4deg); }
          }

          @keyframes rotateGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes neonOrbMove {
            0% { transform: translate(0px, 0px); }
            50% { transform: translate(120px, 40px); }
            100% { transform: translate(60px, -20px); }
          }

          @keyframes crawlingSpark {
            0% { stroke-dashoffset: 80; }
            100% { stroke-dashoffset: 0; }
          }

          @keyframes fillArea {
            0% { opacity: 0; transform: scaleY(0); }
            100% { opacity: 1; transform: scaleY(1); }
          }

          @keyframes riseParticle1 {
            0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
            50% { opacity: 1; }
            100% { transform: translate(12px, -24px) scale(0.2); opacity: 0; }
          }

          @keyframes riseParticle2 {
            0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
            50% { opacity: 1; }
            100% { transform: translate(-8px, -28px) scale(0.2); opacity: 0; }
          }

          .floating-svg-interactive {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease, opacity 0.3s ease !important;
            cursor: pointer;
          }
          .floating-svg-interactive:hover {
            transform: scale(1.25) !important;
            filter: drop-shadow(0 10px 20px rgba(0,0,0,0.15)) drop-shadow(0 0 12px var(--slide-shadow)) !important;
            opacity: 1 !important;
          }

          @keyframes floatOrb {
            0% {
              transform: translate3d(0, 0, 0) scale(1);
              opacity: 0.18;
            }
            50% {
              transform: translate3d(45px, -40px, 0) scale(1.22);
              opacity: 0.35;
            }
            100% {
              transform: translate3d(-25px, 20px, 0) scale(0.95);
              opacity: 0.22;
            }
          }

          @keyframes floatOrb2 {
            0% {
              transform: translate3d(0, 0, 0) scale(0.9);
              opacity: 0.12;
            }
            50% {
              transform: translate3d(-40px, 45px, 0) scale(1.18);
              opacity: 0.28;
            }
            100% {
              transform: translate3d(20px, -25px, 0) scale(1.02);
              opacity: 0.18;
            }
          }

          @keyframes slideUpFade {
            0% {
              opacity: 0;
              transform: translateY(18px) scale(0.99);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes wordSlideUp {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes cardShine {
            0% {
              transform: translateX(-150%) skewX(-25deg);
            }
            40% {
              transform: translateX(150%) skewX(-25deg);
            }
            100% {
              transform: translateX(150%) skewX(-25deg);
            }
          }

          @keyframes playRipple {
            0% {
              transform: scale(1);
              opacity: 0.8;
            }
            100% {
              transform: scale(2.2);
              opacity: 0;
            }
          }

          .play-pulse-ring {
            position: absolute;
            width: 84px;
            height: 84px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.45);
            animation: playRipple 2.2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
            pointer-events: none;
            z-index: 0;
          }

          .play-button-premium:hover {
            transform: scale(1.12);
            background: rgba(255, 255, 255, 0.35) !important;
            border-color: rgba(255, 255, 255, 0.85) !important;
            box-shadow: 0 15px 35px rgba(255, 255, 255, 0.25), 0 5px 15px rgba(0,0,0,0.2) !important;
          }

          .play-button-premium:hover svg {
            transform: scale(1.08);
          }

          .cta-button-premium:hover {
            transform: translateY(-2px) scale(1.03);
            filter: brightness(1.08);
            box-shadow: 0 12px 32px var(--slide-shadow) !important;
          }
          .cta-button-premium:active {
            transform: translateY(1px) scale(0.98);
          }

          .secondary-link-premium {
            position: relative;
            transition: color 0.3s, filter 0.3s;
          }
          .secondary-link-premium::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 1.5px;
            background-color: currentColor;
            transform: scaleX(0.7);
            transform-origin: bottom left;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .secondary-link-premium:hover::after {
            transform: scaleX(1);
          }
          .secondary-link-premium:hover {
            filter: brightness(0.85);
          }

          .nav-dot {
            transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, transform 0.2s !important;
          }
          .nav-dot:hover {
            transform: scale(1.2);
            background-color: ${slide.labelColor} !important;
          }

          .nav-btn-premium {
            transition: background-color 0.3s, border-color 0.3s, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          }
          .nav-btn-premium:hover {
            background-color: rgba(255, 255, 255, 0.32) !important;
            border-color: rgba(255, 255, 255, 0.8) !important;
            transform: scale(1.1);
          }
          .nav-btn-premium:active {
            transform: scale(0.95);
          }
          .nav-btn-premium:hover svg {
            transform: scale(1.1);
          }

          .hero-media-wrapper {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, background 0.8s ease !important;
          }
          @media (min-width: 768px) {
            .hero-media-wrapper:hover {
              transform: translateY(-4px) scale(1.01) !important;
              box-shadow: 0 32px 90px var(--slide-shadow), 0 10px 30px rgba(0,0,0,0.12) !important;
            }
          }

          .hero-grid-overlay {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(var(--grid-color) 1.5px, transparent 1.5px),
              linear-gradient(90deg, var(--grid-color) 1.5px, transparent 1.5px);
            background-size: 48px 48px;
            background-position: center center;
            transform: perspective(800px) rotateX(62deg) translateZ(-110px) translateY(-40px);
            transform-origin: top center;
            mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 85%);
            -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 85%);
            pointer-events: none;
            z-index: 1;
            opacity: 0.8;
            transition: opacity 1.2s ease-in-out;
          }

          @keyframes scrollDot {
            0% {
              transform: translate3d(0, 0, 0);
              opacity: 1;
            }
            50% {
              transform: translate3d(0, 6px, 0);
              opacity: 0.3;
            }
            100% {
              transform: translate3d(0, 0, 0);
              opacity: 1;
            }
          }
          .scroll-dot {
            animation: scrollDot 2s ease-in-out infinite;
            will-change: transform;
          }

          @keyframes floatTechDot {
            0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.15; }
            50% { transform: translate3d(18px, -24px, 0) scale(1.15); opacity: 0.45; }
            100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.15; }
          }
          .floating-tech-dot {
            position: absolute;
            border-radius: 50%;
            animation: floatTechDot infinite ease-in-out;
            will-change: transform;
          }

          @keyframes cyberWave {
            0% { background-position: 0% 0%; }
            100% { background-position: 0% 100%; }
          }
          .mirsa-cyber-wave {
            position: absolute;
            inset: 0;
            background-size: 100% 200%;
            animation: cyberWave 5s linear infinite;
            will-change: background-position;
          }

          @keyframes riseSpark {
            0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translate3d(0, -120px, 0) scale(0.4); opacity: 0; }
          }
          .golden-spark {
            position: absolute;
            border-radius: 50%;
            animation: riseSpark infinite linear;
            will-change: transform;
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-slow-motion {
              animation: none !important;
              transform: none !important;
            }
            .play-pulse-ring {
              animation: none !important;
            }
            .scroll-dot {
              animation: none !important;
            }
            .floating-tech-dot,
            .mirsa-cyber-wave,
            .golden-spark {
              animation: none !important;
            }
          }
        `}</style>

        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }}>
          {slides.map((item, index) => {
            return (
              <div
                key={item.thumb}
                className="hero-slow-motion"
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: active === index ? 1 : 0,
                  transition: "opacity 1.2s ease-in-out",
                  transformOrigin: item.motionOrigin,
                  animation: active === index ? "heroSlowMotion 15s ease-in-out infinite alternate" : "none",
                  pointerEvents: active === index ? "auto" : "none",
                }}
              >
                <Image
                  src={item.thumb}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={true}
                  fetchPriority="high"
                  loading="eager"
                  quality={75}
                  unoptimized={process.env.NODE_ENV === "development"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          })}
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: `linear-gradient(to right, ${slide.labelColor}30, transparent 60%), linear-gradient(to top, rgba(0,0,0,0.45), transparent 50%)`,
            transition: "background 1.2s ease-in-out",
            pointerEvents: "none",
          }}
        />

        {!playing && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Pulsing ripples for premium feeling */}
              <div className="play-pulse-ring" style={{ animationDelay: "0s" }} />
              <div className="play-pulse-ring" style={{ animationDelay: "0.55s" }} />

              <button
                aria-label="Play video"
                suppressHydrationWarning
                onClick={(event) => {
                  event.stopPropagation();
                  setPlaying(true);
                }}
                className="play-button-premium"
                style={{
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.25)",
                  backdropFilter: "blur(20px)",
                  border: "2px solid rgba(255, 255, 255, 0.65)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "auto",
                  transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s, border-color 0.3s, box-shadow 0.3s",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                }}
              >
                <svg viewBox="0 0 68 48" width="44" height="30" style={{ transition: "transform 0.3s" }}>
                  <path
                    d="M66.5 7.7c-.8-2.9-3-5.1-5.8-5.9C55.8.5 34 .5 34 .5S12.2.5 7.3 1.8C4.5 2.6 2.3 4.9 1.5 7.7.2 12.7.2 24 .2 24s0 11.3 1.3 16.3c.8 2.9 3 5.1 5.8 5.9C12.2 47.5 34 47.5 34 47.5s21.8 0 26.7-1.3c2.8-.8 5-3 5.8-5.9 1.3-5 1.3-16.3 1.3-16.3s0-11.3-1.3-16.3z"
                    fill="red"
                  />
                  <path d="M27 34l18-10-18-10z" fill="white" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: 24,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 14,
            padding: "10px 16px",
          }}
        >
          <p
            style={{
              fontFamily: f,
              fontSize: 9,
              fontWeight: 700,
              color: "rgba(255,255,255,0.75)",
              margin: "0 0 3px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            Now Playing
          </p>
          <p
            style={{
              fontFamily: f,
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              margin: 0,
            }}
          >
            {slide.label} — Product Overview
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 28, right: 24, display: "flex", gap: 8 }}>
          <button
            onClick={() => goTo((active - 1 + slides.length) % slides.length)}
            className="nav-btn-premium"
            suppressHydrationWarning
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Previous slide"
          >
            <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth={2.5} viewBox="0 0 24 24" style={{ transition: "transform 0.3s" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo((active + 1) % slides.length)}
            className="nav-btn-premium"
            suppressHydrationWarning
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(255,255,255,0.4)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Next slide"
          >
            <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth={2.5} viewBox="0 0 24 24" style={{ transition: "transform 0.3s" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {playing && (
          <div style={{ position: "absolute", inset: 0, zIndex: 10 }}>
            <iframe
              title="Company introduction video"
              style={{ width: "100%", height: "100%", border: "none" }}
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPlaying(false);
              }}
              suppressHydrationWarning
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                zIndex: 20,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 999,
                color: "#fff",
                fontFamily: f,
                fontSize: 12,
                fontWeight: 700,
                padding: "6px 14px",
                cursor: "pointer",
              }}
            >
              ✕ Close
            </button>
          </div>
        )}
      </div>

      <div className="hidden md:block">
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
          onClick={() => {
            const nextSec = document.getElementById("clients");
            if (nextSec) nextSec.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span
            style={{
              fontFamily: f,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.15em",
              color: "rgba(255, 255, 255, 0.4)",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 16,
              height: 26,
              borderRadius: 12,
              border: "1.5px solid rgba(255, 255, 255, 0.25)",
              display: "flex",
              justifyContent: "center",
              paddingTop: 4,
            }}
          >
            <div
              className="scroll-dot"
              style={{
                width: 4,
                height: 8,
                borderRadius: 99,
                background: slide.labelColor,
                position: "absolute",
                top: 6,
                left: "calc(50% - 2px)",
                transition: "background 1.2s ease",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
