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
import { useCurrentProject } from "@/context/currentProject";

export interface resUpload_DB {
  success: boolean;
  data: {
    files: File[];
  };
  message?: string;
  error?: string;
}

import axios from "axios";

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

  const { currentProject } = useCurrentProject();

  const handleStageToDatabase = async () => {
    console.log("handleStageToDatabase called");

    if (!currentProject) {
      toast.error("No hay un proyecto POR DEFAULT seleccionado.");
      return;
    }

    setUploadStatus(UploadStatus.UPLOAD_DB);
    setUploading(true);

    try {
      const formData = new FormData();

      files
        .filter((file) => file.accepted)
        .forEach((file) => {
          formData.append("files", file);
        });

      const res = await axios.post("/api/document/utils", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          console.log(`Progreso real: ${percent}%`);
          setProgressMap((prev) => ({
            ...prev,
            ["files"]: percent,
          }));
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setDecompressedFiles(res.data.data.files);
        setUploadStatus(UploadStatus.STAGED);
        toast.success("Archivos cargados y descomprimidos.");
      } else {
        toast.error("Error al procesar los archivos");
        setUploadStatus(UploadStatus.UPLOAD_ERROR);
      }
    } catch (error) {
      console.error("Error en la subida:", error);
      toast.error("Error al procesar archivos.");
      setUploadStatus(UploadStatus.UPLOAD_ERROR);
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async () => {
    setUploadStatus(UploadStatus.UPLOAD_DB);
    setUploading(true);
    try {
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
