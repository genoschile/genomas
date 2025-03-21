"use client";

/* icons */
import { FaCloudUploadAlt } from "react-icons/fa";

/* hooks */
import { useState } from "react";
import { toast } from "react-toastify";

/* style */
import "./FileUpload.css";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleClean = () => {
    setFile(null);
    setUploading(false);
  };

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
    } else {
      toast.error("Por favor, selecciona un archivo antes de subirlo.");
    }
  };

  return (
    <>
      {/* Formulario */}
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
          <FaCloudUploadAlt
            size={50}
            className="text-[var(--bg-black)] hover:text-[var(--bg-hover)] transition-colors duration-300"
          />
          <h3 className="transition-colors duration-300 font-bold">
            {file
              ? `Archivo: ${file.name}`
              : "Arrastra y suelta tu archivo aquí o haz clic para subirlo"}
          </h3>
          <input
            className="upload-input"
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
        </label>

        <div className="upload-buttons">
          <button
            className={`${isUploading ? "loading" : ""}`}
            disabled={isUploading}
            onClick={handleUpload}
          >
            <span className="text">{isUploading ? "" : "Cargar"}</span>
            {isUploading && (
              <span className="spinner">
                <img src="/loader.svg" alt="loader" />
              </span>
            )}
          </button>
          <button onClick={handleClean}>Limpiar</button>
        </div>
      </div>
    </>
  );
}
