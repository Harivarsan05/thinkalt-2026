"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    id: 2,
    title: "AI Chatbot Platform",
    tag: "AI / NLP",
    color: "from-[#105DA1] via-[#1a73e8] to-[#14b8a6]",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=900&auto=format&fit=crop",
    lottie: "/animations/chatbot.json",
    desc: "Built a multi-tenant GPT-4 powered customer support platform handling 2M+ messages/month with 94% deflection rate and real-time sentiment analysis.",
    metrics: ["2M+ msgs/month", "94% deflection", "40ms latency"],
    client: "SaaS Startup - Series B",
  },
  {
    id: 6,
    title: "AWS Cloud Migration",
    tag: "Cloud / DevOps",
    color: "from-[#105DA1] via-[#1a73e8] to-[#14b8a6]",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=900&auto=format&fit=crop",
    lottie: "/animations/cloud.json",
    desc: "Migrated a 12-year-old monolithic ERP to AWS microservices on EKS, reducing infrastructure costs by 43% and cutting deployment time from 3 days to 12 minutes.",
    metrics: ["43% cost cut", "12 min deploys", "99.99% uptime"],
    client: "Manufacturing Enterprise",
  },
  {
    id: 14,
    title: "E-Commerce Platform",
    tag: "Web / UX",
    color: "from-[#105DA1] via-[#1a73e8] to-[#14b8a6]",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&auto=format&fit=crop",
    lottie: "/animations/ecommerce.json",
    desc: "End-to-end Next.js + Shopify headless commerce store with personalised AI recommendations, resulting in 3.2x conversion rate uplift and $4M in first-year GMV.",
    metrics: ["3.2x conversion", "$4M GMV Y1", "1.8s load time"],
    client: "D2C Fashion Brand",
  },
  {
    id: 10,
    title: "Mobile Banking App",
    tag: "Mobile / Fintech",
    color: "from-[#105DA1] via-[#1a73e8] to-[#14b8a6]",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=900&auto=format&fit=crop",
    lottie: "https://lottie.host/2df8f976-59a6-4f46-993d-51a8d052b618/y0p4Hw6fP1.json",
    desc: "React Native neobank app with biometric auth, UPI stack integration, spend analytics and real-time fraud detection - RBI compliant, 500K+ downloads in 6 months.",
    metrics: ["500K+ downloads", "RBI compliant", "4.8 star rating"],
    client: "Fintech Startup - Seed",
  },
  {
    id: 5,
    title: "DevOps Automation",
    tag: "DevOps / CI-CD",
    color: "from-[#105DA1] via-[#1a73e8] to-[#14b8a6]",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=900&auto=format&fit=crop",
    lottie: "https://lottie.host/dd595561-127e-4078-a28a-782a52bbbe3f/tZ5W4FpP9H.json",
    desc: "Designed GitHub Actions + Terraform + ArgoCD GitOps pipeline for a 60-engineer team, reducing release cycle from 2 weeks to daily, with full rollback capability.",
    metrics: ["Daily releases", "2 wk to 1 day", "Zero downtime"],
    client: "EdTech Platform - Series A",
  },
  {
    id: 13,
    title: "Business Intelligence Dashboard",
    tag: "Analytics / SaaS",
    color: "from-[#105DA1] via-[#1a73e8] to-[#14b8a6]",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    lottie: "https://lottie.host/5a0c3bb2-337b-49ea-bc2e-1e9de45ffbe9/a4Q6C3Xm7N.json",
    desc: "React-time BI dashboard aggregating data from 15+ sources - Salesforce, Stripe, GA4 - with predictive revenue forecasting using Python ML models embedded in React.",
    metrics: ["15+ integrations", "Real-time sync", "92% forecast acc."],
    client: "B2B SaaS - $20M ARR",
  },
];
const LottiePlayer = ({ src }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "100px" });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const initPlayer = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        const player = document.createElement("lottie-player");
        player.setAttribute("src", src);
        player.setAttribute("background", "transparent");
        player.setAttribute("speed", "1");
        player.setAttribute("loop", "");
        player.style.width = "160px";
        player.style.height = "160px";
        player.style.transform = "scale(1.2)";
        containerRef.current.appendChild(player);
      }
    };

    const loadLottieScript = () => {
      if (!document.getElementById("lottie-player-script")) {
        const script = document.createElement("script");
        script.id = "lottie-player-script";
        script.src = "https://unpkg.com/@lottiefiles/lottie-player@2.0.4/dist/lottie-player.js";
        script.onload = initPlayer;
        document.body.appendChild(script);
      } else {
        if (window.customElements && window.customElements.get("lottie-player")) {
          initPlayer();
        } else {
          const interval = setInterval(() => {
            if (window.customElements && window.customElements.get("lottie-player")) {
              clearInterval(interval);
              initPlayer();
            }
          }, 50);
          return () => clearInterval(interval);
        }
      }
    };

    loadLottieScript();
  }, [src, isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    const cardElement = containerRef.current?.closest(".portfolio-card");
    if (!cardElement) return;

    const handlePlay = () => {
      const player = containerRef.current?.querySelector("lottie-player");
      if (player && typeof player.play === "function") {
        player.play();
      }
    };

    const handlePause = () => {
      const player = containerRef.current?.querySelector("lottie-player");
      if (player && typeof player.pause === "function") {
        player.pause();
      }
    };

    cardElement.addEventListener("mouseenter", handlePlay);
    cardElement.addEventListener("mouseleave", handlePause);
    return () => {
      cardElement.removeEventListener("mouseenter", handlePlay);
      cardElement.removeEventListener("mouseleave", handlePause);
    };
  }, [isVisible]);

  return <div ref={containerRef} className="w-[160px] h-[160px] flex items-center justify-center" />;
};

const getTopLeftSticker = (id) => {
  switch (id) {
    case 2: // AI Chatbot
      return (
        <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22" cy="22" r="20" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" />
          <path d="M14 16C14 14.8954 14.8954 14 16 14H28C29.1046 14 30 14.8954 30 16V26C30 27.1046 29.1046 28 28 28H20.8284C20.298 28 19.7893 28.2107 19.4142 28.5858L16 32V29.4142C16 28.698 15.4807 28.0906 14.773 28.012C14.3312 27.9629 14 27.5855 14 27.1414V16Z" fill="#ffffff" />
          <circle cx="19" cy="21" r="2" fill="#2563EB" />
          <circle cx="25" cy="21" r="2" fill="#2563EB" />
        </svg>
      );
    case 6: // AWS Cloud Migration
      return (
        <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22" cy="22" r="20" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <path d="M16 25A4 4 0 0116 17H16.5A5.5 5.5 0 0126 14A4.5 4.5 0 0130 21A3 3 0 0128 25H16Z" fill="#ffffff" />
          <path d="M22 22V17M22 17L19 19.5M22 17L25 19.5" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 14: // E-Commerce Platform
      return (
        <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22" cy="22" r="20" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          <path d="M15 18C15 16.8954 15.8954 16 17 16H27C28.1046 16 29 16.8954 29 18V28C29 29.1046 28.1046 30 27 30H17C15.8954 30 15 29.1046 15 28V18Z" fill="#ffffff" />
          <path d="M19 16V14C19 12.3431 20.3431 11 22 11C23.6569 11 25 12.3431 25 14V16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <circle cx="22" cy="23" r="2.5" fill="#F97316" />
        </svg>
      );
    default:
      return (
        <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="22" cy="22" r="20" fill="#10B981" stroke="#059669" strokeWidth="2" />
          <path d="M22 10L32 26H12L22 10Z" fill="#34D399" />
          <rect x="17" y="17" width="10" height="4" fill="#ffffff" rx="1" />
          <rect x="15" y="22" width="14" height="4" fill="#ffffff" rx="1" />
        </svg>
      );
  }
};

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const handleMouseEnter = (e) => {
    e.currentTarget._cachedRect = e.currentTarget.getBoundingClientRect();
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
    
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const tiltX = x - rect.width / 2;
    const tiltY = y - rect.height / 2;
    const factorX = tiltX / (rect.width / 2);
    const factorY = tiltY / (rect.height / 2);
    
    card.style.transform = `perspective(1000px) rotateY(${factorX * 10}deg) rotateX(${-factorY * 10}deg) translateY(-8px) scale(1.025)`;
    card.style.transition = "box-shadow 0.3s";
  };

  const handleMouseLeave = (e) => {
    delete e.currentTarget._cachedRect;
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)`;
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s";
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-white py-28">
      {/* Dynamic slow-motion floating glass bubbles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ contain: "paint" }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={`portfolio-bubble-${i}`}
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
        .portfolio-card {
          position: relative;
          will-change: transform;
          background-clip: padding-box !important;
          border: 1px solid rgba(224, 231, 255, 0.5) !important;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease !important;
        }
        .portfolio-card:hover {
          transform: translateY(-8px);
          border-color: transparent !important;
          box-shadow: 0 30px 60px rgba(15, 118, 110, 0.12) !important;
        }
        .portfolio-card::before {
          content: "";
          position: absolute;
          inset: -1.5px;
          z-index: 0;
          border-radius: inherit;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
          background-size: 300% 100%;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .portfolio-card:hover::before {
          opacity: 1;
          animation: borderGlow 3.5s linear infinite;
        }
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
        .portfolio-image-wrapper {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .portfolio-card:hover .portfolio-image-wrapper {
          transform: scale(0.95) !important;
          opacity: 0.35 !important;
        }
        .portfolio-lottie-wrapper {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease-out !important;
        }
        .portfolio-card:hover .portfolio-lottie-wrapper {
          transform: scale(1.12) translateY(-4px) !important;
          filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.35)) !important;
        }
        .portfolio-sticker-tl {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .portfolio-card:hover .portfolio-sticker-tl {
          transform: translate(-10px, -10px) rotate(-12deg) scale(1.15) !important;
        }
        .portfolio-sticker-br {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .portfolio-card:hover .portfolio-sticker-br {
          transform: translate(10px, 10px) rotate(12deg) scale(1.15) !important;
        }
        .portfolio-arrow-link {
          transition: transform 0.2s ease-out;
        }
        .portfolio-card:hover .portfolio-arrow-link {
          transform: translateX(5px);
        }
        .bg-blur-shape-1 {
          animation: floatBlurShape1 10s ease-in-out infinite;
        }
        .bg-blur-shape-2 {
          animation: floatBlurShape2 12s ease-in-out infinite;
        }
        @keyframes floatBlurShape1 {
          0% { transform: translate3d(0, 0, 0); opacity: 0.08; }
          50% { transform: translate3d(50px, -40px, 0); opacity: 0.18; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.08; }
        }
        @keyframes floatBlurShape2 {
          0% { transform: translate3d(0, 0, 0); opacity: 0.06; }
          50% { transform: translate3d(-30px, 30px, 0); opacity: 0.16; }
          100% { transform: translate3d(0, 0, 0); opacity: 0.06; }
        }
        @keyframes floatSticker {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(3deg); }
        }
        @keyframes floatStickerDelayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(-3deg); }
        }
        .animate-float {
          animation: floatSticker 3.5s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatStickerDelayed 3.5s ease-in-out infinite 1.75s;
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-blur-shape-1, .bg-blur-shape-2, .animate-float, .animate-float-delayed {
            animation: none !important;
          }
        }
      `}</style>
      {/* 3D Cyber Grid Overlay Floor */}
      <div className="cyber-grid-3d absolute inset-0 opacity-40 pointer-events-none z-0" />

      {/* Light Brand Tech Glow Spots */}
      <div
        className="pointer-events-none absolute right-[10%] top-10 h-[520px] w-[520px] rounded-full bg-[#105DA1]/8 blur-[140px] bg-blur-shape-1 z-0"
        style={{ willChange: "transform" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[10%] h-[420px] w-[420px] rounded-full bg-[#14b8a6]/8 blur-[120px] bg-blur-shape-2 z-0"
        style={{ willChange: "transform" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.22 }}
          className="mb-16 flex flex-col items-center justify-center text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.16, type: "spring", stiffness: 360 }}
            className="mb-4 inline-block rounded-full border border-[#0d9488]/20 bg-white/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#0d9488]"
          >
            Our Work
          </motion.span>
          <h2 className="overflow-hidden text-5xl font-extrabold premium-gradient-text md:text-6xl pb-2">
            {["Featured", "Projects"].map((word, i, arr) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 50, rotateX: -80, filter: "blur(8px)" }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" } : {}}
                transition={{ delay: i * 0.06, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block", marginRight: i === arr.length - 1 ? 0 : "0.25em", transformOrigin: "bottom" }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.14, duration: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-700"
          >
            Real clients. Measurable results. Here's what we've shipped.
          </motion.p>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Link href={`/case-study/${p.id}`} key={p.id} className="flex">
              <motion.div
                initial={{ opacity: 0, y: 55, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.045, duration: 0.24, ease: "easeOut" }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-indigo-100/50 bg-white/90 shadow-sm portfolio-card"
              >
                <div className="relative h-48 overflow-hidden bg-slate-50 flex items-center justify-center z-10">
                  {p.lottie ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-slate-900 overflow-hidden">
                      {/* Background Topic Image */}
                      <div className="absolute inset-0 z-0 opacity-55 portfolio-image-wrapper">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      
                      {/* Gradient Overlay for Cinematic Contrast */}
                      <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/20" />

                      {/* Topic-specific Top-Left Sticker */}
                      <div className="absolute top-3 left-3 z-20 pointer-events-none drop-shadow-md animate-float portfolio-sticker-tl">
                        {getTopLeftSticker(p.id)}
                      </div>

                      {/* Branded Gradient Face Sticker */}
                      <div className="absolute bottom-3 right-3 z-20 pointer-events-none drop-shadow-md animate-float-delayed portfolio-sticker-br">
                        <svg width="34" height="34" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id={`sticker-grad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#105DA1" />
                              <stop offset="50%" stopColor="#1a73e8" />
                              <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                          </defs>
                          <circle cx="22" cy="22" r="20" fill={`url(#sticker-grad-${p.id})`} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                          <rect x="14" y="15" width="4" height="4" fill="#ffffff" />
                          <rect x="26" y="15" width="4" height="4" fill="#ffffff" />
                          <path d="M14 25C14 28 18 30 22 30C26 30 30 28 30 25" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      </div>

                      {/* Lottie Player component overlay */}
                      <div className="relative z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] portfolio-lottie-wrapper">
                        <LottiePlayer src={p.lottie} />
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 portfolio-image-wrapper">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={i === 0}
                        loading={i === 0 ? "eager" : "lazy"}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10" />
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.14 + i * 0.045, duration: 0.28 }}
                    style={{ transformOrigin: "left" }}
                    className={`absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r z-10 ${p.color}`}
                  />
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-[0.06] z-10 ${p.color}`} />

                <div className="relative z-10 flex flex-1 flex-col p-6">
                  {/* Category and Client Info Row */}
                  <div className="flex justify-between items-center mb-3">
                    <span className={`rounded-full bg-gradient-to-r px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm ${p.color}`}>
                      {p.tag}
                    </span>
                    <span className="rounded-full border border-indigo-100/60 bg-slate-50/80 px-2.5 py-0.5 text-[10px] text-gray-600 font-semibold backdrop-blur-sm">
                      {p.client}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 transition duration-200 group-hover:text-[#0d9488]">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-gray-700">{p.desc}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className={`rounded-full border border-indigo-200 bg-gradient-to-r bg-clip-text px-3 py-1 text-xs font-semibold text-transparent ${p.color}`}
                      >
                        * {m}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 inline-block portfolio-arrow-link">
                    <span className={`bg-gradient-to-r bg-clip-text text-sm font-bold text-transparent ${p.color}`}>
                      View Case Study -&gt;
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.24 }}
          className="mt-16 text-center"
        >
          <Link href="/case-study" className="btn-grad" style={{
            margin: "0 auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
          }}>
            View More Case Studies
            <span className="text-lg">-&gt;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
