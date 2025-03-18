"use client"

import { useState } from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import "./sidebarUser.css";

const SidebarUser = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      <header
        className="sidebar__header"
        data-expanded={isExpanded ? "true" : "false"}
      >
        {isExpanded ? (
          <>
            <button className="sidebar__header--button">
              <h4 className="sidebar__header-title">Karen's Workspace</h4>
              <FaChevronRight />
            </button>
          </>
        ) : (
          <FaHome className="sidebar__icon" />
        )}
      </header>

      <ul className="sidebar__list">
        <li className="sidebar__element">
          <TbApps className="sidebar__icon" />
          <div className="sidebar__hide">
            <p className="sidebar__text">Upload Files</p>
          </div>
        </li>
        <li className="sidebar__element">
          <TbApps className="sidebar__icon" />
          <div className="sidebar__hide">
            <p className="sidebar__text">Documents</p>
          </div>
        </li>
        <li className="sidebar__element">
          <TbApps className="sidebar__icon" />
          <div className="sidebar__hide">
            <p className="sidebar__text">Analysis</p>
          </div>
        </li>
        <li className="sidebar__element">
          <TbApps className="sidebar__icon" />
          <div className="sidebar__hide">
            <p className="sidebar__text">Summary</p>
          </div>
        </li>
        <li className="sidebar__element">
          <TbApps className="sidebar__icon" />
          <div className="sidebar__hide">
            <p className="sidebar__text">Configuration</p>
          </div>
        </li>
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
