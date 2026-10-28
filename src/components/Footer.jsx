/**
 * Footer.jsx
 *
 * Website footer component.
 *
 * Features:
 * - Company branding and contact information
 * - Quick navigation links
 * - MIRSA product links
 * - Foundry service links
 * - Social media links
 * - Newsletter section
 * - Legal and policy links
 *
 * Dependencies:
 * - Next.js Link
 */
"use client";

import Link from "next/link";
import Image from "next/image";

// Global font family used throughout footer
const f = "'Inter',sans-serif";

/**
 * ThatLogo Component
 *
 * Displays the Think Alternate brand logo
 * used in the footer section.
 *
 * Returns:
 * JSX logo container
 */
function ThatLogo() {
  return (
    <div style={{ width: 44, height: 44, display: "flex", alignItems: "center", position: "relative" }}>
      <Image
        src="/that-a-mark.svg"
        alt="Think Alternate"
        width={44}
        height={44}
        style={{ height: "100%", width: "auto", display: "block", filter: "invert(1)" }}
      />
    </div>
  );
}

/**
 * FooterLink Component
 *
 * Reusable footer navigation link.
 *
 * Props:
 * @param {string} href - Navigation URL
 * @param {ReactNode} children - Link text
 * @param {boolean} arrow - Optional arrow indicator
 *
 * Returns:
 * Footer navigation link
 */
function FooterLink({ href, children, arrow, orange }) {
  return (
    <li>
      <Link
        href={href}
        style={{
          fontFamily: f, fontSize: 15, color: orange ? "#48D1CC" : "#fff",
          textDecoration: "none", display: "inline-flex",
          alignItems: "center", gap: 6, transition: "color 0.2s",
        }}
        onMouseEnter={e => e.currentTarget.style.color = orange ? "#48D1CC" : "#00CED1"}
        onMouseLeave={e => e.currentTarget.style.color = orange ? "#48D1CC" : "#fff"}
      >
        {arrow && <span style={{ fontSize: 14 }}>→</span>}
        {children}
      </Link>
    </li>
  );
}

/**
 * ColTitle Component
 *
 * Renders section titles inside
 * footer columns.
 *
 * Props:
 * @param {ReactNode} children - Title text
 */
function ColTitle({ children }) {
  return (
    <h4 style={{
      fontFamily: f, fontSize: 17, fontWeight: 600,
      color: "#fff", marginBottom: 24, letterSpacing: "-0.01em",
    }}>
      {children}
    </h4>
  );
}

/**
 * SocialIcon Component
 *
 * Reusable social media icon link.
 *
 * Props:
 * @param {string} href - Social media URL
 * @param {string} label - Accessibility label
 * @param {ReactNode} children - SVG icon
 */
function SocialIcon({ href, label, children }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
      style={{ color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.2s" }}
      onMouseEnter={e => e.currentTarget.style.color = "#00CED1"}
      onMouseLeave={e => e.currentTarget.style.color = "#fff"}
    >
      {children}
    </a>
  );
}

/**
 * Footer Component
 *
 * Main website footer.
 *
 * Responsibilities:
 * - Display company information
 * - Display service links
 * - Display MIRSA links
 * - Display social media icons
 * - Display legal links
 *
 * Returns:
 * JSX footer layout
 */
export default function Footer() {
  return (
    <div className="footer-outer-wrapper px-4 py-8 md:px-8 md:pb-16">

      {/* Outer relative wrapper for corner notch circles */}
      <div style={{ position: "relative" }}>

        {/* 4 corner notch circles (hidden on mobile, visible on medium screens and up) */}
        {[
          { top: -26, left: -26 },
          { top: -26, right: -26 },
          { bottom: -26, left: -26 },
          { bottom: -26, right: -26 },
        ].map((pos, i) => (
          <div key={i} className="hidden md:block absolute rounded-full footer-notch z-[3]" style={{ width: 52, height: 52, ...pos }} />
        ))}

        {/* Dark card */}
        <div className="bg-[#1c1c1c] rounded-[28px] overflow-hidden px-6 py-12 md:px-16 md:pt-16 pb-0 relative z-[1]">

          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">

            {/* Col 1 — Brand */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <ThatLogo />
              </div>
              <p style={{ fontFamily: f, fontSize: 15, color: "#fff", marginBottom: 20, lineHeight: 1.6 }}>
                Apps That Grow With You
              </p>
              <a href="mailto:hello@thinkalternate.com"
                style={{ fontFamily: f, fontSize: 14, color: "#48D1CC", textDecoration: "none", display: "block", marginBottom: 8, transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                hello@thinkalternate.com
              </a>
              <p style={{ fontFamily: f, fontSize: 14, color: "#fff" }}>+91 99011 98582</p>
            </div>

            {/* Col 2 — Quick Link */}
            <div>
              <ColTitle>Quick Link</ColTitle>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                <FooterLink href="/meet-the-althumans">Meet The AltHumans</FooterLink>
                <FooterLink href="/login">MIRSA</FooterLink>
                <FooterLink href="/#services">Services</FooterLink>
                <FooterLink href="/case-study">Case Study</FooterLink>
                <FooterLink href="/pricing">Pricing &amp; Engagement</FooterLink>
                <FooterLink href="#">Help &amp; FAQs</FooterLink>
                <FooterLink href="#">Careers</FooterLink>
                <FooterLink href="/blogs">Blogs</FooterLink>
                <FooterLink href="/contact">Contact Us</FooterLink>
              </ul>
            </div>

            {/* Col 3 — MIRSA */}
            <div>
              <ColTitle>MIRSA</ColTitle>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                <FooterLink href="/performax-engine">Performax Engine</FooterLink>
                <FooterLink href="/ghost-bugs">Ghost Bugs</FooterLink>
                <FooterLink href="/cloud-cost-optimization">Cloud Cost Optimizer</FooterLink>
                <FooterLink href="/apptron">AppTron</FooterLink>
                <FooterLink href="/root-cause-engine">Root Cause Engine</FooterLink>
                <FooterLink href="/sentiment-analyzer">Sentiment Analyzer</FooterLink>
                <FooterLink href="/app-health-dashboard">App Health Dashboard</FooterLink>
                <FooterLink href="/copilot-assistant">CoPilot Assistant</FooterLink>
                <FooterLink href="/app-audit-engine">App Audit Engine</FooterLink>
                <FooterLink href="/mirsa-pricing">Pricing</FooterLink>
              </ul>
            </div>

            {/* Col 4 — Foundry */}
            <div>
              <ColTitle>Foundry</ColTitle>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14 }}>
                <FooterLink href="/services/mobile-app-development">Mobile App Development Services</FooterLink>
                <FooterLink href="/services/web-app-development">Web App Development</FooterLink>
                <FooterLink href="/services/devops-cloud-optimization">DevOps &amp; Cloud Optimization</FooterLink>
                <FooterLink href="/services/ai-integrations">AI Integrations &amp; Product Intelligence</FooterLink>
                <FooterLink href="/services/qa-automation">QA Automation &amp; Regression Testing</FooterLink>
                <FooterLink href="/services/fractional-cto">CTO+ – Fractional CTO Services</FooterLink>
                <FooterLink href="/services/gcc-setup">GCC Setup Support</FooterLink>
                <FooterLink href="/services/ui-ux-design">UI/UX Design</FooterLink>
                <FooterLink href="/services/app-maintenance" >App Maintenance &amp; Optimization</FooterLink>
              </ul>
            </div>

            {/* Col 5 — Newsletter */}
            <div>
              <ColTitle>Newsletter</ColTitle>
              <p style={{ fontFamily: f, fontSize: 14, color: "#e5e5e5", lineHeight: 1.75, marginBottom: 28 }}>
                Subscribe to our newsletter and receive the latest news on products, services &amp; more.
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <SocialIcon href="https://www.instagram.com/thinkalt.co?igsh=cnB1MmJ0endqd3Nx" label="Instagram">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://x.com/ThinkAlt_Co" label="X">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://www.linkedin.com/company/thinkalt" label="LinkedIn">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="https://youtube.com/@thinkalternatetechnologies6717?si=EDRbWS2JjIsFp4Nk" label="YouTube">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>

          </div>{/* end grid */}

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-7 pb-10">
            <span style={{ fontFamily: f, fontSize: 13, color: "#e5e5e5", textAlign: "center" }}>
              ©2026 ThinkAlternate Pvt. Ltd, All Rights Reserved.
            </span>
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { label: "Terms & Conditions", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Disclaimer", href: "#" },
                { label: "Refund Policy", href: "#" },
              ].map((item, i) => (
                <span key={i} style={{ display: "flex", alignItems: "center" }}>
                  {i > 0 && <span style={{ color: "#555", margin: "0 10px" }}>–</span>}
                  <a href={item.href}
                    style={{ fontFamily: f, fontSize: 13, color: "#e5e5e5", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#00CED1"}
                    onMouseLeave={e => e.currentTarget.style.color = "#e5e5e5"}
                  >
                    {item.label}
                  </a>
                </span>
              ))}
            </div>
          </div>

        </div>{/* end dark card */}

      </div>{/* end outer wrapper */}

    </div>
  );
}
