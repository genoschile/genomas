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
      <button onClick={nextStep}>Next</button>
    </nav>
  );
};
