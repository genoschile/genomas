"use client";

import Link from "next/link";
import "./headerTabs.css";
import { usePathname } from "next/navigation";

export function HeaderTabs() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="header-analysis-tabs">
      <nav className="navigation">
        <Link
          href="/genomas/user/analysis"
          className={isActive("/genomas/user/analysis") ? "active" : ""}
        >
          Data
        </Link>
        <Link
          href="/genomas/user/analysis/history"
          className={isActive("/genomas/user/analysis/history") ? "active" : ""}
        >
          Job History
        </Link>
      </nav>
    </header>
  );
}
