"use client";

import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import "./sidebarUser.css";
import HeaderSidebar from "./components/HeaderSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const path = "genomas/user";

const sidebarItems = [
  {
    href: `/${path}/upload-files`,
    icon: <TbApps className="sidebar__icon" />,
    text: "Upload Files",
  },
  {
    href: `/${path}/analysis`,
    icon: <TbApps className="sidebar__icon" />,
    text: "Analysis",
  },
  {
    href: `/${path}/documents`,
    icon: <TbApps className="sidebar__icon" />,
    text: "Documents",
  },
  {
    href: `/${path}/summary`,
    icon: <TbApps className="sidebar__icon" />,
    text: "Summary",
  },
  {
    href: `/${path}/configuration`,
    icon: <TbApps className="sidebar__icon" />,
    text: "Configuration",
  },
];

const SidebarUser = ({ className = "" }: { className?: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : ""} ${className}`}>
      <HeaderSidebar isExpanded={isExpanded} />

      <ul className="sidebar__list">
        {sidebarItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <li key={index} className="sidebar__list--li">
              <Link
                href={item.href} 
                data-text={item.text}
                className={`sidebar__element ${isActive ? "active" : ""}`}
              >
                {item.icon}
                <div className="sidebar__hide">
                  <p className="sidebar__text">{item.text}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <footer className="sidebar__footer">
        <button
          className={`sidebar__button ${isExpanded ? "rotate" : ""}`}
          onClick={toggleSidebar}
        >
          <FaChevronRight />
        </button>
      </footer>
    </aside>
  );
};

export default SidebarUser;
