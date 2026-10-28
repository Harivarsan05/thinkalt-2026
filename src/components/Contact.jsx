/**
 * Contact.jsx
 *
 * Contact and lead generation section.
 *
 * Features:
 * - Contact form
 * - Company information display
 * - Lead capture interface
 * - Animated highlights section
 * - Contact details strip
 * - Success message handling
 *
 * Dependencies:
 * - React useState
 * - Framer Motion
 */
"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), { ssr: false });
import { motion } from "framer-motion";
import Link from "next/link";

const f = "'Inter','DM Sans',sans-serif";

/**
 * Business value propositions.
 *
 * Displayed on the left side of the
 * contact section to highlight
 * company benefits and expertise.
 */
const highlights = [
  {
    tag: "01",
    title: "Fix Tech Debt Before It Kills Growth",
    desc: "Resolve bugs, performance lag, and legacy infrastructure before they slow revenue, delivery, and product momentum.",
  },
  {
    tag: "02",
    title: "Understand User Sentiment in Real-Time",
    desc: "Use AI-powered product signals to detect friction, analyze churn, and prioritize what truly moves the needle.",
  },
];

/**
 * Contact information displayed
 * in the bottom information strip.
 *
 * Includes:
 * - Email
 * - Phone
 * - Location
 * - Working hours
 */
const contactInfo = [
  ["EMAIL", "hello@thinkalternate.com"],
  ["PHONE", "+91 99011 98582"],
  ["LOCATION", "Global delivery across India"],
  ["HOURS", "Mon - Fri / 9 AM - 6 PM IST"],
];

/**
 * Dynamic form field configuration.
 *
 * Used to generate contact form inputs.
 */
const fields = [
  { name: "name", type: "text", placeholder: "Your Name" },
  { name: "email", type: "email", placeholder: "Email Address" },
  { name: "company", type: "text", placeholder: "Company Name" },
  { name: "phone", type: "tel", placeholder: "Phone Number" },
];

/**
 * Contact Component
 *
 * Main contact section responsible for:
 * - Rendering contact form
 * - Managing form state
 * - Handling form submission
 * - Displaying company information
 * - Showing success confirmation
 *
 * Returns:
 * JSX Contact Section
 */
export default function Contact() {
  // Stores all user-entered contact form values
  const recaptchaRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", service: "MIRSA", message: "" });
  const [getStartedClicked, setGetStartedClicked] = useState(false);
  const [learnMoreClicked, setLearnMoreClicked] = useState(false);
  // Tracks whether the contact form has been submitted
  const [sent, setSent] = useState(false);
  // Tracks submission loading state
  const [submitting, setSubmitting] = useState(false);
  // Tracks submission error message
  const [error, setError] = useState(null);
  // Tracks whether reCAPTCHA has been loaded dynamically
  const [loadRecaptcha, setLoadRecaptcha] = useState(false);

  const triggerRecaptchaLoad = () => {
    if (!loadRecaptcha) {
      setLoadRecaptcha(true);
    }
  };

  /**
 * Handles contact form submission.
 *
 * Submits form data to Next.js API,
 * handles loading/errors, and triggers success.
 *
 * @param {Event} e Form submit event
 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (!loadRecaptcha) {
        setLoadRecaptcha(true);
      }

      let token = null;
      if (recaptchaRef.current) {
        token = await recaptchaRef.current.executeAsync();
      } else {
        // Wait for reCAPTCHA script to mount and load
        for (let i = 0; i < 15; i++) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          if (recaptchaRef.current) {
            token = await recaptchaRef.current.executeAsync();
            break;
          }
        }
      }

      if (!token) {
        throw new Error("reCAPTCHA is loading. Please try submitting again in a moment.");
      }

      const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        recaptchaToken: token,
      }),
    });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit request.");
      }

      setSent(true);
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    /* Contact Section */
    <section
      id="contact"
      style={{
        position: "relative",
        background: "#ffffff",
        padding: "76px 0 96px",
        overflow: "hidden",
        fontFamily: f,
      }}
    >
      {/* Dynamic slow-motion floating glass bubbles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ contain: "paint" }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={`contact-bubble-${i}`}
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
        .bg-shape-1 {
          animation: bgShapeMove1 10s ease-in-out infinite;
        }
        .bg-shape-2 {
          animation: bgShapeMove2 12s ease-in-out infinite;
        }
        .contact-shine-overlay {
          animation: sweepShine 6s linear infinite;
        }
        .contact-info-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s, border-color 0.3s !important;
          will-change: transform;
        }
        .contact-info-card:hover {
          transform: translateY(-4px) scale(1.02) !important;
          background-color: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.18) !important;
        }
        .contact-highlight-row {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
          will-change: transform;
        }
        .contact-highlight-row:hover {
          transform: translateX(8px) !important;
        }
        .contact-highlight-badge {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          will-change: transform;
        }
        .contact-highlight-row:hover .contact-highlight-badge {
          transform: scale(1.1) rotate(5deg) !important;
        }
        .contact-btn-white {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s !important;
          will-change: transform;
        }
        .contact-btn-white:hover {
          transform: translateY(-3px) scale(1.04) !important;
          box-shadow: 0 10px 24px rgba(255,255,255,0.15) !important;
        }
        .contact-btn-white:active {
          transform: scale(0.98) !important;
        }
        .contact-btn-outline {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s, background-color 0.3s !important;
          will-change: transform;
        }
        .contact-btn-outline:hover {
          transform: translateY(-3px) scale(1.04) !important;
          background-color: rgba(255,255,255,0.08) !important;
          border-color: #fff !important;
        }
        .contact-submit-btn {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, box-shadow 0.3s !important;
          will-change: transform;
        }
        .contact-submit-btn:not(:disabled):hover {
          transform: translateY(-3px) scale(1.03) !important;
          box-shadow: 0 10px 24px rgba(27,27,28,0.22) !important;
        }
        .contact-submit-btn:not(:disabled):active {
          transform: scale(0.98) !important;
        }
        @keyframes bgShapeMove1 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(34px, -24px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes bgShapeMove2 {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-28px, 24px, 0) scale(1.08); }
          100% { transform: translate3d(0, 0, 0) scale(1); }
        }
        @keyframes sweepShine {
          0% { transform: translateX(-150%) skewX(-14deg); }
          100% { transform: translateX(150%) skewX(-14deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .bg-shape-1, .bg-shape-2, .contact-shine-overlay {
            animation: none !important;
          }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="bg-shape-1"
        style={{
          position: "absolute",
          top: 58,
          left: "8%",
          width: 160,
          height: 108,
          borderRadius: "28px 8px 28px 8px",
          background: "linear-gradient(135deg, rgba(25,25,112,0.18), rgba(0,0,128,0.15) 50%, rgba(0,0,139,0.12))",
          border: "1px solid rgba(25,25,112,0.18)",
          filter: "blur(0.2px)",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden="true"
        className="bg-shape-2"
        style={{
          position: "absolute",
          right: "9%",
          bottom: 70,
          width: 132,
          height: 132,
          borderRadius: "36px",
          background: "linear-gradient(135deg, rgba(25,25,112,0.16), rgba(0,0,128,0.16) 50%, rgba(0,0,139,0.16))",
          border: "1px solid rgba(25,25,112,0.18)",
          willChange: "transform",
        }}
      />

      <div style={{ maxWidth: 1420, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 42, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "150px 0px 150px 0px" }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="contact-dark-panel"
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "0 22px 22px 0",
            background: "#1b1b1c",
            minHeight: 620,
            padding: "84px 0",
            boxShadow: "0 26px 90px rgba(15,23,42,0.18)",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 25% 78%, rgba(25,25,112,0.22), transparent 34%), radial-gradient(circle at 72% 34%, rgba(0,0,128,0.12), transparent 30%)",
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            className="contact-shine-overlay"
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "24%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              willChange: "transform",
            }}
          />

          <div
            className="contact-dark-grid"
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 980,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 460px",
              gap: 78,
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -46 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04, duration: 0.22 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06, duration: 0.2 }}
                style={{ color: "#dbeafe", fontSize: 15, lineHeight: 1.7, maxWidth: 430, marginBottom: 14 }}
              >
                From early-stage startups to global scale-ups, our partners trust us to solve product challenges faster, cleaner, and smarter.
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08, duration: 0.22 }}
                style={{
                  color: "#fff",
                  fontSize: "clamp(32px, 3.4vw, 46px)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.035em",
                  fontWeight: 900,
                  maxWidth: 520,
                  margin: "0 0 28px",
                }}
              >
                10x faster feature delivery | 85% cloud cost reduction | 40% crash rate drop in 21 days | 100% retention-focused dev cycles
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 68 }}
              >
                <div>
                  <Link
                    href="/login"
                    className="contact-btn-white"
                    onClick={() => setGetStartedClicked(!getStartedClicked)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "14px 28px",
                      borderRadius: 999,
                      background: getStartedClicked ? "#111" : "#fff",
                      color: getStartedClicked ? "#fff" : "#111",
                      border: getStartedClicked ? "1px solid #fff" : "1px solid transparent",
                      textDecoration: "none",
                      fontSize: 13,
                      fontWeight: 900,
                      transition: "all 0.3s ease",
                    }}
                  >
                    Get Started -&gt;
                  </Link>
                </div>
                <a
                  href="#services"
                  className="contact-btn-outline"
                  onClick={(e) => {
                    // Prevent page jump if desired, but here we just toggle the click status
                    setLearnMoreClicked(!learnMoreClicked);
                  }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "14px 28px",
                    borderRadius: 999,
                    border: "1px solid #fff",
                    background: learnMoreClicked ? "#fff" : "transparent",
                    color: learnMoreClicked ? "#111" : "#fff",
                    textDecoration: "none",
                    fontSize: 13,
                    fontWeight: 900,
                    transition: "all 0.3s ease",
                  }}
                >
                  Learn More
                </a>
              </motion.div>

              <div style={{ display: "grid", gap: 32 }}>
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + i * 0.03, duration: 0.2 }}
                    className="contact-highlight-row"
                    style={{ display: "grid", gridTemplateColumns: "42px 1fr", gap: 18, alignItems: "start" }}
                  >
                    <div
                      className="contact-highlight-badge"
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        display: "grid",
                        placeItems: "center",
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 900,
                        background: "linear-gradient(135deg, #4682B4 0%, #00CED1 50%, #48D1CC 100%)",
                        boxShadow: "0 0 20px rgba(70, 130, 180, 0.25)",
                      }}
                    >
                      {item.tag}
                    </div>
                    <div>
                      <h3 style={{ color: "#fff", fontSize: 15, lineHeight: 1.4, fontWeight: 900, marginBottom: 10 }}>
                        {item.title}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

{/* Contact Form Card */}
            <motion.div
              id="contact-form-wrapper"
              initial={{ opacity: 0, x: 42, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.2 }}
              style={{
                background: "#fff",
                color: "#111",
                borderRadius: 12,
                padding: "36px 34px",
                boxShadow: "0 34px 80px rgba(0,0,0,0.28)",
              }}
            >
            {/* Form Submission Success Message */}
              {sent ? (
                <div style={{ textAlign: "center", padding: "58px 0" }}>
                  <div style={{ fontSize: 44, marginBottom: 16, color: "#00CED1", fontWeight: 900 }}>OK</div>
                  <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 10 }}>Message Sent</h3>
                  <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.7 }}>We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Get in touch</h3>
                  <p style={{ color: "#000000", fontSize: 14, lineHeight: 1.75, marginBottom: 28 }}>
                    Fill out the form and our global experts will be in touch right away with a package and price solution to help you.
                  </p>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: "12px 16px",
                        borderRadius: 8,
                        background: "#fef2f2",
                        border: "1px solid #fee2e2",
                        color: "#ef4444",
                        fontSize: 13,
                        fontWeight: 600,
                        marginBottom: 20,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span>⚠️</span>
                      <span>{error}</span>
                    </motion.div>
                  )}

{/* Lead Capture Form */}
                  <form 
                    id="contact-form"
                    onSubmit={handleSubmit} 
                    onMouseEnter={triggerRecaptchaLoad}
                    onTouchStart={triggerRecaptchaLoad}
                    suppressHydrationWarning 
                    style={{ display: "grid", gap: 16 }}
                  >


  <div className="contact-field-grid" style={{display: "grid",gridTemplateColumns: "1fr 1fr",gap: 16,}}></div>
                    <div 
                      className="contact-field-grid" 
                      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
                      onFocus={triggerRecaptchaLoad}
                    >
                    {/* User Information Fields */}
                      {fields.map(({ name, type, placeholder }) => (
                        <input
                          key={name}
                          aria-label={placeholder}
                          suppressHydrationWarning
                          type={type}
                          placeholder={placeholder}
                          required={name !== "company"}
                          value={form[name]}
                          onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
                          style={{
                            width: "100%",
                            padding: "15px 18px",
                            borderRadius: 9,
                            border: "1px solid transparent",
                            background: "#f4f4f4",
                            color: "#111827",
                            fontSize: 12,
                            fontFamily: f,
                            outline: "none",
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = "#00CED1";
                            e.target.style.background = "#fff";
                            triggerRecaptchaLoad();
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = "transparent";
                            e.target.style.background = "#f4f4f4";
                          }}
                        />
                      ))}
                    </div>

                    <select
                      suppressHydrationWarning
                      id="contact-service-select"
                      aria-label="Select Service"
                      onFocus={(e) => {
                        e.target.style.borderColor = "#00CED1";
                        e.target.style.background = "#fff";
                        triggerRecaptchaLoad();
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "transparent";
                        e.target.style.background = "#f4f4f4";
                      }}
                      value={form.service}
                      onChange={(e) => setForm((p) => ({ ...p, service: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "15px 18px",
                        borderRadius: 9,
                        border: "1px solid transparent",
                        background: "#f4f4f4",
                        color: "#111827",
                        fontSize: 12,
                        fontFamily: f,
                        outline: "none",
                      }}
                    >
                      <option>MIRSA</option>
                      <option>AI Solutions</option>
                      <option>Cloud Engineering</option>
                      <option>Mobile App Development</option>
                      <option>QA Automation</option>
                    </select>

                    <textarea
                      suppressHydrationWarning
                      aria-label="Your Comments"
                      rows={5}
                      placeholder="Your Comments"
                      required
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      style={{
                        width: "100%",
                        padding: "16px 18px",
                        borderRadius: 9,
                        border: "1px solid transparent",
                        background: "#f4f4f4",
                        color: "#111827",
                        fontSize: 12,
                        fontFamily: f,
                        outline: "none",
                        resize: "vertical",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#48D1CC";
                        e.target.style.background = "#fff";
                        triggerRecaptchaLoad();
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "transparent";
                        e.target.style.background = "#f4f4f4";
                      }}
                    />
                  {loadRecaptcha && (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                      size="invisible"
                    />
                  )}
                    <button
                      type="submit"
                      suppressHydrationWarning
                      disabled={submitting}
                      className="contact-submit-btn"
                      style={{
                        justifySelf: "start",
                        marginTop: 2,
                        padding: "15px 28px",
                        borderRadius: 999,
                        border: "none",
                        background: submitting ? "#9ca3af" : "linear-gradient(to right, #1A2980 0%, #26D0CE 51%, #1A2980 100%)",
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 900,
                        fontFamily: f,
                        cursor: submitting ? "not-allowed" : "pointer",
                        boxShadow: submitting ? "none" : "0 14px 36px rgba(0,0,0,0.18)",
                        transition: "background-color 0.2s ease, background-image 0.5s ease",
                      }}
                    >
                      {submitting ? "Submitting..." : "Submit Request ->"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.2 }}
            className="contact-info-strip"
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 980,
              margin: "46px auto 0",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
          >
          {/* Contact Information Card */}
            {contactInfo.map(([label, value], i) => (
              <div
                key={label}
                className="contact-info-card"
                style={{
                  padding: "16px 18px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div style={{ color: "#48D1CC", fontSize: 10, fontWeight: 900, letterSpacing: "0.16em", marginBottom: 7 }}>{label}</div>
                <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, lineHeight: 1.45, fontWeight: 700 }}>{value}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
