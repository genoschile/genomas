"use client";

import { SlOptionsVertical } from "react-icons/sl";
import "./projectCard.css";
import { FaFolder } from "react-icons/fa";

export const ProjectCard = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  return (
    <li className="project__list--card">
      <header>
        <button>
          <SlOptionsVertical />
        </button>
      </header>
      <figure>
        <FaFolder color="gray" size={"100"} className="project__list--icon" />
      </figure>
      <footer>
        <p>{name}</p>
      </footer>
    </li>
  );
};
