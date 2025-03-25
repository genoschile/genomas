"use client";
import { useState } from "react";
import { FaArrowDownLong } from "react-icons/fa6";
import { BiMenuAltLeft } from "react-icons/bi";
import { RiMenu5Line } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import "./searchFilterTable.css";

export function SearchFilterTable() {
  return (
    <search className="table-filters">
      <CheckboxButton />
      <DateCreatedButton />
      <FiltersButton />
      <ExportButton />
      <MoveTrashButton />
    </search>
  );
}

const CheckboxButton = () => {
  return (
    <label htmlFor="">
      <input type="checkbox" />
    </label>
  );
};

const MoveTrashButton = () => {
  return <button>Move to Trash</button>;
};

const DateCreatedButton = () => {
  const [isAscending, setIsAscending] = useState(true);

  const toggleOrder = () => {
    setIsAscending(!isAscending);
  };

  return (
    <button onClick={toggleOrder}>
      <BiMenuAltLeft />
      Date Create
      <FaArrowDownLong className={`${isAscending ? "hola" : ""}`} />
    </button>
  );
};

const FiltersButton = () => {
  return (
    <button>
      <RiMenu5Line />
      Filters
    </button>
  );
};

const ExportButton = () => {
  return (
    <button>
      Export
      <IoIosArrowDown />
    </button>
  );
};
