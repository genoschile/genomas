"use client";

import { UploadStatus, useUploadSteps } from "./UploadStepContext";
import { useState } from "react";
import "./components/FileUpload.css";
import { UploadLabel } from "./components/UploadLabel";

export const UploadStep2 = () => {
  const { setValue, errors, setUploadStatus, uploadStatus } = useUploadSteps();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      setValue("files", Array.from(selectedFiles), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
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
      setValue("files", Array.from(droppedFiles), {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
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
        <UploadLabel handleFileChange={handleFileChange} />
      </div>
      {errors.files && (
        <p className="error-message">{errors.files.message as string}</p>
      )}
    </>
  );
};

export default UploadStep2;
