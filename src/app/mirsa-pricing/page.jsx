"use client";
import Link from "next/link";
import DarkNavbar from "../../components/DarkNavbar";
import KenBurnsSlider from "../../components/KenBurnsSlider";
const slides = [
  { title: "MIRSA Pricing", badge: "Simple & Transparent", desc: "One platform. Every tool. No hidden fees. Pick the plan that fits your app portfolio.", image: "/projects/foundry.jpg", overlayFrom: "#105DA1", overlayTo: "#14b8a6", orbColor: "#14b8a6", stats: [{ value: "Free", label: "14-day trial" }, { value: "No SDK", label: "Required" }, { value: "Cancel", label: "Anytime" }], cta: "View Full Pricing", ctaHref: "/pricing" },
];
export default function MirsaPricingPage() {
  return (<div className="min-h-screen bg-[#f7fafa]"><DarkNavbar /><div className="mt-16"><KenBurnsSlider slides={slides} /></div>
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900">Ready to see full pricing?</h2>
      <p className="mt-4 text-gray-500">View all plans, engagement models and add-ons on our Pricing & Engagement page.</p>
      <Link href="/pricing" className="mt-8 inline-flex items-center gap-2 bg-[#105DA1] text-white font-bold px-8 py-4 rounded-full hover:bg-[#0e528e] transition">Go to Pricing & Engagement →</Link>
    </div>
  </div>);
}
