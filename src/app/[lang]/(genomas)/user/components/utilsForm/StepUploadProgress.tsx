import "./progress.css";
import { useUploadSteps } from "./stepUploads/UploadStepContext";

interface StepWorkflowsProgressProps {
  totalSteps?: number;
}

export const StepUploadProgress: React.FC<StepWorkflowsProgressProps> = ({
  totalSteps = 4,
}) => {
  const { currentStep } = useUploadSteps();

  return (
    <div className="signup__progress">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;

        return (
          <div key={stepNumber} className="signup__progress-item">
            {/* Círculo */}
            <div
              className={`signup__progress-step ${
                currentStep >= stepNumber ? "signup__progress-step--active" : ""
              }`}
            >
              {stepNumber}
            </div>

            {stepNumber !== totalSteps && (
              <div
                className={`signup__progress-line ${
                  currentStep > stepNumber
                    ? "signup__progress-line--active"
                    : ""
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
