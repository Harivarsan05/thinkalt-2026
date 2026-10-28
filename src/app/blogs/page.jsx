"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DarkNavbar from "../../components/DarkNavbar";
import { blogArticles } from "../../data/blogArticles";
import BreadcrumbSchema from "../../components/seo/BreadcrumbSchema";
import WebPageSchema from "../../components/seo/WebPageSchema";

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const categoriesList = [
    { name: "Mobile App Development", count: 10 },
    { name: "Webapp Development", count: 11 },
    { name: "Foundry", count: 8 },
    { name: "MIRSA", count: 7 }
  ];

  // Dynamic filter logic mapping category items
  const filtered = activeCategory === "All"
    ? blogArticles
    : blogArticles.filter(article => {
        if (activeCategory === "Mobile App Development") {
          return article.category === "Mobile App Development";
        }
        if (activeCategory === "Webapp Development") {
          return article.category === "Webapp Development" || article.category === "Web";
        }
        if (activeCategory === "MIRSA") {
          return article.category === "MIRSA";
        }
        if (activeCategory === "Foundry") {
          return article.category !== "Mobile App Development" && article.category !== "Webapp Development" && article.category !== "Web" && article.category !== "MIRSA";
        }
        return false;
      });

  const searchedAndFiltered = filtered.filter(article => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
  });

  const recentPosts = blogArticles.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7fafa]">
      <WebPageSchema name="ThinkAlternate Blog" description="Insights on AI, product engineering, web and mobile development, cloud, and digital transformation." path="/blogs" type="CollectionPage" />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Blogs", path: "/blogs" }]} />
      <DarkNavbar />

      {/* Hero Banner */}
      <div className="relative h-48 overflow-hidden mt-16">
        <motion.div animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #105DA1 0%, #1a73e8 50%, #14b8a6 100%)" }} />
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
        
        {/* floating glass bubbles */}
        {[...Array(8)].map((_, i) => (
          <motion.div key={i}
            animate={{
              y: [0, -35, 0],
              x: [0, -15, 0],
              scale: [1, 1.05, 1],
              opacity: [0.45, 0.85, 0.45]
            }}
            transition={{ duration: 15 + i * 3.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            className="absolute rounded-full bg-gradient-to-tr from-[#105DA1]/42 to-[#14b8a6]/42 border border-white/45 backdrop-blur-[2px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),_0_8px_20px_rgba(16,93,161,0.3)] pointer-events-none"
            style={{
              width: 70 + i * 14,
              height: 70 + i * 14,
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 3) * 20}%`
            }}
          />
        ))}
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold" style={{ color: "#ffffff" }}>Blogs</h1>
          
          {/* Breadcrumbs */}
          <div className="mt-3 flex items-center justify-center gap-2.5 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/15 text-xs text-white/80 font-medium">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span className="text-white/40">→</span>
            <span className="text-white">Blogs</span>
          </div>
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Post Feed */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="wait">
              {searchedAndFiltered.length > 0 ? (
                <motion.div
                  key={`${activeCategory}-${searchQuery}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-10"
                >
                  {searchedAndFiltered.map((post) => (
                    <article key={post.id} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                      
                      {/* Image Thumbnail */}
                      <Link href={`/blogs/${post.id}`} className="block relative aspect-[16/9] w-full overflow-hidden bg-gray-100 border-b border-gray-50">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 768px"
                          style={{ objectFit: "cover" }}
                          className="group-hover:scale-[1.01] transition-transform duration-500"
                        />
                      </Link>

                      {/* Content Details */}
                      <div className="p-8">
                        
                        {/* Categories List */}
                        <div className="flex flex-wrap gap-2.5 mb-4">
                          {post.categories ? post.categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => {
                                const matchingCategory = categoriesList.find(c => c.name.toLowerCase() === cat.toLowerCase());
                                if (matchingCategory) {
                                  setActiveCategory(matchingCategory.name);
                                } else {
                                  // Fallback to closest match
                                  if (cat.toLowerCase().includes("mobile")) setActiveCategory("Mobile App Development");
                                  else if (cat.toLowerCase().includes("web")) setActiveCategory("Webapp Development");
                                }
                              }}
                              className="text-[10px] font-bold text-teal-600 hover:text-teal-800 uppercase tracking-widest transition"
                            >
                              {cat}
                            </button>
                          )) : (
                            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
                              {post.category}
                            </span>
                          )}
                        </div>

                        {/* Article Title */}
                        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 group-hover:text-teal-600 transition leading-snug">
                          <Link href={`/blogs/${post.id}`}>{post.title}</Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="mt-4 text-sm text-gray-500 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Bottom Row metadata & CTA */}
                        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400 font-semibold">{post.date}</span>
                            {post.read && (
                              <>
                                <span className="text-gray-300 text-xs">•</span>
                                <span className="text-[11px] text-gray-400 font-medium">{post.read}</span>
                              </>
                            )}
                          </div>
                          
                          <Link href={`/blogs/${post.id}`}>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700 transition">
                              Read More 
                              <span className="text-sm transition-transform group-hover:translate-x-1 duration-300">→</span>
                            </span>
                          </Link>
                        </div>

                      </div>
                    </article>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm"
                >
                  <span className="text-4xl">🔍</span>
                  <h3 className="mt-4 text-base font-bold text-gray-900">No articles found</h3>
                  <p className="mt-2 text-xs text-gray-500 max-w-xs mx-auto">
                    We couldn't find any articles matching your search query or category filter. Try checking your spelling or selecting another topic.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                    className="mt-5 px-6 py-2.5 bg-teal-600 text-white text-xs font-bold rounded-full hover:bg-teal-700 transition shadow-sm"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Search Widget */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-4">Search</h3>
              <div className="relative">
                <input
                  aria-label="Search articles"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full pl-5 pr-12 py-3 rounded-full bg-gray-50 border border-gray-100 outline-none text-xs text-gray-800 placeholder-gray-400 focus:border-teal-500 focus:bg-white transition"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">
                  🔍
                </span>
              </div>
            </div>

            {/* Recent Posts Widget */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-5">Recent Posts</h3>
              <div className="space-y-5">
                {recentPosts.map((post) => (
                  <Link href={`/blogs/${post.id}`} key={post.id} className="flex gap-4 group">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={post.image}
                        alt={`Recent post thumbnail for ${post.title}`}
                        fill
                        sizes="64px"
                        style={{ objectFit: "cover" }}
                        className="group-hover:scale-102 transition duration-300"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="text-xs font-bold text-gray-800 group-hover:text-teal-600 transition leading-snug line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 mt-1">{post.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory("All")}
                  className={`w-full flex justify-between items-center px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
                    activeCategory === "All"
                      ? "bg-gray-900 border-gray-900 text-white"
                      : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-teal-50/50 hover:text-teal-700 hover:border-teal-100"
                  }`}
                >
                  <span>All Categories</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                    activeCategory === "All" ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {blogArticles.length}
                  </span>
                </button>

                {categoriesList.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`w-full flex justify-between items-center px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
                      activeCategory === cat.name
                        ? "bg-gray-900 border-gray-900 text-white"
                        : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-teal-50/50 hover:text-teal-700 hover:border-teal-100"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      activeCategory === cat.name ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"
                    }`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Widget */}
            <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-cyan-500 rounded-3xl p-6 text-white shadow-lg">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
              <h3 className="text-sm font-extrabold uppercase tracking-widest mb-2">Newsletter</h3>
              <p className="text-xs text-white/85 leading-relaxed mb-5">
                Subscribe to get the latest AltHuman tech insights, webapp tutorials, and cost reduction strategies.
              </p>
              <div className="space-y-2.5">
                <input
                  aria-label="Email address for newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-2xl text-xs outline-none text-gray-900 bg-white placeholder-gray-400 shadow-inner"
                />
                <button
                  onClick={() => {
                    alert("Subscribed successfully!");
                    setEmail("");
                  }}
                  className="w-full py-3 rounded-2xl bg-gray-900 text-white text-xs font-bold hover:bg-gray-800 transition shadow-md"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Sticky Lead Gen/CTA Widget */}
            <div className="lg:sticky lg:top-24">
              <div className="relative overflow-hidden bg-slate-950 border border-slate-900 rounded-3xl p-6 text-white shadow-xl group">
                {/* Neon glow effect on hover */}
                <div className="absolute -inset-px bg-gradient-to-r from-teal-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-15 transition duration-500 blur-sm pointer-events-none" />
                
                {/* Glowing decorative shapes */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-[10px] text-teal-400 font-bold uppercase tracking-wider mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                    Transform Your Idea
                  </div>
                  
                  <h3 className="text-lg font-black tracking-tight leading-tight text-white mb-2.5">
                    Launch Your App in <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Weeks, Not Months</span>
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    Partner with thinkalternate. Build scalable, high-performance MVPs, webapps, and AI integrations with our elite developer team.
                  </p>

                  <div className="space-y-3">
                    <Link 
                      href="/contact" 
                      className="block text-center w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_4px_20px_rgba(20,184,166,0.25)] hover:shadow-[0_4px_25px_rgba(20,184,166,0.45)] hover:scale-[1.01]"
                    >
                      Book a Free Consultation
                    </Link>
                    <Link 
                      href="/case-study" 
                      className="block text-center w-full py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-850 hover:text-white transition duration-300"
                    >
                      View Case Studies
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
}
