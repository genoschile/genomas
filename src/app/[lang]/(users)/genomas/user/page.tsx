"use client";

/* components */
import { ProjectCardList } from "@/components/project/ProjectCardList";
import { ProjectHeaderUser } from "@/components/project/ProjectHeaderUser";
import ProjectUserTable from "@/components/project/table/ProjectUserTable";
import { SidebarInfoProjectSelect } from "@/components/sidebar/sidebarInfoProjectSelect/SidebarInfoProjectSelect";

/* style */
import "./page.css";

/* hooks */
import { useProjectContext } from "@/hooks/useProjectContext";
import { FaTrashAlt } from "react-icons/fa";

export default function Page() {
  const { selectedCards } = useProjectContext();

  return (
    <>
      <article className="project__home--article">
        <div className="project__home--container">
          <ProjectHeaderUser />
          <section className="project__list--container">
            <ProjectCardList />
          </section>
        </div>
      </article>

      <article className="project__home--article">
        <div className="project__home--container">
          <TrashContainer />
        </div>
      </article>

      {selectedCards.length > 0 && <SidebarInfoProjectSelect />}
    </>
  );
}

export const HeaderTableTrash = [
  "Select",
  "File Name",
  "Original Location",
  "Date Deleted",
  "Size",
  "Date Eliminated",
  "Actions",
];

export const TrashContainer = () => {
  return (
    <div className="project__trash--container">
      <header className="project__trash--header">
        <div>
          <FaTrashAlt />
          <h2>Trash</h2>
        </div>
        <nav>
          <button>Restore selected</button>
          <button>Empty Trash</button>
        </nav>
      </header>

      <ul className="trash__table">
        <li className="trash__table--row trash__table--header">
          {HeaderTableTrash.map((header, index) => (
            <div key={index} className="trash__table--cell">
              {header}
            </div>
          ))}
        </li>

        <li className="trash__table--row">
          <label className="trash__table--cell" htmlFor="checkboxTrash">
            <input id="checkboxTrash" type="checkbox" />
          </label>
          <div className="trash__table--cell">report.docx</div> 
          <div className="trash__table--cell">/documents/reports</div>
          <div className="trash__table--cell">2025-06-01</div>
          <div className="trash__table--cell">1.2 MB</div>
          <div className="trash__table--cell">2025-06-08</div>
          <div className="trash__table--cell">
            <button>Restore</button>
            <button>Delete</button>
          </div>
        </li>
      </ul>
    </div>
  );
};
