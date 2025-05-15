"use client";

import { useFiltersTableUserEnterpriseContext } from "@/context/enterprise/FiltersTableUserEnterpriseContext";
import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaArrowDownLong } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { RiMenu5Line } from "react-icons/ri";

import "./searchFilterEnterpriseGroups.css";

export function SearchFilterEnterpriseGroups() {
  return (
    <search className="searchFilterEnterpriseGroups">
      <CheckboxButtonFilterTable id="1" />
      <DateCreatedButtonFilterTable />
      <FiltersButtonFilterTable id="2" />
      <ExportButtonFilterTable id="3" />
      <MoveTrashButtonFilterTable />
    </search>
  );
}

export const CheckboxButtonFilterTable = ({ id }: { id: string }) => {
  const { openId, toggleOpen } = useFiltersTableUserEnterpriseContext();

  const isDropdownOpen = openId === id;

  return (
    <div onClick={() => toggleOpen(id)} className="checkboxButtonFilterTable">
      <label
        htmlFor="checkboxButtonFilterTable"
        className="filters-EnterpriseUser LabelFilterTableSelect"
      >
        <span>
          <IoIosArrowDown />
        </span>

        <input
          type="checkbox"
          id="checkboxButtonFilterTable"
          onClick={(e) => e.stopPropagation()}
        />
      </label>

      {isDropdownOpen && <DropdownCheckboxButtonFilterTable />}
    </div>
  );
};

export const OptionsCheckboxButtonFilterTable = [
  "Opción 1",
  "Opción 2",
  "Opción 3",
];

export const DropdownCheckboxButtonFilterTable = () => {
  return (
    <ul className="dropdownUlListFilters">
      {OptionsCheckboxButtonFilterTable.map((option, index) => (
        <li key={index} className="dropdownCheckboxButtonFilterTable--item">
          {option}
        </li>
      ))}
    </ul>
  );
};

export const MoveTrashButtonFilterTable = () => {
  return (
    <div>
      <button className="moveTrashButtonFilterTable">
        Move to Trash
      </button>
    </div>
  );
};

export const DateCreatedButtonFilterTable = () => {
  const [isAscending, setIsAscending] = useState(true);

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <div>
      <button className="dateCreatedButtonFilterTable" onClick={toggleOrder}>
        <BiMenuAltLeft />
        Date Create
        <FaArrowDownLong
          className={`dateCreated--icon ${
            isAscending ? "filter-asc-desc" : ""
          }`}
        />
      </button>
    </div>
  );
};

export const FiltersButtonFilterTable = ({ id }: { id: string }) => {
  const { openId, toggleOpen } = useFiltersTableUserEnterpriseContext();
  const isDropdownOpen = openId === id;

  return (
    <div
      className="checkboxButtonFilterTable"
      style={{ position: "relative" }}
      onClick={() => toggleOpen(id)}
    >
      <button className="">
        <RiMenu5Line />
        Filters
      </button>

      {isDropdownOpen && <DropdownFiltersButtonFilterTable />}
    </div>
  );
};

export const OptionsFiltersButtonFilterTable = [
  "Opción 1",
  "Opción 2",
  "Opción 3",
];

export const DropdownFiltersButtonFilterTable = () => {
  return (
    <ul className=" dropdownUlListFilters">
      {OptionsFiltersButtonFilterTable.map((option, index) => (
        <li key={index} className="dropdownFiltersButtonFilterTable--item">
          {option}
        </li>
      ))}
    </ul>
  );
};

export const ExportButtonFilterTable = ({ id }: { id: string }) => {
  const { openId, toggleOpen } = useFiltersTableUserEnterpriseContext();
  const isDropdownOpen = openId === id;

  return (
    <div
      onClick={() => {
        toggleOpen(id);
      }}
      className="checkboxButtonFilterTable"
    >
      <button className="exportButtonFilterTable">
        Export
        <IoIosArrowDown />
      </button>

      {isDropdownOpen && <DropdownExportButtonFilterTable />}
    </div>
  );
};

export const OptionsExportButtonFilterTable = ["csv", "json", "xml"];

export const DropdownExportButtonFilterTable = () => {
  return (
    <ul className=" dropdownUlListFilters">
      {OptionsExportButtonFilterTable.map((option, index) => (
        <li key={index} className="dropdownExportButtonFilterTable--item">
          {option}
        </li>
      ))}
    </ul>
  );
};
