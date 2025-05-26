"use client";

import { toast } from "react-toastify";
import { useFileStagingAreaContext } from "@/hooks/useFileStagingArea";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { UploadStatus } from "@/context/UploadStatusContext";
import { FaSpinner, FaPlay, FaDatabase, FaRedo } from "react-icons/fa";

interface SuccessResponse {
  success: true;
  message: string;
  data: {
    files: File[];
  };
}

interface ErrorResponse {
  success: false;
  message: string;
}

type ApiResponse = SuccessResponse | ErrorResponse;

export default function FileProcessor() {
  const { files, setFiles, setDecompressedFiles, setProgressMap, decompressedFiles } = useFileStagingAreaContext();
  const { uploadStatus, setUploadStatus, isUploading, setUploading } =
    useUploadStatusContext();

  const simulateUploadFiles = async () => {
    for (const file of decompressedFiles) {
      await simulateProgress(file.name); // o `file.id` si lo tienes
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

      const data: ApiResponse = await response.json();

      if (!data.success) {
        toast.error("Error al procesar los archivos");
        setUploadStatus(UploadStatus.IDLE);
        return;
      }

      setDecompressedFiles(data.data.files);
      setUploadStatus(UploadStatus.STAGED);
      toast.success("Archivos cargados y descomprimidos.");
    } catch (error) {
      console.error("Error al subir archivos:", error);
      toast.error("Error al procesar archivos.");
      setUploadStatus(UploadStatus.IDLE);
    } finally {
      setUploading(false);
    }
  };

  const handleStageToDatabase = async () => {
    setUploadStatus(UploadStatus.UPLOAD_DB);
    await simulateUploadFiles();
    toast.success("Todos los archivos fueron subidos.");
  };

  const actionByStatus = () => {
    switch (uploadStatus) {
      case UploadStatus.IDLE:
        return handleUpload;
      case UploadStatus.STAGED:
        return handleStageToDatabase;
      case UploadStatus.UPLOAD_DB:
        return () => toast.info("Subida ya en progreso.");
      case UploadStatus.PENDING:
        return () => {};
      default:
        return () => {};
    }
  };

  const getButtonLabel = () => {
    switch (uploadStatus) {
      case UploadStatus.IDLE:
        return "Subir archivo ZIP";
      case UploadStatus.PENDING:
        return "Procesando ZIP...";
      case UploadStatus.STAGED:
        return "Subir a la base de datos";
      case UploadStatus.UPLOAD_DB:
        return "Subiendo...";
      default:
        return "Cargar";
    }
  };

  const getButtonIcon = () => {
    switch (uploadStatus) {
      case UploadStatus.IDLE:
        return <FaPlay />;
      case UploadStatus.PENDING:
        return <FaSpinner className="rotate" />;
      case UploadStatus.STAGED:
        return <FaDatabase />;
      case UploadStatus.UPLOAD_DB:
        return <FaSpinner className="rotate" />;
      default:
        return null;
    }
  };

  const isDisabled = uploadStatus === UploadStatus.PENDING || isUploading;

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
