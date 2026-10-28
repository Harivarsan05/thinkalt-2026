"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import DarkNavbar from "../../components/DarkNavbar";

/* ─── DATA ──────────────────────────────────────────── */
const team = [
  {
    name: "Arjun Venkatesh",
    role: "Founder & CEO",
    tag: "Visionary",
    color: "from-teal-400 to-cyan-500",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Ex-Thoughtworks engineer turned founder. 14 years in product engineering across India, UK & US. Built and sold two SaaS products before starting ThinkAlternate.",
    skills: ["Product Strategy", "Engineering Leadership", "Fundraising", "AI/ML"],
    linkedin: "#",
    twitter: "#",
    fun: "Runs ultramarathons on weekends 🏃",
    longBio: "Arjun is a seasoned software entrepreneur and system architect with over 14 years of hands-on expertise building enterprise products. Having started his career as a core consultant at Thoughtworks, he developed a deep appreciation for clean code, Test-Driven Development (TDD), and continuous delivery. Later, he moved on to launch and scale two successful B2B SaaS platforms. Arjun founded ThinkAlternate with the mission of bridging high-velocity engineering with rigorous software craftsmanship.",
    achievements: [
      "Successfully built and sold two SaaS platforms in the HRtech and DevSecOps spaces.",
      "Led architectural audits for 15+ Fortune 500 enterprises, reducing legacy code bloat by up to 40%.",
      "Pioneered the fractional CTO model at ThinkAlternate, helping 30+ startups raise their Series A/B rounds."
    ],
    quote: "Good code is quiet. It runs without drama, adapts without struggle, and tells a story that anyone can read."
  },
  {
    name: "Priya Nair",
    role: "CTO & Co-Founder",
    tag: "Architect",
    color: "from-violet-400 to-purple-600",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
    bio: "AWS Hero & Google Developer Expert. Led cloud infrastructure for unicorn startups at Bangalore and Singapore. Architect of MIRSA's core engine.",
    skills: ["AWS Architecture", "Kubernetes", "Platform Engineering", "Security"],
    linkedin: "#",
    twitter: "#",
    fun: "Builds custom mechanical keyboards ⌨️",
    longBio: "Priya is an authority on cloud orchestration and scalable backend systems, recognized globally as an AWS Container Hero and Google Developer Expert. Before co-founding ThinkAlternate, Priya spent over a decade leading core infrastructure and DevOps scaling initiatives at high-growth startups across India and Singapore. She is the mastermind behind the MIRSA platform's real-time analysis pipeline, which processes hundreds of millions of logs and events daily with sub-millisecond latencies.",
    achievements: [
      "Designed the high-availability cloud architecture for a Bangalore fintech unicorn serving 12M+ monthly active users.",
      "Built MIRSA's core analysis engine, reducing server infrastructure spend for clients by an average of 35%.",
      "Contributed to major open-source Kubernetes operators and is a regular speaker at KubeCon and AWS re:Invent."
    ],
    quote: "Scale isn't just about handling load; it's about doing it predictably, cost-effectively, and securely."
  },
  {
    name: "Karan Mehta",
    role: "Head of Product",
    tag: "Builder",
    color: "from-orange-400 to-pink-500",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face",
    bio: "Former PM at Zomato and Razorpay. Loves zero-to-one product journeys. Karan has launched 11 products that collectively serve 4M+ users.",
    skills: ["Product Management", "Growth", "User Research", "OKRs"],
    linkedin: "#",
    twitter: "#",
    fun: "Amateur chess player — ELO 1800 ♟️",
    longBio: "Karan brings a wealth of product strategy experience from his time at Zomato and Razorpay, where he spearheaded zero-to-one product lifecycles and growth optimization engines. At ThinkAlternate, he aligns complex engineering roadmaps with business objectives, helping founders structure their MVPs for rapid validation and continuous feature growth. He has successfully launched 11 product lines that collectively serve millions of active users globally.",
    achievements: [
      "Led the core payment checkout redesign at Razorpay, improving checkout success rate by 2.4%.",
      "Coached 20+ growth-stage founders on product-market fit, product metrics frameworks, and OKR alignment.",
      "Spearheaded the Product Discovery playbook at ThinkAlternate, shortening validation cycles from months to weeks."
    ],
    quote: "An MVP isn't a cheap product; it is the fastest way to start learning what your users actually need."
  },
  {
    name: "Divya Krishnamurthy",
    role: "Lead — AI & Data",
    tag: "AI Pioneer",
    color: "from-emerald-400 to-teal-600",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face",
    bio: "PhD in NLP from IISc. Previously at Sarvam AI and Nvidia Research. Leads MIRSA's Sentiment Analyzer, AppTron, and Root Cause Engine.",
    skills: ["LLMs", "NLP", "MLOps", "PyTorch", "RAG Pipelines"],
    linkedin: "#",
    twitter: "#",
    fun: "Teaches Kathak on Sunday mornings 💃",
    longBio: "Divya is a research scientist and NLP pioneer who holds a PhD in Natural Language Processing from the Indian Institute of Science (IISc). Prior to leading AI and Data at ThinkAlternate, she worked on cutting-edge language models at Sarvam AI and Nvidia Research. Divya designs MIRSA's AI Operating Layer, incorporating advanced Retrieval-Augmented Generation (RAG) pipelines, automated context ticket indexing, and high-speed predictive logs telemetry.",
    achievements: [
      "Published 8+ research papers in top-tier AI/NLP conferences including ACL, EMNLP, and NeurIPS.",
      "Built MIRSA's customized Sentiment Analyzer and AppTron agentic workflows from the ground up.",
      "Implemented context-aware indexing layers that reduced LLM token costs for clients by 50% while improving response accuracy."
    ],
    quote: "AI shouldn't be an ornament on top of your product; it should be the core engine that solves user complexity."
  },
  {
    name: "Rohan Desai",
    role: "Head of Engineering",
    tag: "Craftsman",
    color: "from-blue-400 to-indigo-600",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
    bio: "12 years shipping production-grade React, Node and mobile apps. Led engineering teams of 30+ at InMobi and ShareChat. Obsessed with code quality.",
    skills: ["React / Next.js", "Node.js", "React Native", "System Design"],
    linkedin: "#",
    twitter: "#",
    fun: "Collects vintage sci-fi novels 📚",
    longBio: "Rohan is a master craftsman who has spent over 12 years building production-grade web and mobile user interfaces. As the Head of Engineering, he is responsible for maintaining the exceptionally high standard of code quality, performance benchmarks, and design-to-code fidelity at ThinkAlternate. Rohan's teams are known for shipping frontends that achieve a perfect 100/100 Lighthouse score and render consistently at 60fps on all devices.",
    achievements: [
      "Led engineering teams of 30+ developers at ShareChat and InMobi, delivering features used by 100M+ active users.",
      "Established ThinkAlternate's standardized Next.js and React Native design-to-code pipelines.",
      "Open-sourced 4 utility libraries for React state optimization and fluid UI layouts."
    ],
    quote: "Performance is user experience. A laggy interface is a broken promise to the user."
  },
  {
    name: "Sneha Pillai",
    role: "Head of Design",
    tag: "Storyteller",
    color: "from-pink-400 to-rose-500",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    bio: "Design lead from NIFT with 9 years at product studios across Bangalore, Dubai and London. Built design systems used by 500K+ people.",
    skills: ["Figma", "Design Systems", "Motion Design", "User Testing"],
    linkedin: "#",
    twitter: "#",
    fun: "Watercolour artist — sold 40+ pieces 🎨",
    longBio: "Sneha is a passionate product designer who graduated from the National Institute of Fashion Technology (NIFT). She has spent 9 years leading UX/UI and motion design for top-tier startups and design studios in Bangalore, Dubai, and London. Sneha believes design is a problem-solving tool first and foremost. At ThinkAlternate, she orchestrates the design systems and interactive layout guidelines that make our client projects look incredibly premium, responsive, and alive.",
    achievements: [
      "Designed the user experience for a leading Dubai neobank app, winning the MENA Design Award.",
      "Created scalable design tokens and Figma-to-React Storybook systems utilized by 50+ engineers globally.",
      "Conducted over 300 user research sessions to map out complex enterprise workflows into simple layouts."
    ],
    quote: "Great design isn't just what it looks like and feels like; great design is how it works."
  },
  {
    name: "Vikram Sood",
    role: "DevOps & Cloud Lead",
    tag: "Infrastructure",
    color: "from-amber-400 to-orange-500",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "AWS Certified Solutions Architect Professional. Managed infrastructure for apps with 10M+ daily requests. Terraform, EKS, and ArgoCD evangelist.",
    skills: ["Terraform", "EKS", "ArgoCD", "Datadog", "GitHub Actions"],
    linkedin: "#",
    twitter: "#",
    fun: "Amateur astronomer 🔭",
    longBio: "Vikram is a seasoned cloud infrastructure architect specializing in site reliability engineering (SRE) and DevOps automation. Over his career, he has designed and managed critical Kubernetes (EKS/GKE) platforms processing tens of millions of daily API transactions. At ThinkAlternate, he builds clean, reproducible Infrastructure-as-Code (IaC) templates and automated CI/CD deployment pipelines that help clients achieve zero-downtime releases.",
    achievements: [
      "Migrated a legacy monolithic system to a containerized microservices stack with zero customer downtime.",
      "Designed GitOps delivery pipelines using ArgoCD, reducing release cycle time from 5 days to under 10 minutes.",
      "Configured automated Karpenter autoscaling rules that cut client cloud compute bills by up to 45%."
    ],
    quote: "If you have to do it twice, automate it. If you have to do it thrice, build a system to eliminate it."
  },
  {
    name: "Ananya Bose",
    role: "Head of Client Success",
    tag: "Connector",
    color: "from-cyan-400 to-blue-500",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
    bio: "6 years building client relationships at Wipro and Accenture before joining THAT. Ananya ensures every engagement delivers measurable ROI.",
    skills: ["Account Management", "SLA Management", "Reporting", "Stakeholder Comms"],
    linkedin: "#",
    twitter: "#",
    fun: "Salsa dancer — competes regionally 💃",
    longBio: "Ananya manages client relationships and delivery metrics at ThinkAlternate, ensuring every project is executed on-time, within budget, and to the highest standards of quality. Before joining THAT, she spent 6 years at Wipro and Accenture coordinating complex delivery agreements for overseas clients. She works closely with both client founders and our internal engineering leads to define clear SLAs, roadmap timelines, and launch milestones.",
    achievements: [
      "Managed and delivered 25+ successful client engagements, maintaining a 98% on-time delivery rate.",
      "Developed ThinkAlternate's client communication dashboard, improving milestone visibility and stakeholder trust.",
      "Successfully aligned fractional CTO deployments with client hiring strategies to transition projects smoothly."
    ],
    quote: "A successful project isn't just one that is built well; it's one where the client's business goals are fully realized."
  },
  {
    name: "Nikhil Raj",
    role: "Mobile Engineering Lead",
    tag: "Native",
    color: "from-violet-400 to-fuchsia-500",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "React Native and Flutter specialist with 8 years building apps that hit top 10 in App Store charts. Led mobile engineering at DailyBreath, reaching 500K users.",
    skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    linkedin: "#",
    twitter: "#",
    fun: "Makes his own hot sauces 🌶️",
    longBio: "Nikhil is a native mobile developer with an extraordinary track record of shipping top-charting applications. Having specialized in React Native and Flutter for over 8 years, he is obsessed with optimizing startup times, memory footprints, and frame rendering speeds. Before leading mobile engineering at ThinkAlternate, he built and managed the codebase for DailyBreath, a healthcare app that scaled to over 500,000 active users.",
    achievements: [
      "Built 4 mobile apps from scratch that reached the Top 20 rankings in the iOS App Store Utilities category.",
      "Reduced React Native app bundle size by 40% using advanced asset compression and tree-shaking architectures.",
      "Integrated secure offline-first storage and real-time biometric authorization across 10+ client apps."
    ],
    quote: "A mobile app isn't a web page in a wrapper. It must feel like an extension of the phone itself."
  }
];

const values = [
  { icon: "🧠", title: "Think First", desc: "We ask 'why' before 'how'. Every line of code solves a real problem.", color: "from-teal-400 to-cyan-500" },
  { icon: "🚀", title: "Ship Fast, Stay Safe", desc: "Speed without recklessness. We move fast with automated tests and rollback plans.", color: "from-violet-400 to-purple-500" },
  { icon: "🤝", title: "Radical Transparency", desc: "No surprises. We share good news and bad news equally and early.", color: "from-orange-400 to-pink-500" },
  { icon: "🌱", title: "Grow Relentlessly", desc: "Every AltHuman gets a learning budget and one research day per month.", color: "from-emerald-400 to-teal-600" },
  { icon: "🎯", title: "Outcomes Over Hours", desc: "We measure impact, not time-on-seat. Results matter, rituals don't.", color: "from-blue-400 to-indigo-500" },
  { icon: "🌍", title: "Built to Include", desc: "A diverse team with people from 8 states and 5 countries. Inclusion isn't a policy — it's how we build.", color: "from-rose-400 to-pink-500" },
];

const stats = [
  { value: "50+", label: "AltHumans Worldwide", icon: "👥" },
  { value: "8", label: "Countries Represented", icon: "🌍" },
  { value: "94%", label: "Team Retention Rate", icon: "💚" },
  { value: "₹1.2L", label: "Annual Learning Budget / Engineer", icon: "📚" },
];

const openings = [
  { role: "Senior React Native Engineer", type: "Full-time · Remote", team: "Mobile", color: "from-violet-400 to-fuchsia-500" },
  { role: "AWS Solutions Architect", type: "Full-time · Hybrid", team: "Cloud", color: "from-orange-400 to-amber-500" },
  { role: "AI/ML Engineer (LLMs)", type: "Full-time · Remote", team: "AI", color: "from-emerald-400 to-teal-600" },
  { role: "Product Designer (Figma)", type: "Full-time · Bangalore", team: "Design", color: "from-pink-400 to-rose-500" },
  { role: "DevOps Engineer (K8s)", type: "Contract · Remote", team: "DevOps", color: "from-blue-400 to-indigo-500" },
];

/* ─── FLIP CARD ─────────────────────────────────────── */
function TeamCard({ person, i, inView, onViewMore }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -20 }}
      animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ delay: i * 0.07, duration: 0.45, ease: "easeOut" }}
      className="relative h-[448px] cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* ── FRONT ── */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-md flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}>
          <div>
            <div className="relative h-52 overflow-hidden">
              <motion.img src={person.image} alt={person.name}
                animate={{ scale: flipped ? 1 : 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-full h-52 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className={`absolute top-3 left-3 bg-gradient-to-r ${person.color} text-white text-[10px] font-bold px-3 py-1 rounded-full`}>
                {person.tag}
              </span>
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-white font-bold text-base leading-tight">{person.name}</p>
                <p className="text-white/80 text-xs">{person.role}</p>
              </div>
            </div>
            <div className="p-4 pb-0">
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {person.skills.slice(0, 3).map((s) => (
                  <span key={s} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${person.color} text-white`}>{s}</span>
                ))}
              </div>
              <p className="text-[12.5px] leading-relaxed text-gray-600 font-medium line-clamp-3">
                {person.bio}
              </p>
            </div>
          </div>
          <div className="p-4 pt-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewMore();
              }}
              className={`w-full py-2 px-4 rounded-xl text-xs font-bold text-center text-white bg-gradient-to-r ${person.color} hover:opacity-95 active:scale-[0.98] transition-all duration-200`}
            >
              View Profile
            </button>
            <p className="mt-2 text-[10px] text-center text-teal-600 font-bold uppercase tracking-wider">
              Hover to Flip
            </p>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${person.color} p-6 flex flex-col justify-between`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div>
            <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">{person.role}</p>
            <p className="text-white font-extrabold text-lg leading-tight mb-3">{person.name}</p>
            <p className="text-white/90 text-xs leading-5 line-clamp-4">{person.bio}</p>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {person.skills.map((s) => (
                <span key={s} className="text-[10px] bg-white/20 text-white px-2.5 py-1 rounded-full">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-white/80 text-xs italic mb-3">"{person.fun}"</p>
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-1.5">
                <a href={person.linkedin} className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition font-semibold">LinkedIn</a>
                <a href={person.twitter} className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition font-semibold">Twitter</a>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewMore();
                }}
                className="text-[11px] bg-white text-gray-900 hover:bg-gray-100 px-4 py-1.5 rounded-full transition font-bold"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── PAGE ───────────────────────────────────────────── */
export default function MeetTheAltHumansPage() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const openRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-60px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-60px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
  const openInView = useInView(openRef, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-[#f7fafa]">
      <DarkNavbar />

      {/* Hero Banner */}
      <div className="relative h-56 overflow-hidden mt-16">
        <motion.div animate={{ scale: [1, 1.08, 1], x: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #105DA1 0%, #1a73e8 50%, #14b8a6 100%)" }} />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
        {/* floating glass bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div key={i}
            animate={{
              y: [0, -35, 0],
              x: [0, 15, 0],
              scale: [1, 1.05, 1],
              opacity: [0.45, 0.85, 0.45]
            }}
            transition={{ duration: 15 + i * 3.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            className="absolute rounded-full bg-gradient-to-tr from-[#105DA1]/42 to-[#14b8a6]/42 border border-white/45 backdrop-blur-[2px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),_0_8px_20px_rgba(16,93,161,0.3)] pointer-events-none"
            style={{
              width: 70 + i * 14,
              height: 70 + i * 14,
              left: `${5 + i * 12}%`,
              top: `${15 + (i % 3) * 22}%`
            }}
          />
        ))}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">The People Behind The Products</p>
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#ffffff" }}>Meet The AltHumans</h1>
          <p className="mt-3 text-white/80 text-sm max-w-xl">Engineers, designers, builders and dreamers — united by one mission: help great products reach their full potential.</p>
        </motion.div>
      </div>

      {/* ── STATS STRIP ── */}
      <section ref={statsRef} className="bg-white border-b border-teal-100">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }} animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.35 }}
              whileHover={{ scale: 1.05, y: -3 }}
              className="text-center cursor-default">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity }}
                className="text-3xl mb-2">{s.icon}</motion.div>
              <p className="text-3xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1 leading-5">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TEAM GRID ── */}
      <section ref={teamRef} className="max-w-6xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-700 text-xs font-semibold uppercase tracking-widest mb-3">The Team</span>
          <h2 className="text-4xl font-extrabold text-gray-900">The AltHumans</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">Hover each card to flip and learn more about the person behind the role.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {team.map((person, i) => (
            <TeamCard key={person.name} person={person} i={i} inView={teamInView} onViewMore={() => setSelectedPerson(person)} />
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-violet-100 border border-violet-200 text-violet-700 text-xs font-semibold uppercase tracking-widest mb-3">Culture</span>
            <h2 className="text-4xl font-extrabold text-gray-900">What We Believe In</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">Our values aren't wall posters — they're how we make decisions every day.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 40, rotateX: -15 }}
                animate={valuesInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-[#f7fafa] p-7 cursor-default">
                {/* Top gradient border */}
                <motion.div initial={{ scaleX: 0 }} animate={valuesInView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }} style={{ transformOrigin: "left" }}
                  className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${v.color}`} />
                {/* Hover glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 bg-gradient-to-br ${v.color}`} />
                <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity }}
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-2xl mb-5`}>
                  {v.icon}
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-7">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CULTURE MARQUEE ── */}
      <section className="py-10 bg-[#f0faf9] border-y border-teal-100 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f0faf9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f0faf9] to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-hidden">
          <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 whitespace-nowrap">
            {[...Array(2)].map((_, repeat) =>
              ["Remote First 🌍", "Async by Default ⚡", "Ship Daily 🚀", "No Micromanagement 🙅", "Learning Budget 📚", "Diverse & Inclusive 🌈", "Founder Mindset 🧠", "Work Hard, Rest Harder 🛌", "Open Source Contributors 🔓", "Dog-friendly Office 🐶"].map((item, i) => (
                <span key={`${repeat}-${i}`} className="text-teal-700 font-semibold text-sm shrink-0">
                  {item} <span className="text-teal-300 mx-4">·</span>
                </span>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section ref={openRef} className="max-w-4xl mx-auto px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={openInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.35 }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-semibold uppercase tracking-widest mb-3">We're Hiring</span>
          <h2 className="text-4xl font-extrabold text-gray-900">Open Roles</h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">Think you're an AltHuman? We'd love to meet you.</p>
        </motion.div>
        <div className="space-y-4">
          {openings.map((o, i) => (
            <Link href="/login" key={o.role} className="block no-underline">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={openInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                whileHover={{ x: 6, scale: 1.01 }}
                className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm cursor-pointer group">
                <div className="flex items-center gap-4">
                  <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${o.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                    {o.team[0]}
                  </span>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-teal-600 transition text-sm">{o.role}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{o.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full bg-gradient-to-r ${o.color} text-white`}>{o.team}</span>
                  <motion.span whileHover={{ x: 3 }} className="text-teal-600 font-bold text-sm">Apply →</motion.span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-500" />
          <motion.div animate={{ x: [0, 50, 0], opacity: [0.15, 0.35, 0.15] }} transition={{ duration: 7, repeat: Infinity }}
            className="absolute right-0 top-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          {/* floating team avatars */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex -space-x-3 opacity-80">
            {team.slice(0, 5).map((p, i) => (
              <motion.img key={i} src={p.image} alt={p.name}
                animate={{ y: [0, -6, 0] }} transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
                className="w-10 h-10 rounded-full border-2 border-white object-cover" />
            ))}
          </div>
          <div className="relative z-10 py-14 px-10 text-center">
            <h2 className="text-3xl font-extrabold text-white">Want to become an AltHuman?</h2>
            <p className="mt-3 text-white/80 max-w-lg mx-auto">We hire for attitude, curiosity and craft. Send us your portfolio or LinkedIn — we read every application.</p>
            <Link href="/login"
              className="mt-8 inline-flex items-center gap-2 bg-white text-teal-700 font-bold px-8 py-4 rounded-full hover:bg-teal-50 transition shadow-lg">
              Join the Team →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ── PROFILE MODAL ── */}
      <AnimatePresence>
        {selectedPerson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[900] bg-black/60 backdrop-blur-sm flex justify-center items-start pt-20 md:pt-28 pb-8 px-4"
            onClick={() => setSelectedPerson(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[calc(100vh-112px)] md:max-h-[calc(100vh-144px)] overflow-hidden bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPerson(null)}
                className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white font-bold text-lg transition-colors"
              >
                ✕
              </button>

              {/* Left Column: Photo & Tag */}
              <div className="w-full md:w-2/5 relative h-64 md:h-auto min-h-[300px] shrink-0">
                <img
                  src={selectedPerson.image}
                  alt={selectedPerson.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${selectedPerson.color} text-white text-[10px] font-bold uppercase tracking-wider mb-2`}>
                    {selectedPerson.tag}
                  </span>
                  <h3 className="text-white text-2xl font-extrabold leading-tight">
                    {selectedPerson.name}
                  </h3>
                  <p className="text-white/80 text-sm font-medium mt-1">
                    {selectedPerson.role}
                  </p>
                </div>
              </div>

              {/* Right Column: Detailed Bio */}
              <div className="w-full md:w-3/5 p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  <h4 className="text-gray-900 font-extrabold text-lg mb-2">
                    Professional Deep Dive
                  </h4>
                  <p className="text-gray-600 text-[13.5px] leading-relaxed mb-6">
                    {selectedPerson.longBio}
                  </p>

                  <h5 className="text-gray-900 font-extrabold text-xs uppercase tracking-wider mb-3">
                    Key Achievements
                  </h5>
                  <ul className="space-y-2 mb-6">
                    {selectedPerson.achievements.map((ach, idx) => (
                      <li key={idx} className="flex gap-2.5 text-[12.5px] text-gray-600 leading-relaxed">
                        <span className="text-teal-600 font-bold">✓</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  <h5 className="text-gray-900 font-extrabold text-xs uppercase tracking-wider mb-3">
                    Expertise
                  </h5>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedPerson.skills.map((s) => (
                      <span key={s} className={`text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r ${selectedPerson.color} text-white`}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                  <div className="text-gray-500 italic text-[11px] leading-snug">
                    "{selectedPerson.fun}"
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <a
                      href={selectedPerson.linkedin}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition font-semibold"
                    >
                      LinkedIn
                    </a>
                    <a
                      href={selectedPerson.twitter}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition font-semibold"
                    >
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
