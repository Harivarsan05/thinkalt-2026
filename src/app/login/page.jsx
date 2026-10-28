"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [activePreview, setActivePreview] = useState("Dashboard");

  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showConfigModal, setShowConfigModal] = useState(false);

  useEffect(() => {
    // Parse query errors
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    if (err) {
      if (err === "missing_config") {
        setErrorMsg("Google OAuth credentials are not fully configured in your .env or .env.local file. Please check the credentials setup.");
      } else if (err === "token_exchange_failed") {
        setErrorMsg("Failed to exchange authentication code with Google. The client secret or authorization code might be invalid.");
      } else if (err === "userinfo_failed") {
        setErrorMsg("Google authentication succeeded, but failed to retrieve user profile data from Google APIs.");
      } else {
        setErrorMsg(`Google authentication error: ${err}`);
      }
      // Clear url parameters without reloading
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }

    // Fetch active session
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setSession(data.user);
        }
        setLoadingSession(false);
      })
      .catch((err) => {
        console.error("Failed to load session:", err);
        setLoadingSession(false);
      });
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSession(null);
      }
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "";
  const scope = "openid email profile";
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(
    scope
  )}&access_type=offline&prompt=consent`;

  const handleGoogleClick = (e) => {
    e.preventDefault();
    window.location.href = "https://www.thethinkalternate.com/";
  };

  const previewData = {
    Dashboard: {
      title: "App Health Overview",
      subtitle: "KPI snapshot for your product team.",
      stats: [
        { label: "Total Installs", value: "10,960", trend: "+12%" },
        { label: "Monthly Active", value: "847", trend: "+8%" },
        { label: "ASO Score", value: "82", trend: "+5%" },
        { label: "Open Issues", value: "4", trend: "0" },
      ],
      overview: "A unified dashboard showing install growth, engagement, store performance and production issues so you can manage app health at a glance.",
    },
    "Sentiment Analysis": {
      title: "Sentiment Analysis",
      subtitle: "Understand user sentiment across reviews and feedback.",
      stats: [
        { label: "Positive", value: "74%", trend: "+3%" },
        { label: "Neutral", value: "18%", trend: "—" },
        { label: "Negative", value: "8%", trend: "-1%" },
      ],
      overview: "Track sentiment trends for app reviews and support tickets so your team can prioritize customer-facing fixes and feature improvements.",
    },
    Dependencies: {
      title: "Dependency Health",
      subtitle: "Manage packages, security, and version drift.",
      stats: [
        { label: "Updated", value: "62%", trend: "+7%" },
        { label: "Outdated", value: "12", trend: "-1" },
        { label: "Vulnerable", value: "3", trend: "-2" },
      ],
      overview: "Monitor open-source dependency status and security risks across Android, iOS and backend services to reduce technical debt.",
    },
    "Analytics Hub": {
      title: "Analytics Hub",
      subtitle: "User behaviour and conversion insights.",
      stats: [
        { label: "Sessions", value: "18.2K", trend: "+11%" },
        { label: "Retention", value: "38%", trend: "+2%" },
        { label: "Crash-Free", value: "99.3%", trend: "+0.4%" },
      ],
      overview: "Capture adoption, retention, and engagement metrics across app releases so engineering and product teams can measure impact.",
    },
    "ASO Audit": {
      title: "ASO Audit",
      subtitle: "Optimize store discoverability and metadata.",
      stats: [
        { label: "Keyword Rank", value: "Top 10", trend: "+4" },
        { label: "Conversion", value: "5.9%", trend: "+0.5" },
        { label: "Improvements", value: "14", trend: "-2" },
      ],
      overview: "Review app store metadata, keyword performance and listing conversions to improve search visibility and installs.",
    },
    GitHub: {
      title: "GitHub Activity",
      subtitle: "Engineering velocity and repo health.",
      stats: [
        { label: "Commits", value: "411", trend: "+6%" },
        { label: "Branches", value: "7", trend: "—" },
        { label: "Open PRs", value: "12", trend: "-1" },
      ],
      overview: "Inspect recent development activity, branch status and pull request throughput for full visibility into engineering delivery.",
    },
    "Play Store": {
      title: "Google Play Insights",
      subtitle: "Store listing, installs, reviews and ratings.",
      stats: [
        { label: "Installs", value: "10,960", trend: "+12%" },
        { label: "Rating", value: "4.5★", trend: "+0.1" },
        { label: "Reviews", value: "1.2K", trend: "+8%" },
      ],
      overview: "Track Play Store performance and user feedback to spot issues before they impact growth or retention.",
    },
    "App Store": {
      title: "Apple App Store",
      subtitle: "iOS listing and review performance.",
      stats: [
        { label: "Rating", value: "4.6★", trend: "+0.2" },
        { label: "Impressions", value: "24K", trend: "+10%" },
        { label: "Downloads", value: "6.7K", trend: "+4%" },
      ],
      overview: "Evaluate your iOS store presence, review quality and keyword performance with actionable app store signals.",
    },
    Firebase: {
      title: "Firebase Health",
      subtitle: "Crash, performance and user reports.",
      stats: [
        { label: "Crash-Free", value: "99.3%", trend: "+0.4%" },
        { label: "APIs", value: "12", trend: "-" },
        { label: "Alerts", value: "4", trend: "-1" },
      ],
      overview: "Monitor crash analytics, performance traces, and backend reliability using Firebase data to keep app quality high.",
    },
    "Other Audits": {
      title: "Other Audits",
      subtitle: "Security, accessibility, and compliance checks.",
      stats: [
        { label: "Security", value: "Pass", trend: "+" },
        { label: "Accessibility", value: "Good", trend: "+" },
        { label: "Compliance", value: "Ready", trend: "+" },
      ],
      overview: "Review additional audits across app security, accessibility and policy compliance to ensure launch readiness.",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen bg-[#f0f2f8] flex">
      {/* Left: Form */}
      <div className="flex flex-col w-full max-w-xl px-16 py-12">
        {/* Logo */}
        <div className="mb-6">
          <Link href="/">
            <img
              src="/Think-Alternate-logo (1).svg"
              alt="Think Alternate Logo"
              className="h-10 w-auto hover:opacity-80 transition cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900">Sign in to MIRSA</h1>
          <p className="mt-2 text-gray-500">One solution for all your app health</p>

          {errorMsg && (
            <div className="mt-6 flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 animate-fade-in">
              <svg className="w-5 h-5 shrink-0 text-red-500 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="font-semibold">Authentication Error</p>
                <p className="mt-0.5 text-xs text-red-600">{errorMsg}</p>
              </div>
            </div>
          )}

          {session ? (
            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/80 transition duration-300">
              <img
                src={session.picture}
                alt={session.name}
                className="w-20 h-20 rounded-full mx-auto border-4 border-violet-500/20 shadow-md"
              />
              <h2 className="text-2xl font-bold text-gray-900 mt-4">Welcome back, {session.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{session.email}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  href="/app-health-dashboard"
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-center hover:opacity-90 transition shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2"
                >
                  Go to Dashboard →
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex-1 py-4 px-6 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mt-10 space-y-4">
                {/* Email */}
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-4">
                  <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email Address"
                    className="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
                  />
                </div>

                {/* Password */}
                <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-4">
                  <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="w-full bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a10.05 10.05 0 011.875.175M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.364-3.364l-1.414 1.414" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 rounded border-gray-300" />
                    Remember me
                  </label>
                  <button type="button" className="text-sm text-blue-500 hover:text-blue-700 font-medium">
                    Forgot password?
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold text-base hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  Sign In →
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-sm text-gray-400">Or Continue with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.thethinkalternate.com/"
                    onClick={handleGoogleClick}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
                      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                      <path fill="#4CAF50" d="M24 44c5.2 0 10-1.9 13.6-5.1l-6.3-5.2C29.5 35.5 26.9 36 24 36c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.8 39.8 16.4 44 24 44z"/>
                      <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.4l6.3 5.2C41.3 35.2 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
                    </svg>
                    Google
                  </a>
                  <a
                    href="https://github.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </form>

              <p className="mt-8 text-sm text-gray-500 text-center">
                Don&apos;t have an account?{" "}
                <Link href="/login2" className="text-blue-500 hover:text-blue-700 font-medium">
                  Sign up for free
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right: Dashboard Preview */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[#eef0f8] p-12">
        <div className="rounded-2xl shadow-2xl overflow-hidden w-full max-w-2xl border border-white/60 bg-white">
          {/* Mock top bar */}
          <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 bg-white">
            <span className="font-bold text-gray-800 text-sm">∧ MIRSA</span>
            <div className="ml-4 flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1 text-xs text-gray-600">
              <img
                src="/images/daily_breath_logo.png"
                alt="DailyBreath Icon"
                className="w-5 h-5 rounded object-cover"
              />
              DailyBreath.MobileApp ▾
            </div>
          </div>
          <div className="flex">
            {/* Sidebar */}
            <div className="w-44 border-r border-gray-100 py-4 text-xs text-gray-500 space-y-1 shrink-0">
              {Object.keys(previewData).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActivePreview(item)}
                  className={`w-full text-left px-4 py-2 rounded-xl transition ${activePreview === item ? "bg-blue-600 text-white font-semibold" : "hover:bg-gray-50"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            {/* Content */}
            <div className="flex-1 p-5">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/images/daily_breath_logo.png"
                  alt="DailyBreath Icon"
                  className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100"
                />
                <div>
                  <p className="font-bold text-gray-900 text-sm">{previewData[activePreview].title}</p>
                  <p className="text-xs text-gray-400">{previewData[activePreview].subtitle}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded">Version: 10.07</span>
                    <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded">Category: Health & Fitness</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded">react-native: 100%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {previewData[activePreview].stats.map((stat) => (
                  <div key={stat.label} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
                    <div className={`w-7 h-7 rounded-lg ${stat.color} mb-2`} />
                    <p className="text-xs text-green-500 font-medium">{stat.trend}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                    <p className="text-[10px] text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="border border-gray-100 rounded-xl p-4 text-xs text-gray-500 mb-4">
                <p className="font-semibold text-gray-800 mb-2">Summary</p>
                <p>{previewData[activePreview].overview}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-100 rounded-xl p-4 text-xs text-gray-500">
                  <p className="font-semibold text-gray-800 mb-2">Development</p>
                  <p className="text-[10px]">Repository: DailyBreathForecast/DailyBreath.Mob</p>
                  <div className="flex gap-6 mt-2">
                    <div><p className="font-bold text-gray-900 text-base">411</p><p>Commits</p></div>
                    <div><p className="font-bold text-gray-900 text-base">7</p><p>Branches</p></div>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-4 text-xs text-gray-500">
                  <p className="font-semibold text-gray-800 mb-2">App Stores</p>
                  <p className="text-[10px] text-green-600">● Google Play Store</p>
                  <p className="text-[10px] mt-1">com.dailybreath</p>
                  <div className="mt-2 h-1.5 bg-green-400 rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>
          {/* Bottom text */}
          <div className="px-6 py-5 border-t border-gray-100">
            <p className="font-bold text-gray-900 text-sm">MIRSA: AI-Powered App Maintenance Platform</p>
            <p className="text-xs text-gray-500 mt-1">MIRSA's AI-powered audit runs 24/7. Get a technical + business-grade diagnosis of your mobile app — without writing a single line of code.</p>
          </div>
        </div>
      </div>
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-md p-4">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 max-w-xl w-full shadow-2xl relative">
            <button
              onClick={() => setShowConfigModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-3 text-amber-500 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900">Google OAuth Config Needed</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              To enable authenticating with Google, you need to configure your Google OAuth application credentials in the local environment configuration.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6 text-left">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Instructions</p>
              <ol className="list-decimal list-inside text-xs text-gray-600 space-y-2">
                <li>Go to the <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-blue-500 underline font-medium">Google Cloud Console</a>.</li>
                <li>Create or select a project, then go to <strong>APIs & Services &gt; Credentials</strong>.</li>
                <li>Create an <strong>OAuth client ID</strong> for a Web application.</li>
                <li>Add <code>http://localhost:3000/api/auth/google/callback</code> under <strong>Authorized redirect URIs</strong>.</li>
                <li>Create or open the <code>.env.local</code> file in your project root.</li>
                <li>Add the following keys (replacing with your details):</li>
              </ol>
              <pre className="mt-4 p-3 bg-gray-950 text-emerald-400 text-[11px] font-mono rounded-xl overflow-x-auto whitespace-pre">
{`NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback`}
              </pre>
            </div>
            <button
              onClick={() => setShowConfigModal(false)}
              className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
            >
              Got it, I'll configure it!
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
