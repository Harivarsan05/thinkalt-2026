"use client";
import ServicePage from "../../../components/ServicePage";

const data = {
  id: "mobile",
  title: "Mobile App\nDevelopment",
  subtitle: "Cross-Platform · Native iOS & Android",
  tagline: "Apps that feel native, perform globally.",
  heroDesc: "We architect and deliver high-performance mobile applications that scale from MVP to millions of daily active users. Every pixel is intentional, every interaction buttery-smooth.",
  heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1920&auto=format&fit=crop",
  color: "from-[#4682B4] to-[#00CED1]",
  colorRGB: "0,206,209",
  accent: "#00CED1",
  lightAccent: "#48D1CC",
  ctaHeading: "Let's ship your app.",
  ctaDesc: "Book a free 30-minute discovery call. We'll review your idea, suggest the right tech stack, and give you a ballpark scope — no strings attached.",
  stats: [
    { value: "60+", label: "Apps Shipped", sub: "iOS & Android" },
    { value: "4.8★", label: "Avg Store Rating", sub: "App Store & Play Store" },
    { value: "99.9%", label: "Crash-Free Rate", sub: "Production average" },
    { value: "12ms", label: "Frame Render", sub: "60fps guaranteed" },
    { value: "50M+", label: "End-Users Served", sub: "Across all apps" },
    { value: "< 3s", label: "Cold Start Time", sub: "Optimised launches" },
  ],
  capabilities: [
    { icon: "⚡", title: "High-Performance UI", desc: "Buttery-smooth 60fps interfaces using React Native Reanimated 3 and Flutter Skia — even on budget Android devices.", tags: ["Reanimated 3", "Gesture Handler", "Skia Canvas"] },
    { icon: "🔐", title: "Security & Auth", desc: "Biometric login (Face ID, fingerprint), JWT + OAuth2 flows, encrypted Keychain/Keystore storage, and MFA integration.", tags: ["Biometrics", "OAuth2 / JWT", "AES-256"] },
    { icon: "📡", title: "Offline-First Architecture", desc: "Apps that work flawlessly with zero connectivity — local-first storage with background sync, conflict resolution, and delta updates.", tags: ["WatermelonDB", "SQLite", "Background Sync"] },
    { icon: "🔔", title: "Push & In-App Notifications", desc: "Deep-linked rich push notifications, in-app message centres, real-time WebSocket channels, and scheduled local notifications.", tags: ["FCM", "APNs", "OneSignal"] },
    { icon: "📊", title: "Analytics & Crash Reporting", desc: "Full observability with crash reporting, performance tracing, custom event funnels, session replays, and A/B testing SDKs.", tags: ["Sentry", "Firebase Analytics", "Mixpanel"] },
    { icon: "🚀", title: "CI/CD & Store Delivery", desc: "Automated pipelines from commit to App Store / Play Store — code signing, build flavours, staged rollouts, and OTA updates.", tags: ["Fastlane", "EAS Build", "GitHub Actions"] },
    { icon: "🌐", title: "API & Backend Integration", desc: "Seamless REST, GraphQL, and gRPC integration with robust error handling, request caching, pagination, and retry logic.", tags: ["Apollo", "React Query", "Retrofit"] },
    { icon: "♿", title: "Accessibility & i18n", desc: "WCAG-compliant screen reader support, dynamic text sizing, RTL layouts, and full i18n/l10n for global markets.", tags: ["VoiceOver", "TalkBack", "i18next"] },
  ],
  process: [
    { step: "01", title: "Discovery & Strategy", desc: "Structured workshops to map user journeys, define MVP scope, and choose the right tech stack with a detailed project specification.", duration: "1–2 weeks" },
    { step: "02", title: "UI/UX Design", desc: "High-fidelity Figma screens, motion prototypes, and a complete design system — validated before a single line of code is written.", duration: "2–3 weeks" },
    { step: "03", title: "Sprint Development", desc: "2-week Agile sprints with daily standups and working builds delivered every fortnight. Full Jira visibility throughout.", duration: "6–16 weeks" },
    { step: "04", title: "QA & Device Testing", desc: "Automated Detox/Maestro E2E suites across 30+ real device configs on BrowserStack. Accessibility and performance audits included.", duration: "Continuous" },
    { step: "05", title: "Store Submission", desc: "Full App Store Connect and Google Play Console submission — metadata, screenshots, privacy manifests, age ratings, phased rollout.", duration: "1 week" },
    { step: "06", title: "Post-Launch Support", desc: "SLA-backed retainer with crash monitoring, dependency upgrades, OS compatibility updates, and quarterly performance calls.", duration: "Ongoing" },
  ],
  caseStudies: [
    { tag: "FinTech", title: "Digital Wallet — 2M+ Downloads", desc: "Real-time payment & investment app built from zero to 2M+ downloads in 8 months. UPI, stock trading, AI spend insights with sub-200ms latency.", results: ["2M+ downloads in 8 months", "4.7★ App Store rating", "< 200ms transaction speed", "Zero critical downtime"], image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "HealthTech", title: "Telemedicine — 500K Patients", desc: "End-to-end telemedicine with video consultation, EHR integration, e-prescription, and real-time queue management for 500K patients.", results: ["500K registered patients", "HIPAA compliant", "99.95% video uptime", "3-min avg connect time"], image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "Logistics", title: "Last-Mile Delivery — 10K Trips/Day", desc: "Real-time driver tracking, multi-stop route optimisation, offline barcode scanning, and live customer communication across 12 cities.", results: ["10K+ daily deliveries", "40% fuel cost saving", "Offline barcode scanning", "Live GPS tracking"], image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
  ],
  techStack: [
    { category: "Cross-Platform", items: ["React Native", "Flutter", "Expo"] },
    { category: "Native iOS", items: ["Swift", "SwiftUI", "Xcode Cloud"] },
    { category: "Native Android", items: ["Kotlin", "Jetpack Compose", "Gradle"] },
    { category: "Backend / API", items: ["Node.js", "GraphQL", "Firebase", "Supabase"] },
    { category: "State Management", items: ["Redux Toolkit", "Zustand", "Riverpod"] },
    { category: "Testing", items: ["Detox", "Maestro", "Jest", "BrowserStack"] },
    { category: "CI/CD", items: ["Fastlane", "EAS Build", "GitHub Actions"] },
    { category: "Monitoring", items: ["Sentry", "Crashlytics", "Datadog"] },
  ],
  faqs: [
    { q: "React Native vs Flutter — which should I choose?", a: "React Native is ideal if your team has JavaScript expertise or you share logic with a web app. Flutter is better for pixel-perfect custom UIs. We'll recommend the right choice after reviewing your requirements." },
    { q: "How long does it take to build a mobile app?", a: "A well-scoped MVP takes 10–16 weeks from kickoff to store submission. A full v1 typically takes 4–6 months. We provide a detailed timeline after the discovery workshop." },
    { q: "Do you handle App Store and Play Store submissions?", a: "Yes, completely. Developer accounts, certificates, metadata, screenshots, privacy manifests, age ratings, review responses, and phased rollouts — all managed by us." },
    { q: "Can you take over an existing app?", a: "Absolutely. We start with a full codebase audit covering architecture quality, security vulnerabilities, and performance bottlenecks, then present a remediation roadmap." },
    { q: "What does post-launch support include?", a: "Crash monitoring, OS update compatibility, dependency upgrades, hotfix sprints, monthly performance audits, and a dedicated Slack channel with < 4hr response SLA." },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}

