"use client"
import { useState } from "react";
import { SearchFilterTable } from "../searchs/SearchFilterTable";
import "./tableOutputFiles.css";
import { FaStar } from "react-icons/fa";

const headerTables = ["File", "Workflow"];

interface TableRow {
  nombrefile: string;
  workflow: string;
  idprocess: string;
  status: keyof typeof statusColors;
}

const statusColors: { [key: string]: string } = {
  done: "green",
  running: "orange",
  fail: "red",
  pending: "lightblue",
};

const tableData: TableRow[] = [
  {
    nombrefile: "Archivo_A.txt",
    workflow: "Proceso_1",
    idprocess: "PID-123",
    status: "done",
  },
  {
    nombrefile: "Archivo_B.pdf",
    workflow: "Proceso_2",
    idprocess: "PID-456",
    status: "running",
  },
  {
    nombrefile: "Archivo_C.csv",
    workflow: "Proceso_3",
    idprocess: "PID-789",
    status: "fail",
  },
  {
    nombrefile: "Archivo_D.csv",
    workflow: "Proceso_4",
    idprocess: "PID-101",
    status: "pending",
  },
];

export const TableOutputFiles = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };
  return (
    <article className="table__outputs_files">
      <table>
        <caption>Outputs Files</caption>

        <thead>
          <tr>
            <th colSpan={headerTables.length + 1}>
              <SearchFilterTable />
            </th>
          </tr>
          <tr>
            <th style={{ visibility: "hidden" }}>Select</th>
            {headerTables.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  maxWidth: "50px",
                  justifyContent: "space-around",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedRows.includes(index)}
                  onChange={() => handleCheckboxChange(index)}
                />
                <FaStar />
              </td>
              <td data-cell="File">
                <div>{row.nombrefile}</div>
              </td>
              <td data-cell="Workflow">
                <div>{row.workflow}</div>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={headerTables.length + 1}> End of table </td>
          </tr>
        </tfoot>
      </table>
    </article>
  );
};
