"use client";

import {
  FaCloudUploadAlt,
  FaSpinner,
  FaFolderOpen,
  FaDatabase,
  FaBan,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaPlay,
} from "react-icons/fa";

import { createContext, useState } from "react";

export const UploadStatus = {
  IDLE: "idle", // Esperando la acción del usuario
  STAGED_IDLE: "staged_idle", // Archivos subidos, aún no procesados
  PENDING: "pending", // Procesando archivos
  STAGED: "staged", // Archivos procesados, listos para subir a la base de datos
  UPLOAD_DB: "upload_db", // Subiendo archivos a la base de datos
  UPLOAD_ERROR: "upload_error", // Error al subir archivos
  UPLOAD_SUCCESS: "upload_success", // Carga exitosa de archivos
  UPLOAD_CANCELLED: "upload_cancelled", // Carga cancelada por el usuario
  UPLOAD_RESUME: "upload_resume", // Reanudar carga de archivos
};

export interface UploadStatusContextType {
  uploadStatus: string;
  setUploadStatus: (uploadStatus: string) => void;
  isUploading: boolean;
  setUploading: (isUploading: boolean) => void;
  renderUploadIcon: () => React.JSX.Element;
  uploadJobId: string;
  setUploadJobId: (jobId: string) => void;
}

export const UploadStatusContext = createContext<UploadStatusContextType>({
  uploadStatus: UploadStatus.IDLE,
  setUploadStatus: () => {},
  isUploading: false,
  setUploading: () => {},
  renderUploadIcon: () => (
    <FaCloudUploadAlt size={50} className="file-upload--icon" />
  ),
  uploadJobId: "",
  setUploadJobId: () => {},
});

export function UploadStatusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [uploadStatus, setUploadStatus] = useState<string>(UploadStatus.IDLE);
  const [isUploading, setUploading] = useState<boolean>(false);
  const [uploadJobId, setUploadJobId] = useState<string>("");

  const renderUploadIcon = () => {
    switch (uploadStatus) {
      case UploadStatus.PENDING:
        return <FaSpinner className="file-upload--icon rotate" size={50} />;

      case UploadStatus.STAGED_IDLE:
        return <FaClock className="file-upload--icon" size={50} />;

      case UploadStatus.STAGED:
        return <FaFolderOpen className="file-upload--icon" size={50} />;

      case UploadStatus.UPLOAD_DB:
        return <FaDatabase className="file-upload--icon" size={50} />;

      case UploadStatus.UPLOAD_SUCCESS:
        return (
          <FaCheckCircle className="file-upload--icon success" size={50} />
        );

      case UploadStatus.UPLOAD_ERROR:
        return (
          <FaExclamationTriangle
            className="file-upload--icon error"
            size={50}
          />
        );

      case UploadStatus.UPLOAD_CANCELLED:
        return <FaBan className="file-upload--icon cancelled" size={50} />;

      case UploadStatus.UPLOAD_RESUME:
        return <FaPlay className="file-upload--icon resume" size={50} />;

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
        uploadJobId,
        setUploadJobId,
      }}
    >
      {children}
    </UploadStatusContext.Provider>
  );
}
