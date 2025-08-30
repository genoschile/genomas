import "./filesViewList.css";

import { FilesTypeSwift } from "@/app/[lang]/(genomas)/user/components/sectionsHome/FilesTypeSwift";
import { useFilesContext } from "./context/FilesContext";
import { useProjectContext } from "@/hooks/useProjectContext";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export const FilesViewsList = () => {
  const { files, isLoadingFiles, clearFiles } = useFilesContext();
  const { ChangeSelectedProjectId } = useProjectContext();

  return (
    <div className="files-view">
      <div className="files-actions">
        <div>
          <button
            onClick={() => {
              ChangeSelectedProjectId(null);
              clearFiles();
            }}
            className="back-button"
          >
            <IoArrowBackCircleSharp />
          </button>
          <h2 className="file-title">Archivos del proyecto</h2>
        </div>
        <FilesTypeSwift />
      </div>

      <hr />

      {isLoadingFiles ? (
        <p>Cargando archivos...</p>
      ) : files.length === 0 ? (
        <p>No hay archivos en este proyecto.</p>
      ) : (
        <FilesListItems />
      )}
    </div>
  );
};

export const FilesListItems = () => {
  const { files } = useFilesContext();
  return (
    <ul className="files-list">
      {files.map((file) => (
        <li key={file.id}>
          <strong>{file.name}</strong> — {file.size} KB
        </li>
      ))}
    </ul>
  );
};
