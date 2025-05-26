"use client";

import { useFileStagingAreaContext } from "@/hooks/useFileStagingArea";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { useState } from "react";
import FileProcessor from "./FileProcessor";
import { UploadLabel } from "./UploadLabel";
import "./FileUpload.css";

export default function FileSelector() {
  const { setFiles } = useFileStagingAreaContext();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles));
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFiles(Array.from(droppedFiles));
    }
  };

  return (
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
  );
}
