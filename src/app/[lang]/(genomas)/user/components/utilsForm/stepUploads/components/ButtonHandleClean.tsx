import { FaRedo } from "react-icons/fa";
import { useUploadSteps } from "../UploadStepContext";

export const ButtonHandleClean = ({
  setUploading,
}: {
  setUploading: (value: boolean) => void;
}) => {
  const { goToStep, setValue, UploadStatus, setUploadStatus } =
    useUploadSteps();

  const handleClean = () => {
    setValue("files", []);
    setValue("decompressFiles", []);
    goToStep(2);
    setUploading(false);
    setUploadStatus(UploadStatus.IDLE);
  };
  return (
    <button onClick={handleClean} className="clean-button">
      <FaRedo /> Limpiar
    </button>
  );
};
