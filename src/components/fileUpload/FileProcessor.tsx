"use client";

import { toast } from "react-toastify";
import { useFileStagingAreaContext } from "@/hooks/useFileStagingArea";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { UploadStatus } from "@/context/UploadStatusContext";

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
  const { files, setFiles, setDecompressedFiles } = useFileStagingAreaContext();
  const { uploadStatus, setUploadStatus, isUploading, setUploading } =
    useUploadStatusContext();

  const handleClean = () => {
    setUploading(false);
    setDecompressedFiles([]);
    setUploadStatus(UploadStatus.IDLE);
    setFiles([])
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
        return console.log("Error al procesar los archivos");
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
