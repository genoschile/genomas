"use client";

import FileSelector from "./FileSelector";
import "./FileUpload.css";
import { FileStagingAreaProvider } from "@/context/FileStagingAreaContext";
import { UploadStatusProvider } from "@/context/UploadStatusContext";

export default function FileUpload() {
  return (
    <div className="upload-files--init">
      <FileStagingAreaProvider>
        <UploadStatusProvider>
          <FileSelector />
        </UploadStatusProvider>
      </FileStagingAreaProvider>
    </div>
  );
}
