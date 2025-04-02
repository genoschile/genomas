"use client";

import { toast } from "react-toastify";
import JSZip from "jszip";
import { useFileStagingAreaContext } from "@/hooks/useFileStagingArea";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { UploadStatus } from "@/context/UploadStatusContext";

export default function FileProcessor() {
  const { files, setDecompressedFiles } = useFileStagingAreaContext();
  const { uploadStatus, setUploadStatus, isUploading, setUploading } =
    useUploadStatusContext();

  const handleClean = () => {
    setUploading(false);
    setDecompressedFiles([]);
    setUploadStatus(UploadStatus.IDLE);
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleUpload = async () => {
    if (files && files.length > 0) {
      setUploadStatus(UploadStatus.PENDING);
      setUploading(true);

      try {
        const decompressedData: { name: string; size: number; type: string }[] =
          [];
        for (const file of files) {
          if (file.name.endsWith(".zip")) {
            await delay(5000);
            const zip = await JSZip.loadAsync(file);
            zip.forEach((relativePath, zipEntry) => {
              if (!zipEntry.dir) {
                decompressedData.push({
                  name: zipEntry.name,
                  size: 0,
                  type: zipEntry.name.split(".").pop() || "unknown",
                });
              }
            });
            console.log("Archivos descomprimidos:", decompressedData);
          } else if (file.name.endsWith(".tar.gz")) {
            console.log("Descompresión de .tar.gz no implementada.");
          } else if (file.name.endsWith(".rar")) {
            console.log("Descompresión de .rar no implementada.");
          }
        }
        setDecompressedFiles(decompressedData);
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

  return (
    <div className="upload-buttons">
      {uploadStatus === UploadStatus.STAGED ? (
        <button onClick={handleStageToDatabase}>Upload to Database</button>
      ) : (
        <button
          className={`${
            uploadStatus === UploadStatus.PENDING ? "loading" : ""
          }`}
          disabled={isUploading}
          onClick={handleUpload}
        >
          <span className="text">{isUploading ? "" : "Load"}</span>
          {isUploading && (
            <span className="spinner">
              <img src="./loader.svg" alt="loader" />
            </span>
          )}
        </button>
      )}
      <button onClick={handleClean}>Clean</button>
    </div>
  );
}
