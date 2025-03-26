"use client";
import { useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { BiMenuAltLeft } from "react-icons/bi";
import { RiMenu5Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";

/* style */
import "./searchFilterTable.css";

export function SearchFilterTable() {
  return (
    <search className="table-filters">
      <fieldset>
        <legend
          style={{
            display: "none",
          }}
        >
          Filtros table
        </legend>
        <CheckboxButtonFilterTable />
        <DateCreatedButtonFilterTable />
        <FiltersButtonFilterTable />
        <ExportButtonFilterTable />
        <MoveTrashButtonFilterTable />
      </fieldset>
    </search>
  );
}

export const CheckboxButtonFilterTable = () => {
  return (
    <label htmlFor="checkboxButtonFilterTable">
      <input type="checkbox" id="CheckboxButtonFilterTable" />
    </label>
  );
};

export const MoveTrashButtonFilterTable = () => {
  return <button className="moveTrashButtonFilterTable">Move to Trash</button>;
};

export const DateCreatedButtonFilterTable = () => {
  const [isAscending, setIsAscending] = useState(true);

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <button className="dateCreatedButtonFilterTable" onClick={toggleOrder}>
      <BiMenuAltLeft />
      Date Create
      <FaArrowDownLong
        className={`dateCreated--icon ${isAscending ? "filter-asc-desc" : ""}`}
      />
    </button>
  );
};

export const FiltersButtonFilterTable = () => {
  return (
    <button>
      <RiMenu5Line />
      Filters
    </button>
  );
};

export const ExportButtonFilterTable = () => {
  return (
    <button className="exportButtonFilterTable">
      Export
      <IoIosArrowDown />
    </button>
  );
};
