import { FiCommand, FiSearch } from "react-icons/fi";

export function Search() {
  return (
    <search>
      <FiSearch className="icon" />
      <input type="text" placeholder="Search" />

      <span>
        <FiCommand /> K
      </span>
    </search>
  );
}
