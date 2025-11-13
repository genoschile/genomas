"use client";

import { toast } from "react-toastify";
import { routes } from "@/lib/api/routes";
import { useUploadSteps } from "../UploadStepContext";
import { useEffect, useState } from "react";
import { ButtonHandleClean } from "./ButtonHandleClean";
import { useS3Uploader } from "@/hooks/useS3Uploader";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";

export default function FileProcessor() {
  const {
    watch,
    currentStep,
    trigger,
    nextStep,
    hasAutoAdvanced,
    handleChangeAutoAdvance,
    setError,
    setValue,
    UploadStatus,
    setUploadStatus,
    uploadStatus,
    getButtonIcon,
    currentProject,
    getButtonLabel,
  } = useUploadSteps();

  const [isUploading, setUploading] = useState<boolean>(false);

  const files = watch("files");

  if (!currentProject) return null;

  const { workspaceId, id } = currentProject;




  const { uploadToS3, uploading: s3Uploading, progress } = useS3Uploader();

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

  const handleToS3Upload = async () => {
    setUploadStatus(UploadStatus.UPLOAD_DB);
    setUploading(true);

    // --- VALIDACIONES ---
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

    if (hasError) {
      setUploading(false);
      return;
    }

    setUploadStatus(UploadStatus.PENDING);

    try {
      const uploadedFiles: { name: string; key: string }[] = [];

      const organizationId = getLocalStorageOrganization();

      if (!organizationId) throw new Error("ID de organización no encontrado");

      for (const file of files) {
        const result = await uploadToS3(
          file,
          {
            organizationId: organizationId,
            workspaceId: workspaceId,
            projectId: id,
            fileRole: "input",
          },
          600
        ); // URL válida por 10 min

        if (result.success) {
          uploadedFiles.push({ name: file.name, key: result.key });
        } else {
          throw new Error(`Error al subir ${file.name}`);
        }
      }

      // --- REGISTRAR ARCHIVOS EN BACKEND ---
      const saveResponse = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: currentProject,
          files: uploadedFiles.map((f) => ({
            filename: f.name,
            path: f.key,
            fileType: "FASTQ", // o según corresponda
            fileRole: "input",
          })),
        }),
      });

      const saveData = await saveResponse.json();
      if (!saveData.success)
        throw new Error("Error al registrar archivos en BD");

      // --- PROCESO FINAL ---
      setValue(
        "decompressFiles",
        uploadedFiles.map((f) => ({
          name: f.name,
          path: f.key,
          size: 0,
          type: "application/octet-stream",
          accepted: true,
          message: "Subido correctamente",
          progress: 100,
        }))
      );
      toast.success("Archivos subidos exitosamente a S3");
      setUploadStatus(UploadStatus.UPLOAD_SUCCESS);
    } catch (error) {
      console.error("Error durante la subida:", error);
      toast.error("Error durante la subida.");
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
        return handleToS3Upload;
      case UploadStatus.UPLOAD_RESUME:
        return handleResumeUpload;
      default:
        return () => {};
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

      <ButtonHandleClean setUploading={setUploading} />
    </div>
  );
}
