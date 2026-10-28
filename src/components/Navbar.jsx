/**
 * Navbar.jsx
 *
 * Main navigation component for the website.
 *
 * Features:
 * - Responsive desktop and mobile navigation
 * - MIRSA dropdown menu
 * - Services dropdown menu
 * - Mobile hamburger menu
 * - Scroll-based navbar styling
 * - Navigation links and CTA button
 *
 * Dependencies:
 * - React Hooks (useState, useEffect)
 * - Next.js Link component
 */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Global font family used throughout navbar
const f = "'Inter',sans-serif";

/**
 * Navigation items displayed under the MIRSA dropdown menu.
 */
const mirsaItems = [
  { label: "Performax Engine",     href: "/performax-engine" },
  { label: "Ghost Bugs",           href: "/ghost-bugs" },
  { label: "Cloud Cost Optimization", href: "/cloud-cost-optimization" },
  { label: "AppTron",              href: "/apptron" },
  { label: "Root Cause Engine",    href: "/root-cause-engine" },
  { label: "Sentiment Analyzer",   href: "/sentiment-analyzer" },
  { label: "App Health Dashboard", href: "/app-health-dashboard" },
  { label: "CoPilot Assistant",    href: "/copilot-assistant" },
  { label: "App Audit Engine",     href: "/app-audit-engine" },
  { label: "Pricing",              href: "/mirsa-pricing" },
];

/**
 * Navigation items displayed under the Services dropdown menu.
 */
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

/**
 * Navbar Component
 *
 * Handles:
 * - Desktop navigation
 * - Mobile navigation
 * - Dropdown menus
 * - Scroll detection
 * - Responsive behavior
 *
 * Returns:
 * JSX navigation bar
 */
export default function Navbar() {
  // Currently opened dropdown menu
  const [open, setOpen] = useState(null);
  // Controls mobile menu visibility
  const [mobileOpen, setMobileOpen] = useState(false);
  // Detects mobile screen size once at mount
  const [isMobile, setIsMobile] = useState(false);

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

  // Search functionality states
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // Search items list representing all main head topics
  const allSearchItems = [
    ...mirsaItems.map(item => ({ ...item, category: "MIRSA Platform" })),
    ...servicesItems.map(item => ({ ...item, category: "Our Services" })),
    { label: "Case Study", href: "/case-study", category: "Quick Links" },
    { label: "Pricing & Engagement", href: "/pricing", category: "Quick Links" },
    { label: "Meet The AltHumans", href: "/meet-the-althumans", category: "Quick Links" },
    { label: "Blogs", href: "/blogs", category: "Quick Links" },
    { label: "Contact", href: "/contact", category: "Quick Links" }
  ];

  const filteredItems = allSearchItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close search when clicking Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 50);
    }
  }, [searchOpen]);

  /**
 * Initializes resize and scroll listeners.
 *
 * Responsibilities:
 * - Detect mobile viewport
 * - Add navbar shadow on scroll
 * - Cleanup event listeners on unmount
 */
  useEffect(() => {
    const updateViewportMode = () => setIsMobile(window.innerWidth < 1280);
    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);
    return () => window.removeEventListener("resize", updateViewportMode);
  }, []);

  /**
 * Closes all open menus.
 *
 * Used when:
 * - Navigation link is clicked
 * - Overlay is clicked
 */
  const close = () => {
    setOpen(null);
    setMobileOpen(false);
    setSearchOpen(false);
  };

  /**
 * Toggles dropdown visibility.
 *
 * @param {string} m - Menu identifier
 */
  const toggle = (m) => setOpen(p => p === m ? null : m);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
      }}>
        <div className="px-4 sm:px-6 lg:px-8" style={{
          maxWidth: 1440, margin: "0 auto",
          height: "clamp(76px, 5vw, 90px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>

          {/* Logo */}
          <Link href="/" onClick={close} style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <Image
              src="/Think-Alternate-logo (1).svg"
              alt="Think Alternate"
              width={196}
              height={62}
              priority
              style={{ display: "block", height: "clamp(48px, 3.5vw, 62px)", width: "auto" }}
            />
          </Link>
          {/* Desktop Nav Links */}
          <ul className="hidden xl:flex" style={{ alignItems: "center", gap: "clamp(2px, 0.45vw, 10px)", listStyle: "none", margin: 0, padding: 0 }}>
            {/* MIRSA */}
            <li style={{ position: "relative" }}>
              <div style={{
                display: "flex", alignItems: "center",
                background: open === "mirsa" ? "#0a0a0a" : "#105DA1",
                borderRadius: 999,
                color: "#fff", transition: "background 0.15s",
                overflow: "hidden",
              }}
                onMouseEnter={e => { if (open !== "mirsa") e.currentTarget.style.background = "#0a0a0a"; }}
                onMouseLeave={e => { if (open !== "mirsa") e.currentTarget.style.background = "#105DA1"; }}
              >
                <Link href="/mirsa" style={{
                  padding: "clamp(8px, 0.6vw, 10px) clamp(10px, 0.8vw, 14px)",
                  fontSize: "clamp(14px, 0.35vw + 10px, 16px)",
                  color: "#fff", fontFamily: f, fontWeight: 600,
                  textDecoration: "none", display: "block",
                  transition: "all 0.15s",
                }}>
                  MIRSA
                </Link>
                <button 
                  suppressHydrationWarning
                  onClick={() => toggle("mirsa")}
                  style={{
                    padding: "clamp(8px, 0.6vw, 10px) clamp(10px, 0.8vw, 14px) clamp(8px, 0.6vw, 10px) 8px",
                    background: "none", border: "none", cursor: "pointer",
                    color: "#fff", display: "flex", alignItems: "center",
                    borderLeft: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <svg style={{ width: 12, height: 12, transition: "transform 0.2s", transform: open === "mirsa" ? "rotate(180deg)" : "rotate(0)" }}
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {open === "mirsa" && (
                <div style={dropdownStyle}>
                  {mirsaItems.map((item, i) => (
                    <Link key={item.label} href={item.href} onClick={close}
                      style={dropdownLinkBase(i, mirsaItems.length + 1)}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >{item.label}</Link>
                  ))}
                  <Link href="/mirsa" onClick={close}
                    style={{
                      ...dropdownLinkBase(mirsaItems.length, mirsaItems.length + 1),
                      background: "rgba(70, 130, 180, 0.15)",
                      color: "#00CED1",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(70, 130, 180, 0.3)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(70, 130, 180, 0.15)"}
                  >
                    View All MIRSA Solutions →
                  </Link>
                </div>
            )}
          </li>

          {/* Services */}
            <li style={{ position: "relative" }}>
              <div style={{
                display: "flex", alignItems: "center",
                background: open === "services" ? "#0a0a0a" : "#105DA1",
                borderRadius: 999,
                color: "#fff", transition: "background 0.15s",
                overflow: "hidden",
              }}
                onMouseEnter={e => { if (open !== "services") e.currentTarget.style.background = "#0a0a0a"; }}
                onMouseLeave={e => { if (open !== "services") e.currentTarget.style.background = "#105DA1"; }}
              >
                <Link href="/services" style={{
                  padding: "clamp(8px, 0.6vw, 10px) clamp(10px, 0.8vw, 14px)",
                  fontSize: "clamp(14px, 0.35vw + 10px, 16px)",
                  color: "#fff", fontFamily: f, fontWeight: 600,
                  textDecoration: "none", display: "block",
                  transition: "all 0.15s",
                }}>
                  Services
                </Link>
                <button 
                  suppressHydrationWarning
                  onClick={() => toggle("services")}
                  style={{
                    padding: "clamp(8px, 0.6vw, 10px) clamp(10px, 0.8vw, 14px) clamp(8px, 0.6vw, 10px) 8px",
                    background: "none", border: "none", cursor: "pointer",
                    color: "#fff", display: "flex", alignItems: "center",
                    borderLeft: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <svg style={{ width: 12, height: 12, transition: "transform 0.2s", transform: open === "services" ? "rotate(180deg)" : "rotate(0)" }}
                    fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {open === "services" && (
                <div style={dropdownStyle}>
                  {servicesItems.map((item, i) => (
                    <Link key={item.label} href={item.href} onClick={close}
                      style={dropdownLinkBase(i, servicesItems.length + 1)}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >{item.label}</Link>
                  ))}
                  <Link href="/services" onClick={close}
                    style={{
                      ...dropdownLinkBase(servicesItems.length, servicesItems.length + 1),
                      background: "rgba(70, 130, 180, 0.15)",
                      color: "#00CED1",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(70, 130, 180, 0.3)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(70, 130, 180, 0.15)"}
                  >
                    View All Services →
                  </Link>
                </div>
            )}
          </li>

            {[
              { label: "Case Study",           href: "/case-study" },
              { label: "Pricing & Engagement", href: "/pricing" },
              { label: "Meet The AltHumans",   href: "/meet-the-althumans" },
              { label: "Blogs",                href: "/blogs" },
              { label: "Contact",              href: "/contact" },
            ].map(item => (
              <li key={item.label}>
                <Link href={item.href}
                  style={{
                    fontFamily: f,
                    fontSize: "clamp(14px, 0.35vw + 10px, 16px)",
                    fontWeight: 500,
                    color: "#0a0a0a",
                    textDecoration: "none",
                    padding: "clamp(8px, 0.6vw, 10px) clamp(7px, 0.65vw, 13px)",
                    borderRadius: 8,
                    display: "block",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#105DA1";
                    e.currentTarget.style.transform = "scale(1.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "#0a0a0a";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >{item.label}</Link>
          </li>
            ))}
        </ul>

        {/* Right CTA & Hamburger */}
        <div className="gap-2 sm:gap-3.5" style={{ display: "flex", alignItems: "center" }}>
          <button suppressHydrationWarning aria-label="Search" onClick={() => setSearchOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", padding: "clamp(7px, 0.55vw, 10px)", color: "#0a0a0a", display: "flex" }}>
            <svg style={{ width: "clamp(20px, 1.35vw, 24px)", height: "clamp(20px, 1.35vw, 24px)" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
          </button>
          
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
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "2px solid #105DA1" }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0a0a0a", fontFamily: f }} className="hidden md:inline">
                    {session.name.split(" ")[0]}
                  </span>
                </button>
                {showProfileMenu && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      minWidth: 220,
                      background: "#ffffff",
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                      padding: "12px 0",
                      zIndex: 2000,
                    }}
                  >
                    <div style={{ padding: "8px 16px", borderBottom: "1px solid #f1f5f9" }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", margin: 0, fontFamily: f }}>{session.name}</p>
                      <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0 0 0", overflow: "hidden", textOverflow: "ellipsis", fontFamily: f }}>{session.email}</p>
                    </div>
                    <Link
                      href="/app-health-dashboard"
                      onClick={() => setShowProfileMenu(false)}
                      style={{
                        display: "block",
                        padding: "10px 16px",
                        fontSize: 13,
                        color: "#0f172a",
                        textDecoration: "none",
                        fontFamily: f,
                        fontWeight: 500,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
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
                        color: "#ef4444",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: f,
                        fontWeight: 500,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#fef2f2"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="btn-black-white px-3 py-2 text-xs sm:px-5 sm:text-sm xl:px-7 xl:py-3 xl:text-[15px] font-extrabold inline-block" style={{
                margin: 0,
                borderRadius: 8,
              }}
              >Get Started</Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button 
            suppressHydrationWarning
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex xl:hidden"
            style={{ 
              background: "none", border: "none", cursor: "pointer", 
              padding: 8, color: "#0a0a0a", flexDirection: "column", gap: 5,
              alignItems: "center"
            }}
          >
            <div style={{ width: 24, height: 2, background: "#0a0a0a", borderRadius: 1, transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(8px, 8px)" : "none" }}></div>
            <div style={{ width: 24, height: 2, background: "#0a0a0a", borderRadius: 1, opacity: mobileOpen ? 0 : 1, transition: "all 0.3s" }}></div>
            <div style={{ width: 24, height: 2, background: "#0a0a0a", borderRadius: 1, transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(7px, -7px)" : "none" }}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="flex xl:hidden" style={{
          position: "absolute",
          top: "clamp(76px, 5vw, 90px)",
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          padding: "20px 16px",
          maxHeight: "calc(100vh - 80px)",
          overflowY: "auto",
          zIndex: 1001,
        }}>
            {/* MIRSA Mobile */}
            <button onClick={() => toggle("mirsa")} style={{
              width: "100%", textAlign: "left",
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 16px", borderRadius: 8, border: "none",
              background: open === "mirsa" ? "rgba(0, 206, 209, 0.08)" : "transparent",
              color: "#0a0a0a", fontFamily: f, fontSize: 14, fontWeight: 600,
              cursor: "pointer",
            }}>
              MIRSA
              <svg style={{ width: 12, height: 12, marginLeft: "auto", transform: open === "mirsa" ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === "mirsa" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "#f9f9f9", borderRadius: 8, overflow: "hidden" }}>
                {mirsaItems.map(item => (
                  <Link key={item.label} href={item.href} onClick={close}
                    style={{ padding: "12px 24px", color: "#0a0a0a", fontFamily: f, fontSize: 13, textDecoration: "none", borderBottom: "1px solid #f0f0f0" }}
                  >{item.label}</Link>
                ))}
                <Link href="/mirsa" onClick={close}
                  style={{ padding: "12px 24px", color: "#4682B4", fontFamily: f, fontSize: 13, fontWeight: "bold", textDecoration: "none", background: "rgba(70, 130, 180, 0.08)", textAlign: "center" }}
                >View All MIRSA Solutions →</Link>
              </div>
            )}

            {/* Services Mobile */}
            <button onClick={() => toggle("services")} style={{
              width: "100%", textAlign: "left",
              display: "flex", alignItems: "center", gap: 8,
              padding: "12px 16px", borderRadius: 8, border: "none",
              background: open === "services" ? "rgba(0, 206, 209, 0.08)" : "transparent",
              color: "#0a0a0a", fontFamily: f, fontSize: 14, fontWeight: 600,
              cursor: "pointer",
            }}>
              Services
              <svg style={{ width: 12, height: 12, marginLeft: "auto", transform: open === "services" ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
                fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === "services" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "#f9f9f9", borderRadius: 8, overflow: "hidden" }}>
                {servicesItems.map(item => (
                  <Link key={item.label} href={item.href} onClick={close}
                    style={{ padding: "12px 24px", color: "#0a0a0a", fontFamily: f, fontSize: 13, textDecoration: "none", borderBottom: "1px solid #f0f0f0" }}
                  >{item.label}</Link>
                ))}
                <Link href="/services" onClick={close}
                  style={{ padding: "12px 24px", color: "#4682B4", fontFamily: f, fontSize: 13, fontWeight: "bold", textDecoration: "none", background: "rgba(70, 130, 180, 0.08)", textAlign: "center" }}
                >View All Services →</Link>
              </div>
            )}

            {/* Other links */}
            {[
              { label: "Case Study",           href: "/case-study" },
              { label: "Pricing & Engagement", href: "/pricing" },
              { label: "Meet The AltHumans",   href: "/meet-the-althumans" },
              { label: "Blogs",                href: "/blogs" },
              { label: "Contact",              href: "/contact" },
            ].map(item => (
              <Link key={item.label} href={item.href} onClick={close}
                style={{ padding: "12px 16px", color: "#0a0a0a", fontFamily: f, fontSize: 14, textDecoration: "none", borderRadius: 8, display: "block", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "#f0f0f0"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >{item.label}</Link>
            ))}

            {/* Mobile CTA */}
            {session ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12, padding: "12px 16px", background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src={session.picture} alt={session.name} style={{ width: 40, height: 40, borderRadius: "50%" }} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", margin: 0, fontFamily: f }}>{session.name}</p>
                    <p style={{ fontSize: 11, color: "#64748b", margin: 0, fontFamily: f }}>{session.email}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <Link href="/app-health-dashboard" onClick={close} style={{ flex: 1, padding: "8px 12px", background: "#105DA1", color: "#fff", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none", textAlign: "center", fontFamily: f }}>
                    Dashboard
                  </Link>
                  <button onClick={handleSignOut} style={{ flex: 1, padding: "8px 12px", background: "#fef2f2", color: "#ef4444", borderRadius: 8, fontSize: 12, fontWeight: 700, border: "1px solid #fee2e2", cursor: "pointer", fontFamily: f }}>
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className="btn-black-white" style={{
                margin: "12px 0 0 0",
                padding: "12px 16px",
                borderRadius: 8,
                textAlign: "center",
                display: "block",
              }}>Get Started</Link>
            )}
          </div>
        )}
      </nav>

      {mobileOpen && <div style={{ position: "fixed", top: "clamp(76px, 5vw, 90px)", inset: 0, zIndex: 999, background: "rgba(0,0,0,0.2)" }} onClick={close} />}
      {open && <div className="hidden md:block" style={{ position: "fixed", inset: 0, zIndex: 999 }} onClick={close} />}

      {/* Modern Search Modal overlay */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "720px",
              background: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              border: "1px solid #e5e7eb",
              display: "flex",
              flexDirection: "column",
              maxHeight: "85vh",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
              {/* Search input field */}
              <div style={{
                padding: "18px 24px",
                borderBottom: "1px solid #f3f4f6",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}>
                <svg width="20" height="20" fill="none" stroke="#6b7280" strokeWidth="2.5" viewBox="0 0 24 24">
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
                    color: "#1f2937",
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
                    color: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#4b5563"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Categorized List Content */}
              <div style={{
                padding: "24px",
                overflowY: "auto",
                flex: 1,
              }}>
                {searchQuery.trim() === "" ? (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1.2fr 0.8fr",
                    gap: "28px",
                  }}>
                    {/* MIRSA Column */}
                    <div>
                      <h3 style={{
                        fontSize: "11px",
                        fontWeight: "900",
                        color: "#7c3aed",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                        borderBottom: "2px solid #f3e8ff",
                        paddingBottom: "4px",
                      }}>
                        MIRSA Platform
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {mirsaItems.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setSearchOpen(false)}
                            style={{
                              fontSize: "13px",
                              color: "#4b5563",
                              textDecoration: "none",
                              padding: "6px 8px",
                              borderRadius: "6px",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#f5f3ff";
                              e.currentTarget.style.color = "#7c3aed";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#4b5563";
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Services Column */}
                    <div>
                      <h3 style={{
                        fontSize: "11px",
                        fontWeight: "900",
                        color: "#8b5cf6",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                        borderBottom: "2px solid #f3e8ff",
                        paddingBottom: "4px",
                      }}>
                        Our Services
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {servicesItems.map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setSearchOpen(false)}
                            style={{
                              fontSize: "13px",
                              color: "#4b5563",
                              textDecoration: "none",
                              padding: "6px 8px",
                              borderRadius: "6px",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#f5f3ff";
                              e.currentTarget.style.color = "#8b5cf6";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#4b5563";
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                      <h3 style={{
                        fontSize: "11px",
                        fontWeight: "900",
                        color: "#00CED1",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "12px",
                        borderBottom: "2px solid rgba(0,206,209,0.2)",
                        paddingBottom: "4px",
                      }}>
                        Quick Links
                      </h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {[
                          { label: "Case Studies", href: "/case-study" },
                          { label: "Pricing & Engagement", href: "/pricing" },
                          { label: "Meet The AltHumans", href: "/meet-the-althumans" },
                          { label: "Blogs", href: "/blogs" },
                          { label: "Contact", href: "/contact" },
                        ].map(item => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setSearchOpen(false)}
                            style={{
                              fontSize: "13px",
                              color: "#4b5563",
                              textDecoration: "none",
                              padding: "6px 8px",
                              borderRadius: "6px",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(0, 206, 209, 0.08)";
                              e.currentTarget.style.color = "#00CED1";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#4b5563";
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Filtered list view
                  <div>
                    <div style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#9ca3af",
                      marginBottom: "12px",
                      letterSpacing: "0.05em",
                    }}>
                      SEARCH RESULTS ({filteredItems.length})
                    </div>
                    {filteredItems.length > 0 ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {filteredItems.map(item => (
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
                              background: "#f9fafb",
                              textDecoration: "none",
                              color: "#1f2937",
                              fontSize: "13px",
                              fontWeight: "600",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#f3f4f6";
                              e.currentTarget.style.transform = "translateX(2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#f9fafb";
                              e.currentTarget.style.transform = "none";
                            }}
                          >
                            <span>{item.label}</span>
                            <span style={{
                              fontSize: "10px",
                              fontWeight: "700",
                              color: item.category === "MIRSA Platform" ? "#7c3aed" : item.category === "Our Services" ? "#8b5cf6" : "#00CED1",
                              background: item.category === "MIRSA Platform" ? "#f5f3ff" : item.category === "Our Services" ? "#f5f3ff" : "rgba(0, 206, 209, 0.1)",
                              padding: "3px 8px",
                              borderRadius: "999px",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                            }}>
                              {item.category}
                            </span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div style={{
                        textAlign: "center",
                        padding: "36px 0",
                        color: "#9ca3af",
                      }}>
                        <div style={{ fontSize: "20px", marginBottom: "6px" }}>🔍</div>
                        <div style={{ fontSize: "13px", fontWeight: "600" }}>No topics found matching "{searchQuery}"</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer keys tip */}
              <div style={{
                padding: "12px 24px",
                borderTop: "1px solid #f3f4f6",
                background: "#fafafa",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "11px",
                color: "#9ca3af",
              }}>
                <span>Press <kbd style={{ background: "#e5e7eb", padding: "2px 5px", borderRadius: "3px", fontSize: "9px", fontWeight: "700" }}>ESC</kbd> to close</span>
                <span style={{ fontWeight: "600", color: "#8b5cf6" }}>Think Alternate Navigation Index</span>
              </div>
</div>
        </div>
      )}
    </>
  );
}

/**
 * Shared dropdown styling
 * used by desktop navigation menus.
 */
const dropdownStyle = {
  position: "absolute", top: "calc(100% + 10px)", left: 0,
  minWidth: 260, background: "#1e1e2e", borderRadius: 14,
  boxShadow: "0 16px 48px rgba(0,0,0,0.3)", overflow: "hidden", zIndex: 1001,
};

/**
 * Generates dropdown link styles.
 *
 * @param {number} i - Current item index
 * @param {number} total - Total items count
 * @returns {Object} Style object
 */
function dropdownLinkBase(i, total) {
  return {
    display: "block", padding: "12px 20px",
    color: "#fff", fontFamily: f, fontSize: 14, fontWeight: 500,
    textDecoration: "none", background: "transparent",
    borderBottom: i < total - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
    transition: "background 0.15s",
  };
}

/**
 * Generates styles for plain navigation buttons.
 *
 * @param {boolean} active - Active state
 * @returns {Object} Style object
 */
function plainBtnStyle(active) {
  return {
    display: "flex", alignItems: "center", gap: 5,
    padding: "6px 14px", background: "none", border: "none",
    fontFamily: f, fontSize: 14, fontWeight: 500,
    color: active ? "#8b5cf6" : "#0a0a0a", cursor: "pointer",
    transition: "color 0.15s",
  };
}
