import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Clients from "../components/Clients";
import ServicesClient from "../components/ServicesClient";
import WebPageSchema from "../components/seo/WebPageSchema";
import FAQSchema from "../components/seo/FAQSchema";

const DiagonalBanner = dynamic(() => import("../components/DiagonalBanner"));
const Testimonials = dynamic(() => import("../components/Testimonials"));
const About = dynamic(() => import("../components/About"));
const Portfolio = dynamic(() => import("../components/Portfolio"));
const ProjectTeaser = dynamic(() => import("../components/ProjectTeaser"));
const Contact = dynamic(() => import("../components/Contact"));
const HeroFAQ = dynamic(() => import("../components/HeroFAQ"));

const heroFaqs = [
  {
    question: "What is ThinkAlternate?",
    answer:
      "ThinkAlternate is an AI Product Engineering company helping startups and enterprises build AI-powered software, cloud-native applications, and digital products.",
  },
  {
    question: "What services does ThinkAlternate provide?",
    answer:
      "We provide AI Product Engineering, Agentic AI, Generative AI, AWS Cloud Engineering, Application Modernization, Digital Transformation, and Fractional CTO services.",
  },
  {
    question: "Who does ThinkAlternate work with?",
    answer:
      "We partner with startups, SMEs, and enterprises across Healthcare, SaaS, FinTech, Manufacturing, Retail, Logistics, and Education.",
  },
  {
    question: "Which technologies does ThinkAlternate specialize in?",
    answer:
      "Our expertise includes AI, AWS, React, Next.js, Node.js, Kubernetes, DevOps, LLMs, and scalable cloud-native architectures.",
  },
];
export default function Home() {
  return (
    <main className="homepage-gradient text-[#0f172a] relative overflow-hidden" style={{
      background: "linear-gradient(135deg, #105DA1 0%, #1a73e8 50%, #14b8a6 100%)",
      minHeight: "100vh"
    }}>
    <FAQSchema faqs={heroFaqs} />
      <WebPageSchema name="ThinkAlternate | AI Product Engineering, Cloud & Digital Transformation" description="AI product engineering, cloud-native platforms, automation, and digital transformation services." />
      <Navbar />
      <div style={{ paddingTop: "clamp(76px, 5vw, 90px)", position: "relative" }}>
        <Hero />
        <Clients /> 
        <DiagonalBanner />
        <About />
        <ServicesClient />
        <Portfolio />
        <ProjectTeaser />
        <HeroFAQ
          title="Frequently Asked Questions"
          intro="Learn more about ThinkAlternate's AI engineering, cloud, and digital transformation services."
          faqs={heroFaqs}
        />
        <Testimonials />
        <Contact />
      </div>
    </main>
  );
}
