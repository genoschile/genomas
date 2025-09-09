"use client";

import { useUploadSteps } from "./UploadStepContext";
import { useState } from "react";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { UploadStatus } from "@/context/UploadStatusContext";
import FileProcessor from "@/app/[lang]/(genomas)/user/components/utilsForm/stepUploads/components/FileProcessor";
import "./components/FileUpload.css";
import { UploadLabel } from "./components/UploadLabel";

export const UploadStep2 = () => {
  const { setValue, watch, errors } = useUploadSteps();
  const { setUploadStatus } = useUploadStatusContext();
  const [isDragOver, setIsDragOver] = useState(false);

  const files = watch("files");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      setValue("files", Array.from(selectedFiles), { shouldValidate: true });
    }

    if (selectedFiles && selectedFiles.length > 0) {
      setUploadStatus(UploadStatus.STAGED_IDLE);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setValue("files", Array.from(droppedFiles), { shouldValidate: true });
      setUploadStatus(UploadStatus.STAGED_IDLE);
    }
  };

  return (
    <>
      <div
        className={`upload-container ${isDragOver ? "drag-over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <label htmlFor="file-upload"></label>
        <UploadLabel handleFileChange={handleFileChange} />
        <FileProcessor />
      </div>
      {errors.files && (
        <p className="error-message">{errors.files.message as string}</p>
      )}
    </>
  );
};

export default UploadStep2;
