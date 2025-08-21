import "./progress.css";

import { useSteps } from "./workflowContext";

export const StepWorkflowsProgress = () => {
  const { currentStep } = useSteps();

  return (
    <div className="signup__progress">
      <div
        className={`signup__progress-step ${
          currentStep >= 1 ? "signup__progress-step--active" : ""
        }`}
      >
        1
      </div>

      <div
        className={`signup__progress-line ${
          currentStep > 1 ? "signup__progress-line--active" : ""
        }`}
      />
      <div
        className={`signup__progress-step ${
          currentStep >= 2 ? "signup__progress-step--active" : ""
        }`}
      >
        2
      </div>

      <div
        className={`signup__progress-line ${
          currentStep > 2 ? "signup__progress-line--active" : ""
        }`}
      />
      <div
        className={`signup__progress-step ${
          currentStep === 3 ? "signup__progress-step--active" : ""
        }`}
      >
        3
      </div>
    </div>
  );
};
