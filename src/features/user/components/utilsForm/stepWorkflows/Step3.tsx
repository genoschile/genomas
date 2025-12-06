import { useSteps } from "../workflowContext";

export const Step3 = () => {
  const { previousStep } = useSteps();
  return (
    <div>
      <h2>Step 3</h2>
      <div className="signup__actions">
        <button
          onClick={previousStep}
          className="signup__button signup__button--secondary"
        >
          Back
        </button>
        <button type="submit" className="signup__button">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Step3;
