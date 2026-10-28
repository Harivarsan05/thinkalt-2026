"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const f = "'Inter',sans-serif";

// Inline brand vector THAT logo for dark background
function ThatTextLogo() {
  return (
    <svg viewBox="0 0 972 310" style={{ height: 40, width: "auto", display: "block" }}>
      <g>
        {/* T */}
        <path fill="#105DA1" d="M10.5,6.6c65.7,0,131.3,0,197,0c0,21,0,42,0,63c-22,0-44,0-66,0c0,77.3,0,154.7,0,232c-21.7,0-43.3,0-65,0 c0-77.3,0-154.7,0-232c-22,0-44,0-66,0C10.5,48.6,10.5,27.6,10.5,6.6z" />
        {/* H */}
        <path fill="#105DA1" d="M226.5,6.6c22,0,44,0,66,0c0,38.3,0,76.7,0,115c38.7,0,77.3,0,116,0c0-38.3,0-76.7,0-115c22.3,0,44.7,0,67,0 c0,98.3,0,196.7,0,295c-22.3,0-44.7,0-67,0c0-38.7,0-77.3,0-116c-38.7,0-77.3,0-116,0c0,38.7,0,77.3,0,116c-22,0-44,0-66,0 C226.5,203.3,226.5,104.9,226.5,6.6z" />
        {/* A */}
        <path fill="#ffffff" d="M628.5,5.6c22.7-2.1,43.7,2.7,63,14.5c4.2,3.9,8,8,11.5,12.5c15.7,40.1,30,80.8,43,122 c15.7,48.9,30.8,97.9,45.5,147c-23.6,0.3-47.1,0-70.5-1c-25.6-75.9-51.5-151.8-77.5-227.5c-4.8-1.7-8-0.2-9.5,4.5 c-24.5,74.4-49.1,148.7-74,223c-23.8,1-47.6,1.3-71.5,1c26.4-90.7,55.9-180.3,88.5-269c8.9-12.2,20.7-20,35.5-23.5 C618,7.9,623.3,6.7,628.5,5.6z" />
        {/* T */}
        <path fill="#105DA1" d="M768.5,6.6c66,0,132,0,198,0c0,21,0,42,0,63c-22.3,0-44.7,0-67,0c0,77.3,0,154.7,0,232c-21.7,0-43.3,0-65,0 c0-77.3,0-154.7,0-232c-22,0-44,0-66,0C768.5,48.6,768.5,27.6,768.5,6.6z" />
      </g>
    </svg>
  );
}

const mirsaItems = [
  { label: "Performax Engine",        href: "/performax-engine" },
  { label: "Ghost Bugs",              href: "/ghost-bugs" },
  { label: "Cloud Cost Optimization", href: "/cloud-cost-optimization" },
  { label: "AppTron",                 href: "/apptron" },
  { label: "Root Cause Engine",       href: "/root-cause-engine" },
  { label: "Sentiment Analyzer",      href: "/sentiment-analyzer" },
  { label: "App Health Dashboard",    href: "/app-health-dashboard" },
  { label: "CoPilot Assistant",       href: "/copilot-assistant" },
  { label: "App Audit Engine",        href: "/app-audit-engine" },
  { label: "Pricing",                 href: "/mirsa-pricing" },
];

const servicesItems = [
  { label: "Mobile App Development",               href: "/services/mobile-app-development" },
  { label: "Web App Development",                  href: "/services/web-app-development" },
  { label: "DevOps & Cloud Optimization",          href: "/services/devops-cloud-optimization" },
  { label: "AI Integrations & Product Intelligence", href: "/services/ai-integrations" },
  { label: "QA Automation & Regression Testing",   href: "/services/qa-automation" },
  { label: "CTO+ – Fractional CTO Services",       href: "/services/fractional-cto" },
  { label: "GCC Setup Support",                    href: "/services/gcc-setup" },
  { label: "UI/UX Design",                         href: "/services/ui-ux-design" },
  { label: "App Maintenance & Optimization",       href: "/services/app-maintenance" },
];

const dropStyle = {
  position: "absolute",
  top: "calc(100% + 12px)",
  left: "50%",
  transform: "translateX(-50%)",
  minWidth: 260,
  background: "#1c1c2e",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
  overflow: "hidden",
  zIndex: 2000,
};

function DropLink({ item, i, total, close }) {
  return (
    <Link
      href={item.href}
      onClick={close}
      style={{
        display: "block",
        padding: "11px 20px",
        color: "rgba(255,255,255,0.82)",
        fontFamily: f,
        fontSize: 13.5,
        fontWeight: 500,
        textDecoration: "none",
        background: "transparent",
        transition: "background 0.15s, color 0.15s",
        borderBottom: i < total - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "rgba(255,255,255,0.82)";
      }}
    >
      {item.label}
    </Link>
  );
}

export default function DarkNavbar() {
  const [open, setOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [session, setSession] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setSession(data.user);
        }
      })
      .catch(err => console.error("Error loading session:", err));
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSession(null);
        setShowProfileMenu(false);
        window.location.reload();
      }
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  // Search states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const allSearchItems = [
    ...mirsaItems.map((item) => ({ ...item, category: "MIRSA Platform" })),
    ...servicesItems.map((item) => ({ ...item, category: "Our Services" })),
    { label: "Case Study", href: "/case-study", category: "Quick Links" },
    { label: "Pricing & Engagement", href: "/pricing", category: "Quick Links" },
    { label: "Meet The AltHumans", href: "/meet-the-althumans", category: "Quick Links" },
    { label: "Blogs", href: "/blogs", category: "Quick Links" },
  ];

  const filteredItems = allSearchItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 50);
    }
  }, [searchOpen]);

  // Handle ESC key to close search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    const fn = () => setScrolled(window.scrollY > 12);

    handleResize();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const close = () => {
    setOpen(null);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const toggle = (m) => setOpen((p) => (p === m ? null : m));

  const linkStyle = (active = false) => ({
    fontFamily: f,
    fontSize: "clamp(13px, 0.3vw + 9.5px, 15.5px)",
    fontWeight: 700,
    color: active ? "#fff" : "rgba(255,255,255,0.78)",
    textDecoration: "none",
    padding: "8px clamp(4px, 0.5vw, 12px)",
    display: "flex",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "color 0.15s, font-size 0.15s, padding 0.15s",
    whiteSpace: "nowrap",
  });

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: scrolled ? 12 : 18,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "rgba(34,34,42,0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: scrolled ? "0 14px 44px rgba(0,0,0,0.45)" : "0 16px 40px rgba(0,0,0,0.28)",
          display: "flex",
          alignItems: "center",
          maxWidth: 1760,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          whiteSpace: "nowrap",
        }}
        className="px-5 sm:px-9 h-[68px] sm:h-[78px] w-[calc(100vw-32px)] sm:w-[calc(100vw-82px)] justify-between sm:justify-start"
      >
        {/* THAT text logo */}
        <Link href="/" onClick={close} className="mr-0 sm:mr-7" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
          <ThatTextLogo />
        </Link>

        {/* Divider */}
        <div className="hidden sm:block" style={{ width: 1, height: 34, background: "rgba(255,255,255,0.14)", marginRight: 24, flexShrink: 0 }} />

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-[6px] md:gap-[8px] lg:gap-[12px] xl:gap-5" style={{ alignItems: "center", flex: 1 }}>
            {/* MIRSA */}
            {/* MIRSA */}
            <div style={{ display: "flex", alignItems: "center", gap: 2, position: "relative", flexShrink: 0 }}>
              <Link
                href="/mirsa"
                style={{
                  fontFamily: f,
                  fontSize: "clamp(13px, 0.3vw + 9.5px, 15.5px)",
                  fontWeight: 700,
                  color: open === "mirsa" ? "#fff" : "rgba(255,255,255,0.78)",
                  textDecoration: "none",
                  padding: "8px clamp(2px, 0.3vw, 4px) 8px clamp(4px, 0.5vw, 10px)",
                  transition: "color 0.15s, font-size 0.15s, padding 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => {
                  if (open !== "mirsa") e.currentTarget.style.color = "rgba(255,255,255,0.78)";
                }}
              >
                MIRSA
              </Link>
              <button
                suppressHydrationWarning
                onClick={() => toggle("mirsa")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: open === "mirsa" ? "#fff" : "rgba(255,255,255,0.78)",
                  padding: "8px 6px 8px 3px",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => {
                  if (open !== "mirsa") e.currentTarget.style.color = "rgba(255,255,255,0.78)";
                }}
              >
                <svg
                  style={{
                    width: 10,
                    height: 10,
                    transition: "transform 0.2s",
                    transform: open === "mirsa" ? "rotate(180deg)" : "rotate(0)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === "mirsa" && (
                <div style={dropStyle}>
                  {mirsaItems.map((item, i) => (
                    <DropLink key={item.label} item={item} i={i} total={mirsaItems.length + 1} close={close} />
                  ))}
                  <Link href="/mirsa" onClick={close}
                    style={{
                      display: "block",
                      padding: "11px 20px",
                      color: "#c084fc",
                      fontFamily: f,
                      fontSize: 13.5,
                      fontWeight: "bold",
                      textDecoration: "none",
                      background: "rgba(139, 92, 246, 0.15)",
                      textAlign: "center",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139, 92, 246, 0.3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(139, 92, 246, 0.15)")}
                  >
                    View All MIRSA Solutions →
                  </Link>
                </div>
              )}
            </div>

            {/* Services */}
            <div style={{ display: "flex", alignItems: "center", gap: 2, position: "relative", flexShrink: 0 }}>
              <Link
                href="/services"
                style={{
                  fontFamily: f,
                  fontSize: "clamp(13px, 0.3vw + 9.5px, 15.5px)",
                  fontWeight: 700,
                  color: open === "services" ? "#fff" : "rgba(255,255,255,0.78)",
                  textDecoration: "none",
                  padding: "8px clamp(2px, 0.3vw, 4px) 8px clamp(4px, 0.5vw, 10px)",
                  transition: "color 0.15s, font-size 0.15s, padding 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => {
                  if (open !== "services") e.currentTarget.style.color = "rgba(255,255,255,0.78)";
                }}
              >
                Services
              </Link>
              <button
                suppressHydrationWarning
                onClick={() => toggle("services")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: open === "services" ? "#fff" : "rgba(255,255,255,0.78)",
                  padding: "8px 6px 8px 3px",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => {
                  if (open !== "services") e.currentTarget.style.color = "rgba(255,255,255,0.78)";
                }}
              >
                <svg
                  style={{
                    width: 10,
                    height: 10,
                    transition: "transform 0.2s",
                    transform: open === "services" ? "rotate(180deg)" : "rotate(0)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {open === "services" && (
                <div style={dropStyle}>
                  {servicesItems.map((item, i) => (
                    <DropLink key={item.label} item={item} i={i} total={servicesItems.length + 1} close={close} />
                  ))}
                  <Link href="/services" onClick={close}
                    style={{
                      display: "block",
                      padding: "11px 20px",
                      color: "#c084fc",
                      fontFamily: f,
                      fontSize: 13.5,
                      fontWeight: "bold",
                      textDecoration: "none",
                      background: "rgba(139, 92, 246, 0.15)",
                      textAlign: "center",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(139, 92, 246, 0.3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(139, 92, 246, 0.15)")}
                  >
                    View All Services →
                  </Link>
                </div>
              )}
            </div>

            {/* Static links */}
            {[
              { label: "Case Study",           href: "/case-study" },
              { label: "Pricing & Engagement", href: "/pricing" },
              { label: "Meet The AltHumans",   href: "/meet-the-althumans" },
              { label: "Blogs",                href: "/blogs" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={linkStyle()}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.78)")}
              >
                {item.label}
              </Link>
            ))}
          </div>

        {/* Right side CTA & Search */}
        <div className="gap-2 sm:gap-[18px] ml-0 sm:ml-auto" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          {/* Search Button */}
          <button
            suppressHydrationWarning
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              color: "rgba(255,255,255,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.8)")}
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          {/* Get Started */}
          <div className="block">
            {session ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                  }}
                >
                  <img
                    src={session.picture}
                    alt={session.name}
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #a855f7" }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", fontFamily: f }} className="hidden md:inline">
                    {session.name.split(" ")[0]}
                  </span>
                </button>
                {showProfileMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 12px)",
                      right: 0,
                      minWidth: 220,
                      background: "#1c1c2e",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.08)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                      padding: "12px 0",
                      zIndex: 2000,
                    }}
                  >
                    <div style={{ padding: "8px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0, fontFamily: f }}>{session.name}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: "2px 0 0 0", overflow: "hidden", textOverflow: "ellipsis", fontFamily: f }}>{session.email}</p>
                    </div>
                    <Link
                      href="/app-health-dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      style={{
                        display: "block",
                        padding: "10px 16px",
                        fontSize: 13,
                        color: "rgba(255,255,255,0.8)",
                        textDecoration: "none",
                        fontFamily: f,
                        fontWeight: 500,
                        transition: "background 0.15s, color 0.15s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                      }}
                    >
                      App Health Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        display: "block",
                        padding: "10px 16px",
                        fontSize: 13,
                        color: "#f87171",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: f,
                        fontWeight: 500,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="px-3.5 py-1.5 text-xs md:px-5 md:py-2 md:text-[13.5px] lg:px-6 lg:py-2.5 lg:text-[14px] xl:px-7 xl:py-3 xl:text-[14.5px] font-extrabold flex items-center justify-center"
                style={{
                  borderRadius: 999,
                  background: "#fff",
                  color: "#0a0a0a",
                  fontFamily: f,
                  textDecoration: "none",
                  flexShrink: 0,
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e8e8e8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            suppressHydrationWarning
            aria-label="Toggle Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex sm:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 6,
              color: "#fff",
              flexDirection: "column",
              gap: 5,
              justifyContent: "center",
              alignItems: "center",
              width: 32,
              height: 32,
            }}
          >
            <div
              style={{
                width: 20,
                height: 2,
                background: "#fff",
                borderRadius: 1,
                transition: "transform 0.3s",
                transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <div
              style={{
                width: 20,
                height: 2,
                background: "#fff",
                borderRadius: 1,
                opacity: mobileOpen ? 0 : 1,
                transition: "opacity 0.3s",
              }}
            />
            <div
              style={{
                width: 20,
                height: 2,
                background: "#fff",
                borderRadius: 1,
                transition: "transform 0.3s",
                transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Floating Panel for Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(4px)",
                zIndex: 998,
              }}
            />

            {/* Mobile Drawer Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: scrolled ? 86 : 94,
                left: "50%",
                transform: "translateX(-50%)",
                width: "calc(100vw - 40px)",
                maxHeight: "calc(100vh - 100px)",
                overflowY: "auto",
                background: "rgba(18,18,28,0.96)",
                backdropFilter: "blur(20px)",
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
                padding: "20px 16px",
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {/* MIRSA Dropdown in Mobile */}
              <div>
                <button
                  onClick={() => toggle("mirsa")}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "none",
                    background: open === "mirsa" ? "rgba(255,255,255,0.06)" : "transparent",
                    color: "#fff",
                    fontFamily: f,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  MIRSA
                  <svg
                    style={{
                      width: 12,
                      height: 12,
                      marginLeft: "auto",
                      transform: open === "mirsa" ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s",
                    }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {open === "mirsa" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 12,
                      margin: "4px 0 8px 0",
                      overflow: "hidden",
                    }}
                  >
                    {mirsaItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={close}
                        style={{
                          padding: "11px 20px",
                          color: "rgba(255,255,255,0.8)",
                          fontFamily: f,
                          fontSize: 13,
                          textDecoration: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/mirsa"
                      onClick={close}
                      style={{
                        padding: "11px 20px",
                        color: "#c084fc",
                        fontFamily: f,
                        fontSize: 13,
                        fontWeight: "bold",
                        textDecoration: "none",
                        background: "rgba(139, 92, 246, 0.12)",
                        textAlign: "center",
                      }}
                    >
                      View All MIRSA Solutions →
                    </Link>
                  </div>
                )}
              </div>

              {/* Services Dropdown in Mobile */}
              <div>
                <button
                  onClick={() => toggle("services")}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "none",
                    background: open === "services" ? "rgba(255,255,255,0.06)" : "transparent",
                    color: "#fff",
                    fontFamily: f,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Services
                  <svg
                    style={{
                      width: 12,
                      height: 12,
                      marginLeft: "auto",
                      transform: open === "services" ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s",
                    }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {open === "services" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: 12,
                      margin: "4px 0 8px 0",
                      overflow: "hidden",
                    }}
                  >
                    {servicesItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={close}
                        style={{
                          padding: "11px 20px",
                          color: "rgba(255,255,255,0.8)",
                          fontFamily: f,
                          fontSize: 13,
                          textDecoration: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={close}
                      style={{
                        padding: "11px 20px",
                        color: "#c084fc",
                        fontFamily: f,
                        fontSize: 13,
                        fontWeight: "bold",
                        textDecoration: "none",
                        background: "rgba(139, 92, 246, 0.12)",
                        textAlign: "center",
                      }}
                    >
                      View All Services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Static links */}
              {[
                { label: "Case Study",           href: "/case-study" },
                { label: "Pricing & Engagement", href: "/pricing" },
                { label: "Meet The AltHumans",   href: "/meet-the-althumans" },
                { label: "Blogs",                href: "/blogs" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={close}
                  style={{
                    padding: "10px 14px",
                    color: "rgba(255,255,255,0.85)",
                    fontFamily: f,
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: "none",
                    borderRadius: 12,
                    display: "block",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Get Started */}
              {session ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12, padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={session.picture} alt={session.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0, fontFamily: f }}>{session.name}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0, fontFamily: f }}>{session.email}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <Link href="/app-health-dashboard" onClick={close} style={{ flex: 1, padding: "8px 12px", background: "#8b5cf6", color: "#fff", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none", textAlign: "center", fontFamily: f }}>
                      Dashboard
                    </Link>
                    <button onClick={handleSignOut} style={{ flex: 1, padding: "8px 12px", background: "rgba(239, 68, 68, 0.1)", color: "#f87171", borderRadius: 8, fontSize: 12, fontWeight: 700, border: "1px solid rgba(239, 68, 68, 0.2)", cursor: "pointer", fontFamily: f }}>
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={close}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "#fff",
                    color: "#0a0a0a",
                    fontFamily: f,
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                    marginTop: 10,
                  }}
                >
                  Get Started
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Click outside desktop dropdowns wrapper */}
      {open && !isMobile && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999 }} onClick={close} />
      )}

      {/* Dark Premium Search Modal Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(10, 10, 16, 0.55)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
            }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.35 }}
              style={{
                width: "100%",
                maxWidth: "720px",
                background: "rgba(20, 20, 32, 0.95)",
                backdropFilter: "blur(24px)",
                borderRadius: "20px",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.55)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                flexDirection: "column",
                maxHeight: "85vh",
                overflow: "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Input section */}
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  ref={searchInputRef}
                  aria-label="Search topics, services or features"
                  type="text"
                  placeholder="Search topics, services or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "15px",
                    fontFamily: f,
                    background: "transparent",
                    color: "#ffffff",
                  }}
                />
                <button
                  aria-label="Close Search"
                  onClick={() => setSearchOpen(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    color: "rgba(255,255,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Categorized Content */}
              <div
                style={{
                  padding: "24px",
                  overflowY: "auto",
                  flex: 1,
                }}
              >
                {searchQuery.trim() === "" ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1.2fr 0.8fr",
                      gap: "28px",
                    }}
                  >
                    {/* MIRSA Platform */}
                    <div>
                      <h3
                        style={{
                          fontSize: "11px",
                          fontWeight: "900",
                          color: "#a78bfa",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "12px",
                          borderBottom: "2px solid rgba(167, 139, 250, 0.2)",
                          paddingBottom: "4px",
                        }}
                      >
                        MIRSA Platform
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {mirsaItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setSearchOpen(false)}
                            style={{
                              fontSize: "13px",
                              color: "rgba(255,255,255,0.7)",
                              textDecoration: "none",
                              padding: "6px 8px",
                              borderRadius: "6px",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                              e.currentTarget.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Services */}
                    <div>
                      <h3
                        style={{
                          fontSize: "11px",
                          fontWeight: "900",
                          color: "#c084fc",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "12px",
                          borderBottom: "2px solid rgba(192, 132, 252, 0.2)",
                          paddingBottom: "4px",
                        }}
                      >
                        Our Services
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {servicesItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setSearchOpen(false)}
                            style={{
                              fontSize: "13px",
                              color: "rgba(255,255,255,0.7)",
                              textDecoration: "none",
                              padding: "6px 8px",
                              borderRadius: "6px",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                              e.currentTarget.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h3
                        style={{
                          fontSize: "11px",
                          fontWeight: "900",
                          color: "#fb923c",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "12px",
                          borderBottom: "2px solid rgba(251, 146, 60, 0.2)",
                          paddingBottom: "4px",
                        }}
                      >
                        Quick Links
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {[
                          { label: "Case Studies", href: "/case-study" },
                          { label: "Pricing & Engagement", href: "/pricing" },
                          { label: "Meet The AltHumans", href: "/meet-the-althumans" },
                          { label: "Blogs", href: "/blogs" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setSearchOpen(false)}
                            style={{
                              fontSize: "13px",
                              color: "rgba(255,255,255,0.7)",
                              textDecoration: "none",
                              padding: "6px 8px",
                              borderRadius: "6px",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                              e.currentTarget.style.color = "#ffffff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Search query active - results list
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "rgba(255,255,255,0.4)",
                        marginBottom: "12px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      SEARCH RESULTS ({filteredItems.length})
                    </div>
                    {filteredItems.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {filteredItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery("");
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "10px 14px",
                              borderRadius: "8px",
                              background: "rgba(255,255,255,0.03)",
                              textDecoration: "none",
                              color: "#ffffff",
                              fontSize: "13.5px",
                              fontWeight: "600",
                              transition: "all 0.15s",
                              border: "1px solid rgba(255,255,255,0.02)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                              e.currentTarget.style.transform = "translateX(2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                              e.currentTarget.style.transform = "none";
                            }}
                          >
                            <span>{item.label}</span>
                            <span
                              style={{
                                fontSize: "10px",
                                fontWeight: "700",
                                color:
                                  item.category === "MIRSA Platform"
                                    ? "#a78bfa"
                                    : item.category === "Our Services"
                                    ? "#c084fc"
                                    : "#fb923c",
                                background:
                                  item.category === "MIRSA Platform"
                                    ? "rgba(167, 139, 250, 0.1)"
                                    : item.category === "Our Services"
                                    ? "rgba(192, 132, 252, 0.1)"
                                    : "rgba(251, 146, 60, 0.1)",
                                padding: "3px 8px",
                                borderRadius: "999px",
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {item.category}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "36px 0",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        <div style={{ fontSize: "20px", marginBottom: "6px" }}>🔍</div>
                        <div style={{ fontSize: "13px", fontWeight: "600" }}>
                          No topics found matching "{searchQuery}"
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tip Footer */}
              <div
                style={{
                  padding: "12px 24px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  background: "rgba(10, 10, 16, 0.4)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                <span>
                  Press{" "}
                  <kbd
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "2px 5px",
                      borderRadius: "3px",
                      fontSize: "9px",
                      fontWeight: "700",
                      color: "#fff",
                    }}
                  >
                    ESC
                  </kbd>{" "}
                  to close
                </span>
                <span style={{ fontWeight: "600", color: "#a78bfa" }}>
                  Think Alternate Navigation Index
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
