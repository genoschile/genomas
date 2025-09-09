import { Controller } from "react-hook-form";
import { useUploadSteps } from "../UploadStepContext";
import { useUploadStatusContext } from "@/hooks/useUploadStatusContext";

export const UploadLabel = ({
  handleFileChange,
}: {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { control, watch } = useUploadSteps();
  const files = watch("files") ?? [];
  const { renderUploadIcon } = useUploadStatusContext();

  return (
    <Controller
      name="files"
      control={control}
      rules={{
        required: "You must upload at least one file",
        validate: (value) =>
          value?.length > 0 || "Please select at least one file",
      }}
      render={({ field, fieldState }) => (
        <label className="upload-label" htmlFor="file-upload">
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
            onChange={(e) => {
              const selectedFiles = Array.from(e.target.files || []);
              field.onChange(selectedFiles);
              handleFileChange(e);
            }}
          />
          {/* {fieldState.error && (
            <p className="error-message">{fieldState.error.message}</p>
          )} */}
        </label>
      )}
    />
  );
};
