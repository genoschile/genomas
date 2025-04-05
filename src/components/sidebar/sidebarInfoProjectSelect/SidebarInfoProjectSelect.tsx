"use client";

import { MdArrowCircleLeft } from "react-icons/md";
import "./sidebarInfoProjectSelect.css";
import { useEffect, useRef, useState } from "react";
import { useProjectContext } from "@/hooks/useProjectContext";

export const SidebarInfoProjectSelect = () => {
  const { selectedCards } = useProjectContext();
  const [isOpen, setIsOpen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = (): void => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (selectedCards.length > 0) {
      setIsOpen(true);
    }
  }, [selectedCards]);

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar--infoProjectSelect ${isOpen ? "active" : ""}`}
    >
      <div>
        <button onClick={toggleSidebar}>
          <MdArrowCircleLeft />
        </button>

        {isOpen && (
          <div className="sidebar--content">
            <header>
              <h2>User with access</h2>
              <ul>
                <li>
                  <span>Usuario 1</span>
                </li>
                <li>
                  <span>Usuario 2</span>
                </li>
                <li>
                  <span>Usuario 3</span>
                </li>
              </ul>
              <div>
                <small>Created: {}</small>
                <small>Shared with : {}</small>
              </div>
              <button>Manage Access</button>
            </header>

            <hr />

            <section>
              <h2>Project Details</h2>

              <div>
                <h3>Type</h3>
                <p>{}</p>
              </div>

              <div>
                <h3>Owner</h3>
                <p>{}</p>
              </div>
              <div>
                <h3>Modified</h3>
                <p>{}</p>
              </div>
              <div>
                <h3>Opened</h3>
                <p>{}</p>
              </div>
              <div>
                <h3>Created</h3>
                <p>{}</p>
              </div>

              <fieldset>
                <legend>Description</legend>
                <label htmlFor="">
                  <input type="text" />
                </label>
              </fieldset>
            </section>
          </div>
        )}
      </div>
    </aside>
  );
};
