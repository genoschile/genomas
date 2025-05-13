"use client";

import { FiCalendar } from "react-icons/fi";

import "./topBar.css";
import { GreetTopBar } from "@/components/enterprise/greetTopBar/GreetTopBar";
import { IconRoundedFull } from "@/components/enterprise/iconRoundedFull/IconRoundedFull";
import { Suspense } from "react";
import { ThemeSwitcher } from "@/components/enterprise/ThemeSwitcher/ThemeSwitcher";

export function TopBar() {
  return (
    <div className="topbar--enterprise">
      <div className="topbar-content">
        <Suspense fallback={<div>Loading...</div>}>
          <GreetTopBar />
        </Suspense>
        <div>
          <ThemeSwitcher />
          <IconRoundedFull icon={<FiCalendar />} />
        </div>
      </div>
    </div>
  );
}
