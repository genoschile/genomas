"use client";

import { useFiltersTableUserEnterpriseContext } from "@/context/enterprise/FiltersTableUserEnterpriseContext";
import { useEffect, useRef, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaArrowDownLong } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { RiMenu5Line } from "react-icons/ri";
import { toast } from "react-toastify";

import "./searchFilterEnterpriseGroups.css";
import {
  Group,
  useGroupsContext,
} from "@/context/enterprise/GroupsEnterpriseContext";
import { routes } from "@/lib/api/routes";

export function SearchFilterEnterpriseGroups({
  onChangeDateCreateAscDesc,
  isAscending,
}: {
  onChangeDateCreateAscDesc: () => void;
  isAscending: boolean;
}) {
  return (
    <search className="searchFilterEnterpriseGroups">
      <CheckboxButtonFilterTable id="1" />
      <DateCreatedButtonFilterTable
        onChangeDateCreateAscDesc={onChangeDateCreateAscDesc}
        isAscending={isAscending}
      />
      <FiltersButtonFilterTable id="2" />
      <ExportButtonFilterTable id="3" />
      <MoveTrashButtonFilterTable />
    </search>
  );
}

export const CheckboxButtonFilterTable = ({ id }: { id: string }) => {
  const OptionsCheckboxButtonFilterTable = ["Opción 1", "Opción 2", "Opción 3"];

  const { groups, handleAddGroupSelected } = useGroupsContext();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={toggleDropdown}
      className="checkboxButtonFilterTable"
      style={{ position: "relative", display: "inline-block" }}
    >
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

      {isDropdownOpen && (
        <ul
          className="dropdownUlListFilters"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#fff",
            border: "1px solid #ccc",
            padding: "0.5rem",
            listStyle: "none",
            zIndex: 10,
          }}
        >
          {OptionsCheckboxButtonFilterTable.map((option, index) => (
            <li
              key={index}
              className="dropdownCheckboxButtonFilterTable--item"
              style={{ cursor: "pointer", padding: "4px 8px" }}
              onClick={(e) => {
                e.stopPropagation();
                if (index === 0) {
                  groups.forEach((group) => {
                    handleAddGroupSelected(group);
                  });
                }
              }}
            >
              {index === 0 ? "Select All" : option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const MoveTrashButtonFilterTable = () => {
  const { selectedGroups, deleteGroupIdFromContext } = useGroupsContext();

  const handleDeleteArrayGroups = async () => {
    if (selectedGroups.length === 0) return;

    const confirm = window.confirm(
      `Are you sure you want to delete ${selectedGroups.length} group(s)? This action cannot be undone.`
    );

    if (!confirm) return;

    await Promise.all(
      selectedGroups.map(async (group) => {
        try {
          const response = await fetch(
            routes.deleteGroupEnterprise(group.organizationId, group.id),
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            toast.error(
              `Error deleting group ${group.id}. Please try again later.`
            );
          }

          toast.success(`Group ${group.id} deleted successfully.`);
          // Remove group from context
          deleteGroupIdFromContext(group.id);
        } catch (error) {
          console.error(`Error deleting group ${group.id}:`, error);
        }
      })
    );
  };

  return (
    <div>
      <button
        onClick={handleDeleteArrayGroups}
        className="moveTrashButtonFilterTable"
        disabled={selectedGroups.length === 0}
      >
        Move to Trash
      </button>
    </div>
  );
};

export const DateCreatedButtonFilterTable = ({
  onChangeDateCreateAscDesc,
  isAscending,
}: {
  onChangeDateCreateAscDesc: () => void;
  isAscending: boolean;
}) => {
  return (
    <div>
      <button
        className="dateCreatedButtonFilterTable"
        onClick={onChangeDateCreateAscDesc}
      >
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { selectedGroups } = useGroupsContext();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const downloadFile = (data: string, filename: string, mimeType: string) => {
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    if (!selectedGroups.length) {
      toast.error("No groups selected for export.");
      return;
    }

    const csv = convertToCSV(selectedGroups);
    downloadFile(csv, "groups.csv", "text/csv");
    setIsOpen(false);

    toast.success("Groups exported successfully as CSV.");
  };

  const handleExportJson = () => {
    if (!selectedGroups.length) {
      toast.error("No groups selected for export.");
      return;
    }

    const json = JSON.stringify(selectedGroups, null, 2);
    downloadFile(json, "groups.json", "application/json");
    setIsOpen(false);
    toast.success("Groups exported successfully as JSON.");
  };

  const convertToCSV = (groups: Group[]): string => {
    if (groups.length === 0) return "";

    const headers = Object.keys(groups[0]);

    const rows = groups.map((group) =>
      headers
        .map((key) => {
          const value = (group as any)[key];
          if (Array.isArray(value)) return `"${value.join(",")}"`;
          if (typeof value === "string" && value.includes(",")) {
            return `"${value.replace(/"/g, '""')}"`; // Escapar comillas si hay
          }
          return `"${String(value ?? "")}"`;
        })
        .join(",")
    );

    return [headers.join(","), ...rows].join("\n");
  };

  return (
    <div ref={dropdownRef} className="checkboxButtonFilterTable">
      <button
        className="exportButtonFilterTable"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Export <IoIosArrowDown />
      </button>

      {isOpen && (
        <ul className="dropdownUlListFilters">
          <li>
            <button onClick={handleExportCsv}>Export as CSV</button>
          </li>
          <li>
            <button onClick={handleExportJson}>Export as JSON</button>
          </li>
        </ul>
      )}
    </div>
  );
};
