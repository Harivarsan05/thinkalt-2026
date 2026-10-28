"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";

const f = "'Inter','DM Sans',sans-serif";

const columns = [
  [
    {
      quote:
        "We were building a platform to help prevent and fight abuse - not an ordinary app. ThinkAlternate not only understood this but stayed deeply involved. They managed the project on Trello, helped us scale to 3000+ users, and always delivered with quality. Really enjoyed working with ThinkAlt! Would highly recommend.",
      name: "Vaamaa Baldota",
      role: "Founder & CEO, iDare",
      avatar: "https://thinkalternate.com/wp-content/uploads/elementor/thumbs/Vaamaa-Baldota-iDare-ThinkAlternate-r9sp25m1pmymvc04g26gzpvxka7f39s1kf6qtz6q0g.jpg",
    },
    {
      quote:
        "We had a new IoT idea and needed a team that could understand both the product and the users. ThinkAlternate helped us move from concept to launch with clarity, speed, and dependable communication.",
      name: "Priyanka",
      role: "Founder, Ambi Sense",
      avatar: "https://thinkalternate.com/wp-content/uploads/elementor/thumbs/Priyanka-Botny-Playonomics-ThinkAlternate-r9sp23qdbyw2842ur1d7uqd0digonvkkw5vrvf9icw.jpg",
    },
  ],
  [
    {
      quote:
        "ThinkAlternate brought the structure and clarity we needed. The team understood our requirements, managed delivery carefully, and helped us move faster without compromising quality.",
      name: "Venkata G Thota",
      role: "COO, Apeirogon Labs",
      avatar: "https://thinkalternate.com/wp-content/uploads/elementor/thumbs/Thota-Venkata-Ganapathi-Flash-N-Tap-ThinkAlternate-r9sp24o7isxcjq1hljruf84gywc1vkob8aj9cp846o.jpg",
    },
    {
      quote:
        "There were too many dev companies to choose from, but ThinkAlternate stood out with flexibility and clear communication. They made it easy to start and provided continuous support - even when things changed. Their openness and great performance gave us the confidence we needed.",
      name: "Miki Nishi",
      role: "Matsubaya Department Store",
      avatar: "https://thinkalternate.com/wp-content/uploads/elementor/thumbs/Miki-Nishi-Dava-Reco-r9sp22sj54urwi47wiyla8ljs4lbg6guk18ae5awj4.jpg",
    },
  ],
  [
    {
      quote:
        "ThinkAlternate is organized, driven, and genuinely want to help businesses succeed.",
      name: "Priyanka Botny",
      role: "Founder & CEO",
      avatar: "https://thinkalternate.com/wp-content/uploads/elementor/thumbs/Priyanka-Botny-Playonomics-ThinkAlternate-r9sp23qdbyw2842ur1d7uqd0digonvkkw5vrvf9icw.jpg",
    },
    {
      quote:
        "Even though we made changes, ThinkAlternate stayed aligned and helped us make better decisions along the way.",
      name: "Luv Sinha",
      role: "",
      avatar: "https://thinkalternate.com/wp-content/uploads/elementor/thumbs/Luv-Sinha-House-Of-Creativity-ThinkAlternate-r9sp21uoyathkw5l20jypqu36qpy8hd47wkswvcapc.jpg",
    },
  ],
];

function TestimonialCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.44, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.015 }}
      style={{
        background: "#ffffff",
        border: "1px solid #e8e8ef",
        borderRadius: 18,
        padding: "28px 32px",
        boxShadow: "0 14px 36px rgba(15,23,42,0.04)",
        minHeight: item.quote.length > 260 ? 385 : 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 34,
      }}
    >
      <p
        style={{
          color: "#0f172a",
          fontFamily: f,
          fontSize: "clamp(18px, 1.22vw, 23px)",
          lineHeight: 1.48,
          fontWeight: 500,
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        {item.quote}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 12px 26px rgba(15,23,42,0.1)",
            position: "relative",
          }}
        >
          <Image
            src={item.avatar}
            alt={item.name}
            fill
            sizes="54px"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
        <div>
          <div style={{ color: "#0f172a", fontSize: 18, lineHeight: 1.1, fontWeight: 800, marginBottom: 6 }}>
            {item.name}
          </div>
          {item.role ? (
            <div style={{ color: "#475569", fontSize: 16, lineHeight: 1.25, fontWeight: 500 }}>
              {item.role}
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      style={{
        position: "relative",
        background: "#ffffff",
        padding: "24px 0 76px",
        overflow: "hidden",
        fontFamily: f,
      }}
    >
      {/* Dynamic slow-motion floating glass bubbles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ contain: "paint" }}>
        {[...Array(3)].map((_, i) => (
          <div
            key={`testimonials-bubble-${i}`}
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

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.38 }}
        style={{ textAlign: "center", marginBottom: 68 }}
      >
        <div style={{ color: "#0d9488", fontSize: 20, fontWeight: 500, marginBottom: 22 }}>
          Testimonials
        </div>
        <h2
          style={{
            color: "#0f172a",
            fontSize: "clamp(34px, 3.45vw, 54px)",
            lineHeight: 1.16,
            letterSpacing: "-0.035em",
            fontWeight: 500,
            maxWidth: 1040,
            margin: "0 auto",
          }}
        >
          Dont just take us for our word. Here’s what our clients have to say about us
        </h2>
      </motion.div>

      <div
        className="testimonials-frame"
        style={{
          position: "relative",
          height: "auto",
          maxWidth: 1540,
          margin: "0 auto",
          padding: "0 48px",
        }}
      >
        <div
          className="testimonials-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 26,
          }}
        >
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              style={{ display: "grid", gap: 26 }}
            >
              {column.map((item, i) => (
                <TestimonialCard key={item.name} item={item} index={columnIndex * 3 + i} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
