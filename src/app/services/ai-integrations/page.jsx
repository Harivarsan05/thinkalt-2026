"use client";

import ServicePage from "../../../components/ServicePage";

const data = {
  id: "ai",
  title: "AI Integrations &\nProduct Intelligence",
  subtitle: "LLMs · RAG · Vision · Predictive Analytics",
  tagline: "Your product, now with a brain.",
  heroDesc: "We don't just add a chatbot. We deeply embed AI into your product workflows — automating decisions, surfacing insights, and creating experiences that feel like magic to your users.",
  heroImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1920&auto=format&fit=crop",
  color: "from-[#4682B4] to-[#00CED1]",
  colorRGB: "0,206,209",
  accent: "#00CED1",
  lightAccent: "#48D1CC",
  ctaHeading: "Let's make your product intelligent.",
  ctaDesc: "Book a free AI strategy call. We'll identify the highest-ROI AI use cases for your product, suggest the right models, and outline a 6-week integration roadmap.",
  stats: [
    { value: "35+", label: "AI Products Live", sub: "In production" },
    { value: "< 200ms", label: "RAG Latency", sub: "p95 inference" },
    { value: "92%", label: "Model Accuracy", sub: "Avg across projects" },
    { value: "10×", label: "Automation ROI", sub: "Measured outcomes" },
    { value: "5B+", label: "Tokens Processed", sub: "Monthly across clients" },
    { value: "48hrs", label: "PoC Delivery", sub: "Fastest prototype" },
  ],
  capabilities: [
    { icon: "🧠", title: "LLM Integration", desc: "GPT-4o, Claude 3.5 Sonnet, and Gemini Ultra integrations with structured output, function calling, tool use, and multi-modal (text + vision) pipelines.", tags: ["GPT-4o", "Claude 3.5", "Gemini"] },
    { icon: "📚", title: "RAG Pipelines", desc: "Production RAG systems with hybrid search (semantic + keyword), re-ranking, citation tracking, and hallucination mitigation — sub-200ms at scale.", tags: ["Pinecone", "pgvector", "Weaviate"] },
    { icon: "🔁", title: "Agentic Workflows", desc: "Multi-step autonomous agents with LangGraph — planning, tool use, memory, and reflection loops for complex business process automation.", tags: ["LangGraph", "AutoGen", "CrewAI"] },
    { icon: "👁️", title: "Computer Vision", desc: "Document OCR, ID verification, defect detection, object tracking, and image classification pipelines deployed as real-time or batch APIs.", tags: ["AWS Rekognition", "Roboflow", "OpenCV"] },
    { icon: "💬", title: "Conversational AI", desc: "Multi-turn NLP chatbots with intent detection, entity extraction, context management, escalation logic, and human handoff for support automation.", tags: ["Dialogflow", "Rasa", "OpenAI Assistants"] },
    { icon: "📉", title: "Predictive Analytics", desc: "Churn prediction, revenue forecasting, anomaly detection, and recommendation engines built on your data and served through low-latency APIs.", tags: ["scikit-learn", "XGBoost", "Prophet"] },
    { icon: "🔧", title: "Fine-Tuning & Alignment", desc: "Domain-specific model fine-tuning with RLHF/DPO, instruction tuning on proprietary datasets, and red-team evaluation before production deployment.", tags: ["LoRA", "QLoRA", "DPO"] },
    { icon: "🛡️", title: "AI Safety & Guardrails", desc: "Input/output guardrails, PII redaction, prompt injection detection, content moderation, and cost-control token budgeting for production AI systems.", tags: ["Guardrails AI", "LlamaGuard", "Presidio"] },
  ],
  process: [
    { step: "01", title: "Data Audit", desc: "We assess your data quality, volume, and labelling — then map the highest-ROI AI use cases specific to your domain and user workflows.", duration: "3–5 days" },
    { step: "02", title: "Model Selection", desc: "Benchmark multiple models on your actual data — balancing accuracy, latency, cost, and privacy requirements before committing to a stack.", duration: "1 week" },
    { step: "03", title: "RAG / Fine-Tune", desc: "Build the knowledge base, embedding pipeline, retrieval layer, and (if needed) fine-tune a base model on your proprietary data.", duration: "2–4 weeks" },
    { step: "04", title: "API Integration", desc: "Wrap the AI capability in a production API — streaming responses, error handling, rate limiting, caching, and usage metering.", duration: "1–2 weeks" },
    { step: "05", title: "Evaluation & Red-team", desc: "Automated evaluation suites measuring accuracy, relevance, groundedness, and toxicity — plus adversarial red-teaming before launch.", duration: "1 week" },
    { step: "06", title: "Production Monitoring", desc: "Continuous drift detection, output quality sampling, cost dashboards, and model upgrade pipelines to keep your AI sharp over time.", duration: "Ongoing" },
  ],
  caseStudies: [
    { tag: "LegalTech", title: "Contract Review — 90% Time Saving", desc: "Built a RAG-powered contract review tool that extracts clauses, flags risks, and compares against playbook standards — cutting review time from 4 hours to 20 minutes.", results: ["90% review time saving", "< 200ms RAG latency", "GPT-4o + pgvector stack", "Deployed to 500 lawyers"], image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "E-Commerce", title: "AI Recommendations — 35% Revenue Lift", desc: "Personalised product recommendation engine using collaborative filtering and real-time embeddings — driving a 35% uplift in revenue per session.", results: ["35% revenue per session lift", "Real-time embedding updates", "< 50ms recommendation API", "A/B tested to 1M users"], image: "https://images.unsplash.com/photo-1561069934-eee225952461?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
    { tag: "HealthTech", title: "Clinical Notes AI — HIPAA Compliant", desc: "Ambient AI clinical documentation that transcribes doctor-patient conversations into structured SOAP notes, saving 2 hours per physician per day.", results: ["2hrs saved per physician/day", "HIPAA compliant pipeline", "95% transcription accuracy", "Deployed to 200 clinics"], image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=800&auto=format&fit=crop", color: "from-[#105DA1] to-[#00D4FF]" },
  ],
  techStack: [
    { category: "LLM Providers", items: ["OpenAI", "Anthropic", "Google Gemini", "Mistral"] },
    { category: "Frameworks", items: ["LangChain", "LangGraph", "LlamaIndex", "Haystack"] },
    { category: "Vector DBs", items: ["Pinecone", "pgvector", "Weaviate", "Chroma"] },
    { category: "ML / Training", items: ["PyTorch", "HuggingFace", "Axolotl", "Unsloth"] },
    { category: "Serving", items: ["FastAPI", "vLLM", "TGI", "Triton Server"] },
    { category: "Data / ETL", items: ["Airflow", "dbt", "Spark", "Pandas"] },
    { category: "Monitoring", items: ["LangSmith", "Arize AI", "Helicone", "Weights & Biases"] },
    { category: "Safety", items: ["Guardrails AI", "LlamaGuard", "Presidio"] },
  ],
  faqs: [
    { q: "How do you choose between RAG and fine-tuning?", a: "RAG is the default for most use cases — it's cheaper, updatable, and citable. Fine-tuning is reserved for style/format adaptation, highly specialised domains, or when latency demands on-device inference. We benchmark both on your data before recommending." },
    { q: "How do you handle data privacy with LLMs?", a: "We default to private deployment (Azure OpenAI, self-hosted models) for sensitive data, implement PII redaction before any prompt is sent, and can deploy fully air-gapped models for regulated industries." },
    { q: "What accuracy can we expect from a RAG system?", a: "With proper chunking, embedding model selection, hybrid retrieval, and re-ranking, we consistently achieve 88–95% answer relevance on domain-specific Q&A. We measure this with automated eval suites before launch." },
    { q: "How do you prevent hallucinations in production?", a: "Multi-layer mitigation: grounding every response in retrieved context, using structured output with citations, post-processing consistency checks, and sampling-based output quality monitoring in production." },
    { q: "Can you integrate AI into our existing product without rewriting it?", a: "Yes. We expose AI capabilities as microservices with clean APIs that your existing product calls. We handle the full AI layer — data ingestion, model serving, and response formatting — independently of your core stack." },
  ],
};

export default function Page() {
  return <ServicePage data={data} />;
}

