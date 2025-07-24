import { useFileStagingAreaContext } from "@/hooks/useFileStagingArea";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { useRef } from "react";

export const UploadLabel = ({
  handleFileChange,
}: {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { files } = useFileStagingAreaContext();
  const { renderUploadIcon } = useUploadStatusContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="upload-label" onClick={() => fileInputRef.current?.click()}>
      {renderUploadIcon()}
      <h3>
        {files.length > 0
          ? `Files: ${files.length}`
          : "Drag and drop your files here or click to upload them"}
      </h3>
      <input
        ref={fileInputRef}
        className="upload-input"
        id="file-upload"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <hr />
    </div>
  );
};
