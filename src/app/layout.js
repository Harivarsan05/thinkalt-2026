import { Inter, Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import GlobalFooterWrapper from "../components/GlobalFooterWrapper";
import OrganizationSchema from "../components/seo/OrganizationSchema";
import LocalBusinessSchema from "../components/seo/LocalBusinessSchema";
import WebsiteSchema from "../components/seo/WebsiteSchema";
import SpeakableSchema from "../components/seo/SpeakableSchema";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://thethinkalternate.com"),

  title: {
    default:
      "ThinkAlternate | AI Product Engineering, Cloud & Digital Transformation",
    template: "%s | ThinkAlternate",
  },

  description:
    "ThinkAlternate helps startups and enterprises build AI-powered products, cloud-native platforms, automation solutions, and digital transformation initiatives.",

  keywords: [
    "ThinkAlternate",
    "Artificial Intelligence",
    "AI Product Engineering",
    "Agentic AI",
    "Generative AI",
    "Cloud Engineering",
    "AWS",
    "Digital Transformation",
    "AI Consulting",
    "Machine Learning",
    "LLM",
    "Automation",
    "DevOps",
    "Next.js",
  ],

  authors: [
    {
      name: "ThinkAlternate",
      url: "https://thethinkalternate.com",
    },
  ],

  creator: "ThinkAlternate",

  publisher: "ThinkAlternate",

  applicationName: "ThinkAlternate",

  category: "Technology",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "ThinkAlternate | AI Product Engineering & Cloud Solutions",
    description:
      "Build intelligent products faster with ThinkAlternate's AI engineering, cloud modernization, and digital transformation expertise.",
    url: "https://thethinkalternate.com",
    siteName: "ThinkAlternate",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ThinkAlternate",
    description:
      "AI Product Engineering, Cloud Engineering & Digital Transformation.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
  <link rel="icon" href="/favicon.ico" />

  <link rel="preconnect" href="https://images.unsplash.com" />
  <link rel="dns-prefetch" href="https://images.unsplash.com" />

  <link rel="preconnect" href="https://thethinkalternate.com" />
  <link rel="dns-prefetch" href="https://thethinkalternate.com" />

  <link rel="preconnect" href="https://thinkalternate.com" />
  <link rel="dns-prefetch" href="https://thinkalternate.com" />

  <OrganizationSchema />
  <LocalBusinessSchema />
  <WebsiteSchema />
  <SpeakableSchema />
</head>
      <body suppressHydrationWarning>
      {children}
      <GlobalFooterWrapper />
      <GoogleAnalytics gaId="G-CYV8XT8WRR" />
      </body>
    </html>
  );
}
