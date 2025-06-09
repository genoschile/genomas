"use client";

import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import "./sidebarUser.css";
import HeaderSidebar from "./components/HeaderSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const path = "genomas/user";

import { MdFileUpload } from "react-icons/md";
import { AiOutlineExperiment } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";
import { GrConfigure } from "react-icons/gr";
import { IoDocumentOutline } from "react-icons/io5";

const sidebarItems = [
  {
    href: `/${path}/upload-files`,
    icon: <MdFileUpload size={32} className="sidebar__icon" />,
    text: "Upload Files",
  },
  {
    href: `/${path}/analysis`,
    icon: <IoDocumentOutline size={32} className="sidebar__icon" />,
    text: "Analysis",
  },
  {
    href: `/${path}/documents`,
    icon: <AiOutlineExperiment size={32} className="sidebar__icon" />,
    text: "Documents",
  },
  {
    href: `/${path}/summary`,
    icon: <VscGraphLine size={32} className="sidebar__icon" />,
    text: "Summary",
  },
  {
    href: `/${path}/configuration`,
    icon: <GrConfigure size={32} className="sidebar__icon" />,
    text: "Configuration",
  },
];

export const SidebarUser = ({ className = "" }: { className?: string }) => {
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
          const isActive = pathname.startsWith(item.href);

          return (
            <li key={index} className="sidebar__list--li">
              <Link
                href={item.href}
                data-text={item.text}
                className={`sidebar__element ${isActive ? "active" : ""}`}
                aria-label={item.text}
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
          aria-label="open/close sidebar"
        >
          <FaChevronRight />
        </button>
      </footer>
    </aside>
  );
};
