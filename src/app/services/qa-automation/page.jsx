"use client";
import ServicePage from "../../../components/ServicePage";

const data = {
  id: "qa",
  title: "QA Automation &\nRegression Testing",
  subtitle: "Shift-Left · E2E · Load · Security",
  tagline: "Bugs stop here. Before your users see them.",
  heroDesc: "We build intelligent test automation frameworks that catch regressions before they reach production. From AI-generated test cases to OWASP security scans — total coverage.",
  heroImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1920&auto=format&fit=crop",
  color: "from-[#4682B4] to-[#00CED1]",
  colorRGB: "0,206,209",
  accent: "#00CED1",
  lightAccent: "#48D1CC",
  ctaHeading: "Let's eliminate your regression risk.",
  ctaDesc: "Book a free QA audit. We'll review your current test coverage, identify the highest-risk uncovered areas, and propose an automation strategy with ROI estimates.",
  stats: [
    { value: "95%+", label: "Code Coverage", sub: "Avg across projects" },
    { value: "70%", label: "Faster QA Cycles", sub: "vs manual testing" },
    { value: "100K", label: "Concurrent Users", sub: "Load test capacity" },
    { value: "0", label: "P0 Bugs in Prod", sub: "Post-automation avg" },
    { value: "30+", label: "Device Configs", sub: "Real device testing" },
    { value: "< 8 min", label: "Full Suite Runtime", sub: "CI gate execution" },
  ],
  capabilities: [
    { icon: "🎭", title: "E2E Test Automation", desc: "Playwright and Cypress E2E suites covering critical user journeys across 50+ browser, OS, and viewport combinations on BrowserStack real devices.", tags: ["Playwright", "Cypress", "BrowserStack"] },
    { icon: "🤖", title: "AI Test Generation", desc: "Automatically generate test cases from user stories, Figma designs, or production session recordings — reducing test authoring time by 60%.", tags: ["TestRigor", "Applitools", "Katalon AI"] },
    { icon: "⚡", title: "Unit & Integration Testing", desc: "Jest, Vitest, and pytest test suites with mocking, snapshot testing, test doubles, and contract testing for API boundaries.", tags: ["Jest", "Vitest", "pytest"] },
    { icon: "🔥", title: "Load & Stress Testing", desc: "k6 and JMeter load tests scripted to simulate real traffic patterns — ramp, spike, and soak tests that reveal breaking points before go-live.", tags: ["k6", "JMeter", "Gatling"] },
    { icon: "🛡️", title: "Security Testing", desc: "OWASP ZAP DAST scanning, Snyk SCA, dependency vulnerability audits, SQL injection and XSS probe suites run on every release candidate.", tags: ["OWASP ZAP", "Snyk", "Burp Suite"] },
    { icon: "👁️", title: "Visual Regression", desc: "Percy and Chromatic visual snapshots on every PR — pixel-level comparison across browsers to catch unintended UI changes before they reach staging.", tags: ["Percy", "Chromatic", "Applitools"] },
    { icon: "📊", title: "Test Observability", desc: "Allure and TestRail dashboards with flaky test detection, failure categorisation, MTTR tracking, and trend analysis to continuously improve suite health.", tags: ["Allure", "TestRail", "ReportPortal"] },
    { icon: "🔗", title: "CI/CD Test Gates", desc: "Mandatory test gates on every PR — blocking merge if coverage drops, E2E fails, or security vulnerabilities are introduced. Full GitHub Actions integration.", tags: ["GitHub Actions", "SonarQube", "Codecov"] },
  ],
  process: [
    { step: "01", title: "Test Strategy", desc: "Risk-based test planning — we map your highest-risk user journeys, define the automation pyramid, and select the right frameworks for your stack.", duration: "3–5 days" },
    { step: "02", title: "Framework Setup", desc: "Scaffolding the test project with CI integration, reporting, environment config, test data management, and parallel execution from day one.", duration: "3–5 days" },
    { step: "03", title: "E2E Authoring", desc: "Writing the first 50–100 E2E scenarios covering critical paths — login, checkout, key user flows — with page object pattern and shared helpers.", duration: "2–4 weeks" },
    { step: "04", title: "Load Test Design", desc: "Scripting realistic virtual user behaviours, defining SLOs (p95 < 500ms), and running baseline + spike + endurance test scenarios.", duration: "1 week" },
    { step: "05", title: "Security Scan", desc: "OWASP ZAP baseline and full scan, Snyk dependency audit, and a custom payload suite covering OWASP Top 10 for your application.", duration: "3–5 days" },
    { step: "06", title: "CI Gate Integration", desc: "Wiring all test suites into your PR pipeline — parallel execution, threshold-based merge blocking, and Slack notifications for failures.", duration: "2–3 days" },
  ],
  caseStudies: [
    { tag: "FinTech", title: "Zero P0 Bugs — 18 Months Straight", desc: "Built a Playwright + k6 automation suite for a payment platform — achieving 94% E2E coverage and 18 consecutive months without a P0 production incident.", results: ["94% E2E coverage", "18 months zero P0 bugs", "8-min CI gate execution", "60% QA cycle time saving"], image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "E-Commerce", title: "Black Friday Load Test — 50K Users", desc: "Designed and ran load tests simulating 50K concurrent shoppers — uncovering 3 critical database bottlenecks that would have caused checkout failures.", results: ["50K concurrent user tests", "3 critical issues pre-empted", "Cart API p99 < 300ms", "Zero checkout failures on BF"], image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "HealthTech", title: "HIPAA Security Test Suite", desc: "Comprehensive OWASP and HIPAA security testing for a patient portal — identifying and remediating 12 high-severity vulnerabilities before regulatory audit.", results: ["12 high-severity vulns found", "HIPAA audit passed", "OWASP Top 10 coverage", "Automated CVE monitoring"], image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
  ],
  techStack: [
    { category: "E2E Testing", items: ["Playwright", "Cypress", "Selenium", "TestCafe"] },
    { category: "Unit / Integration", items: ["Jest", "Vitest", "pytest", "JUnit"] },
    { category: "Load Testing", items: ["k6", "JMeter", "Gatling", "Locust"] },
    { category: "Security", items: ["OWASP ZAP", "Snyk", "Trivy", "Burp Suite"] },
    { category: "Visual Testing", items: ["Percy", "Chromatic", "Applitools"] },
    { category: "Mobile Testing", items: ["Detox", "Maestro", "Appium", "BrowserStack"] },
    { category: "Reporting", items: ["Allure", "TestRail", "ReportPortal", "Codecov"] },
    { category: "CI/CD", items: ["GitHub Actions", "Jenkins", "CircleCI", "SonarQube"] },
  ],
  faqs: [
    { q: "How do you decide what to automate first?", a: "We use a risk-based prioritisation model: highest user impact × highest change frequency × lowest existing coverage. This typically means automating authentication, checkout/core transaction flows, and API contracts first." },
    { q: "Can you integrate with our existing Jira / CI pipeline?", a: "Yes. We integrate with Jira for test-to-story traceability, GitHub Actions or Jenkins for CI gates, and Slack for failure notifications — all without disrupting your current workflow." },
    { q: "How do you handle test data management?", a: "We implement a test data factory pattern with seeded database states, API-driven setup/teardown, and isolated test environments — ensuring tests are deterministic and parallelisable." },
    { q: "What's a realistic timeline to achieve 80% E2E coverage?", a: "For a mid-sized web app with clear user journeys, 80% critical-path E2E coverage is achievable in 6–8 weeks with a dedicated QA engineer. We track progress against agreed coverage targets weekly." },
    { q: "Do you maintain the test suite after handoff?", a: "Yes. Our retainer includes flaky test triage, new feature test authoring, framework upgrades, and monthly suite health reports. We can also train your team to own the suite independently." },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}

