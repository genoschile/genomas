import { useSteps } from "../workflowContext";

export const Step2 = () => {
  const { previousStep, nextStep } = useSteps();

  return (
    <div>
      <h2>Step 2</h2>
      <div className="signup__actions">
        <button
          type="button"
          onClick={previousStep}
          className="signup__button signup__button--secondary"
        >
          Back
        </button>
        <button type="button" onClick={nextStep} className="signup__button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
