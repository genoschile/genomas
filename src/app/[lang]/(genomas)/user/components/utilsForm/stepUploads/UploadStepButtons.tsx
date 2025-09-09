import FileProcessor from "./components/FileProcessor";
import { useUploadSteps } from "./UploadStepContext";

export const UploadStepButtons = () => {
  const { currentStep, nextStep, previousStep } = useUploadSteps();

  if (currentStep === 1)
    return (
      <nav className="upload-files--nav">
        <button onClick={nextStep}>Next</button>
      </nav>
    );

  if (currentStep === 4)
    return (
      <nav className="upload-files--nav">
        <button onClick={previousStep}>back</button>
      </nav>
    );

  return (
    <nav className="upload-files--nav">
      <button onClick={previousStep}>back</button>

      {currentStep !== 2 && currentStep !== 3 && (
        <button onClick={nextStep}>Next</button>
      )}

      {currentStep === 2 && <FileProcessor />}
      {currentStep === 3 && <FileProcessor />}
    </nav>
  );
};
