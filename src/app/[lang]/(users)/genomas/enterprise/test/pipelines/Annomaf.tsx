"use client";

import { useState } from "react";

export interface FileAnnomaf {
  fileName: string;
  success: boolean;
  message: string;
}

export default function Annomaf() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      alert("Por favor selecciona un archivo primero");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/pipes/annomaf", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data: FileAnnomaf = await res.json();

      if (data.success) {
        setPdfUrl(data.fileName);
      } else {
        alert(data.message || "Error generando PDF");
      }
    } else {
      alert("Error en la solicitud");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Generar PDF</button>
      {pdfUrl && (
        <h1>
          {pdfUrl}
        </h1>
      )}
    </div>
  );
}
