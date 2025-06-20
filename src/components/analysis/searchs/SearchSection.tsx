"use client";

import { FaSearch } from "react-icons/fa";
import "./searchSection.css";

export const SearchSection = () => {
  return (
    <search className="search-analysis-section project__home--standardContainer">
      {/* Formulario de selección */}
      <form className="search-form" role="search">
        <input list="data-options" id="search-data" placeholder="Enter data" />
        <datalist id="data-options">
          <option value="Option 1" />
          <option value="Option 2" />
          <option value="Option 3" />
        </datalist>
      </form>

      {/* Formulario de búsqueda */}
      <form className="search-form " role="search">
        <div className="search-input-container">
          <FaSearch className="search-icon" />
          <input type="text" id="search-query" placeholder="Search" />
        </div>
        <button type="submit">Search</button>
      </form>
    </search>
  );
};
