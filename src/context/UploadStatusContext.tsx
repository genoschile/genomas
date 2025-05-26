"use client";
import {
  FaCloudUploadAlt,
  FaSpinner,
  FaFolderOpen,
  FaDatabase,
} from "react-icons/fa";

import { createContext, useState } from "react";

export const UploadStatus = {
  IDLE: "idle",
  PENDING: "pending",
  STAGED: "staged", 
  UPLOAD_DB: "upload_db",
};

/*

IDLE: Esperando la acción del usuario.
PENDING: Procesando archivos.
STAGED: Archivos procesados, listos para subir a la base de datos.
UPLOAD_DB: Subiendo archivos a la base de datos.

*/

export interface UploadStatusContextType {
  uploadStatus: string;
  setUploadStatus: (uploadStatus: string) => void;
  isUploading: boolean;
  setUploading: (isUploading: boolean) => void;
  renderUploadIcon: () => React.JSX.Element;
}

export const UploadStatusContext = createContext<UploadStatusContextType>({
  uploadStatus: UploadStatus.IDLE,
  setUploadStatus: () => {},
  isUploading: false,
  setUploading: () => {},
  renderUploadIcon: () => (
    <FaCloudUploadAlt size={50} className="file-upload--icon" />
  ),
});

export function UploadStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [uploadStatus, setUploadStatus] = useState<string>(UploadStatus.IDLE);
  const [isUploading, setUploading] = useState<boolean>(false);

  const renderUploadIcon = () => {
    switch (uploadStatus) {
      case UploadStatus.PENDING:
        return <FaSpinner className="file-upload--icon rotate" size={50} />;

      case UploadStatus.STAGED:
        return <FaFolderOpen className="file-upload--icon" size={50} />;

      case UploadStatus.UPLOAD_DB:
        return <FaDatabase className="file-upload--icon" size={50} />;

      case UploadStatus.IDLE:
      default:
        return <FaCloudUploadAlt className="file-upload--icon" size={50} />;
    }
  };

  return (
    <UploadStatusContext.Provider
      value={{
        uploadStatus,
        setUploadStatus,
        isUploading,
        setUploading,
        renderUploadIcon,
      }}
    >
      {children}
    </UploadStatusContext.Provider>
  );
}
