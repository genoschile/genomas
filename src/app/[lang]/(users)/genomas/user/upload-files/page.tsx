"use client";

import "./page.css";
import { useFileStagingAreaContext } from "@/hooks/useFileStagingArea";
import FileSelector from "@/components/fileUpload/FileSelector";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { UploadStatus } from "@/context/UploadStatusContext";

export default function Page() {
  return (
    <section className="upload-files">
      <article className="upload-files__container">
        <div className="upload-files__files-section">
          <h2 className="upload-files__title">
            Upload your VCF file and/or Clinical data (optional)
          </h2>
          <div className="upload-files--init">
            <FileSelector />
          </div>
        </div>
      </article>

      <ExampleFormClinical />

      {/* <ExampleFormClinical /> */}

      <ListUploadedFiles />

      {/* <UploadFilesTags /> */}
    </section>
  );
}

export const ExampleFormClinical = () => {
  return (
    <footer className="upload-files__warnings">
      <small className="upload-files__warning-text">
        If you have clinical data for multiple samples, upload it as
        clinical.csv, following the example provided. Ensure that the sample
        identifiers match the identifiers in the variants file.
      </small>
      <strong className="upload-files__example-link">Example here</strong>
    </footer>
  );
};

import { useMemo, useState } from "react";

export const ListUploadedFiles = () => {
  const { files, decompressedFiles, progressMap } = useFileStagingAreaContext();
  const { uploadStatus } = useUploadStatusContext();

  const procesoId = useMemo(() => `#${Date.now()}`, [files]);

  const dynamicHeaders =
    decompressedFiles.length > 0
      ? Object.keys(decompressedFiles[0]).filter(
          (key) => key !== "name" && key !== "type"
        )
      : [];

  const renderTable = () => (
    <div className="upload-table-container">
      <table className="upload-table">
        <thead>
          <tr>
            <th>Proceso ID</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Progreso</th>
            {dynamicHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {decompressedFiles.map((file, index) => {
            const progress = progressMap[file.name] ?? 0;
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
                {dynamicHeaders.map((header) => (
                  <td key={header}>{file[header] ?? "—"}</td>
                ))}
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
