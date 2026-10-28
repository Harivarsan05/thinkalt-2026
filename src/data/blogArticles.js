export const blogArticles = [
  {
    id: 1,
    title: "What Is Web Application Development? A Complete Guide for Businesses",
    category: "Mobile App Development",
    color: "from-orange-500 to-amber-400",
    image: "https://thinkalternate.com/wp-content/uploads/2026/03/Web-App-Development-840x560.jpg",
    author: "Vikram Sood",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    date: "Mar 15, 2026",
    read: "8 min read",
    excerpt: "Web application development is the process of designing, building, and deploying software that users access through a web browser over the internet. Unlike static websites, web applications process user input, store data, enforce business logic, and deliver dynamic, personalised experiences — without requiring any software installation.",
    techStackTags: ["AWS EC2", "Terraform", "ASG", "Compute Optimizer", "Spot Instances"],
    highlights: [
      "Swapped standard instances to Graviton2 (ARM64) for immediate 20% price-performance gain.",
      "Used AWS Compute Optimizer to identify 32 over-provisioned production workloads.",
      "Migrated non-critical worker queues and staging nodes to Spot Instances.",
      "Enforced automated off-hours shutdowns for all non-prod namespaces."
    ],
    sections: [
      {
        type: "text",
        title: "The Problem: Astronomical Idle Spend",
        content: "When we audited a Series-B logistics client, we discovered they were spending over $42,000 monthly on AWS. The core problem wasn't their software; it was their architecture configuration. Out of fear of CPU spikes during peak logistics tracking windows, their engineering team had set up static, large instances with average CPU utilization hovering at a mere 12%."
      },
      {
        type: "widget",
        title: "Interactive AWS Cost Savings Calculator",
        widgetType: "aws-calculator"
      },
      {
        type: "text",
        title: "Step 1: Identifying Idle Workloads with Compute Optimizer",
        content: "AWS Compute Optimizer leverages machine learning to analyze historical resource usage. We configured it across all regions and instantly uncovered 32 instances running at sizes twice what they actually needed. We systematically downscaled these instances in staging, verified memory footprints, and pushed changes to production using Terraform."
      },
      {
        type: "code",
        title: "Declaring Graviton2 Instance Types in Terraform",
        content: "Moving workloads from Intel-based instances (e.g. t3.large) to ARM-based Graviton2 (e.g. t4g.large) provides an immediate cost drop with superior raw performance. Here is the Terraform snippet we rolled out for our Auto Scaling Groups:",
        code: `resource "aws_launch_template" "app_nodes" {
  name_prefix   = "app-node-graviton2-"
  image_id      = data.aws_ami.optimized_graviton2.id
  instance_type = "t4g.large" # Graviton2 instance

  monitoring {
    enabled = true
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Environment = "production"
      Architecture = "arm64"
      CostCenter   = "logistics-core"
    }
  }
}`,
        language: "hcl"
      },
      {
        type: "text",
        title: "Step 2: Spot Instance Bidding for Worker Queues",
        content: "Background workers processing non-urgent tasks like invoice report compilation and route calculations are highly resilient. If an instance is reclaimed, the queue simply retries. We migrated 70% of these workloads to AWS Spot instances, bidding up to 60% of the on-demand price, leading to massive immediate savings."
      },
      {
        type: "highlight",
        title: "Key FinOps Metric Achieved",
        content: "By applying Graviton2 migrations, right-sizing via Compute Optimizer, and spot bidding, we shaved monthly spend from $42,000 to $23,940 in just 30 days. That is $216,720 in annualized runway returned straight to the company's ledger."
      }
    ]
  },
  {
    id: 2,
    title: "How to Reduce MVP Development Cost by 40% in 2026",
    category: "Mobile App Development",
    color: "from-violet-500 to-purple-600",
    image: "https://thinkalternate.com/wp-content/uploads/2026/03/How-to-Reduce-MVP-Development-Cost-by-40-percent-in-2026-840x560.jpg",
    author: "Divya Krishnamurthy",
    authorImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&crop=face",
    date: "Mar 15, 2026",
    read: "11 min read",
    excerpt: "Let's talk about something real. Creating an MVP, a Minimum Viable Product, which is simply the first version of your app or software, costs most founders more than it should. Not because the development is overpriced, but because most founders end up spending too much money on the wrong things, in the wrong order, at the wrong time.",
    techStackTags: ["LlamaIndex", "OpenAI API", "pgvector", "Cohere Re-rank", "FastAPI"],
    highlights: [
      "Hierarchical chunking prevents context fragmentation.",
      "Semantic re-ranking (via Cohere) filters out noise and lowers token counts.",
      "Hallucination guardrails block invalid prompts before LLM invocation.",
      "Continuous prompt tracing detects vector database drifts."
    ],
    sections: [
      {
        type: "text",
        title: "The Mirage of the Notebook Demo",
        content: "It takes about 15 lines of Python code to set up a working vector search and LLM response pipeline. However, once you deploy that to thousands of users searching through real business PDFs, user satisfaction tanks. Queries get irrelevant context, hallucinations skyrocket, and LLM token costs spiralled out of control."
      },
      {
        type: "widget",
        title: "Interactive RAG Pipeline Node Explorer",
        widgetType: "rag-nodes"
      },
      {
        type: "text",
        title: "Step 1: Implementing Hierarchical Chunking",
        content: "Standard chunking cuts text at arbitrary character limits (e.g. 500 characters). This splits crucial sentences or structures in half. We moved to a Hierarchical Node parser: we split documents into larger sections, parse sub-points, and link them. The vector database searches the small chunks but feeds the larger parent context to the LLM."
      },
      {
        type: "code",
        title: "Performing Hybrid Search & Re-ranking in Python",
        content: "To filter out noise, we combine vector search (semantic) with BM25 (keyword search), and pass the top results through Cohere's re-ranking engine. This guarantees only high-relevance paragraphs are passed to GPT-4:",
        code: `from cohere import Client
import numpy as np

co = Client("your-api-key")

def search_and_rerank(query, vector_db, top_k=20, final_top_n=3):
    # 1. Fetch semantic and keyword candidates
    semantic_results = vector_db.vector_query(query, limit=top_k)
    keyword_results = vector_db.keyword_query(query, limit=top_k)
    
    # Merge unique documents
    candidates = list({doc.id: doc for doc in (semantic_results + keyword_results)}.values())
    texts = [doc.text for doc in candidates]
    
    # 2. Re-rank utilizing Cohere Rerank
    rerank_response = co.rerank(
        model="rerank-english-v3.0",
        query=query,
        documents=texts,
        top_n=final_top_n
    )
    
    # 3. Compile high-relevance context
    final_docs = []
    for hit in rerank_response.results:
        final_docs.append(candidates[hit.index])
    return final_docs`,
        language: "python"
      },
      {
        type: "text",
        title: "Step 2: Guardrails and Evals",
        content: "We deployed NeMo Guardrails to sanitize user input. If a user asks for recipes inside a corporate database portal, the guardrail rejects the request immediately. This alone decreased unnecessary LLM costs by 28% and eliminated brand safety risks."
      }
    ]
  },
  {
    id: 3,
    title: "UI vs UX in 2026: What’s the Difference and How AI Is Changing Both",
    category: "Mobile App Development",
    color: "from-cyan-500 to-teal-400",
    image: "https://thinkalternate.com/wp-content/uploads/2026/03/User-Interface-UX.jpg",
    author: "Nikhil Raj",
    authorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
    date: "Mar 15, 2026",
    read: "9 min read",
    excerpt: "They get used interchangeably all the time - in job listings, in client briefs, in team introductions. 'We need a UI/UX designer.' 'Can you do the UX for this?' 'The UI looks great but the UX needs work.' Most of the time, the people saying these things have a rough sense of what they mean.",
    techStackTags: ["React Native", "Flutter", "Dart", "TypeScript", "Performance Benchmarks"],
    highlights: [
      "React Native's Hermes engine closed the startup time gap completely.",
      "Flutter remains unmatched for custom high-fps visual animations.",
      "TypeScript ecosystem makes React Native highly preferable for web developers.",
      "Dart compilation provides robust compile-time security for enterprise grade apps."
    ],
    sections: [
      {
        type: "text",
        title: "The Landscape Shift in 2025",
        content: "For years, the debate was simple: Flutter had better performance, but React Native had better third-party web integration and standard developer ergonomics. In 2025, that clear divide has blurred. With React Native's New Architecture (TurboModules, Fabric renderer) and Flutter's Impeller graphics backend, both platforms have evolved into mature, powerful toolkits."
      },
      {
        type: "highlight",
        title: "Our Selection Matrix",
        content: "If your app is content-heavy, relies on web integrations, or is built by a team of React developers, choose **React Native**. If your app requires heavy graphic custom rendering, complex high-fps animations, or high offline processing, choose **Flutter**."
      },
      {
        type: "text",
        title: "Performance Benchmarking",
        content: "Under real-world conditions, memory consumption is slightly lower in Flutter due to its direct compilation to machine code. However, React Native's Hermes engine has reduced cold startup time by 50% compared to three years ago, bringing average load speeds to sub-1.5 seconds on mid-range Android devices."
      }
    ]
  },
  {
    id: 4,
    title: "App Development Cost in 2026: Complete Breakdown for Startups",
    category: "Mobile App Development",
    color: "from-emerald-400 to-teal-600",
    image: "https://thinkalternate.com/wp-content/uploads/2026/03/App-Development-Cost-in-2026-Complete-Breakdown-for-Startups-01-840x560.png",
    author: "Arjun Venkatesh",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    date: "Mar 15, 2026",
    read: "7 min read",
    excerpt: "If you're looking for app development costs in 2026, you're asking the right question at the right time. The app market is expected to grow to over $626 billion by 2030. And the stakes for app users - along with app prices — have never been higher. But the flip side is: AI-powered app development tools haven't only increased the prices; they've also accelerated the app creation process.",
    techStackTags: ["Fractional CTO", "Agile", "Engineering Culture", "Architecture", "Scaling"],
    highlights: [
      "Earn immediate credibility by fixing a small, high-visibility pain point in week 1.",
      "Avoid complete rewrites; optimize existing processes first.",
      "Set up solid, measurable developer loops and code review structures.",
      "Document everything, prepare the internal team to take over within 6 months."
    ],
    sections: [
      {
        type: "text",
        title: "The First 30 Days: Listen, Don't Preach",
        content: "Many external advisors make the mistake of recommending massive tools or complete architectural migrations in their first week. This alienates the existing development team. A successful fractional CTO starts by listening to the engineers, identifying operational bottlenecks, and solving simple deployment frustrations to build trust."
      },
      {
        type: "highlight",
        title: "CTO Focus Areas",
        content: "1. Security Audits: Verify database credentials are secure and access rights are restricted.\n2. CI/CD automation: Cut manual deployments to build momentum.\n3. Talent Assessment: Understand which engineers are key, and where organizational gaps lie."
      }
    ]
  },
  {
    id: 5,
    title: "How Much Does It Cost to Build a SaaS Application in 2026",
    category: "Mobile App Development",
    color: "from-blue-500 to-indigo-500",
    image: "https://thinkalternate.com/wp-content/uploads/2026/03/How-Much-Does-It-Cost-to-Build-a-SaaS-Application-in-2026.jpg",
    author: "Vikram Sood",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    date: "Mar 15, 2026",
    read: "10 min read",
    excerpt: "What nobody tells you when you Google this question is that the cost of creating a SaaS product isn’t actually about development. It’s about the decisions you make before you even hire a single developer that will either compress your budget or balloon it in ways that are very hard to reverse later. We’ve seen [...]",
    techStackTags: ["ArgoCD", "Kubernetes", "GitOps", "GitHub Actions", "Docker"],
    highlights: [
      "Ensures Git is the single source of truth for cluster state.",
      "Automates sync loops to eliminate manual configuration drifts.",
      "Provides single-command or automated rollback capabilities.",
      "Improves developers' velocity by eliminating direct kubectl access."
    ],
    sections: [
      {
        type: "text",
        title: "The Chaos of Direct Cluster Access",
        content: "Before GitOps, engineers ran custom kubectl commands directly from their laptops to debug and deploy. Nobody had a clear overview of what exact configurations were active in production. This led to persistent differences between staging and production, causing outages during standard updates."
      },
      {
        type: "code",
        title: "Sample ArgoCD Application Manifest",
        content: "To solve this, we declared the desired cluster state in a Git repository and configured ArgoCD to continuously sync the cluster state with Git. Here is an example of an application manifest:",
        code: `apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: logistics-web-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: 'https://github.com/thinkalternate/logistics-app-infra.git'
    targetRevision: HEAD
    path: k8s/production
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: core-apps
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`,
        language: "yaml"
      },
      {
        type: "text",
        title: "The Daily Release Results",
        content: "With this configuration, changes are committed to Git, reviewed via Pull Requests, and automatically synced to the cluster in 30 seconds. Release cycle times plummeted from 2 weeks to daily, and deployment failures are reverted instantly by merging a simple revert commit."
      }
    ]
  },
  {
    id: 6,
    title: "App Development Cost Calculator: How Accurate Are They?",
    category: "Mobile App Development",
    color: "from-pink-400 to-rose-500",
    image: "https://thinkalternate.com/wp-content/uploads/2026/03/App-Development-Cost-Calculator-How-Accurate-Are-They-840x560.jpg",
    author: "Sneha Pillai",
    authorImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face",
    date: "Mar 15, 2026",
    read: "6 min read",
    excerpt: "You’ve probably used one. You answered ten questions about your app — platform, features, complexity level — hit the button, and got a number back. Maybe $47,000. Maybe $112,000. It felt specific enough to take seriously, vague enough to be suspicious. So which is it? Is the calculator actually useful, or is it just a lead generation tool dressed up as a planning resource?",
    techStackTags: ["UI/UX", "Figma Tokens", "Design System", "Storybook", "Accessibility"],
    highlights: [
      "Created 400+ atomic and responsive components for clean scaling.",
      "Used Figma Tokens to link design updates directly with CSS variables.",
      "Achieved full WCAG 2.1 AA accessibility compliance across three themes.",
      "Reduced front-end component review times by 50% using Storybook."
    ],
    sections: [
      {
        type: "text",
        title: "Scale Requires Governance",
        content: "Designing interfaces for millions of users means consistency is no longer just aesthetic — it is functional. When we built this system, our goal was to eliminate duplicate styling and create a set of robust tokens that would allow designers and developers to speak the exact same language."
      },
      {
        type: "highlight",
        title: "Key Takeaway on Design Governance",
        content: "Never build components from scratch. Every visual component must derive from an atomic token. If a color or padding cannot be found in the token catalog, it should not exist in the codebase."
      }
    ]
  },
  {
    id: 7,
    title: "UI vs UX: What’s the Difference Between UI & UX Design?",
    category: "Mobile App Development",
    color: "from-teal-400 to-cyan-500",
    image: "https://thinkalternate.com/wp-content/uploads/2026/03/UI-vs-UX-think-alternate-840x560.png",
    author: "Rohan Desai",
    authorImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face",
    date: "Mar 15, 2026",
    read: "8 min read",
    excerpt: "If you’ve ever wondered about the difference between UI and UX with example, you’re not alone. Many people use these terms interchangeably. UI and UX have similar-sounding names; they often work together. However, they have entirely different definitions and purposes. For business owners, designers, developers, and even students considering a digital career, it is important [...]",
    techStackTags: ["Sentry", "Memory Profiling", "Swift", "Kotlin", "Crashlytics"],
    highlights: [
      "Set up automatic thread-lock profiling to trace background app freezes (ANRs).",
      "Used Xcode Instruments and LeakCanary to detect 14 high-impact memory retain cycles.",
      "Restructured large images cache handling to prevent Out-Of-Memory (OOM) crashes.",
      "Introduced error boundary components to handle UI failures gracefully."
    ],
    sections: [
      {
        type: "text",
        title: "The Bleeding Dashboard",
        content: "A healthcare app with 500K users was losing ground due to instability. Users experienced crashes during onboarding and critical consultation steps. Crash dashboards showed a staggering 4.2% daily crash rate. We were brought in to perform a deep-dive audit and stabilize the platform."
      },
      {
        type: "highlight",
        title: "Our Stabilisation Checklist",
        content: "- Tracked and categorized top 10 crash causes using Sentry logs.\n- Audited SDK initialization timings (deferred analytics libraries to non-blocking threads).\n- Wrapped third-party payment screens in secure error boundaries."
      },
      {
        type: "text",
        title: "The Resolution",
        content: "Over 90 days, we systematic patched leaking listeners and corrected database lockouts. The crash rate stabilized at 0.3%, driving user ratings back up and restoring trust."
      }
    ]
  },
  {
    id: 8,
    title: "Top Benefits of Hiring a Fractional CTO",
    category: "Mobile App Development",
    color: "from-blue-400 to-indigo-500",
    image: "https://thinkalternate.com/wp-content/uploads/2026/02/Top-Benefits-of-Hiring-a-Fractional-CTO-840x560.jpg",
    author: "Karan Mehta",
    authorImg: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=60&h=60&fit=crop&crop=face",
    date: "Mar 15, 2026",
    read: "7 min read",
    excerpt: "Startups and growing companies often face a familiar dilemma: they need strong technical leadership, but they’re not ready to hire a full-time Chief Technology Officer. The cost, commitment, and scope can feel overwhelming. That’s where a fractional CTO comes in. On a contract or part-time basis, a fractional CTO offers senior-level technology leadership. Companies receive [...]",
    techStackTags: ["Playwright", "Cypress", "CI/CD Pipeline", "Test Automation"],
    highlights: [
      "Began by mapping critical user checkout and authentication journeys.",
      "Avoided test flakiness by using data-test-id attributes on crucial selectors.",
      "Configured Playwright parallel execution on GitHub self-hosted runners.",
      "Added Slack reports with screenshots for any test failure in staging."
    ],
    sections: [
      {
        type: "text",
        title: "From 5 Days of Manual Testing to 4 Hours of Automation",
        content: "An EdTech company was releasing features once every two weeks because staging testing required days of tedious manual validation. Any hotfix took hours of regression checking. We set up an automated testing framework to release developers from manual validation."
      },
      {
        type: "code",
        title: "Sample Playwright Auth Test Script",
        content: "Here is the structure we used to automate user login. We mock non-essential network dependencies to speed up execution and prevent test flakiness:",
        code: `import { test, expect } from '@playwright/test';

test.describe('Authentication Flows', () => {
  test('User should login successfully with valid credentials', async ({ page }) => {
    // Intercept and mock third-party analytics calls
    await page.route('**/analytics-tracker/**', route => route.abort());

    await page.goto('/login');
    
    // Fill credentials using robust test ids
    await page.fill('[data-testid="email-input"]', 'test.user@thinkalternate.com');
    await page.fill('[data-testid="password-input"]', 'SuperSecurePass123!');
    
    await page.click('[data-testid="submit-button"]');
    
    // Verify successful routing and state
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-greeting"]')).toContainText('Hello, Test User');
  });
});`,
        language: "javascript"
      }
    ]
  },
  {
    id: 9,
    title: "Manual vs Automated Testing: Core Differences Explained",
    category: "Mobile App Development",
    color: "from-emerald-400 to-teal-600",
    image: "https://thinkalternate.com/wp-content/uploads/2026/02/Manual-Testing-vs-Automatic-Testing-840x560.jpg",
    author: "Arjun Venkatesh",
    authorImg: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    date: "Mar 15, 2026",
    read: "5 min read",
    excerpt: "Software testing is no longer a “nice to have.” It is a non-negotiable part of modern software development. Whether you’re building a banking app, an eCommerce store, or a SaaS platform, the question inevitably arises:",
    techStackTags: ["Compliance", "GCC Operations", "Fintech Scaling", "Talent Acquisition"],
    highlights: [
      "Incorporated legal entities and completed tax setups in under 3 weeks.",
      "Onboarded 40 engineers utilizing a streamlined technical test loop.",
      "Configured full workspace compliance and mobile device management (MDM) from day 1.",
      "Synchronized cultures using clear training workshops and unified Slack channels."
    ],
    sections: [
      {
        type: "text",
        title: "Establishing the GCC Foundation",
        content: "Setting up a Global Capability Centre is a major operation that typically takes six to nine months. We handled the compliance, office space design, recruiter pipelines, and hardware distribution to go-live in 90 days for a leading UK-based FinTech startup."
      }
    ]
  },
  {
    id: 10,
    title: "Difference Between Web Application and Website",
    category: "Mobile App Development",
    color: "from-violet-400 to-purple-600",
    image: "https://thinkalternate.com/wp-content/uploads/2026/02/Web-Application-Website-840x560.jpg",
    author: "Divya Krishnamurthy",
    authorImg: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=60&h=60&fit=crop&crop=face",
    date: "Mar 28, 2026",
    read: "9 min read",
    excerpt: "Confused about the Difference Between Web Application and Website? Here’s a clear, simple breakdown most people get wrong. Learn the key distinctions now.",
    techStackTags: ["AI Frameworks", "LangChain", "LlamaIndex", "Vector Indexing", "RAG Systems"],
    highlights: [
      "LangChain is best for complex multi-agent architectures and general tool use.",
      "LlamaIndex is highly optimized for complex search queries and tabular data indexing.",
      "Both frameworks now support fully-typed structures for Next.js endpoints.",
      "Using lightweight native connectors (e.g. pgvector-node) is often preferred for simple projects."
    ],
    sections: [
      {
        type: "text",
        title: "The Battle of RAG Libraries",
        content: "Selecting the wrong data ingestion framework can lead to major performance bottlenecks. We compared both libraries across a 50,000-page enterprise PDF dataset to see how they handled semantic query parsing and token overhead."
      }
    ]
  },
  {
    id: 11,
    title: "Next.js 15 App Router: Everything You Need to Know",
    category: "Web",
    color: "from-cyan-400 to-blue-500",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=700&auto=format&fit=crop",
    author: "Rohan Desai",
    authorImg: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face",
    date: "Apr 1, 2025",
    read: "12 min read",
    excerpt: "Server Components, Partial Prerendering, Turbopack stable — what's new and how we migrated 3 production apps to take advantage.",
    techStackTags: ["Next.js 15", "React 19", "Turbopack", "PPR", "Server Actions"],
    highlights: [
      "Server Actions are now fully production-ready and support seamless form state bindings.",
      "Partial Prerendering (PPR) combines static shell load speed with dynamic fetch APIs.",
      "Caching defaults are now 'no-store' for GET operations, eliminating unexpected stale states.",
      "Turbopack builds are up to 50% faster than standard webpack setups in large codebases."
    ],
    sections: [
      {
        type: "text",
        title: "A New Default for React Applications",
        content: "Next.js 15 and React 19 introduce massive DX enhancements. We migrated three large enterprise web portals to Next.js 15, reducing average build times and improving client core web vitals through optimized script loading."
      }
    ]
  },
  {
    id: 12,
    title: "The Hidden Cost of Technical Debt (and How to Quantify It)",
    category: "Mobile App Development",
    color: "from-orange-400 to-amber-500",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=700&auto=format&fit=crop",
    author: "Priya Nair",
    authorImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face",
    date: "Mar 25, 2025",
    read: "6 min read",
    excerpt: "We calculated that a client's legacy codebase was costing them $28K/month in developer productivity. Here's the formula.",
    techStackTags: ["Engineering Management", "Technical Debt", "FinOps", "Agile Metrics"],
    highlights: [
      "Calculated time wasted on debugging regression issues versus shipping new features.",
      "Mapped technical debt directly to developer attrition rates.",
      "Created a quantitative formula to present technical debt payload to finance boards.",
      "Structured a repayment plan allocating 20% of every sprint to refactoring."
    ],
    sections: [
      {
        type: "text",
        title: "Quantifying Refactoring to Non-Technical Stakeholders",
        content: "Getting approval to refactor code is notoriously difficult. Business managers often view refactoring as 'gold-plating'. We created a clear financial model demonstrating that developer output was being cut by 40% due to legacy monolith database bottlenecks."
      }
    ]
  },
  {
    id: 13,
    title: "Kubernetes Cost Optimisation: 7 Things Most Teams Miss",
    category: "Mobile App Development",
    color: "from-orange-400 to-pink-500",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=700&auto=format&fit=crop",
    author: "Vikram Sood",
    authorImg: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face",
    date: "Mar 18, 2025",
    read: "10 min read",
    excerpt: "Right-sizing nodes, idle namespace cleanup, VPA vs HPA, and the Goldilocks tool — our full K8s cost optimisation checklist.",
    techStackTags: ["Kubernetes", "AWS EKS", "Karpenter", "Resource Limits", "FinOps"],
    highlights: [
      "Enabled node auto-provisioning utilizing Karpenter instead of standard cluster autoscalers.",
      "Identified and terminated orphaned Persistent Volumes (PVs) left by deleted testing tasks.",
      "Set CPU/Memory requests to match the 95th percentile of actual historical usage.",
      "Enforced resource quotas inside namespaces to prevent budget leaks."
    ],
    sections: [
      {
        type: "text",
        title: "The Cost of Default Settings",
        content: "By default, Kubernetes pods run with no limits, allowing a single leaking container to hog the CPU of an entire cluster node. We deployed Karpenter and set up automated resource scrubbers to right-size host configurations dynamically."
      }
    ]
  },
  {
    id: 14,
    title: "Building a Mobile Banking App: Security First Architecture",
    category: "Mobile App Development",
    color: "from-emerald-400 to-teal-500",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=700&auto=format&fit=crop",
    author: "Nikhil Raj",
    authorImg: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
    date: "Mar 10, 2025",
    read: "8 min read",
    excerpt: "Biometric auth, certificate pinning, jailbreak detection, and RBI compliance checklist — the full security architecture we used for a neobank app.",
    techStackTags: ["Cybersecurity", "Mobile Security", "Biometrics", "Certificate Pinning", "Neobank Architecture"],
    highlights: [
      "Implemented hardware-backed secure storage keys (iOS Keychain, Android Keystore).",
      "Configured dynamic SSL certificate pinning using TrustKit.",
      "Added jailbreak, root, and emulator injection detection triggers.",
      "Enforced full transaction log masking to comply with RBI data storage regulations."
    ],
    sections: [
      {
        type: "text",
        title: "The High Stakes of FinTech Security",
        content: "When building financial systems, security cannot be an afterthought. We designed a multi-layered security layout to defend against reverse engineering, man-in-the-middle attacks, and local device compromise."
      }
    ]
  }
];
