"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DarkNavbar from "../../../components/DarkNavbar";
import { caseStudies } from "../../../data/caseStudies";
import BreadcrumbSchema from "../../../components/seo/BreadcrumbSchema";
import WebPageSchema from "../../../components/seo/WebPageSchema";

const f = "'Inter',sans-serif";

function CountUpNumber({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = value;
      if (start === end) return;
      
      const duration = 1.5; // seconds
      const totalSteps = 60;
      const stepTime = (duration * 1000) / totalSteps;
      const increment = (end - start) / totalSteps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        start += increment;
        if (currentStep >= totalSteps) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref} className="font-extrabold text-5xl md:text-6xl bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
      {count}
      {suffix}
    </span>
  );
}

function InteractiveSteps({ steps, color }) {
  const [activeStep, setActiveStep] = useState(0);
  
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Interactive System Architecture</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            onClick={() => setActiveStep(index)}
            whileHover={{ scale: 1.02 }}
            className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden ${
              activeStep === index
                ? `bg-gray-950 border-teal-500 shadow-xl shadow-teal-500/10 text-white`
                : `bg-white border-gray-100 hover:border-gray-200 text-gray-900`
            }`}
          >
            {/* Tiny accent lights */}
            {activeStep === index && (
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-teal-500/10 blur-[30px] pointer-events-none" />
            )}

            <div className="flex items-center gap-4 mb-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-200 ${
                activeStep === index ? `bg-teal-500 text-white` : `bg-gray-100 text-gray-500`
              }`}>
                0{index + 1}
              </span>
              <h4 className="font-bold text-lg">{step.title}</h4>
            </div>
            <p className={`text-sm leading-relaxed transition-colors duration-200 ${activeStep === index ? "text-gray-300" : "text-gray-500"}`}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ImageGallery({ gallery, title }) {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 font-display">Project Gallery &amp; Mockups</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gallery.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03, y: -4 }}
            onClick={() => setSelectedImg(img)}
            className="relative h-60 rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-zoom-in"
          >
            <Image
              src={img}
              alt={`${title} mockup detail ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors duration-200" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[2000] flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={selectedImg}
              alt="Expanded view"
              className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
            />
            <button className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition duration-150">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CaseStudyDetail() {
  const params = useParams();
  const router = useRouter();
  const studyId = parseInt(params.id);
  const study = caseStudies.find((c) => c.id === studyId);
  
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!study) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <DarkNavbar />
        <h2 className="text-3xl font-bold">Case Study Not Found</h2>
        <p className="mt-4 text-gray-500">The study you are looking for does not exist or has been moved.</p>
        <Link href="/case-study" className="mt-8 px-6 py-3 rounded-full bg-teal-500 text-white font-semibold">
          Return to Case Studies
        </Link>
      </div>
    );
  }

  const nextId = (studyId % caseStudies.length) + 1;
  const nextStudy = caseStudies.find(c => c.id === nextId);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans" style={{ fontFamily: f }}>
      <WebPageSchema name={study.title} description={study.desc} path={`/case-study/${study.id}`} type="Article" />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-study" }, { name: study.title, path: `/case-study/${study.id}` }]} />
      <DarkNavbar />

      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-blue-500 z-[9999] origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Hero Banner */}
      <div className="relative min-h-[60vh] flex items-end justify-center overflow-hidden mt-16 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={study.image}
            alt={study.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-900/20" />
        </div>

        {/* Floating Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />

        {/* Back Button */}
        <div className="absolute top-12 left-6 md:left-12 z-20">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/10 backdrop-blur transition-all duration-200"
          >
            ← Back
          </button>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full text-white">

          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 bg-white/10 backdrop-blur`}
          >
            {study.category}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
            style={{ color: "#ffffff" }}
          >
            {study.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed"
          >
            {study.desc}
          </motion.p>
        </div>
      </div>

      {/* Metrics Section */}
      <section className="relative -mt-10 z-20 max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {study.stats.map((stat, i) => (
              <div key={i} className={`pt-6 md:pt-0 ${i > 0 ? 'md:pl-8' : ''}`}>
                <CountUpNumber value={stat.value} suffix={stat.suffix} />
                <p className="text-gray-500 font-medium text-sm mt-2 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* The Challenge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 border-b pb-3 border-gray-100">The Challenge</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{study.challenge}</p>
            </motion.div>

            {/* The Solution */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <h2 className="text-3xl font-extrabold text-gray-900 border-b pb-3 border-gray-100">Our Solution</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{study.solution}</p>
            </motion.div>

            {/* Interactive Flow */}
            {study.solutionSteps && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <InteractiveSteps steps={study.solutionSteps} color={study.color} />
              </motion.div>
            )}

            {/* Visual Walkthrough Gallery */}
            {study.gallery && study.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <ImageGallery gallery={study.gallery} title={study.title} />
              </motion.div>
            )}

            {/* Key Impact */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="space-y-4 p-8 rounded-3xl bg-teal-50 border border-teal-100/60"
            >
              <h2 className="text-3xl font-extrabold text-teal-950">The Business Impact</h2>
              <p className="text-teal-900 text-lg leading-relaxed">{study.impact}</p>
            </motion.div>
          </div>

          {/* Project Metadata (Right Column) */}
          <div className="space-y-8 lg:sticky lg:top-24 h-fit">
            
            {/* Quick Details Card */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3 border-gray-200">Project Details</h3>
              
              <div>
                <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Client Profile</span>
                <p className="font-semibold text-gray-800 mt-1">{study.client}</p>
              </div>

              <div>
                <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Timeline</span>
                <p className="font-semibold text-gray-800 mt-1">{study.duration}</p>
              </div>

              <div>
                <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Our Role</span>
                <p className="font-semibold text-gray-800 mt-1">{study.role}</p>
              </div>
            </div>

            {/* Tech Stack Card */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3 border-gray-200 mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-gray-200/80 text-gray-700 shadow-sm hover:border-teal-300 hover:text-teal-600 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Up Next Navigation */}
      {nextStudy && (
        <div className="bg-gray-50 py-28 border-t border-gray-100 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -bottom-10 right-0 w-80 h-80 rounded-full bg-teal-400/5 blur-[80px]" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">Up Next</span>
            <Link href={`/case-study/${nextStudy.id}`} className="group block mt-4 space-y-4">
              <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 group-hover:text-teal-600 transition duration-300 max-w-2xl mx-auto leading-tight">
                {nextStudy.title}
              </h3>
              <p className="text-gray-500 max-w-xl mx-auto text-base leading-relaxed group-hover:text-gray-700 transition">
                {nextStudy.desc}
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-gray-200 text-teal-600 font-bold shadow-sm group-hover:border-teal-200 group-hover:shadow-md transition-all duration-200">
                View Next Project <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
