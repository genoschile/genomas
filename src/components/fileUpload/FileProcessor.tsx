"use client";

import { toast } from "react-toastify";
import { useFileStagingAreaContext } from "@/hooks/useFileStagingArea";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { UploadStatus } from "@/context/UploadStatusContext";
import {
  FaSpinner,
  FaPlay,
  FaDatabase,
  FaRedo,
  FaCheckCircle,
  FaPause,
  FaTimesCircle,
  FaUpload,
} from "react-icons/fa";

export interface resUpload_DB {
  success: boolean;
  data: {
    files: File[];
  };
  message?: string;
  error?: string;
}

export default function FileProcessor() {
  const {
    files,
    setFiles,
    setDecompressedFiles,
    setProgressMap,
    decompressedFiles,
  } = useFileStagingAreaContext();

  const { uploadStatus, setUploadStatus, isUploading, setUploading } =
    useUploadStatusContext();

  const simulateUploadFiles = async () => {
    for (const file of decompressedFiles) {
      await simulateProgress(file.name);
    }
  };

  const simulateProgress = async (fileKey: string) => {
    return new Promise<void>((resolve) => {
      let current = 0;

      const interval = setInterval(() => {
        current += Math.floor(Math.random() * 20) + 10;
        setProgressMap((prev) => ({
          ...prev,
          [fileKey]: Math.min(current, 100),
        }));

        if (current >= 100) {
          clearInterval(interval);
          resolve();
        }
      }, 300);
    });
  };

  const handleClean = () => {
    setUploading(false);
    setDecompressedFiles([]);
    setUploadStatus(UploadStatus.IDLE);
    setFiles([]);
    setProgressMap({});
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error("Por favor, selecciona al menos un archivo.");
      return;
    }

    setUploadStatus(UploadStatus.PENDING);
    setUploading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await fetch("/api/document/utils", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        toast.error("Error al procesar los archivos");
        setUploadStatus(UploadStatus.UPLOAD_ERROR);
        return;
      }

      setDecompressedFiles(data.data.files);
      setUploadStatus(UploadStatus.STAGED);
      toast.success("Archivos cargados y descomprimidos.");
    } catch (error) {
      console.error("Error al subir archivos:", error);
      toast.error("Error al procesar archivos.");
      setUploadStatus(UploadStatus.UPLOAD_ERROR);
    } finally {
      setUploading(false);
    }
  };

  const handleStageToDatabase = async () => {
    setUploadStatus(UploadStatus.UPLOAD_DB);
    setUploading(true);

    try {
      await simulateUploadFiles();

      const formData = new FormData();

      files
        .filter((file) => file.accepted)
        .forEach((file) => {
          formData.append("files", file);
        });

      const res = await fetch("/api/document/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Error al subir archivos a la base de datos.");
        setUploadStatus(UploadStatus.UPLOAD_ERROR);
      }

      const resData: resUpload_DB = await res.json();

      if (!resData.success) {
        toast.error("Error al subir archivos a la base de datos.");
        setUploadStatus(UploadStatus.UPLOAD_ERROR);
      }

      if (resData.success) {
        setUploadStatus(UploadStatus.UPLOAD_SUCCESS);
        toast.success("Archivos subidos a la base de datos con éxito.");
      }
    } catch {
      toast.error("Error durante la subida a la base de datos.");
      setUploadStatus(UploadStatus.UPLOAD_ERROR);
    } finally {
      setUploading(false);
    }
  };

  // Opcional: reanudar la carga, por ejemplo en UPLOAD_RESUME
  const handleResumeUpload = async () => {
    setUploadStatus(UploadStatus.UPLOAD_DB);
    setUploading(true);
    try {
      await simulateUploadFiles();
      toast.success("Carga reanudada y completada.");
      setUploadStatus(UploadStatus.UPLOAD_SUCCESS);
    } catch {
      toast.error("Error durante la reanudación.");
      setUploadStatus(UploadStatus.UPLOAD_ERROR);
    } finally {
      setUploading(false);
    }
  };

  const actionByStatus = () => {
    switch (uploadStatus) {
      case UploadStatus.IDLE:
      case UploadStatus.STAGED_IDLE:
        return handleUpload;

      case UploadStatus.PENDING:
        return () => {};

      case UploadStatus.STAGED:
        return handleStageToDatabase;

      case UploadStatus.UPLOAD_DB:
        return () => toast.info("Subida ya en progreso.");

      case UploadStatus.UPLOAD_SUCCESS:
        return () => toast.info("Carga ya completada.");

      case UploadStatus.UPLOAD_ERROR:
        return handleUpload;

      case UploadStatus.UPLOAD_CANCELLED:
        return handleUpload;

      case UploadStatus.UPLOAD_RESUME:
        return handleResumeUpload;

      default:
        return () => {};
    }
  };

  const getButtonLabel = () => {
    switch (uploadStatus) {
      case UploadStatus.IDLE:
      case UploadStatus.STAGED_IDLE:
        return "Subir archivo ZIP";

      case UploadStatus.PENDING:
        return "Procesando ZIP...";

      case UploadStatus.STAGED:
        return "Subir a la base de datos";

      case UploadStatus.UPLOAD_DB:
        return "Subiendo...";

      case UploadStatus.UPLOAD_SUCCESS:
        return "Carga completada";

      case UploadStatus.UPLOAD_ERROR:
        return "Reintentar carga";

      case UploadStatus.UPLOAD_CANCELLED:
        return "Nuevo intento";

      case UploadStatus.UPLOAD_RESUME:
        return "Reanudar carga";

      default:
        return "Cargar";
    }
  };

  const getButtonIcon = () => {
    switch (uploadStatus) {
      case UploadStatus.IDLE:
      case UploadStatus.STAGED_IDLE:
        return <FaPlay />;

      case UploadStatus.PENDING:
        return <FaSpinner className="rotate" />;

      case UploadStatus.STAGED:
        return <FaDatabase />;

      case UploadStatus.UPLOAD_DB:
        return <FaSpinner className="rotate" />;

      case UploadStatus.UPLOAD_SUCCESS:
        return <FaCheckCircle color="green" />;

      case UploadStatus.UPLOAD_ERROR:
        return <FaTimesCircle color="red" />;

      case UploadStatus.UPLOAD_CANCELLED:
        return <FaPause />;

      case UploadStatus.UPLOAD_RESUME:
        return <FaUpload />;

      default:
        return null;
    }
  };

  const isDisabled =
    isUploading ||
    uploadStatus === UploadStatus.PENDING ||
    uploadStatus === UploadStatus.UPLOAD_DB;

  return (
    <div className="upload-buttons">
      <button
        onClick={actionByStatus()}
        disabled={isDisabled}
        className={`upload-action-button ${isDisabled ? "disabled" : ""}`}
      >
        <span className="icon">{getButtonIcon()}</span>
        <span className="text">{getButtonLabel()}</span>
      </button>

      <button onClick={handleClean} className="clean-button">
        <FaRedo /> Limpiar
      </button>
    </div>
  );
}
