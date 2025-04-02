"use client";

import { createContext, useState } from "react";
import { FaCheckCircle, FaCloudUploadAlt, FaSpinner } from "react-icons/fa";

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
  renderUploadIcon: () => <FaCloudUploadAlt size={50} className="file-upload--icon" />,
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
        return <FaCheckCircle className="file-upload--icon" size={50} />;
      case UploadStatus.UPLOAD_DB:
        return <FaCheckCircle className="file-upload--icon" size={50} />;
      default:
        return <FaCloudUploadAlt size={50} className="file-upload--icon" />;
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
