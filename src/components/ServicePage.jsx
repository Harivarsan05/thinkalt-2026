"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import DarkNavbar from "./DarkNavbar";
import BreadcrumbSchema from "./seo/BreadcrumbSchema";
import FAQSchema from "./seo/FAQSchema";
import ServiceSchema from "./seo/ServiceSchema";
import WebPageSchema from "./seo/WebPageSchema";

const servicePaths = {
  web: "/services/web-app-development",
  mobile: "/services/mobile-app-development",
  devops: "/services/devops-cloud-optimization",
  ai: "/services/ai-integrations",
  maintenance: "/services/app-maintenance",
  qa: "/services/qa-automation",
  uiux: "/services/ui-ux-design",
  cto: "/services/fractional-cto",
  gcc: "/services/gcc-setup",
};

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}>
      {children}
    </motion.div>
  );
}

export default function ServicePage({ data }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentOp = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  const { accent, colorRGB, color, lightAccent } = data;
  const pagePath = servicePaths[data.id] || `/${data.id}`;

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <WebPageSchema name={data.title.replace("\n", " ")} description={data.heroDesc} path={pagePath} type="ProductPage" />
      <ServiceSchema name={data.title.replace("\n", " ")} description={data.heroDesc} path={pagePath} />
      <FAQSchema faqs={data.faqs?.map(({ q, a }) => ({ question: q, answer: a }))} />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: data.title.replace("\n", " "), path: pagePath }]} />
      <DarkNavbar />

      {/* ══ CINEMATIC HERO — Ken Burns + Parallax ══ */}
      <section ref={heroRef} className="relative w-full overflow-hidden bg-white"
        style={{ height: "100svh", minHeight: 640 }}>
        <style jsx global>{`
          @keyframes serviceHeroSlowMotion {
            0% {
              transform: scale(1.05) translate3d(-1.4%, -0.8%, 0);
            }
            50% {
              transform: scale(1.1) translate3d(1.2%, 1%, 0);
            }
            100% {
              transform: scale(1.07) translate3d(-0.5%, 1.3%, 0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .service-hero-slow-motion {
              animation: none !important;
              transform: none !important;
            }
          }
        `}</style>

        {/* Ken Burns layer */}
        <motion.div className="absolute inset-0 will-change-transform" style={{ scale: bgScale, y: bgY }}>
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={75}
            className="service-hero-slow-motion object-cover"
            style={{ animation: "serviceHeroSlowMotion 26s ease-in-out infinite alternate" }}
          />
        </motion.div>

        {/* Film grain */}
        <svg className="absolute inset-0 w-full h-full z-10 opacity-[0.025] pointer-events-none"
          style={{ mixBlendMode: "overlay" }}>
          <filter id={`grain-${data.id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${data.id})`} />
        </svg>

        {/* Cinematic letterbox */}
        <div className="absolute top-0 inset-x-0 h-[8vh] bg-white/80 z-20" />
        <div className="absolute bottom-0 inset-x-0 h-[8vh] bg-white/90 z-20" />

        {/* Gradient fog */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-white/85 to-white/20" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-transparent to-transparent" />

        {/* Accent glow */}
        <div className="absolute -bottom-16 -left-16 w-[55vw] h-[55vh] z-10 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)`, filter: "blur(90px)", opacity: 0.16 }} />

        {/* Spotlight sweep */}
        <motion.div
          initial={{ x: "-110%", opacity: 0 }}
          transition={{ duration: 3.2, delay: 0.6, ease: "easeInOut" }}
          className="absolute inset-y-0 w-1/3 z-15 pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${colorRGB},0.3), transparent)` }} />

        {/* Parallax content */}
        <motion.div style={{ y: contentY }}
          className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-[8vh] pb-[8vh]">
          <motion.div
            initial={{ opacity: 0, y: 70, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl">

            <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className={`inline-block mb-4 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.22em] bg-gradient-to-r ${color} text-white`}>
              {data.subtitle}
            </motion.span>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-xs font-bold tracking-[0.3em] uppercase mb-3"
              style={{ color: accent }}>
              {data.tagline}
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.65 }}
              className="text-5xl md:text-6xl xl:text-7xl font-black text-gray-950 leading-[1.05] tracking-tight mb-6"
              style={{ whiteSpace: "pre-line" }}>
              {data.title}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="text-gray-600 text-base md:text-lg leading-8 max-w-xl mb-8">
              {data.heroDesc}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="flex flex-wrap items-center gap-4">
              <Link href="/login2"
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r ${color} text-white text-sm font-bold hover:scale-105 hover:brightness-110 transition-all duration-300`}
                style={{ boxShadow: `0 0 40px rgba(${colorRGB},0.45)` }}>
                Start Your Project →
              </Link>
              <a href="#process"
                className="text-gray-500 hover:text-gray-900 text-xs font-semibold tracking-widest uppercase transition-colors duration-200">
                See Our Process ↓
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-[9.5vh] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 opacity-35">
          <div className="w-px h-8 bg-gray-400 rounded" />
          <span className="text-gray-500 text-[9px] tracking-widest uppercase font-semibold">Scroll</span>
        </motion.div>
      </section>

      {/* ══ STATS BAR ══ */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {data.stats.map((st, i) => (
            <FadeIn key={i} delay={i * 0.07} className="text-center">
              <div className="text-3xl font-black leading-none mb-1" style={{ color: accent }}>{st.value}</div>
              <div className="text-gray-950 text-xs font-semibold mb-0.5">{st.label}</div>
              <div className="text-gray-500 text-[10px]">{st.sub}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ CAPABILITIES ══ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <FadeIn className="text-center mb-16">
          <span className="inline-block px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-4"
            style={{ background: `rgba(${colorRGB},0.08)`, borderColor: `rgba(${colorRGB},0.25)`, color: accent }}>
            What We Deliver
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-950 mb-4">Full-Spectrum Capabilities</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-7">
            Every layer of your product — owned, engineered, and optimised by our team.
          </p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.capabilities.map((c, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <Link href={c.href || ("/features/" + c.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))} className="block h-full cursor-pointer">
                <motion.div whileHover={{ y: -6 }} className="group h-full rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-4"
                  style={{ "--hover-border": `rgba(${colorRGB},0.3)` }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(${colorRGB},0.3)`}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgb(229,231,235)"}>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black" style={{ color: accent, background: `rgba(${colorRGB},0.09)` }}>{c.icon}</span>
                  <div>
                    <h3 className="text-gray-950 font-bold text-sm mb-2">{c.title}</h3>
                    <p className="text-gray-500 text-xs leading-6">{c.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {c.tags.map((t, ti) => (
                      <span key={ti} className="px-2 py-0.5 rounded-md text-[9px] font-semibold tracking-wide border"
                        style={{ borderColor: `rgba(${colorRGB},0.25)`, color: accent, background: `rgba(${colorRGB},0.07)` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section id="process" className="bg-[#f7fafa] border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="inline-block px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-4"
              style={{ background: `rgba(${colorRGB},0.08)`, borderColor: `rgba(${colorRGB},0.25)`, color: accent }}>
              How We Work
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-950 mb-4">Our Delivery Process</h2>
          </FadeIn>
          <div className="relative">
            <div className="hidden lg:block absolute top-8 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, rgba(${colorRGB},0.3), transparent)` }} />
            <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5">
              {data.process.map((p, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -5 }} className="relative rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-all duration-300 p-5 h-full"
                    onMouseEnter={e => e.currentTarget.style.borderColor = `rgba(${colorRGB},0.4)`}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgb(229,231,235)"}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black text-white mb-4"
                      style={{ background: `linear-gradient(135deg, ${accent}, rgba(${colorRGB},0.6))`, boxShadow: `0 0 18px rgba(${colorRGB},0.4)` }}>
                      {p.step}
                    </div>
                    <h3 className="text-gray-950 font-bold text-sm mb-2">{p.title}</h3>
                    <p className="text-gray-500 text-xs leading-6 mb-3">{p.desc}</p>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide border"
                      style={{ borderColor: `rgba(${colorRGB},0.3)`, color: accent }}>
                      {p.duration}
                    </span>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CASE STUDIES (Dark Section) ══ */}
      <section className="bg-[#0b0f19] border-t border-white/[0.05] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="inline-block px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-4"
              style={{ background: `rgba(${colorRGB},0.08)`, borderColor: `rgba(${colorRGB},0.25)`, color: lightAccent }}>
              Proof of Work
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Case Studies</h2>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-7">Real products, real metrics.</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {data.caseStudies.map((cs, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group rounded-3xl overflow-hidden border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col h-full bg-white/[0.02]">
                  <div className="relative h-52 overflow-hidden">
                    <motion.img src={cs.image} alt={cs.title} className="w-full h-full object-cover"
                      whileHover={{ scale: 1.07 }} transition={{ duration: 0.5 }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/80 to-transparent" />
                    <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.18em] bg-gradient-to-r ${cs.color} text-white`}>
                      {cs.tag}
                    </span>
                  </div>
                  <div className="bg-[#121826] p-6 flex flex-col flex-1">
                    <h3 className="text-white font-bold text-base mb-3">{cs.title}</h3>
                    <p className="text-white/50 text-xs leading-6 mb-4 flex-1">{cs.desc}</p>
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/[0.07]">
                      {cs.results.map((r, ri) => (
                        <div key={ri} className="flex items-start gap-1.5 text-[10px] text-white/50">
                          <span className="mt-0.5 flex-shrink-0" style={{ color: lightAccent }}>✓</span>
                          {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECH STACK ══ */}
      <section className="bg-[#0d0d1a] border-y border-white/[0.07] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-4"
              style={{ background: `rgba(${colorRGB},0.08)`, borderColor: `rgba(${colorRGB},0.25)`, color: lightAccent }}>
              Our Arsenal
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Technology Stack</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {data.techStack.map((ts, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-3" style={{ color: lightAccent }}>
                    {ts.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ts.items.map((item, ii) => (
                      <span key={ii} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold border text-white/60"
                        style={{ borderColor: `rgba(${colorRGB},0.2)`, background: `rgba(${colorRGB},0.05)` }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ (Dark Section) ══ */}
      <section className="bg-[#0b0f19] border-t border-white/[0.05] py-24">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <span className="inline-block px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-4"
              style={{ background: `rgba(${colorRGB},0.08)`, borderColor: `rgba(${colorRGB},0.25)`, color: lightAccent }}>
              FAQs
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Common Questions</h2>
          </FadeIn>
          <div className="space-y-3">
            {data.faqs.map((f, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <details className="group border border-white/10 rounded-2xl overflow-hidden bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-200">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none text-white font-semibold text-sm md:text-base">
                    {f.q}
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-white/60 text-xs group-open:rotate-45 transition-transform duration-300">+</span>
                  </summary>
                  <p className="px-6 pb-5 text-white/55 text-sm leading-7">{f.a}</p>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="relative overflow-hidden py-28 bg-[#0d0d1a] border-t border-white/[0.07]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20"
            style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)`, filter: "blur(80px)" }} />
        </div>
        <FadeIn className="relative z-10 text-center max-w-2xl mx-auto px-6">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] block mb-4" style={{ color: lightAccent }}>
            Ready to build?
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">{data.ctaHeading}</h2>
          <p className="text-white/50 text-sm leading-7 mb-10">{data.ctaDesc}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login2"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r ${color} text-white font-bold hover:scale-105 hover:brightness-110 transition-all duration-300 text-sm`}
              style={{ boxShadow: `0 0 50px rgba(${colorRGB},0.4)` }}>
              Book Free Discovery Call →
            </Link>
            <Link href="/#services" className="text-white/40 hover:text-white/70 text-xs font-semibold tracking-widest uppercase transition-colors">
              ← Back to Services
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
