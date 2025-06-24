"use client";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { SearchFilterTable } from "../searchs/SearchFilterTable";
import "./tableInputFiles.css";
import { Pagination } from "./Pagination";
import { useProcessContext } from "@/context/ProcessContext";

const headerTables = ["File", "Workflow", "Id process", "Status"];

/* extends files */

const pipeline_map = {
  ".fastq": "Run Alignment & Mapping", // W1
  ".fq": "Run Alignment & Mapping", // W1 (alternativa)
  ".sam": "Variant Calling Only", // W1 intermedio posible
  ".bam": "Variant Calling Only", // W1 intermedio posible
  ".vcf": "Run Onco-KB annotation", // W2
  ".maf": "Report Generation", // parte de W2
  ".pdf": "End of Pipeline",
};

interface TableRow {
  nombrefile: string;
  workflow: string;
  idprocess: string;
  status: keyof typeof statusColors;
}

const statusColors: { [key: string]: string } = {
  done: "#BFE39C",
  running: "#9CE3D6",
  fail: "#EC9191",
  pending: "lightblue",
};

interface Task {
  id: string; // idprocess
  fileName: string;
  workflow: string;
  status: keyof typeof statusColors;
}

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

export const ExampleResFastAPI = {
  organizationId: "org-123" /* ✔️ */,
  userId: "user-456" /* ✔️ */,
  workspaceId: "workspace-789" /* ✔️ */,
  inputFiles: [
    {
      fileName: "sample1.fastq",
      fileType: "fastq",
      fileSize: 123456,
      filePath: "/uploads/sample1.fastq",
      pipeline: "Run Alignment & Mapping",
      status: "done",
      idprocess: "PID-123",
    },
  ] /* ✔️ */,
  workerName: "worker-1" /* ✔️ */,
  genomeVersionRef: "hg38" /* ✔️ */,
};

export const TableInputFiles = () => {
  const { tasks } = useProcessContext();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const handleCheckboxChange = (idprocess: string) => {
    if (selectedIds.includes(idprocess)) {
      setSelectedIds(selectedIds.filter((id) => id !== idprocess));
    } else {
      setSelectedIds([...selectedIds, idprocess]);
    }
  };

  const handleFavoriteClick = (idprocess: string) => {
    if (favoriteIds.includes(idprocess)) {
      setFavoriteIds(favoriteIds.filter((id) => id !== idprocess));
    } else {
      setFavoriteIds([...favoriteIds, idprocess]);
    }
  };

  const handleDeleteSelected = () => {
    console.log("Eliminar filas con IDs:", selectedIds);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <table className="table__inputs_files">
      <caption
        style={{
          display: "none",
        }}
      >
        User input files
      </caption>
      <thead>
        <tr>
          <th colSpan={headerTables.length + 1}>
            <SearchFilterTable />
          </th>
        </tr>
        <tr>
          <th>Select</th>
          {headerTables.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentPosts.map((row) => (
          <tr
            key={row.id}
            className={selectedIds.includes(row.id) ? "selected" : ""}
          >
            <td>
              <div>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
                <FaStar
                  size={20}
                  onClick={() => handleFavoriteClick(row.id)}
                  className={favoriteIds.includes(row.id) ? "favorite" : ""}
                />
              </div>
            </td>
            <td data-cell="File">
              <div>{row.fileName}</div>
            </td>
            <td data-cell="Workflow">
              <div>{row.workflow}</div>
            </td>
            <td data-cell="Idprocess">
              <div>{row.id}</div>
            </td>
            <td data-cell="Status">
              <div style={{ backgroundColor: statusColors[row.status] }}>
                {row.status}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={headerTables.length + 1}>
            <Pagination
              totalPosts={tasks.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
