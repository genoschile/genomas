import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";
import { useRef } from "react";
import { useUploadSteps } from "../UploadStepContext";

export const UploadLabel = ({
  handleFileChange,
}: {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { watch, register } = useUploadSteps();
  const files = watch("files") ?? [];
  const { renderUploadIcon } = useUploadStatusContext();

  return (
    <div className="upload-label">
      {renderUploadIcon()}
      <h3>
        {files.length > 0
          ? `Files: ${files.length}`
          : "Drag and drop your files here or click to upload them"}
      </h3>
      <input
        className="upload-input"
        id="file-upload"
        type="file"
        multiple
        {...register("files", {
          required: "You must upload at least one file",
          validate: (value) =>
            value?.length > 0 || "Please select at least one file",
        })}
        onChange={handleFileChange}
      />
      <hr />
    </div>
  );
};
