"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function KenBurnsSlider({ slides }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const total = slides.length;
  const timerRef = useRef(null);

  const go = useCallback((next, d = 1) => {
    setDir(d);
    setCurrent(next);
  }, []);

  const next = useCallback(() => go((current + 1) % total, 1), [current, total, go]);
  const prev = useCallback(() => go((current - 1 + total) % total, -1), [current, total, go]);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const s = slides[current];

  const textVariants = {
    hidden: (d) => ({ opacity: 0, x: d > 0 ? 60 : -60, y: 20 }),
    show: { opacity: 1, x: 0, y: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -60 : 60, y: -20 }),
  };

  return (
    <div className="relative w-full h-[580px] overflow-hidden bg-black">

      {/* Ken Burns background layer */}
      <AnimatePresence mode="sync">
        <motion.div key={`bg-${current}`}
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 6.5, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority={current === 0}
              fetchPriority={current === 0 ? "high" : "auto"}
              quality={75}
              sizes="(max-width: 768px) 100vw, 1200px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Parallax colour overlay */}
      <AnimatePresence mode="wait">
        <motion.div key={`overlay-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${s.overlayFrom}cc 0%, ${s.overlayTo}99 50%, rgba(0,0,0,0.7) 100%)` }}
        />
      </AnimatePresence>

      {/* Parallax floating orb */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-20 w-96 h-96 rounded-full blur-[120px]"
        style={{ background: s.orbColor }}
      />

      {/* Slide number */}
      <div className="absolute top-6 right-6 z-20 text-white/50 text-xs font-mono">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center max-w-4xl mx-auto px-10 md:px-16">
        <AnimatePresence mode="wait" custom={dir}>

          <motion.div key={`content-${current}`} custom={dir}
            initial="hidden" animate="show" exit="exit"
            variants={textVariants}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {s.badge && (
              <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
                className="inline-block text-xs font-bold px-4 py-1.5 rounded-full mb-5 text-white"
                style={{ background: s.overlayFrom }}>
                {s.badge}
              </motion.span>
            )}

            <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
              {s.title}
            </h2>

            <p className="mt-5 text-white/80 text-lg max-w-2xl leading-8">
              {s.desc}
            </p>

            {s.stats && (
              <div className="mt-6 flex flex-wrap gap-4">
                {s.stats.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="bg-white/15 backdrop-blur border border-white/20 rounded-2xl px-5 py-3 text-white">
                    <p className="text-2xl font-extrabold">{stat.value}</p>
                    <p className="text-xs text-white/70 mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {s.cta && (
              <motion.a href={s.ctaHref || "#"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-7 py-3.5 rounded-full hover:bg-gray-100 transition shadow-xl text-sm">
                {s.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            )}
          </motion.div>

        </AnimatePresence>
      </div>

      {/* Prev / Next */}
      {[{ fn: prev, icon: "M15 19l-7-7 7-7", pos: "left-5", label: "Previous slide" }, { fn: next, icon: "M9 5l7 7-7 7", pos: "right-5", label: "Next slide" }].map(({ fn, icon, pos, label }, i) => (
        <button key={i} onClick={fn} aria-label={label} suppressHydrationWarning
          className={`absolute ${pos} top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white transition`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
          </svg>
        </button>
      ))}

      {/* Progress bar dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i, i > current ? 1 : -1)} suppressHydrationWarning
            aria-label={`Go to slide ${i + 1}`}
            style={{
              height: 32,
              borderTop: "14px solid transparent",
              borderBottom: "14px solid transparent",
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              backgroundClip: "padding-box",
              padding: 0,
            }}
            className={`rounded-full transition-all duration-500 ${i === current ? "bg-white w-8" : "bg-white/40 w-2"}`} />
        ))}
      </div>

      {/* Thumbnail strip bottom-right */}
      <div className="absolute bottom-6 right-6 z-30 hidden md:flex gap-2">
        {slides.map((sl, i) => (
          <button key={i} onClick={() => go(i, i > current ? 1 : -1)} suppressHydrationWarning
            aria-label={`Go to slide ${i + 1} thumbnail`}
            className={`relative w-14 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === current ? "border-white scale-110" : "border-white/25 opacity-50 hover:opacity-80"}`}>
            <div className="relative w-full h-full">
              <Image
                src={sl.image}
                alt={`Slide ${i + 1} thumbnail`}
                fill
                sizes="56px"
                priority={i === current}
                style={{ objectFit: "cover" }}
              />
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}
