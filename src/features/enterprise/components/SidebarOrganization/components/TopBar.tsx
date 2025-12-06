"use client";

import { FiCalendar } from "react-icons/fi";

import "./topBar.css";
import { GreetTopBar } from "@/features/enterprise/components/enterprise/greetTopBar/GreetTopBar";
import { IconRoundedFull } from "@/features/enterprise/components/enterprise/iconRoundedFull/IconRoundedFull";
import { Suspense } from "react";
import { ThemeSwitcher } from "@/features/theme/components/ThemeSwitcher/ThemeSwitcher";

export function TopBar({
  handleSetOpenSidebar,
}: {
  handleSetOpenSidebar: () => void;
}) {
  return (
    <div className="topbar--enterprise">
      <div className="topbar-content">
        <Suspense fallback={<div>Loading...</div>}>
          <GreetTopBar />
        </Suspense>
        <div>
          <ThemeSwitcher />
          <IconRoundedFull icon={<FiCalendar />} />
          <button
            className="sidebar-toggle icon-rounded-full"
            onClick={handleSetOpenSidebar}
            aria-label="Toggle sidebar"
            style={{
              border: "none",
            }}
          >
            ☰
          </button>
        </div>
      </div>
    </div>
  );
}
