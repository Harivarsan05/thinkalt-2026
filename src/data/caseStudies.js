export const caseStudies = [
  {
    id: 1,
    title: "CTO+ (Fractional CTO Services)",
    category: "Foundry",
    tag: "CTO+",
    tagColor: "bg-teal-500",
    color: "from-teal-400 to-emerald-600",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Embedded a fractional CTO into a Series-A SaaS startup, rebuilt the engineering culture, reduced tech debt by 60% and shipped 3 major product releases in 6 months.",
    metrics: ["60% tech debt cut", "3 releases in 6mo", "12-engineer team"],
    client: "SaaS Startup · Series A",
    duration: "6 Months",
    role: "Fractional CTO & Tech Lead",
    challenge: "The company was struggling with a legacy codebase, a demotivated development team, and missed product delivery deadlines. Technical debt had built up to a point where simple feature additions took weeks, and production deployments were highly unstable, leading to critical service interruptions.",
    solution: "We embedded an experienced fractional CTO to restructure the engineering processes. We implemented agile methodologies, set up strict code review practices, and established automated CI/CD pipelines. Rather than a complete rewrite, we systematically refactored bottleneck modules, migrated core services to scalable cloud functions, and coached the team on clean architecture principles.",
    solutionSteps: [
      { title: "Technical Audit", desc: "Identified core architecture bottlenecks, security vulnerabilities, and deployment pain points." },
      { title: "Process Redesign", desc: "Introduced structured sprints, automated regression testing, and code ownership models." },
      { title: "Modular Migration", desc: "Refactored monolithic endpoints into independent serverless microservices." }
    ],
    impact: "Successfully delivered 3 major, delayed product releases on schedule. Reduced overall bug reports by 75% and trimmed average page load latency. The engineering team grew from a disorganized group to a highly collaborative, self-sustaining 12-engineer powerhouse.",
    techStack: ["React", "Node.js", "AWS EKS", "Terraform", "GitHub Actions"],
    stats: [
      { label: "Tech Debt Reduced", value: 60, suffix: "%" },
      { label: "Releases Shipped", value: 3, suffix: "" },
      { label: "Deployment Speed", value: 4, suffix: "x" }
    ]
  },
  {
    id: 2,
    title: "AI Integrations & Product Intelligence",
    category: "MIRSA",
    tag: "MIRSA",
    tagColor: "bg-blue-500",
    color: "from-cyan-400 to-blue-600",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Integrated GPT-4 + RAG pipeline into a B2B SaaS product, adding intelligent search, auto-tagging, and predictive churn analytics — increasing retention by 34%.",
    metrics: ["34% retention up", "GPT-4 + RAG", "2M queries/mo"],
    client: "B2B SaaS · $12M ARR",
    duration: "4 Months",
    role: "AI Engineers & Core Integration team",
    challenge: "The client needed to enhance user engagement and prevent customer churn in their B2B data analytics platform. Users spent too much time manually writing complex database queries, resulting in high frustration rates and account cancellations.",
    solution: "We integrated a state-of-the-art GPT-4 Natural Language Processing interface combined with a Retrieval-Augmented Generation (RAG) pipeline. This allowed users to query their dashboards in plain English. We also implemented predictive analytics models to flag users with declining activity and automate targeted retention sequences.",
    solutionSteps: [
      { title: "RAG Setup", desc: "Constructed vector databases using pgvector and OpenAI embedding models for contextual data lookup." },
      { title: "UI Integration", desc: "Created an intuitive conversational sidebar inside the dashboard with real-time streaming tokens." },
      { title: "Churn Predictor", desc: "Developed machine learning pipelines to detect usage patterns linked to client attrition." }
    ],
    impact: "Customer retention spiked by 34% within the first quarter of release. The natural language interface now handles over 2 million queries monthly with 92% accuracy, significantly reducing support tickets.",
    techStack: ["Next.js", "FastAPI", "Python", "OpenAI API", "pgvector", "PostgreSQL"],
    stats: [
      { label: "Retention Rate", value: 34, suffix: "%" },
      { label: "Monthly Queries", value: 2, suffix: "M+" },
      { label: "Query Accuracy", value: 92, suffix: "%" }
    ]
  },
  {
    id: 3,
    title: "AppTron",
    category: "MIRSA",
    tag: "MIRSA",
    tagColor: "bg-blue-500",
    color: "from-blue-400 to-indigo-600",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Built AppTron — an autonomous app monitoring agent that detects regressions, triages issues, and assigns them to the right engineer before users notice.",
    metrics: ["90% faster triage", "Zero P0 escapes", "24/7 monitoring"],
    client: "FinTech App · 1M+ users",
    duration: "5 Months",
    role: "System Architects & Core Product Dev",
    challenge: "In fintech systems, high-priority (P0) incidents such as transaction failures can cause immense financial and reputational damage. The manual incident resolution cycle took too long: detecting, triaging, and routing bugs to the correct developer often took hours.",
    solution: "We designed AppTron, an AI-powered system monitoring agent. It intercepts exception traces, user session replays, and CI/CD deployment logs in real time. It uses localized LLMs to categorize the root cause, determine the offending commit, and instantly ping and assign the ticket to the responsible developer.",
    solutionSteps: [
      { title: "Anomaly Listener", desc: "Engineered high-throughput event hooks to ingest logs, traces, and metrics under sub-millisecond latencies." },
      { title: "Commit Trace Engine", desc: "Created git diff analysis systems to correlate crash stacks with recent commits." },
      { title: "Auto Ticket Router", desc: "Programmed integrations with Jira and Slack for automatic assignment and alert dispatching." }
    ],
    impact: "Incident triage times dropped from an average of 45 minutes to under 4 minutes. Over a 6-month trial, zero critical (P0) errors escaped to production without immediate auto-triage, saving hundreds of developer hours.",
    techStack: ["Go", "Kubernetes", "PyTorch", "Grafana", "Jira API", "Slack API"],
    stats: [
      { label: "Triage Speedup", value: 90, suffix: "%" },
      { label: "P0 Escapes", value: 0, suffix: "" },
      { label: "Monitoring Coverage", value: 100, suffix: "%" }
    ]
  },
  {
    id: 4,
    title: "Sentiment Analyzer",
    category: "MIRSA",
    tag: "MIRSA",
    tagColor: "bg-blue-500",
    color: "from-indigo-400 to-violet-600",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Deployed a real-time NLP sentiment analysis engine across Play Store & App Store reviews, Slack, and Intercom — surfacing product signals in one unified dashboard.",
    metrics: ["5 data sources", "Real-time NLP", "4x faster insight"],
    client: "Mobile App Studio",
    duration: "3 Months",
    role: "ML Engineers & Full Stack Dev",
    challenge: "A leading mobile application publisher with over 20 active apps struggled to gather qualitative feedback. User feedback was scattered across App Store reviews, Google Play Store, Intercom tickets, and social mentions, making it impossible for product managers to build a unified features roadmap.",
    solution: "We designed a multi-channel scraper and NLP analysis system. It aggregates reviews, translates multi-language messages, and classifies feedback based on emotions (frustrated, delighted, neutral) and topics (billing, UX, bugs). The outputs are visible in an interactive dashboard showing emerging issues in real-time.",
    solutionSteps: [
      { title: "Ingestion Pipelines", desc: "Constructed serverless polling scrapers that retrieve data from app stores, Intercom, and Zendesk." },
      { title: "Transformer Pipeline", desc: "Configured fine-tuned BERT models for multi-label emotion and topic classification." },
      { title: "Real-time Feed", desc: "Built a React + WebSockets dashboard highlighting sudden spikes in negative product sentiment." }
    ],
    impact: "Surfaced critical usability issues within minutes of releases rather than days. Product managers can now gather actionable insights 4 times faster than they could with manual auditing, increasing average store ratings from 4.1 to 4.5.",
    techStack: ["React", "Python", "Hugging Face", "AWS Lambda", "PostgreSQL", "Socket.io"],
    stats: [
      { label: "Data Sources", value: 5, suffix: "" },
      { label: "Insight Acceleration", value: 4, suffix: "x" },
      { label: "Rating Boost", value: 10, suffix: "%" }
    ]
  },
  {
    id: 5,
    title: "QA Automation & Regression Testing",
    category: "Foundry",
    tag: "Foundry",
    tagColor: "bg-purple-500",
    color: "from-purple-400 to-fuchsia-600",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Automated 1,200+ test cases with Playwright + Cypress, integrated into GitHub Actions — cutting QA cycle time from 5 days to 4 hours with 99.2% pass rate.",
    metrics: ["1,200+ tests", "5 days → 4 hrs", "99.2% pass rate"],
    client: "EdTech Platform · Series B",
    duration: "4 Months",
    role: "Automation Specialists",
    challenge: "The client's manual testing procedures had become a major bottleneck, slowing down feature releases. The engineering team spent up to 5 days manually running regression scripts on staging before every production deployment, and UI bugs still slipped through to end-users.",
    solution: "We implemented an end-to-end automated QA testing strategy. We automated over 1,200 functional, visual, and performance test cases using Playwright and Cypress. These automated suites run concurrently in headless containers inside GitHub Actions, triggering on every pull request.",
    solutionSteps: [
      { title: "Test Audit & Mapping", desc: "Reviewed manual test logs and mapped high-risk user flows for automation." },
      { title: "Suite Development", desc: "Authored Playwright and Cypress scripts utilizing robust selectors and mock API endpoints." },
      { title: "CI/CD Pipeline Setup", desc: "Configured automated triggers, Slack report integrations, and screenshot/video uploads." }
    ],
    impact: "Total regression testing cycles dropped from 5 days to just 4 hours. QA engineers now focus on edge cases and exploratory testing, and the production release frequency increased from bi-weekly to daily.",
    techStack: ["Playwright", "Cypress.io", "GitHub Actions", "Node.js", "Docker"],
    stats: [
      { label: "Automated Tests", value: 1200, suffix: "+" },
      { label: "Cycle Reduction", value: 96, suffix: "%" },
      { label: "Test Pass Rate", value: 99.2, suffix: "%" }
    ]
  },
  {
    id: 6,
    title: "DevOps & Cloud Cost Optimisation",
    category: "Foundry",
    tag: "Foundry",
    tagColor: "bg-purple-500",
    color: "from-pink-400 to-rose-600",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Rightsized AWS infrastructure using Compute Optimizer + Spot instances, migrated to Graviton2, and implemented auto-scaling — saving $180K/year in cloud spend.",
    metrics: ["$180K saved/yr", "43% cost cut", "Graviton2 migration"],
    client: "E-commerce · 2M users",
    duration: "3 Months",
    role: "DevOps & Cloud Architects",
    challenge: "An e-commerce business was experiencing massive traffic swings, causing CPU spikes and database timeouts. To prevent outages, they over-provisioned their cloud resources, resulting in astronomical cloud bills with an average server utilization of less than 15%.",
    solution: "We conducted a thorough audit of their AWS architecture. We restructured their EKS clusters to utilize AWS Graviton2 processors (providing better price-performance), set up fine-grained Kubernetes Horizontal Pod Autoscaling (HPA), and migrated staging/development loads to AWS Spot instances.",
    solutionSteps: [
      { title: "Infrastructure Audit", desc: "Analyzed billing alerts, idle resources, and container resource limits." },
      { title: "Graviton Migration", desc: "Rebuilt container images to support ARM64 architecture and migrated workloads." },
      { title: "Autoscaling Policies", desc: "Configured cluster autoscalers to match traffic changes dynamically." }
    ],
    impact: "Cut the annual cloud hosting expenditure by 43%, amounting to over $180,000 in savings. Despite the cost cuts, application response latency dropped by 18% due to the efficiency of Graviton2 processors.",
    techStack: ["AWS", "Kubernetes (EKS)", "Terraform", "Docker", "AWS Graviton2"],
    stats: [
      { label: "Annual Savings", value: 180, suffix: "K" },
      { label: "Cost Reduction", value: 43, suffix: "%" },
      { label: "Performance Gain", value: 18, suffix: "%" }
    ]
  },
  {
    id: 7,
    title: "Root Cause Engine",
    category: "MIRSA",
    tag: "MIRSA",
    tagColor: "bg-blue-500",
    color: "from-orange-400 to-amber-600",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "AI-powered root cause analysis engine that correlates crashes, ANRs, CI failures, and deploy logs — pinpointing the exact commit or config change that broke production.",
    metrics: ["Root cause in 2min", "Correlates 8 sources", "Zero manual triage"],
    client: "React Native App",
    duration: "4 Months",
    role: "Core ML & System Engineers",
    challenge: "Debugging production crashes in a complex hybrid mobile application was a tedious task. Software engineers had to correlate telemetry from crash reports, continuous integration logs, container metrics, and code repositories to find the cause of a bug, slowing down critical hotfixes.",
    solution: "We engineered a centralized Root Cause Engine. Using machine learning semantic matching, the engine ingests real-time exceptions and cross-references them against recent code modifications, environmental configurations, and microservice status. It provides a visual line-by-line breakdown of the issue.",
    solutionSteps: [
      { title: "Log Ingestion Hub", desc: "Created unified queues to process data feeds from Datadog, Sentry, and GitHub APIs." },
      { title: "ML Commits Map", desc: "Configured text embedding models to map stack traces to code commits and commit summaries." },
      { title: "Visual Root UI", desc: "Designed an interactive timeline detailing the actions that led up to the outage." }
    ],
    impact: "Reduced the time needed to identify the root cause of high-priority issues from hours to under 2 minutes. The system has automatically triaged thousands of incidents, eliminating manual tracking efforts.",
    techStack: ["React Native", "FastAPI", "Python", "Elasticsearch", "Sentry API", "GitHub Webhooks"],
    stats: [
      { label: "Resolution Time", value: 2, suffix: "m" },
      { label: "Data Streams", value: 8, suffix: "" },
      { label: "Manual Triage", value: 0, suffix: "%" }
    ]
  },
  {
    id: 8,
    title: "GCC Setup Support",
    category: "Foundry",
    tag: "Foundry",
    tagColor: "bg-purple-500",
    color: "from-green-400 to-teal-600",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "End-to-end Global Capability Centre setup for a UK-based fintech — entity incorporation, talent acquisition (40 engineers), tooling, compliance, and go-live in 90 days.",
    metrics: ["40 engineers hired", "90-day go-live", "Full compliance"],
    client: "UK Fintech · Scale-up",
    duration: "3 Months",
    role: "Strategic Advisors & Operations Lead",
    challenge: "A fast-growing UK fintech company wanted to establish a Global Capability Centre (GCC) in India to accelerate their product development. Without local regulatory knowledge or hiring networks, they faced significant delay risks and regulatory hurdles.",
    solution: "We provided comprehensive GCC setup support, managing the entire project end-to-end. We handled regulatory filing, set up legal entities, built recruitment pipelines to hire 40 engineers, configured local networks and security infrastructure, and ensured full regulatory compliance.",
    solutionSteps: [
      { title: "Entity Registration", desc: "Handled incorporation, tax registration, and local banking compliance within 3 weeks." },
      { title: "Talent Acquisition", desc: "Constructed recruitment pipelines to filter, interview, and onboard 40 skilled engineers." },
      { title: "Operational Setup", desc: "Established secure networks, MDM device policies, and localized engineering environments." }
    ],
    impact: "Established the GCC and reached fully-operational status within a tight 90-day deadline. The client avoided regulatory setbacks and immediately began shipping product features from their new engineering center.",
    techStack: ["AWS VPN", "JumpCloud (MDM)", "Slack", "Jira", "Local Compliance frameworks"],
    stats: [
      { label: "Engineers Hired", value: 40, suffix: "" },
      { label: "Launch Window", value: 90, suffix: " days" },
      { label: "Compliance Score", value: 100, suffix: "%" }
    ]
  },
  {
    id: 9,
    title: "App Audit Engine",
    category: "MIRSA",
    tag: "MIRSA",
    tagColor: "bg-blue-500",
    color: "from-amber-400 to-orange-600",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Automated 360° app audit covering code quality, security vulnerabilities, ASO scores, store ratings, dependency risk, and performance benchmarks — delivered in minutes.",
    metrics: ["360° audit", "12 audit checks", "Report in 3 min"],
    client: "App Agency · 30+ apps",
    duration: "2 Months",
    role: "Security & QA Engineers",
    challenge: "An app development agency managing over 30 client projects struggled to consistently track quality, vulnerability, and store rankings. Performing manual security code reviews, performance profiles, and Store Optimization (ASO) checks took days per app.",
    solution: "We developed an automated App Audit Engine. It triggers code reviews, checks dependency licenses, scans for security flaws, pulls store metadata, and runs virtual performance tests. In under 3 minutes, it generates a comprehensive audit report with actionable steps.",
    solutionSteps: [
      { title: "Static Analyzer", desc: "Integrates SonarQube, MobSF, and dependency scanners to check source code." },
      { title: "Store Scraper", desc: "Pulls metrics, reviews, ratings, and ASO data from Google Play and Apple App Store." },
      { title: "Report Generator", desc: "Compiles the technical metrics into a beautifully structured, client-ready PDF report." }
    ],
    impact: "Replaced tedious manual audits with an automated 3-minute process, saving the team over 15 hours of work per project. The agency now provides quarterly health reports to client boards automatically, increasing renewal rates.",
    techStack: ["Node.js", "MobSF", "SonarQube", "Puppeteer", "Google Cloud Functions"],
    stats: [
      { label: "Audit Modules", value: 12, suffix: "" },
      { label: "Report Time", value: 3, suffix: "m" },
      { label: "Active Apps", value: 30, suffix: "+" }
    ]
  },
  {
    id: 10,
    title: "App Maintenance & Optimisation via MIRSA",
    category: "MIRSA",
    tag: "MIRSA",
    tagColor: "bg-blue-500",
    color: "from-teal-400 to-blue-600",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Ongoing app maintenance for a healthcare super-app — OS upgrades, dependency patching, crash reduction from 4.2% to 0.3%, and monthly health reports for the board.",
    metrics: ["4.2% → 0.3% crash", "Monthly reports", "HIPAA compliant"],
    client: "Healthcare App · 500K users",
    duration: "Ongoing Support",
    role: "Reliability & Maintenance Team",
    challenge: "A leading healthcare application faced user attrition due to stability issues. Crash rates were at 4.2%, and keeping up with OS updates (iOS/Android) and security patches while remaining HIPAA-compliant was overwhelming the internal dev team.",
    solution: "We deployed our MIRSA maintenance framework. This includes setting up automated crash tracking, scheduling routine library upgrades, implementing HIPAA-compliant secure storage, and monitoring performance across thousands of distinct mobile devices.",
    solutionSteps: [
      { title: "Crash Scrub", desc: "Analyzed error logs to identify and resolve major crashes and thread lock issues." },
      { title: "Security Upgrade", desc: "Updated database encryption protocols to ensure full compliance with healthcare regulations." },
      { title: "OS Compatibility", desc: "Established continuous pipeline checks on beta releases of Android and iOS." }
    ],
    impact: "Stability improved dramatically, with the crash rate dropping from 4.2% to an exceptional 0.3%. The internal development team was freed up to focus on product features, and the app received praise from users.",
    techStack: ["Swift", "Kotlin", "Firebase Crashlytics", "SQLCipher", "GitLab CI"],
    stats: [
      { label: "Crash Rate", value: 0.3, suffix: "%" },
      { label: "Active Users", value: 500, suffix: "K" },
      { label: "Security Audits Passed", value: 100, suffix: "%" }
    ]
  },
  {
    id: 11,
    title: "Performax Engine",
    category: "MIRSA",
    tag: "MIRSA",
    tagColor: "bg-blue-500",
    color: "from-red-400 to-pink-600",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Performance optimisation engine that profiles cold start times, memory leaks, and render cycles — reduced app startup time by 68% and eliminated 3 memory leaks.",
    metrics: ["68% faster start", "3 leaks fixed", "60fps UI"],
    client: "Consumer App · 2M DAU",
    duration: "3 Months",
    role: "Performance Specialists",
    challenge: "A widely-used consumer application was suffering from slow startup times (averaging 7.8 seconds). Users were abandoning the app on startup, and low-end devices experienced memory crashes during intensive scrolling.",
    solution: "We deployed the Performax Engine to diagnose bottlenecks. We refactored application startup sequences (deferring non-essential SDK initialization), optimized image caching strategies, and eliminated complex view hierarchies that caused excessive rendering cycles.",
    solutionSteps: [
      { title: "Startup Profiling", desc: "Identified and deferred blocking database reads and network queries on the main thread." },
      { title: "Memory Leak Hunt", desc: "Used advanced heap analyzers to find and resolve memory retain cycles." },
      { title: "Render Optimisation", desc: "Flattened layouts and introduced recycling view containers to maintain stable framerates." }
    ],
    impact: "Startup time was slashed by 68% (down to 2.5 seconds on low-end devices). The app achieved a stable 60 frames per second during scrolling, and user drop-off rates on launch plummeted by 80%.",
    techStack: ["React Native", "Android Profiler", "Xcode Instruments", "Redux", "Hermes Engine"],
    stats: [
      { label: "Startup Speedup", value: 68, suffix: "%" },
      { label: "Memory Leaks Fixed", value: 3, suffix: "" },
      { label: "Target Framerate", value: 60, suffix: " fps" }
    ]
  },
  {
    id: 12,
    title: "Cloud Cost Optimisation (Logistics)",
    category: "Foundry",
    tag: "Foundry",
    tagColor: "bg-purple-500",
    color: "from-blue-400 to-teal-600",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Multi-cloud cost governance across AWS and GCP for a logistics company — tagging strategy, reserved instance planning, and waste elimination saving $320K annually.",
    metrics: ["$320K saved", "Multi-cloud", "RI planning"],
    client: "Logistics · $50M revenue",
    duration: "4 Months",
    role: "FinOps & Cloud Architects",
    challenge: "A logistics company running services across both AWS and Google Cloud Platform had no centralized visibility into cloud spending. Development teams were launching un-tagged instances, and orphaned volumes and staging databases were running constantly, causing severe budget overruns.",
    solution: "We implemented a cloud cost governance framework. We enforced strict resource tagging, automated the teardown of idle resources, migrated data warehouses to query-efficient models, and negotiated multi-year Savings Plans and Reserved Instances.",
    solutionSteps: [
      { title: "Billing Analysis", desc: "Constructed comprehensive multi-cloud billing dashboards mapping costs to business units." },
      { title: "Automation Scrubber", desc: "Set up serverless scripts to automatically shut down staging instances outside business hours." },
      { title: "Capacity Rightsizing", desc: "Optimized database and container host resources to align with usage data." }
    ],
    impact: "Reduced annual cloud spend by over $320,000, bringing billing predictability back to finance. The governance systems now automatically prevent un-tagged resources from running, ensuring long-term efficiency.",
    techStack: ["AWS", "Google Cloud Platform", "Terraform", "FinOps tooling", "Python (Lambda)"],
    stats: [
      { label: "Annual Savings", value: 320, suffix: "K" },
      { label: "Waste Eliminated", value: 100, suffix: "%" },
      { label: "Billing Accuracy", value: 98, suffix: "%" }
    ]
  },
  {
    id: 13,
    title: "App Health Dashboard",
    category: "MIRSA",
    tag: "MIRSA",
    tagColor: "bg-blue-500",
    color: "from-cyan-400 to-indigo-600",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Unified real-time dashboard aggregating crash rates, store ratings, install velocity, revenue, CI status, and dependency risk into a single board for CPOs and CTOs.",
    metrics: ["10 data sources", "Real-time", "CPO & CTO ready"],
    client: "Multi-app Portfolio",
    duration: "3 Months",
    role: "Dashboard Engineers",
    challenge: "Executive leaders at an app portfolio company had to log into multiple platforms (Sentry, Play Console, App Store Connect, Stripe, GitHub) to understand the status and metrics of their products, leading to communication gaps and delayed decisions.",
    solution: "We engineered the App Health Dashboard. It aggregates telemetry from all these sources through secure APIs, providing a single visual interface that displays real-time crash rates, store ratings, transaction analytics, deployment pipelines, and dependency warnings.",
    solutionSteps: [
      { title: "API Aggregator", desc: "Constructed standard adapter layers to authenticate and query external metrics APIs." },
      { title: "Cache Management", desc: "Configured fast caching layers to handle high API query volumes without rate limits." },
      { title: "Responsive Interface", desc: "Designed a clean React dashboard optimized for web, tablet, and executive display monitors." }
    ],
    impact: "Executives now track metrics on a single screen. Incident awareness times dropped by 80% because telemetry is displayed directly alongside deployment pipelines, helping managers correlate updates with stability changes.",
    techStack: ["React", "Node.js", "Redis", "Tailwind CSS", "OAuth 2.0", "Charts.js"],
    stats: [
      { label: "Data Integrations", value: 10, suffix: "" },
      { label: "Awareness Speedup", value: 80, suffix: "%" },
      { label: "Active Admins", value: 15, suffix: "+" }
    ]
  },
  {
    id: 14,
    title: "Scalable React + Django Web Portal",
    category: "Foundry",
    tag: "Foundry",
    tagColor: "bg-purple-500",
    color: "from-purple-400 to-indigo-600",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Built a multi-tenant client portal using React 18 + Django REST Framework, handling 50K concurrent users with sub-200ms API responses and role-based access control.",
    metrics: ["50K concurrent", "<200ms API", "Multi-tenant RBAC"],
    client: "PropTech · Series A",
    duration: "5 Months",
    role: "Full Stack Team",
    challenge: "A fast-growing property technology startup had outgrown its PHP prototype portal. Frequent database locking and rigid layouts led to customer service delays and prevented them from onboarding larger corporate clients.",
    solution: "We designed a modern web application from scratch. We built a React frontend using a component-driven architecture and integrated it with a stateless Django REST API. We structured a PostgreSQL database with optimized indexes and implemented Redis caching to handle high traffic spikes.",
    solutionSteps: [
      { title: "Architecture Design", desc: "Designed a clean, decoupled frontend/backend system with secure JWT authentication." },
      { title: "Database Architecture", desc: "Implemented multi-tenant schema isolation to ensure complete tenant data security." },
      { title: "Caching Strategy", desc: "Configured Redis for database query caching and session state management." }
    ],
    impact: "The new system supports over 50,000 concurrent users without performance issues. Average API response times dropped below 200ms, and the modular security system allowed the client to onboard enterprise customers.",
    techStack: ["React", "Django", "PostgreSQL", "Redis", "Docker", "Nginx"],
    stats: [
      { label: "Concurrent Users", value: 50, suffix: "K" },
      { label: "API Latency", value: 200, suffix: "ms" },
      { label: "Security Rating", value: 100, suffix: "%" }
    ]
  },
  {
    id: 15,
    title: "UI/UX Design",
    category: "Foundry",
    tag: "Foundry",
    tagColor: "bg-purple-500",
    color: "from-pink-400 to-purple-600",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop"
    ],
    desc: "Complete design system for a fintech super-app — 400+ Figma components, accessibility-first (WCAG 2.1 AA), dark/light modes, and engineering handoff in Zeroheight.",
    metrics: ["400+ components", "WCAG 2.1 AA", "Dark + Light mode"],
    client: "Fintech Super-app",
    duration: "3 Months",
    role: "Product Designers",
    challenge: "The client was building a complex fintech super-app with multiple product offerings. Without unified design guidelines, different development teams created mismatched interfaces, resulting in a confusing user experience and slow front-end coding.",
    solution: "We designed a comprehensive, accessibility-first UI design system. We created over 400 interactive components in Figma (covering typography, colors, forms, cards, and states), verified compliance with WCAG 2.1 AA contrast standards, and set up clear design tokens for developers.",
    solutionSteps: [
      { title: "User Research", desc: "Conducted interviews and user journeys to map complex banking flows." },
      { title: "Component Creation", desc: "Designed modular UI components with built-in dark and light variants." },
      { title: "Token Handoff", desc: "Established automated handoff systems to export design variables straight to CSS/Tailwind configs." }
    ],
    impact: "Unified the user experience across all product features. Engineering handoff efficiency increased by 50% because frontend developers could reuse pre-defined Tailwind design tokens directly from our handoff tools.",
    techStack: ["Figma", "Zeroheight", "Tailwind CSS", "WCAG guidelines", "React Storybook"],
    stats: [
      { label: "Figma Components", value: 400, suffix: "+" },
      { label: "Accessibility Tier", value: 100, suffix: "%" },
      { label: "Handoff Acceleration", value: 50, suffix: "%" }
    ]
  }
];
