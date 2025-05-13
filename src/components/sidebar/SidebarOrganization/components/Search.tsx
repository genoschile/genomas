import { FiCommand, FiSearch } from "react-icons/fi";

import "./search.css";

export function Search() {
  return (
    <search className="sidebar-org--search">
      <FiSearch size={24} className="icon" />
      <input type="text" placeholder="Search" />

      <span>
        <FiCommand /> K
      </span>
    </search>
  );
}
