"use client";

import { FaFolder } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";

export default function Page() {
  return (
    <>
      <article>
        <header>
          <h2>User Project</h2>
          <nav>
            <button>
              {" "}
              <IoIosAdd /> New
            </button>
            <button>Move To Trash</button>
          </nav>
        </header>

        <section className="project__list">
        </section>
      </article>

      <article></article>
    </>
  );
}

export const ProjectCard = () => {
  return (
    <div className="project__list--card">
      <button>
        <SlOptionsVertical />
      </button>
      <FaFolder />
      <p></p>
    </div>
  );
};
