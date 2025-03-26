"use client"

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { SearchFilterTable } from "../searchs/SearchFilterTable";
import "./tableJobHistory.css";

const headerTables = ["ID process", "Status", "Workflow", "Submitted", "Actions"];

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

export const TableJobHistory = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const handleCheckboxChange = (index: number) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <article className="table__job_history">
      <table>
        <caption>History</caption>
        <thead>
          <tr>
            <th colSpan={headerTables.length + 1}>
              <SearchFilterTable />
            </th>
          </tr>
          <tr>
            {headerTables.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td data-cell="Idprocess">
                <div>{row.idprocess}</div>
              </td>
              <td data-cell="Status">
                <div style={{ backgroundColor: statusColors[row.status] }}>
                  {row.status}
                </div>
              </td>
              <td data-cell="Workflow">
                <div>{row.workflow}</div>
              </td>
              <td data-cell="Submitted">
                <div>{row.nombrefile}</div>
              </td>
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
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={headerTables.length + 1}>End of table -</td>
          </tr>
        </tfoot>
      </table>
    </article>
  );
};
