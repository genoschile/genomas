"use client";

/* hooks */
import { useState } from "react";

/* components */
import HeaderSidebar from "./components/HeaderSidebar";
import Link from "next/link";

/* icons */
import { FaChevronRight } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { MdFileUpload } from "react-icons/md";
import { AiOutlineExperiment } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";
import { GrConfigure } from "react-icons/gr";
import { IoDocumentOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

/* styles */
import "./sidebarUser.css";

const path = "genomas/user";

const sidebarItems = [
  {
    href: `/${path}`,
    icon: <FaHome size={32} className="sidebar__icon" />,
    text: "Home",
  },
  {
    href: `/${path}/upload-files`,
    icon: <MdFileUpload size={32} className="sidebar__icon" />,
    text: "Upload Files",
  },
  {
    href: `/${path}/analysis`,
    icon: <IoDocumentOutline size={32} className="sidebar__icon" />,
    text: "Analysis",
    disabled: true,
  },
  {
    href: `/${path}/documents`,
    icon: <AiOutlineExperiment size={32} className="sidebar__icon" />,
    text: "Documents",
    disabled: true,
  },
  {
    href: `/${path}/summary`,
    icon: <VscGraphLine size={32} className="sidebar__icon" />,
    text: "Summary",
    disabled: true,
  },
  {
    href: `/${path}/configuration`,
    icon: <GrConfigure size={32} className="sidebar__icon" />,
    text: "Configuration",
    disabled: true,
  },
];

export const SidebarUser = ({ className = "" }: { className?: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (href !== `/${path}` && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : ""} ${className}`}>
      <HeaderSidebar isExpanded={isExpanded} />

      <ul className="sidebar__list">
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className={`sidebar__list--li ${item.disabled ? "disabled" : ""} ${
              item.disabled ? "disabled-link" : ""
            }`}
          >
            <Link
              href={item.href}
              data-text={item.text}
              className={`sidebar__element ${
                isActive(item.href) ? "active" : ""
              }`}
              aria-label={item.text}
            >
              {item.icon}
              <div className="sidebar__hide">
                <p className="sidebar__text">{item.text}</p>
              </div>
            </Link>
          </li>
        ))}
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
