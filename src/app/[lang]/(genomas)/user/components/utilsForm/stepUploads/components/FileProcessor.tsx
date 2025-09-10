"use client";

import { toast } from "react-toastify";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { UploadStatus } from "@/context/UploadStatusContext";
import {
  FaSpinner,
  FaPlay,
  FaDatabase,
  FaRedo,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import axios from "axios";
import { routes } from "@/lib/api/routes";
import { useUploadSteps } from "../UploadStepContext";
import { useEffect } from "react";

export default function FileProcessor() {
  const {
    watch,
    currentStep,
    trigger,
    nextStep,
    hasAutoAdvanced,
    handleChangeAutoAdvance,
    setError,
    goToStep,
    setValue,
  } = useUploadSteps();

  const files = watch("files");

  const currentProject = watch("currentProjectId");

  useEffect(() => {
    const handleAutoNext = async () => {
      if (currentStep === 2 && files && files.length > 0 && !hasAutoAdvanced) {
        const isValid = await trigger("files");
        if (isValid) {
          handleChangeAutoAdvance(true);
          await nextStep();
        }
      }
    };

    handleAutoNext();
  }, [files, hasAutoAdvanced]);

  const {
    uploadStatus,
    setUploadStatus,
    isUploading,
    setUploading,
    setUploadJobId,
    uploadJobId,
  } = useUploadStatusContext();

  const handleClean = () => {
    setValue("files", []);
    setValue("decompressFiles", []);
    goToStep(2);
    setUploading(false);
    setUploadStatus(UploadStatus.IDLE);
  };

  const handleUpload = async () => {
    let hasError = false;

    if (!files || files.length === 0) {
      setError("files", {
        type: "manual",
        message: "Por favor, selecciona al menos un archivo.",
      });
      hasError = true;
    }

    if (!currentProject) {
      setError("currentProjectId", {
        type: "manual",
        message: "Debes seleccionar un proyecto.",
      });
      hasError = true;
    }

    if (hasError) return;

    const jobId = `${currentProject}_upload_${crypto
      .randomUUID()
      .replace(/-/g, "")
      .slice(0, 8)}`;

    setUploadStatus(UploadStatus.PENDING);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("upload_id", jobId);
      files.forEach((file: any) => formData.append("files", file));
      setUploadJobId(jobId);

      const response = await fetch(routes.decompressFiles(), {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        toast.error("Error al procesar los archivos");
        setUploadStatus(UploadStatus.UPLOAD_ERROR);
        return;
      }

      setValue("decompressFiles", data.data.files ?? []);

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
    if (!uploadJobId) {
      toast.error("No se encontró un jobId para la subida.");
      return;
    }

    setUploadStatus(UploadStatus.UPLOAD_DB);
    setUploading(true);

    const toastId = toast.loading("Subiendo archivos al bucket...");

    try {
      const res = await axios.post(routes.uploadFiles(), {
        upload_id: uploadJobId,
      });

      toast.dismiss(toastId);

      if (res.data.success) {
        toast.success("¡Archivos copiados exitosamente al bucket!");
        setUploadStatus(UploadStatus.UPLOAD_SUCCESS);
      } else {
        toast.error("Error: " + res.data.message);
        setUploadStatus(UploadStatus.UPLOAD_ERROR);
      }
    } catch (error) {
      console.error("Error en la subida al bucket:", error);
      toast.dismiss(toastId);
      toast.error("Error al copiar archivos al bucket.");
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
      case UploadStatus.STAGED:
        return handleStageToDatabase;
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
