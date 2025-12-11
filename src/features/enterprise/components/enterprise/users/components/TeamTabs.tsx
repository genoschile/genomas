"use client";

import "./teamTabs.css";
import { FaUsers } from "react-icons/fa";
import { MdGroups2 } from "react-icons/md";

type Tab = "users" | "groups";

type TeamTabsProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  usersCount?: number;
  groupsCount?: number;
};

export const TeamTabs = ({
  activeTab,
  onTabChange,
  usersCount = 0,
  groupsCount = 0,
}: TeamTabsProps) => {
  return (
    <div className="team-tabs">
      <button
        className={`team-tab ${activeTab === "users" ? "active" : ""}`}
        onClick={() => onTabChange("users")}
      >
        <FaUsers size={18} />
        <span>Usuarios</span>
        {usersCount > 0 && <span className="tab-badge">{usersCount}</span>}
      </button>

      <button
        className={`team-tab ${activeTab === "groups" ? "active" : ""}`}
        onClick={() => onTabChange("groups")}
      >
        <MdGroups2 size={20} />
        <span>Grupos</span>
        {groupsCount > 0 && <span className="tab-badge">{groupsCount}</span>}
      </button>
    </div>
  );
};
