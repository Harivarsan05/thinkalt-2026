"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import DarkNavbar from "../../../components/DarkNavbar";
import { blogArticles } from "../../../data/blogArticles";
import ArticleSchema from "../../../components/seo/ArticleSchema";
import BreadcrumbSchema from "../../../components/seo/BreadcrumbSchema";

const fontStyle = "'Inter', sans-serif";

/* ─── CODE COMPONENT WITH COPY ACTION ───────────────── */
function CodeViewer({ title, code, language }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 shadow-2xl">
      <div className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-rose-500" />
          <span className="w-3.5 h-3.5 rounded-full bg-amber-500" />
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
          <span className="ml-4 text-xs font-semibold text-gray-400 font-mono">{title || "source-code"}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition duration-150 py-1.5 px-3 rounded-lg hover:bg-white/5 active:bg-white/10"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              <span className="text-teal-400">Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125v-9.75A1.125 1.125 0 015 9.75h3.375m1.5 1.5h9.75a1.125 1.125 0 011.125 1.125v-9.75a1.125 1.125 0 00-1.125-1.125H10a1.125 1.125 0 00-1.125 1.125v9.75a1.125 1.125 0 001.125 1.125z" />
              </svg>
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <div className="p-6 overflow-x-auto max-h-[500px]">
        <pre className="text-sm leading-relaxed font-mono text-gray-200">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

/* ─── CUSTOM AWS SAVINGS CALCULATOR WIDGET ──────────── */
function AwsCalculatorWidget() {
  const [spend, setSpend] = useState(10000);

  // Savings variables
  const gravitonSavings = Math.round(spend * 0.12);
  const computeSavings = Math.round(spend * 0.15);
  const spotSavings = Math.round(spend * 0.10);
  const offhoursSavings = Math.round(spend * 0.06);
  const totalSavings = gravitonSavings + computeSavings + spotSavings + offhoursSavings;
  const optimizedSpend = spend - totalSavings;
  const percentageSaved = Math.round((totalSavings / spend) * 100);

  return (
    <div className="my-10 p-8 rounded-3xl bg-gray-950 text-white border border-orange-500/20 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 blur-[80px] pointer-events-none rounded-full" />

      <h3 className="text-xl md:text-2xl font-extrabold text-orange-400 mb-2">AWS FinOps Savings Calculator</h3>
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        Adjust your current monthly AWS spend using the slider below to simulate the exact cloud savings you would unlock applying our system architecture playbook.
      </p>

      {/* Slider & Input */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-gray-300">Current Monthly Spend ($)</label>
          <input
            type="number"
            aria-label="Current Monthly Spend in dollars"
            value={spend}
            onChange={(e) => setSpend(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-32 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-right text-orange-400 font-bold outline-none focus:border-orange-500 transition"
          />
        </div>
        <input
          type="range"
          aria-label="Monthly spend slider"
          min="1000"
          max="150000"
          step="500"
          value={spend}
          onChange={(e) => setSpend(parseInt(e.target.value))}
          className="w-full accent-orange-500 cursor-pointer"
        />
      </div>

      {/* Grid Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-t border-b border-gray-800/80 py-6">
        <div>
          <span className="text-xs uppercase font-bold text-gray-400 tracking-wider">Before FinOps</span>
          <p className="text-3xl font-extrabold text-gray-200 mt-2">${spend.toLocaleString()}<span className="text-sm text-gray-500">/mo</span></p>
          <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden mt-3 border border-gray-800">
            <div className="bg-red-500 h-full w-full" />
          </div>
        </div>
        <div>
          <span className="text-xs uppercase font-bold text-orange-400 tracking-wider">With ThinkAlternate Strategy</span>
          <p className="text-3xl font-extrabold text-orange-400 mt-2">${optimizedSpend.toLocaleString()}<span className="text-sm text-gray-500">/mo</span></p>
          <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden mt-3 border border-gray-800">
            <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${100 - percentageSaved}%` }} />
          </div>
        </div>
      </div>

      {/* Savings breakdown */}
      <h4 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-widest">Savings Breakdown Details</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/60 text-center">
          <p className="text-xs font-semibold text-gray-400">Graviton2 ARM</p>
          <p className="text-lg font-bold text-emerald-400 mt-1">${gravitonSavings.toLocaleString()}</p>
          <span className="text-[10px] text-gray-500">20% Price-Perf</span>
        </div>
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/60 text-center">
          <p className="text-xs font-semibold text-gray-400">Right-Sizing</p>
          <p className="text-lg font-bold text-emerald-400 mt-1">${computeSavings.toLocaleString()}</p>
          <span className="text-[10px] text-gray-500">Idle instance cuts</span>
        </div>
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/60 text-center">
          <p className="text-xs font-semibold text-gray-400">Spot Workers</p>
          <p className="text-lg font-bold text-emerald-400 mt-1">${spotSavings.toLocaleString()}</p>
          <span className="text-[10px] text-gray-500">Low-priority cues</span>
        </div>
        <div className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800/60 text-center">
          <p className="text-xs font-semibold text-gray-400">Off-Hours Stop</p>
          <p className="text-lg font-bold text-emerald-400 mt-1">${offhoursSavings.toLocaleString()}</p>
          <span className="text-[10px] text-gray-500">Shut down non-prod</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div>
          <p className="text-sm font-semibold text-gray-300">Estimated Annual Total Saved Runways</p>
          <p className="text-2xl font-extrabold text-orange-400 mt-1">${(totalSavings * 12).toLocaleString()}<span className="text-sm text-gray-500">/year</span></p>
        </div>
        <div className="px-5 py-2.5 rounded-full bg-orange-500 text-black text-sm font-bold shadow-lg shadow-orange-500/20 select-none">
          {percentageSaved}% Cost Slash
        </div>
      </div>
    </div>
  );
}

/* ─── CUSTOM INTERACTIVE RAG PIPELINE NODES WIDGET ──── */
function RagNodesWidget() {
  const [activeNode, setActiveNode] = useState(0);

  const nodes = [
    {
      step: "01",
      title: "Smart Chunking",
      subtitle: "Hierarchical Node Parsing",
      desc: "Instead of raw character splits which sever sentences, we parse documents into sections, sub-headings, and tables. Small sentences are indexed but mapped to their larger parent context.",
      code: `# Use LlamaIndex HierarchicalNodeParser
from llama_index.core.node_parser import HierarchicalNodeParser

node_parser = HierarchicalNodeParser.from_defaults(
    chunk_sizes=[2048, 512, 128]
)
nodes = node_parser.get_nodes_from_documents(documents)
`,
      pitfall: "Character-limit splits causing search tokens to fetch fragmented sentences.",
      solution: "Parent-Child relation index stores child vectors but returns parent nodes to LLM."
    },
    {
      step: "02",
      title: "Vector Search",
      subtitle: "Hybrid Keyword + Dense Query",
      desc: "Dense retrieval (vector embeddings) understands concepts but misses specific numbers, order IDs, or SKU labels. We merge vector matching with traditional BM25 keyword matching.",
      code: `# Hybrid SQL implementation in PostgreSQL pgvector
vector_query = "SELECT * FROM chunks ORDER BY embedding <=> $1 LIMIT 20;"
keyword_query = "SELECT * FROM chunks WHERE to_tsvector(text) @@ to_tsquery($2) LIMIT 20;"
# Union both datasets in the middleware and calculate reciprocal rank scores.
`,
      pitfall: "Searching 'Model XYZ-9000' fails in vector spaces due to token mismatch.",
      solution: "Union vector candidates and term matches before passing to re-rankers."
    },
    {
      step: "03",
      title: "Cohere Re-ranking",
      subtitle: "Contextual Squeezing",
      desc: "Feeding 20 search chunks directly to LLMs dilutes information and increases token cost. Cohere Rerank uses a cross-encoder model to select the top 3 items containing the precise answers.",
      code: `# Compress candidate documents using cross-encoders
reranked_results = cohere_client.rerank(
    model="rerank-english-v3.0",
    query=user_query,
    documents=candidate_texts,
    top_n=3
)
# Top 3 nodes contain 98% of relevant data points.
`,
      pitfall: "Feeding irrelevant background text which prompts the model to hallucinate.",
      solution: "Perform fine-grained cross-encoding comparison to discard noisy elements."
    },
    {
      step: "04",
      title: "Guardrails & Verification",
      subtitle: "Hallucination Blocks",
      desc: "We parse the response through NeMo Guardrails or llama-guard models. If the output references information not present in the retrieved chunks, it triggers a self-correction loop.",
      code: `# Guardrail check for factual alignment
from guardrails import Guard
from guardrails.hub import FactAgreement

guard = Guard().use(FactAgreement, threshold=0.8)
raw_response, validated_response, *rest = guard.parse(
    llm_output,
    metadata={"context": retrieved_context}
)
`,
      pitfall: "LLM outputting false metrics or answers not found in the original source data.",
      solution: "Validate facts dynamically in the ingestion layer before rendering."
    }
  ];

  return (
    <div className="my-10 p-8 rounded-3xl bg-gray-950 text-white border border-violet-500/20 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-violet-500/5 blur-[80px] pointer-events-none rounded-full" />
      
      <h3 className="text-xl md:text-2xl font-extrabold text-violet-400 mb-2">Interactive RAG Pipeline Explorer</h3>
      <p className="text-sm text-gray-400 mb-8 leading-relaxed">
        Click through the different components of a production-grade RAG architecture below to review the code implementation, primary failure modes, and best-practice solutions.
      </p>

      {/* Nodes Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {nodes.map((node, idx) => (
          <button
            key={idx}
            onClick={() => setActiveNode(idx)}
            className={`p-5 rounded-2xl text-left border cursor-pointer transition-all duration-300 relative overflow-hidden ${
              activeNode === idx
                ? `bg-violet-950/40 border-violet-500 shadow-xl shadow-violet-500/5`
                : `bg-gray-900/40 border-gray-800 hover:border-gray-700`
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeNode === idx ? "bg-violet-500 text-white" : "bg-gray-800 text-gray-400"
              }`}>
                Step {node.step}
              </span>
              {activeNode === idx && (
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              )}
            </div>
            <p className="font-bold text-sm text-gray-200 line-clamp-1">{node.title}</p>
            <p className="text-[11px] text-gray-500 mt-1 line-clamp-1">{node.subtitle}</p>
          </button>
        ))}
      </div>

      {/* Active Node Detail Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Details column */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">{nodes[activeNode].subtitle}</span>
              <h4 className="text-2xl font-extrabold text-white mt-1">{nodes[activeNode].title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed mt-4">{nodes[activeNode].desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                <span className="text-[10px] font-bold uppercase text-red-400 tracking-wider">Failure Mode</span>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">{nodes[activeNode].pitfall}</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/30">
                <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Engineering Solution</span>
                <p className="text-xs text-gray-300 mt-2 leading-relaxed">{nodes[activeNode].solution}</p>
              </div>
            </div>
          </div>

          {/* Code column */}
          <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-4 font-mono text-xs overflow-x-auto max-h-[300px]">
            <span className="text-[10px] font-semibold text-gray-500 uppercase block mb-3 border-b border-gray-800 pb-2">Implementation Snippet</span>
            <pre className="text-gray-300 whitespace-pre leading-relaxed">{nodes[activeNode].code}</pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── DYNAMIC BLOG PAGE ──────────────────────────────── */
export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const articleId = parseInt(params.id);
  const article = blogArticles.find((a) => a.id === articleId);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <DarkNavbar />
        <h2 className="text-3xl font-bold">Blog Article Not Found</h2>
        <p className="mt-4 text-gray-500">The article you are looking for does not exist or has been removed.</p>
        <Link href="/blogs" className="mt-8 px-6 py-3 rounded-full bg-teal-500 text-white font-semibold">
          Return to Blogs
        </Link>
      </div>
    );
  }

  // Related Articles Suggestion (3 items matching category or random)
  const related = blogArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans" style={{ fontFamily: fontStyle }}>
      <ArticleSchema article={article} />
      <BreadcrumbSchema items={[{ name: "Home", path: "/" }, { name: "Blogs", path: "/blogs" }, { name: article.title, path: `/blogs/${article.id}` }]} />
      <DarkNavbar />

      {/* Dynamic Category Color Progress Bar */}
      <div
        className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r ${article.color} z-[9999] origin-left transition-transform duration-75`}
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* Hero Banner Header */}
      <div className="relative min-h-[55vh] flex items-end justify-center overflow-hidden mt-16 pb-16">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-gray-900/20" />
        </div>

        {/* Backdrop soft accent lights */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-400/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-400/10 blur-[130px] pointer-events-none" />

        {/* Back Button */}
        <div className="absolute top-12 left-6 md:left-12 z-20">
          <button
            onClick={() => router.push("/blogs")}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/10 backdrop-blur transition-all duration-200"
          >
            ← Back to Blogs
          </button>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 w-full text-white">

          <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20 bg-white/10 backdrop-blur`}>
            {article.category}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl" style={{ color: "#ffffff" }}>
            {article.title}
          </h1>
          <div className="flex items-center gap-4 mt-6">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 shrink-0">
              <Image
                src={article.authorImg}
                alt={article.author}
                fill
                sizes="40px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-100">{article.author}</p>
              <p className="text-xs text-gray-400">{article.date} · {article.read}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Body */}
      <section className="py-16 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Content (Left Column) */}
          <div className="lg:col-span-2 space-y-10">

            {/* Highlights Takeaway Card */}
            {article.highlights && article.highlights.length > 0 && (
              <div className="p-8 rounded-3xl bg-teal-50 border border-teal-100/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-teal-400/5 blur-[40px] pointer-events-none" />
                <h3 className="text-lg font-bold text-teal-950 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Architectural Takeaways
                </h3>
                <ul className="space-y-3">
                  {article.highlights.map((item, index) => (
                    <li key={index} className="text-sm leading-relaxed text-teal-900 flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dynamic content parsing */}
            {article.sections && article.sections.map((section, idx) => {
              if (section.type === "text") {
                return (
                  <div key={idx} className="space-y-4">
                    {section.title && (
                      <h2 className="text-2xl font-extrabold text-gray-900 border-b pb-3 border-gray-100 mt-6">
                        {section.title}
                      </h2>
                    )}
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                );
              }

              if (section.type === "code") {
                return (
                  <div key={idx} className="space-y-4">
                    {section.title && (
                      <h3 className="text-xl font-bold text-gray-900 mt-6">{section.title}</h3>
                    )}
                    {section.content && (
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{section.content}</p>
                    )}
                    <CodeViewer code={section.code} title={section.title} language={section.language} />
                  </div>
                );
              }

              if (section.type === "highlight") {
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-gray-50 border border-gray-200/60 my-6">
                    {section.title && (
                      <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-2">{section.title}</h4>
                    )}
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                );
              }

              if (section.type === "widget") {
                if (section.widgetType === "aws-calculator") {
                  return <AwsCalculatorWidget key={idx} />;
                }
                if (section.widgetType === "rag-nodes") {
                  return <RagNodesWidget key={idx} />;
                }
              }

              return null;
            })}

            {/* Default content if sections missing (fallback for standard articles) */}
            {(!article.sections || article.sections.length === 0) && (
              <div className="space-y-6">
                <h2 className="text-2xl font-extrabold text-gray-900 border-b pb-3 border-gray-100">Overview</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {article.excerpt}
                </p>
                <p className="text-gray-600 text-base leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 my-6">
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-2">Key Recommendation</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Always audit code compatibility, deploy regression test pipelines inside isolated containers, and secure API credentials using environment secrets.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Project / Post Metadata (Right Column) */}
          <div className="space-y-8 lg:sticky lg:top-24 h-fit">
            
            {/* Quick Details Card */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 border-b pb-3 border-gray-200">Article Details</h3>
              
              <div>
                <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Written By</span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                    <Image
                      src={article.authorImg}
                      alt={article.author}
                      fill
                      sizes="32px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <p className="font-semibold text-gray-800">{article.author}</p>
                </div>
              </div>

              <div>
                <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Publish Date</span>
                <p className="font-semibold text-gray-800 mt-1">{article.date}</p>
              </div>

              <div>
                <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Read Time</span>
                <p className="font-semibold text-gray-800 mt-1">{article.read}</p>
              </div>

              <div>
                <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">Focus Topic</span>
                <p className="font-semibold text-gray-800 mt-1">{article.category}</p>
              </div>
            </div>

            {/* Tech Stack Tags Card */}
            {article.techStackTags && article.techStackTags.length > 0 && (
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-3 border-gray-200 mb-4">Focus Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {article.techStackTags.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-gray-200/80 text-gray-700 shadow-sm hover:border-teal-300 hover:text-teal-600 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Up Next / Related Articles */}
      <section className="bg-gray-50 py-20 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute -bottom-10 right-0 w-80 h-80 rounded-full bg-teal-400/5 blur-[80px]" />
        
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-600">Up Next</span>
            <h3 className="text-3xl font-extrabold text-gray-900 mt-2">Related Articles</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((post) => (
              <Link href={`/blogs/${post.id}`} key={post.id}>
                <div className="group bg-white border border-gray-200/60 hover:border-gray-200 rounded-2xl overflow-hidden shadow-sm cursor-pointer transition flex flex-col h-full hover:-translate-y-1.5 duration-200">
                  <div className="relative overflow-hidden h-36 w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      style={{ objectFit: "cover" }}
                      className="transition duration-300 group-hover:scale-105"
                    />
                    <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r ${post.color} text-white z-10`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-teal-600 transition leading-snug line-clamp-2">{post.title}</h4>
                    <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-3">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                        <Image
                          src={post.authorImg}
                          alt={post.author}
                          fill
                          sizes="24px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500">{post.author} · {post.read}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
