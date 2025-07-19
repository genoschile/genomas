"use client";

import { UploadStatus } from "@/context/UploadStatusContext";
import { useFileStagingAreaContext } from "@/hooks/useFileStagingArea";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { getFileSize } from "@/utils/getFileSize";
import { useMemo } from "react";

export const ListUploadedFiles = () => {
  const { files, decompressedFiles, progressMap } = useFileStagingAreaContext();
  const { uploadStatus } = useUploadStatusContext();

  const procesoId = useMemo(() => `#${Date.now()}`, []);

  const safeProgressMap = progressMap ?? {};

  const renderStagedIdleTable = () => (
    <div className="upload-table-container">
      <table className="upload-table">
        <thead>
          <tr>
            <th>Proceso ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Tamaño</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{procesoId}</td>
              <td>{file.name}</td>
              <td>{file.type}</td>
              <td>
                {file.size ? `${(file.size / 1024).toFixed(2)} KB` : "N/D"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTable = () => (
    <div className="upload-table-container">
      <table className="upload-table">
        <thead>
          <tr>
            <th>Proceso ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Progreso</th>
            <th>Aceptado</th>
            <th>Mensaje</th>
            <th>Tamaño</th>
          </tr>
        </thead>
        <tbody>
          {decompressedFiles.map((file, index) => {
            const progress = safeProgressMap[file.name] ?? 0;
            return (
              <tr key={index}>
                <td>{procesoId}</td>
                <td>{file.name}</td>
                <td>{file.type}</td>
                <td>
                  {progress === 100 ? (
                    <span style={{ color: "green" }}>✅</span>
                  ) : (
                    <div className="progress-bar">
                      <div
                        className="progress-bar__fill"
                        style={{ width: `${progress}%` }}
                      />
                      <span className="progress-bar__text">{progress}%</span>
                    </div>
                  )}
                </td>
                <td>
                  {file.accepted ? (
                    <span style={{ color: "green" }}>✔️</span>
                  ) : (
                    <span style={{ color: "red" }}>❌</span>
                  )}
                </td>

                <td>{file.message}</td>
                <td>{getFileSize(file?.size)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (uploadStatus) {
      case UploadStatus.IDLE:
        return <p>Sube un archivo ZIP para comenzar.</p>;

      case UploadStatus.STAGED_IDLE:
        return (
          <div className="upload-step upload-step--staged-idle">
            <p>Archivo subido. Aún no ha sido procesado.</p>
            {renderStagedIdleTable()}
          </div>
        );

      case UploadStatus.PENDING:
        return (
          <div className="upload-step upload-step--pending">
            <p>Procesando archivo ZIP...</p>
            <div className="spinner" />
          </div>
        );

      case UploadStatus.STAGED:
        return (
          <div className="upload-step upload-step--staged">
            <h3>Archivos listos para subir</h3>
            {renderTable()}
          </div>
        );

      case UploadStatus.UPLOAD_DB:
        return (
          <div className="upload-step upload-step--uploading">
            <h3>Subiendo archivos a la base de datos...</h3>
            {renderTable()}
          </div>
        );

      case UploadStatus.UPLOAD_SUCCESS:
        return (
          <div className="upload-step upload-step--success">
            <h3>¡Carga exitosa!</h3>
            {renderTable()}
            <p className="success-message">
              Todos los archivos fueron subidos correctamente.
            </p>
          </div>
        );

      case UploadStatus.UPLOAD_ERROR:
        return (
          <div className="upload-step upload-step--error">
            <h3>Error al subir archivos</h3>
            {renderTable()}
            <p className="error-message">
              Ocurrió un problema durante la carga. Intenta nuevamente.
            </p>
          </div>
        );

      case UploadStatus.UPLOAD_CANCELLED:
        return (
          <div className="upload-step upload-step--cancelled">
            <h3>Carga cancelada</h3>
            <p>
              Has cancelado la subida. Puedes volver a intentarlo cuando gustes.
            </p>
          </div>
        );

      case UploadStatus.UPLOAD_RESUME:
        return (
          <div className="upload-step upload-step--resume">
            <h3>Reanudando carga...</h3>
            {renderTable()}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <article className="upload-list-files">
      <h2 className="upload-list-files__title">Carga de Archivos</h2>
      {renderContent()}
    </article>
  );
};