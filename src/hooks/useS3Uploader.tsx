import { useState } from "react";
import { toast } from "react-toastify";

export function useS3Uploader() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const uploadToS3 = async (file: File, expireSeconds = 300) => {
    try {
      setUploading(true);
      setProgress(0);

      const signRes = await fetch("/api/s3/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          expireSeconds,
        }),
      });

      const { url, key } = await signRes.json();
      if (!url) throw new Error("No se pudo generar la URL de subida");

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        xhr.setRequestHeader("Content-Type", file.type);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            toast.success(`${file.name} subido correctamente`);
            resolve();
          } else {
            reject(new Error(`Error de S3: ${xhr.statusText}`));
          }
        };

        xhr.onerror = () => reject(new Error("Error de red durante la subida"));
        xhr.send(file);
      });

      return { key, success: true };
    } catch (err) {
      console.error(err);
      toast.error(`Error al subir ${file.name}`);
      return { success: false };
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return { uploadToS3, uploading, progress };
}
