"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login2Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setPassword("");
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md mb-6">
        <Link href="/" className="group inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to homepage
        </Link>
      </div>

      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm">Welcome Back</p>
        <h1 className="mt-4 text-4xl font-extrabold text-white">Sign in to your account</h1>
        <p className="mt-3 text-slate-400">Access your ThinkAlternate dashboard.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium text-slate-200">
            Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-4 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-3xl bg-cyan-500 px-6 py-4 text-base font-semibold text-black transition hover:bg-cyan-400"
          >
            Sign In
          </button>
        </form>

        {submitted && (
          <p className="mt-6 rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-cyan-100">
            Signed in successfully!
          </p>
        )}

        <div className="mt-6 flex flex-col gap-2 text-sm text-slate-400">
          <span>
            Try the other login page:{" "}
            <Link href="/login" className="text-cyan-300 hover:text-cyan-100">
              MIRSA Login
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}
