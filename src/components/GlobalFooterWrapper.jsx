"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("./Footer"), { ssr: false });

export default function GlobalFooterWrapper() {
  const pathname = usePathname();

  // Exclude routes that do not want a footer (e.g., login pages)
  const isExcluded =
    pathname === "/login" ||
    pathname === "/login2";

  if (isExcluded) {
    return null;
  }

  return <Footer />;
}
