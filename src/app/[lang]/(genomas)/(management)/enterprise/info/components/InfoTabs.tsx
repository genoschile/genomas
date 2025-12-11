"use client";

import "./infoTabs.css";
import { FaUsers } from "react-icons/fa";
import { MdWorkspaces } from "react-icons/md";

type Tab = "users" | "workspaces";

type InfoTabsProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  usersCount?: number;
  workspacesCount?: number;
  projectsCount?: number;
};

export const InfoTabs = ({
  activeTab,
  onTabChange,
  usersCount = 0,
  workspacesCount = 0,
  projectsCount = 0,
}: InfoTabsProps) => {
  const tabs = [
    {
      id: "users" as Tab,
      icon: <FaUsers size={18} />,
      label: "Usuarios",
      count: usersCount,
    },
    {
      id: "workspaces" as Tab,
      icon: <MdWorkspaces size={20} />,
      label: "Workspaces & Proyectos",
      count: workspacesCount + projectsCount,
    },
  ];

  return (
    <div className="info-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`info-tab ${activeTab === tab.id ? "active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.icon}
          <span className="tab-label">{tab.label}</span>
          {tab.count > 0 && <span className="tab-badge">{tab.count}</span>}
        </button>
      ))}
    </div>
  );
};
