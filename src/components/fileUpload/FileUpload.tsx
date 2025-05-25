"use client";

import FileSelector from "./FileSelector";
import "./FileUpload.css";

export default function FileUpload() {
  return (
    <div className="upload-files--init">
      <FileSelector />
    </div>
  );
}
