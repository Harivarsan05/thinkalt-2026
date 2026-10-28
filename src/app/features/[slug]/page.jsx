"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import DarkNavbar from "../../../components/DarkNavbar";

// Helper to format slug to a pretty title
const formatSlugToTitle = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Curated database of deep technical details for high-impact features
const featuresDatabase = {
  "high-performance-ui": {
    category: "Mobile Engineering",
    title: "High-Performance UI",
    tagline: "Buttery-smooth 60fps interfaces on any device.",
    accent: "#00CED1",
    colorRGB: "0,206,209",
    theme: "from-[#4682B4] to-[#00CED1]",
    desc: "We compile specialized UI layers utilizing Flutter Skia engines and React Native Reanimated 3 rendering frameworks, bypassing slow main thread bottlenecks to deliver flawless, sub-16ms screen renders.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
    stats: [
      { label: "Target Frame Rate", value: "60 fps stable" },
      { label: "Render Time Budget", value: "< 16.6ms" },
      { label: "Main Thread Usage", value: "Sub 5% load" },
      { label: "GPU Acceleration", value: "Enabled" }
    ],
    deepContent: {
      workflow: [
        { step: "01", title: "Establish Worklets", desc: "Offload UI calculations and complex layout layouts from the JS thread directly onto Javascript Worklets running on the UI thread." },
        { step: "02", title: "Compile Skia Shaders", desc: "Pre-compile custom Skia shaders to eliminate start-up glitches and image caching hiccups during screen transition paints." },
        { step: "03", title: "Optimize Re-renders", desc: "Implement shallow component comparison hooks to lock layout structures, preventing redundant layout calculations." }
      ],
      codeJS: `// React Native Reanimated 3 Animation Worklet
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export function AnimatedCard() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    'worklet'; // runs directly on UI compositor thread
    return {
      transform: [{ scale: withSpring(scale.value, { damping: 15 }) }]
    };
  });

  return (
    <GestureDetector onGesture={() => { scale.value = 1.05; }}>
      <Animated.View style={animatedStyle} />
    </GestureDetector>
  );
}`,
      codePY: `# Flutter Custom Compositor Paint (Dart Equivalent)
import 'package:flutter/material.dart';

class CustomGlowPainter extends CustomPainter {
  final double progress;
  CustomGlowPainter(this.progress);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.cyan.withOpacity(0.4)
      ..maskFilter = MaskFilter.blur(BlurStyle.normal, 28 * progress);
    canvas.drawCircle(Offset(size.width / 2, size.height / 2), 44, paint);
  }

  @override
  bool shouldRepaint(covariant CustomGlowPainter old) => old.progress != progress;
}`
    }
  },
  "offline-first-architecture": {
    category: "Mobile Architecture",
    title: "Offline-First Architecture",
    tagline: "Apps that work flawlessly with zero connectivity.",
    accent: "#00CED1",
    colorRGB: "0,206,209",
    theme: "from-[#4682B4] to-[#00CED1]",
    desc: "By integrating high-speed client-side local database engines (SQLite, WatermelonDB) and modular replication managers, your application persists all interactions locally and automatically syncs changes to the cloud when online.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    stats: [
      { label: "Local DB Queries", value: "< 2ms latency" },
      { label: "Storage Limit", value: "Device Max" },
      { label: "Conflict Overhead", value: "Zero (Automatic)" },
      { label: "Sync Payload", value: "Deltas Only" }
    ],
    deepContent: {
      workflow: [
        { step: "01", title: "Local-First Mutation", desc: "Write directly to the high-performance local SQLite database wrapper to execute transactions instantly with zero network dependencies." },
        { step: "02", title: "Queue Action Log", desc: "Maintain a lightweight transactional event queue on the local device, tracking all pending sync updates." },
        { step: "03", title: "Delta Synchronization", desc: "Send compact payload deltas over encrypted web sockets once network connectivity transitions back online." }
      ],
      codeJS: `// WatermelonDB Offline Mutation Flow
import { database } from './database';

export async function createOfflinePost(title, content) {
  await database.write(async () => {
    // Transaction runs in SQLite immediately
    await database.get('posts').create(post => {
      post.title = title;
      post.content = content;
      post.syncStatus = 'pending';
    });
  });
  // Trigger background replication sync queue
  ReplicationManager.triggerSync();
}`,
      codePY: `# Background Sync Delta Parser
def resolve_deltas(local_logs, remote_state):
    pending_actions = [log for log in local_logs if log['timestamp'] > remote_state['last_sync']]
    # Sort by timestamp to prevent transactional write race conditions
    pending_actions.sort(key=lambda x: x['timestamp'])
    
    conflict_free_payload = []
    for action in pending_actions:
        conflict_free_payload.append(action.to_delta_json())
    return conflict_free_payload`
    }
  },
  "react-server-components": {
    category: "Modern Web Stack",
    title: "React Server Components",
    tagline: "Zero client-side JS weight, rendering directly at the edge.",
    accent: "#38bdf8",
    colorRGB: "56,189,248",
    theme: "from-sky-400 to-teal-500",
    desc: "Leverage standard RSC conventions to request data directly on high-speed server environments. Keeps your client-side JavaScript bundle tiny, significantly reducing First Contentful Paint times.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    stats: [
      { label: "Client Bundle Size", value: "0 KB added" },
      { label: "Edge TTFB", value: "< 24ms" },
      { label: "Data Fetching Lag", value: "Sub 5ms local" },
      { label: "SEO Indexing", value: "Instantaneous" }
    ],
    deepContent: {
      workflow: [
        { step: "01", title: "Database Co-location", desc: "Execute heavy SQL queries inside components directly on edge databases, bypassing APIs entirely." },
        { step: "02", title: "Server-to-Client Stream", desc: "Stream pre-rendered HTML layouts over the wire, hydrating only interactive nodes dynamically." },
        { step: "03", title: "Parallel Resolvers", desc: "Initiate non-blocking server fetches simultaneously using React Suspense and Promise resolvers." }
      ],
      codeJS: `// Next.js React Server Component
import { db } from '@/lib/db';
import { Suspense } from 'react';

// Runs entirely on the server
export default async function ProductCatalog() {
  const products = await db.select().from('products').limit(10);
  
  return (
    <section>
      <h1>Catalog</h1>
      <div className="grid">
        {products.map(p => <ProductCard key={p.id} item={p} />)}
      </div>
    </section>
  );
}`,
      codePY: `# Python Edge Proxy Config (FastAPI Router)
from fastapi import FastAPI, Header
from fastapi.responses import HTMLResponse

app = FastAPI()

@app.get("/edge-layout", response_class=HTMLResponse)
async def serve_layout(accept: str = Header(None)):
    # Serve pre-compiled HTML components with streamed template parts
    return """
    <div id="rsc-root">
      <main class="grid-layout">
        <!-- Rendered at high-speed edge nodes -->
      </main>
    </div>
    """`
    }
  },
  "llm-integration": {
    category: "Artificial Intelligence",
    title: "LLM Integration",
    tagline: "Empower your workflows with structured AI models.",
    accent: "#8b5cf6",
    colorRGB: "139,92,246",
    theme: "from-violet-500 to-purple-600",
    desc: "Integrate state-of-the-art models like GPT-4o, Claude 3.5, and Gemini into your workflows, returning highly structured JSON responses and utilizing system tool calling loops.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1200&auto=format&fit=crop",
    stats: [
      { label: "Structured Accuracy", value: "99.8%" },
      { label: "Token Efficiency", value: "40% compression" },
      { label: "Inference Latency", value: "< 240ms" },
      { label: "Security Profile", value: "Isolated Context" }
    ],
    deepContent: {
      workflow: [
        { step: "01", title: "Schema Definition", desc: "Design rigid Zod schemas to guarantee models produce strictly-formatted JSON data envelopes." },
        { step: "02", title: "Tool Injection", desc: "Bind database APIs and external service calls directly to model schemas for autonomous query execution." },
        { step: "03", title: "Context Optimization", desc: "Implement semantic token caching to reuse systemic system instructions, reducing query overhead." }
      ],
      codeJS: `// Structured LLM Output using OpenAI SDK
import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const openai = new OpenAI();
const TaskSchema = z.object({
  analysis: z.string(),
  tags: z.array(z.string()),
  severity: z.enum(['low', 'high'])
});

export async function analyzeTicket(text) {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [{ role: "user", content: text }],
    response_format: zodResponseFormat(TaskSchema, "task"),
  });
  return completion.choices[0].message.parsed;
}`,
      codePY: `# Python LangChain/Structured Output Flow
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

class TicketAnalysis(BaseModel):
    analysis: str = Field(description="Summary of ticket issue")
    tags: list[str] = Field(description="Category tags")
    severity: str = Field(description="Priority rating")

def evaluate_ticket(text: str):
    llm = ChatOpenAI(model="gpt-4o", temperature=0)
    structured_llm = llm.with_structured_output(TicketAnalysis)
    return structured_llm.invoke(text)`
    }
  },
  "gitops-pipelines": {
    category: "DevOps & Infrastructure",
    title: "GitOps Pipelines",
    tagline: "Automated, declarative Git-driven deployments.",
    accent: "#ec4899",
    colorRGB: "236,72,153",
    theme: "from-pink-500 to-rose-500",
    desc: "Automate delivery and prevent system drift. Your source code repositories act as the single source of truth for cloud architecture, deployed safely through declarative GitOps loops (ArgoCD).",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    stats: [
      { label: "Deployment Duration", value: "< 3 minutes" },
      { label: "Rollback Trigger", value: "Instant (Git Revert)" },
      { label: "System Drift Guard", value: "Auto-remediation" },
      { label: "Audit Log Trail", value: "100% Immutable" }
    ],
    deepContent: {
      workflow: [
        { step: "01", title: "Declare Target State", desc: "Commit declarative YAML config templates versioning Kubernetes states directly into your infrastructure repository." },
        { step: "02", title: "Detect Out-of-Sync", desc: "Continuous reconciler loops compare your active Kubernetes nodes against the target repository config." },
        { step: "03", title: "Auto-Remediate Drift", desc: "Argocd immediately overrides any manual overrides, guaranteeing configurations never drift." }
      ],
      codeJS: `// ArgoCD Application Resource Spec (YAML representation in JS)
export const argoAppSpec = {
  apiVersion: "argoproj.io/v1alpha1",
  kind: "Application",
  metadata: { name: "thinkalternate-prod-app" },
  spec: {
    project: "default",
    source: {
      repoURL: "https://github.com/thinkalternate/infrastructure.git",
      targetRevision: "HEAD",
      path: "kubernetes/production"
    },
    destination: { server: "https://kubernetes.default.svc" },
    syncPolicy: {
      automated: { prune: true, selfHeal: true }
    }
  }
};`,
      codePY: `# Python script checking GitOps deployment signatures
import requests

def verify_deploy_sync(app_name: str, argocd_token: str):
    headers = {"Authorization": f"Bearer {argocd_token}"}
    url = f"https://argocd.thinkalternate.com/api/v1/applications/{app_name}"
    
    response = requests.get(url, headers=headers).json()
    sync_status = response['status']['sync']['status'] # Synced or OutOfSync
    health_status = response['status']['health']['status'] # Healthy
    
    return {"synced": sync_status == "Synced", "healthy": health_status == "Healthy"}`
    }
  },
  "security-auth": {
    category: "Mobile Security",
    title: "Security & Auth",
    tagline: "Ironclad biometrics, encrypted keychains, and secure JWT verification.",
    accent: "#38bdf8",
    colorRGB: "56,189,248",
    theme: "from-sky-400 to-indigo-500",
    desc: "Deploy native biometric safeguards (Face ID / Touch ID) integrated directly with Android Keystore & iOS Keychain using hardware-backed cryptography.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200&auto=format&fit=crop",
    stats: [
      { label: "Hardware Keys", value: "AES-256-GCM" },
      { label: "Biometric Latency", value: "< 140ms" },
      { label: "Keychain Isolation", value: "Sandbox locked" },
      { label: "Token Security", value: "Automated rotation" }
    ],
    deepContent: {
      workflow: [
        { step: "01", title: "Generate Secure Key", desc: "Provision hardware-backed key pairs inside the device's Secure Enclave on initial registration." },
        { step: "02", title: "Verify Biometrics", desc: "Execute local user verification checks, unlocking access to the hardware-isolated keystore." },
        { step: "03", title: "Sign Auth Payload", desc: "Sign ephemeral token payloads using the private key, ensuring requests cannot be intercepted." }
      ],
      codeJS: `// Expo Local Authentication Protocol
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export async function authenticateAndUnlock() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  if (!hasHardware) throw new Error('Hardware auth unavailable');
  
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Verify biometric profile'
  });
  
  if (result.success) {
    const token = await SecureStore.getItemAsync('session_token');
    return token; // Token fetched from encrypted keychain
  }
}`,
      codePY: `# Server-Side JWT Claims Verification
import jwt

def verify_session_token(token, public_key):
    try:
        payload = jwt.decode(token, public_key, algorithms=['RS256'])
        return {"valid": True, "identity": payload['sub']}
    except jwt.ExpiredSignatureError:
        return {"valid": False, "error": "session_expired"}
    except jwt.InvalidTokenError:
        return {"valid": False, "error": "invalid_signature"}`
    }
  },
  "ci-cd-store-delivery": {
    category: "Mobile Operations",
    title: "CI/CD & Store Delivery",
    tagline: "Ship native builds automatically from git commit to stores.",
    accent: "#ec4899",
    colorRGB: "236,72,153",
    theme: "from-pink-500 to-rose-500",
    desc: "Automate code signing, cert generation, beta testing submissions, and app store deployment. Save hours of dev time on every release.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    stats: [
      { label: "Build Delivery", value: "Sub 12 mins" },
      { label: "Manual Overhead", value: "0% automated" },
      { label: "Cert Management", value: "Auto-synced" },
      { label: "OTA Updates", value: "Immediate push" }
    ],
    deepContent: {
      workflow: [
        { step: "01", title: "Trigger Build", desc: "Detect pushes to production branches and automatically spin up virtual macOS builders." },
        { step: "02", title: "Cert Match & Sign", desc: "Fetch encrypted certificates automatically from storage and inject app signing signatures." },
        { step: "03", title: "Upload to Stores", desc: "Compile binaries (.ipa / .aab) and submit them directly to App Store Connect / Google Play Console." }
      ],
      codeJS: `// Fastlane Release Script (Ruby file represented in JS)
const fastlaneScript = \`
  desc "Submit a new beta build to TestFlight"
  lane :beta do
    setup_ci
    match(type: "appstore") # Sync certificates
    gym(scheme: "AlternateApp") # Build IPA binary
    upload_to_testflight(skip_waiting_to_process: true)
  end
\`;
console.log("Release Lane Initialized:", fastlaneScript);`,
      codePY: `# Python trigger script for GitHub Actions dispatch
import requests

def trigger_release_pipeline(github_token: str, ref: str = "main"):
    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }
    url = "https://api.github.com/repos/thinkalternate/app/actions/workflows/release.yml/dispatches"
    
    response = requests.post(url, headers=headers, json={"ref": ref})
    return response.status_code == 204`
    }
  }
};

// ── CUSTOM ANIMATED SVG SCHEMATIC ──────────────────
function TechnicalSchematic({ slug, colorRGB, accent }) {
  const renderGraphic = () => {
    switch (slug) {
      case "high-performance-ui":
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full">
            <defs>
              <linearGradient id="gpuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#105DA1" />
                <stop offset="100%" stopColor={accent} />
              </linearGradient>
            </defs>
            <rect x="15" y="25" width="110" height="50" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <text x="70" y="50" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">UI Thread</text>
            <text x="70" y="63" fill="rgba(255,255,255,0.4)" fontSize="7" textAnchor="middle">Compositing</text>

            <rect x="275" y="25" width="110" height="50" rx="10" fill="url(#gpuGrad)" fillOpacity="0.12" stroke={accent} strokeWidth="2" />
            <text x="330" y="50" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Skia GPU</text>
            <text x="330" y="63" fill={accent} fontSize="7" fontWeight="bold" textAnchor="middle">16.6ms Render</text>

            <rect x="145" y="135" width="110" height="50" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <text x="200" y="165" fill="rgba(255,255,255,0.8)" fontSize="10" fontWeight="bold" textAnchor="middle">JS Worklets</text>

            <path d="M 125 50 L 275 50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="5 5" />
            <path d="M 70 75 L 145 150" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <path d="M 255 150 L 330 75" stroke={accent} strokeWidth="2" />

            <circle r="4" fill={accent}>
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 255 150 L 330 75" />
            </circle>
          </svg>
        );
      case "offline-first-architecture":
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full">
            <rect x="25" y="75" width="100" height="60" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <text x="75" y="105" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">SQLite Local</text>
            <text x="75" y="118" fill="rgba(255,255,255,0.4)" fontSize="7" textAnchor="middle">Offline Queries</text>

            <rect x="275" y="75" width="100" height="60" rx="10" fill="rgba(0,206,209,0.1)" stroke={accent} strokeWidth="2" />
            <text x="325" y="105" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Sync Server</text>
            <text x="325" y="118" fill={accent} fontSize="7" fontWeight="bold" textAnchor="middle">Cloud Store</text>

            <path d="M 125 95 C 190 75, 210 75, 275 95" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <path d="M 275 115 C 210 135, 190 135, 125 115" fill="none" stroke={accent} strokeWidth="1.5" />

            <circle r="4.5" fill="#ffffff">
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M 125 95 C 190 75, 210 75, 275 95" />
            </circle>
            <circle r="4.5" fill={accent}>
              <animateMotion dur="2.8s" repeatCount="indefinite" path="M 275 115 C 210 135, 190 135, 125 115" />
            </circle>
          </svg>
        );
      case "react-server-components":
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full">
            <circle cx="55" cy="110" r="26" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <text x="55" y="114" fill="#ffffff" fontSize="9" textAnchor="middle">Browser</text>

            <rect x="155" y="50" width="90" height="120" rx="14" fill="rgba(56,189,248,0.1)" stroke={accent} strokeWidth="2" />
            <text x="200" y="105" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Edge Node</text>
            <text x="200" y="122" fill={accent} fontSize="7" fontWeight="bold" textAnchor="middle">RSC Render</text>

            <circle cx="345" cy="110" r="26" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <text x="345" y="114" fill="#ffffff" fontSize="9" textAnchor="middle">DB Query</text>

            <line x1="81" y1="110" x2="155" y2="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="245" y1="110" x2="319" y2="110" stroke={accent} strokeWidth="2" />

            <circle r="4" fill={accent}>
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 155 110 L 81 110" />
            </circle>
            <circle r="4" fill="#ffffff">
              <animateMotion dur="2.6s" repeatCount="indefinite" path="M 319 110 L 245 110" />
            </circle>
          </svg>
        );
      case "llm-integration":
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full">
            <rect x="15" y="85" width="85" height="50" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
            <text x="57" y="115" fill="#ffffff" fontSize="9" textAnchor="middle">User query</text>

            <circle cx="200" cy="110" r="38" fill="rgba(139,92,246,0.12)" stroke={accent} strokeWidth="2" />
            <text x="200" y="110" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">LLM Agent</text>
            <text x="200" y="125" fill={accent} fontSize="7" fontWeight="bold" textAnchor="middle">Structured</text>

            <rect x="300" y="85" width="85" height="50" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" />
            <text x="342" y="115" fill="#ffffff" fontSize="9" textAnchor="middle">JSON output</text>

            <path d="M 100 110 L 162 110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <path d="M 238 110 L 300 110" stroke={accent} strokeWidth="1.5" />

            <circle r="4" fill={accent}>
              <animateMotion dur="2s" repeatCount="indefinite" path="M 100 110 L 162 110" />
            </circle>
            <circle r="4" fill="#ffffff">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 238 110 L 300 110" />
            </circle>
          </svg>
        );
      case "gitops-pipelines":
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full">
            <rect x="20" y="80" width="90" height="60" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <text x="65" y="110" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Git Repo</text>
            <text x="65" y="123" fill="rgba(255,255,255,0.4)" fontSize="7" textAnchor="middle">Code Source</text>

            <rect x="290" y="80" width="90" height="60" rx="10" fill="rgba(236,72,153,0.1)" stroke={accent} strokeWidth="2" />
            <text x="335" y="110" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">K8s Cluster</text>
            <text x="335" y="123" fill={accent} fontSize="7" fontWeight="bold" textAnchor="middle">ArgoCD Sync</text>

            <path d="M 110 110 L 290 110" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />

            <circle r="4.5" fill={accent}>
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 110 110 L 290 110" />
            </circle>
          </svg>
        );
      case "security-auth":
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full">
            <circle cx="100" cy="110" r="35" fill="rgba(56,189,248,0.08)" stroke={accent} strokeWidth="2" strokeDasharray="3 3" />
            <rect x="85" y="100" width="30" height="22" rx="4" fill="rgba(255,255,255,0.1)" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M 91 100 L 91 90 C 91 82, 109 82, 109 90 L 109 100" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            
            <line x1="60" y1="75" x2="140" y2="75" stroke={accent} strokeWidth="2">
              <animate attributeName="y1" values="75;145;75" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="75;145;75" dur="3s" repeatCount="indefinite" />
            </line>
            
            <rect x="260" y="80" width="110" height="60" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <text x="315" y="110" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Secure Enclave</text>
            <text x="315" y="123" fill="rgba(255,255,255,0.4)" fontSize="7" textAnchor="middle">AES-256 Decrypt</text>

            <path d="M 140 110 L 260 110" stroke={accent} strokeWidth="2" />
            <circle r="4" fill={accent}>
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M 140 110 L 260 110" />
            </circle>
          </svg>
        );
      case "ci-cd-store-delivery":
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full">
            <circle cx="60" cy="110" r="24" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <text x="60" y="113" fill="#ffffff" fontSize="9" textAnchor="middle">Git Push</text>

            <rect x="155" y="75" width="90" height="70" rx="12" fill="rgba(236,72,153,0.1)" stroke={accent} strokeWidth="2" />
            <text x="200" y="108" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">macOS Build</text>
            <text x="200" y="121" fill={accent} fontSize="7" fontWeight="bold" textAnchor="middle">Fastlane Gym</text>

            <circle cx="340" cy="65" r="22" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" />
            <text x="340" y="68" fill="#ffffff" fontSize="8" textAnchor="middle">App Store</text>

            <circle cx="340" cy="155" r="22" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" />
            <text x="340" y="158" fill="#ffffff" fontSize="8" textAnchor="middle">Google Play</text>

            <line x1="84" y1="110" x2="155" y2="110" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <path d="M 245 110 L 318 65" stroke={accent} strokeWidth="2" />
            <path d="M 245 110 L 318 155" stroke={accent} strokeWidth="2" />

            <circle r="4" fill="#ffffff">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 84 110 L 155 110" />
            </circle>
            <circle r="4" fill={accent}>
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 245 110 L 318 65" />
            </circle>
            <circle r="4" fill={accent}>
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 245 110 L 318 155" />
            </circle>
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 400 220" className="w-full h-full">
            <rect x="30" y="40" width="90" height="140" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <circle cx="75" cy="75" r="8" fill={accent} />
            <circle cx="75" cy="135" r="8" fill={accent} opacity="0.4" />

            <circle cx="280" cy="65" r="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
            <circle cx="280" cy="155" r="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />

            <path d="M 120 75 L 260 65" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <path d="M 120 135 L 260 155" stroke={accent} strokeWidth="1.5" />
          </svg>
        );
    }
  };

  return (
    <div className="relative w-full h-[220px] bg-slate-950/40 border border-white/10 rounded-2xl p-4 shadow-xl overflow-hidden backdrop-blur-md flex items-center justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] rounded-full border border-white/5 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-white/5" />
      </div>
      <div className="relative z-10 w-full h-full">
        {renderGraphic()}
      </div>
    </div>
  );
}

export default function FeatureDetailPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const prettyTitle = formatSlugToTitle(slug);

  // Retrieve details or construct dynamically
  const feature = featuresDatabase[slug] || {
    category: "Product Capability",
    title: prettyTitle,
    tagline: "Pixel-perfect engineering, built for modern performance standards.",
    accent: "#00CED1",
    colorRGB: "0,206,209",
    theme: "from-[#4682B4] to-[#00CED1]",
    desc: `Detailed engineering deep-dive on ${prettyTitle}. Designed and maintained to deliver extreme performance, security, and integration workflows.`,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    stats: [
      { label: "Production SLA", value: "99.99%" },
      { label: "Delivery Speed", value: "Plug & Play" },
      { label: "Maintenance Easing", value: "Automated alerts" },
      { label: "Security Profile", value: "Enterprise Grade" }
    ],
    deepContent: {
      workflow: [
        { step: "01", title: "Requirement Architecture", desc: "Analyze application goals, technical constraints, data flows, and security profiles." },
        { step: "02", title: "Seamless Integration", desc: "Connect pre-optimized templates and API integrations directly to your repository pipeline." },
        { step: "03", title: "Performance Audits", desc: "Deploy testing frameworks to verify that performance baseline gates are maintained over code updates." }
      ],
      codeJS: `// Standard Integration Protocol
export function initializeFeature() {
  const featureManager = new PlatformFeatureManager({
    featureKey: "${slug}",
    logging: true,
    telemetry: 'edge'
  });
  
  featureManager.on('ready', () => {
    console.log('Alternate: Feature ready for traffic');
  });
  
  return featureManager.start();
}`,
      codePY: `# Python Integration Protocol
def initialize_feature():
    feature_manager = PlatformFeatureManager(
        feature_key="${slug}",
        logging=True,
        telemetry="edge"
    )
    return feature_manager.start()`
    }
  };

  // State to support language toggling inside mock code terminal
  const [activeLang, setActiveLang] = useState("js");

  // Simulated Telemetry Dashboard State
  const [activeMetric, setActiveMetric] = useState(85);
  const [activeConnections, setActiveConnections] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => Math.min(Math.max(prev + (Math.random() * 6 - 3), 60), 99));
      setActiveConnections((prev) => Math.min(Math.max(prev + Math.round(Math.random() * 10 - 5), 80), 200));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <DarkNavbar />

      {/* ══ HERO SECTION ══ */}
      <section className="relative overflow-hidden pt-36 pb-20 bg-slate-950 text-white">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-25 rounded-full"
            style={{ background: `radial-gradient(circle, ${feature.accent}, transparent 70%)`, filter: "blur(90px)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <span className={`inline-block px-3.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.22em] bg-gradient-to-r ${feature.theme} text-white mb-6`}>
              {feature.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6" style={{ color: "#ffffff" }}>
              {feature.title.split(" ").map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-2.5">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <p className="text-white/60 text-lg leading-8 max-w-xl mb-10">
              {feature.desc}
            </p>

            {/* Link back */}
            <div className="flex items-center gap-4">
              <Link href="/services" className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r ${feature.theme} text-white font-bold text-sm hover:scale-105 transition-transform duration-300`}>
                Deploy This Capability →
              </Link>
              <Link href="/services" className="text-white/45 hover:text-white/75 text-xs font-bold uppercase tracking-widest transition-colors">
                ← Services
              </Link>
            </div>
          </div>

          {/* Graphics Stack Column */}
          <div className="flex flex-col gap-6 w-full">
            {/* Technical Schematic Graphic */}
            <TechnicalSchematic slug={slug} colorRGB={feature.colorRGB} accent={feature.accent} />

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {feature.stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15 + i * 0.08 }}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition-colors duration-300"
                >
                  <p className="text-white/50 text-[10px] uppercase font-black tracking-widest mb-2">{stat.label}</p>
                  <p className="text-3xl font-black text-white" style={{ textShadow: `0 0 20px rgba(${feature.colorRGB}, 0.3)` }}>
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ TELEMETRY DASHBOARD SIMULATOR ══ */}
      <section className="bg-slate-900 border-y border-white/[0.07] py-20 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: feature.accent }}>
              Interactive Live Telemetry
            </span>
            <h2 className="text-3xl md:text-4xl font-black mt-2 text-white">Active Simulator Baselines</h2>
          </div>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            {/* Mock Dashboard Console */}
            <div className="bg-slate-950 border border-white/10 rounded-3xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono tracking-wider text-white/80">SERVICE_CONSOLE_INIT</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
              </div>

              {/* Live Chart Simulator */}
              <div className="h-64 flex items-end gap-1 px-4 border-b border-white/10 pb-2 relative">
                {/* Horizontal guide lines */}
                <div className="absolute inset-x-0 top-1/4 border-t border-white/[0.03] flex justify-between px-1 text-[8px] font-mono text-white/20"><span>90%</span><span>Critical Limit</span></div>
                <div className="absolute inset-x-0 top-1/2 border-t border-white/[0.03] flex justify-between px-1 text-[8px] font-mono text-white/20"><span>60%</span><span>Target Baseline</span></div>
                <div className="absolute inset-x-0 top-3/4 border-t border-white/[0.03] flex justify-between px-1 text-[8px] font-mono text-white/20"><span>30%</span><span>Load Buffer</span></div>

                {/* Vertical bars representing graph */}
                {Array.from({ length: 42 }).map((_, idx) => {
                  const factor = Math.sin(idx * 0.4) * 15 + activeMetric + (Math.random() * 8 - 4);
                  const clamped = Math.min(Math.max(factor, 20), 100);
                  const isHigh = clamped > 88;
                  
                  return (
                    <motion.div
                      key={idx}
                      className="w-full rounded-t-sm"
                      style={{
                        height: `${clamped}%`,
                        background: isHigh
                          ? `linear-gradient(to top, rgba(239, 68, 68, 0.4), rgb(239, 68, 68))`
                          : `linear-gradient(to top, rgba(${feature.colorRGB}, 0.2), ${feature.accent})`
                      }}
                      animate={{ height: `${clamped}%` }}
                      transition={{ duration: 0.8 }}
                    />
                  );
                })}
              </div>

              <div className="flex justify-between items-center mt-4 text-[10px] font-mono text-white/40">
                <span>0s ago (LIVE)</span>
                <span>Active Channels: {activeConnections} nodes</span>
                <span>-60s limit</span>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="flex flex-col justify-between gap-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="font-extrabold text-sm uppercase tracking-wider mb-2 text-white/50">Performance Load Monitor</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{activeMetric.toFixed(1)}%</span>
                  <span className="text-emerald-500 text-xs font-mono">▲ Stable</span>
                </div>
                <p className="text-white/40 text-xs mt-3 leading-5">Simulated real-time CPU main thread availability with active processing clusters.</p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="font-extrabold text-sm uppercase tracking-wider mb-2 text-white/50">Simulated Edge Connections</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black">{activeConnections}</span>
                  <span className="text-white/40 text-xs">nodes active</span>
                </div>
                <p className="text-white/40 text-xs mt-3 leading-5">WebSockets endpoint distribution across 12 container clusters worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ WORKFLOW AND CODE INTEGRATION ══ */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Step-by-step description */}
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] block mb-4" style={{ color: feature.accent }}>
            Implementation Blueprint
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-950 mb-10">How We Integrate It</h2>

          <div className="space-y-8">
            {feature.deepContent.workflow.map((item, i) => (
              <div key={i} className="flex gap-6">
                <span className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.theme} text-white font-bold flex items-center justify-center text-sm flex-shrink-0`}>
                  {item.step}
                </span>
                <div>
                  <h3 className="text-gray-950 font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-7">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Code Editor block with Language Tabs Switcher */}
        <div className="bg-slate-950 border border-white/10 rounded-3xl p-6 shadow-2xl text-white relative">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveLang("js")}
                className={`text-xs font-mono pb-1.5 border-b-2 transition ${activeLang === "js" ? "border-cyan-400 text-white font-bold" : "border-transparent text-white/40"}`}
              >
                index.js
              </button>
              <button
                onClick={() => setActiveLang("py")}
                className={`text-xs font-mono pb-1.5 border-b-2 transition ${activeLang === "py" ? "border-cyan-400 text-white font-bold" : "border-transparent text-white/40"}`}
              >
                main.py
              </button>
            </div>
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            </div>
          </div>
          <pre className="overflow-x-auto text-[11px] md:text-xs font-mono leading-6 text-cyan-400/90 p-2">
            <code className="text-white/90">{activeLang === "js" ? feature.deepContent.codeJS : feature.deepContent.codePY}</code>
          </pre>
        </div>
      </section>

      {/* ══ ATTRACTIVE CALL TO ACTION ══ */}
      <section className="bg-slate-950 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-15"
            style={{ background: `radial-gradient(circle, ${feature.accent}, transparent 70%)`, filter: "blur(90px)" }} />
        </div>
        <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 text-white">Boost your product's performance profile</h2>
          <p className="text-white/50 text-base leading-8 max-w-xl mx-auto mb-10">
            Let's evaluate your existing codebase. We'll set up automated telemetry baseline gates and eliminate all bottlenecks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login2" className={`inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r ${feature.theme} text-white font-bold text-sm hover:scale-105 transition-transform duration-300`}>
              Schedule Architecture Audit →
            </Link>
            <Link href="/services" className="text-white/40 hover:text-white/70 text-xs font-semibold uppercase tracking-widest transition-colors">
              Browse More Capabilities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
