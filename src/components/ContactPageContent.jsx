"use client";

import { useState } from "react";
import Link from "next/link";
import { blogArticles } from "../data/blogArticles";

const f = "'Inter','DM Sans',sans-serif";

const serviceCards = [
  {
    title: "Difference Between Web Application and Website",
    href: "/services/web-app-development",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop",
    desc: "A practical guide to choosing the right digital experience, from marketing websites to logged-in product platforms.",
  },
  {
    title: "App Maintenance & Optimization",
    href: "/services/app-maintenance",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    label: "App Health",
    desc: "Stabilize releases, reduce crashes, improve performance, and keep your application ready for real customer growth.",
  },
  {
    title: "UI UX Design Services",
    href: "/services/ui-ux-design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    label: "Design",
    desc: "Turn ideas into clear flows, polished interfaces, and product experiences that users understand quickly.",
  },
  {
    title: "GCC Setup Support",
    href: "/services/gcc-setup",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    label: "Global Teams",
    desc: "Plan and launch global capability centers with the right operating model, talent loop, governance, and delivery process.",
  },
  {
    title: "QA Automation & Regression Testing",
    href: "/services/qa-automation",
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1200&auto=format&fit=crop",
    label: "Quality",
    desc: "Build release confidence with automated test suites, regression coverage, smoke checks, and end-to-end quality gates.",
  },
  {
    title: "AI Integrations & Product Intelligence",
    href: "/services/ai-integrations",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200&auto=format&fit=crop",
    label: "AI",
    desc: "Add AI to real workflows through product intelligence, automation, RAG systems, copilots, and decision support.",
  },
  {
    title: "DevOps & Cloud Optimization",
    href: "/services/devops-cloud-optimization",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    label: "Cloud",
    desc: "Improve deployment speed, observability, infrastructure reliability, and cloud cost control without slowing product teams.",
  },
  {
    title: "Web App Development Services",
    href: "/services/web-app-development",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    label: "Web Apps",
    desc: "Build dashboards, portals, SaaS platforms, admin tools, and customer-facing web products with clean engineering.",
  },
  {
    title: "Mobile App Development Services",
    href: "/services/mobile-app-development",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    label: "Mobile",
    desc: "Ship iOS, Android, React Native, and Flutter applications with launch support and long-term maintenance.",
  },
];

const categories = [
  ["Foundry", "/foundry"],
  ["MIRSA", "/mirsa"],
  ["Mobile App Development", "/services/mobile-app-development"],
  ["Webapp Development", "/services/web-app-development"],
];

function SearchBox() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const matches = normalized
    ? serviceCards.filter((item) => item.title.toLowerCase().includes(normalized) || item.desc.toLowerCase().includes(normalized))
    : [];

  return (
    <aside style={panelStyle}>
      <div style={searchWrapStyle}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search..."
          style={searchInputStyle}
        />
        <svg width="15" height="15" fill="none" stroke="#111827" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      {matches.length > 0 && (
        <div style={{ display: "grid", gap: 8, marginTop: 14 }}>
          {matches.map((item) => (
            <Link key={item.title} href={item.href} style={miniResultStyle}>
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}

function Sidebar() {
  const recent = blogArticles.slice(0, 3);

  return (
    <aside style={sidebarStyle}>
      <SearchBox />

      <div style={panelStyle}>
        <h3 style={sideTitleStyle}>Recent Posts</h3>
        <div style={{ display: "grid", gap: 16 }}>
          {recent.map((post) => (
            <Link key={post.id} href={`/blogs/${post.id}`} style={recentStyle}>
              <img src={post.image} alt={post.title} style={recentImageStyle} />
              <span>
                <span style={recentTitleStyle}>{post.title}</span>
                <span style={recentDateStyle}>{post.date}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div style={panelStyle}>
        <h3 style={sideTitleStyle}>Categories</h3>
        <div style={{ display: "grid", gap: 9 }}>
          {categories.map(([label, href]) => (
            <Link key={label} href={href} style={categoryStyle}>
              {label}
              <span style={plusStyle}>+</span>
            </Link>
          ))}
        </div>
      </div>

      <div style={darkPanelStyle}>
        <p style={{ color: "#c4b5fd", fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Direct Contact
        </p>
        <a href="mailto:hello@thinkalternate.com" style={directLinkStyle}>hello@thinkalternate.com</a>
        <a href="tel:+919901198582" style={directLinkStyle}>+91 99011 98582</a>
      </div>
    </aside>
  );
}

function ReadMoreLink({ href, children = "Read More" }) {
  return (
    <Link href={href} style={buttonStyle}>
      {children} -&gt;
    </Link>
  );
}

export default function ContactPageContent() {
  return (
    <div style={{ background: "#ffffff", fontFamily: f }}>
      <section style={heroStyle}>
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1800&auto=format&fit=crop"
          alt="ThinkAlternate contact workspace"
          style={heroImageStyle}
        />
        <div style={heroOverlayStyle} />
        <div style={heroInnerStyle}>
          <p style={eyebrowStyle}>Home - Contact Us</p>
          <h1 style={heroTitleStyle}>Contact Us</h1>
          <p style={heroCopyStyle}>
            Talk to ThinkAlternate about product engineering, MIRSA, cloud, AI, QA, design, or ongoing app support.
          </p>
        </div>
      </section>

      <section className="contact-results-grid" style={pageGridStyle}>
        <main style={mainColumnStyle}>
          <article className="contact-results-intro" style={contactCardStyle}>
            <div>
              <p style={smallLabelStyle}>Contact Us</p>
              <h2 style={cardTitleStyle}>Let us know what you are building, fixing, or scaling.</h2>
              <p style={bodyTextStyle}>
                Our team helps startups and enterprises improve application reliability, ship better digital products, and solve the technical blockers that slow growth. Reach out anytime for questions, support, project discussions, or a quick hello.
              </p>
            </div>
            <div style={contactActionsStyle}>
              <a href="mailto:hello@thinkalternate.com" style={buttonStyle}>Email Us -&gt;</a>
              <a href="tel:+919901198582" style={outlineButtonStyle}>Call Team</a>
            </div>
          </article>

          <article style={featureCardStyle}>
            <img src={serviceCards[0].image} alt={serviceCards[0].title} style={featureImageStyle} />
            <div style={{ padding: 24 }}>
              <p style={smallLabelStyle}>Website Development</p>
              <h3 style={postTitleStyle}>{serviceCards[0].title}</h3>
              <p style={bodyTextStyle}>{serviceCards[0].desc}</p>
              <ReadMoreLink href={serviceCards[0].href} />
            </div>
          </article>

          <div className="contact-topic-grid" style={cardsGridStyle}>
            {serviceCards.slice(1).map((item) => (
              <article key={item.title} className="contact-topic-card" style={resultCardStyle}>
                <Link href={item.href} className="contact-topic-image" style={resultImageWrapStyle} aria-label={`Open ${item.title}`}>
                  <img src={item.image} alt={item.title} style={resultImageStyle} />
                  <span style={resultLabelStyle}>{item.label}</span>
                </Link>
                <div style={resultContentStyle}>
                  <h3 style={resultTitleStyle}>{item.title}</h3>
                  <p style={resultCopyStyle}>{item.desc}</p>
                  <ReadMoreLink href={item.href} />
                </div>
              </article>
            ))}
          </div>
        </main>

        <Sidebar />
      </section>
    </div>
  );
}

const heroStyle = {
  position: "relative",
  height: 330,
  overflow: "hidden",
};

const heroImageStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const heroOverlayStyle = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(90deg, rgba(10,10,16,0.78), rgba(24,24,32,0.42), rgba(124,58,237,0.34))",
};

const heroInnerStyle = {
  position: "relative",
  zIndex: 1,
  maxWidth: 1180,
  height: "100%",
  margin: "0 auto",
  padding: "120px 28px 52px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  color: "#fff",
};

const eyebrowStyle = {
  color: "rgba(255,255,255,0.75)",
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  marginBottom: 12,
};

const heroTitleStyle = {
  fontSize: "clamp(42px, 6vw, 76px)",
  lineHeight: 1,
  fontWeight: 900,
  margin: 0,
  color: "#ffffff",
};

const heroCopyStyle = {
  maxWidth: 620,
  marginTop: 18,
  color: "rgba(255,255,255,0.82)",
  fontSize: 16,
  lineHeight: 1.7,
};

const pageGridStyle = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "64px 28px 86px",
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 310px",
  gap: 42,
  alignItems: "start",
};

const mainColumnStyle = {
  display: "grid",
  gap: 28,
  minWidth: 0,
};

const contactCardStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 28,
  alignItems: "center",
  background: "#f7f7f7",
  border: "1px solid #efefef",
  borderRadius: 8,
  padding: 30,
  boxShadow: "0 18px 50px rgba(15,23,42,0.06)",
};

const smallLabelStyle = {
  margin: "0 0 10px",
  color: "#7c3aed",
  fontSize: 12,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
};

const cardTitleStyle = {
  color: "#111827",
  fontSize: "clamp(24px, 3vw, 34px)",
  lineHeight: 1.16,
  fontWeight: 900,
  margin: 0,
};

const bodyTextStyle = {
  color: "#5b6472",
  fontSize: 14,
  lineHeight: 1.8,
  margin: "14px 0 0",
};

const contactActionsStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  alignItems: "stretch",
};

const buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  width: "fit-content",
  minHeight: 42,
  padding: "11px 19px",
  borderRadius: 999,
  background: "linear-gradient(135deg, #6d28d9, #f97316)",
  color: "#fff",
  fontSize: 12,
  fontWeight: 900,
  textDecoration: "none",
  boxShadow: "0 14px 34px rgba(124,58,237,0.24)",
};

const outlineButtonStyle = {
  ...buttonStyle,
  background: "#fff",
  color: "#151515",
  border: "1px solid #e7e7e7",
  boxShadow: "none",
};

const featureCardStyle = {
  overflow: "hidden",
  background: "#f7f7f7",
  border: "1px solid #efefef",
  borderRadius: 8,
  boxShadow: "0 18px 50px rgba(15,23,42,0.06)",
};

const featureImageStyle = {
  width: "100%",
  height: 320,
  objectFit: "cover",
  display: "block",
};

const postTitleStyle = {
  color: "#111827",
  fontSize: 25,
  lineHeight: 1.25,
  fontWeight: 900,
  margin: 0,
};

const cardsGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 22,
};

const resultCardStyle = {
  overflow: "hidden",
  background: "#ffffff",
  border: "1px solid #e8e8ee",
  borderRadius: 8,
  boxShadow: "0 18px 46px rgba(15,23,42,0.08)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
};

const resultImageWrapStyle = {
  position: "relative",
  display: "block",
  height: 178,
  overflow: "hidden",
  textDecoration: "none",
};

const resultImageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const resultLabelStyle = {
  position: "absolute",
  left: 14,
  top: 14,
  padding: "7px 10px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.94)",
  color: "#111827",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const resultContentStyle = {
  padding: 22,
};

const resultTitleStyle = {
  color: "#111827",
  fontSize: 22,
  lineHeight: 1.28,
  fontWeight: 900,
  margin: 0,
};

const resultCopyStyle = {
  color: "#5b6472",
  fontSize: 14,
  lineHeight: 1.8,
  margin: "12px 0 0",
};

const sidebarStyle = {
  display: "grid",
  gap: 24,
  position: "sticky",
  top: 100,
};

const panelStyle = {
  background: "#f7f7f7",
  border: "1px solid #efefef",
  borderRadius: 8,
  padding: 20,
};

const searchWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  background: "#fff",
  borderRadius: 999,
  padding: "12px 16px",
};

const searchInputStyle = {
  minWidth: 0,
  flex: 1,
  border: "none",
  outline: "none",
  background: "transparent",
  color: "#111827",
  fontSize: 12,
  fontFamily: f,
};

const miniResultStyle = {
  padding: "10px 12px",
  borderRadius: 7,
  background: "#fff",
  color: "#374151",
  textDecoration: "none",
  fontSize: 12,
  fontWeight: 800,
};

const sideTitleStyle = {
  margin: "0 0 16px",
  color: "#111827",
  fontSize: 14,
  fontWeight: 900,
};

const recentStyle = {
  display: "grid",
  gridTemplateColumns: "64px minmax(0, 1fr)",
  gap: 12,
  textDecoration: "none",
};

const recentImageStyle = {
  width: 64,
  height: 56,
  borderRadius: 7,
  objectFit: "cover",
};

const recentTitleStyle = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  color: "#111827",
  fontSize: 12,
  lineHeight: 1.35,
  fontWeight: 900,
};

const recentDateStyle = {
  display: "block",
  marginTop: 5,
  color: "#9ca3af",
  fontSize: 10,
  fontWeight: 800,
};

const categoryStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  minHeight: 34,
  padding: "8px 12px",
  borderRadius: 999,
  background: "#191919",
  color: "#fff",
  fontSize: 11,
  fontWeight: 900,
  textDecoration: "none",
};

const plusStyle = {
  display: "grid",
  placeItems: "center",
  width: 18,
  height: 18,
  borderRadius: 999,
  background: "#fff",
  color: "#111827",
  fontSize: 11,
  flexShrink: 0,
};

const darkPanelStyle = {
  ...panelStyle,
  background: "#191919",
  color: "#fff",
  borderColor: "#191919",
};

const directLinkStyle = {
  display: "block",
  color: "#fff",
  fontSize: 14,
  fontWeight: 900,
  textDecoration: "none",
  marginTop: 14,
};
