"use client";

import React, { useState } from "react";
import { FaCheckCircle, FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import JSZip from "jszip";

import "./FileUpload.css";

const UploadStatus = {
  IDLE: "idle",
  PENDING: "pending",
  STAGED: "staged",
  UPLOAD_DB: "upload_db",
};

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>(UploadStatus.IDLE);
  const [isUploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [decompressedFiles, setDecompressedFiles] = useState<string[]>([]);

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

  const handleClean = () => {
    setFiles([]);
    setUploading(false);
    setDecompressedFiles([]);
    setUploadStatus(UploadStatus.IDLE);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleUpload = async () => {
    if (files.length > 0) {
      setUploadStatus(UploadStatus.PENDING);
      setUploading(true);

      try {
        const decompressedNames: string[] = [];
        for (const file of files) {
          if (file.name.endsWith(".zip")) {
            await delay(5000); 
            const zip = await JSZip.loadAsync(file);
            zip.forEach((relativePath, zipEntry) => {
              if (!zipEntry.dir) {
                decompressedNames.push(zipEntry.name);
              }
            });
            console.log("Archivos descomprimidos:", decompressedNames);
          } else if (file.name.endsWith(".tar.gz")) {
            console.log("Descompresión de .tar.gz no implementada.");
          } else if (file.name.endsWith(".rar")) {
            console.log("Descompresión de .rar no implementada.");
          }
        }
        setDecompressedFiles(decompressedNames);
        setUploadStatus(UploadStatus.STAGED);
        toast.success("Archivos cargados y descomprimidos (si aplica).");
      } catch (error) {
        console.error("Error al procesar archivos:", error);
        toast.error("Error al procesar archivos.");
        setUploadStatus(UploadStatus.IDLE);
      } finally {
        setUploading(false);
      }
    } else {
      toast.error("Por favor, selecciona al menos un archivo.");
    }
  };

  const handleStageToDatabase = async () => {
    setUploadStatus(UploadStatus.UPLOAD_DB);
    console.log("Subiendo archivos a la base de datos:", files);
    toast.success("Archivos subidos a la base de datos con éxito.");
  };

  const renderUploadIcon = () => {
    switch (uploadStatus) {
      case UploadStatus.PENDING:
        return <FaSpinner className="animate-spin text-blue-500" size={50} />;
      case UploadStatus.STAGED:
        return <FaCheckCircle className="text-green-500" size={50} />;
      case UploadStatus.UPLOAD_DB:
        return <FaCheckCircle className="text-blue-500" size={50} />;
      default:
        return (
          <FaCloudUploadAlt
            size={50}
            className="text-[var(--bg-black)] hover:text-[var(--bg-hover)] transition-colors duration-300"
          />
        );
    }
  };

  return (
    <div className="upload-files--init">
      <div
        className={`upload-container ${isDragOver ? "drag-over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        <label htmlFor="file-upload" className="upload-label">
          {renderUploadIcon()}
          <h3 className="transition-colors duration-300 font-bold">
            {files.length > 0
              ? `Files: ${files.map((file) => file.name).join(", ")}`
              : "Drag and drop your files here or click to upload them"}
          </h3>
          <input
            className="upload-input"
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <hr />
        <div className="upload-file-formats">
          <small>
            Allowed formats: .fastq, .vcf, .mafft, .zip, .tar.gz, .rar
          </small>
        </div>
        <div className="upload-buttons">
          {uploadStatus === UploadStatus.STAGED ? (
            <button onClick={handleStageToDatabase}>Upload to Database</button>
          ) : (
            <button
              className={`${uploadStatus === UploadStatus.PENDING ? "loading" : ""}`}
              disabled={uploadStatus === UploadStatus.PENDING}
              onClick={handleUpload}
            >
              <span className="text">
                {uploadStatus === UploadStatus.PENDING ? "" : "Load"}
              </span>
              {uploadStatus === UploadStatus.PENDING && (
                <span className="spinner">
                  <img src="/loader.svg" alt="loader" />
                </span>
              )}
            </button>
          )}
          <button onClick={handleClean}>Clean</button>
        </div>
        {decompressedFiles.length > 0 && (
          <div className="decompressed-files">
            <h4>Descomprimidos:</h4>
            <ul>
              {decompressedFiles.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}