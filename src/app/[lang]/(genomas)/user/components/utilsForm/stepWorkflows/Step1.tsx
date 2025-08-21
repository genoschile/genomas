import { IoIosArrowForward } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useSteps } from "../workflowContext";

export const WorkflowsList = [
  { nombre: "Annomaf", description: "Workflow for Annomaf" },
  { nombre: "BetaFlow", description: "Workflow for BetaFlow" },
];

export const Step1 = () => {
  const { register, errors, nextStep, setValue, trigger } = useSteps();

  const handleWorkflowSelect = async (workflowName: string) => {
    setValue("workflow", workflowName, { shouldValidate: true });
    const isValid = await trigger("workflow"); // valida solo este campo
    if (isValid) {
      nextStep();
    }
  };

  return (
    <div>
      <h2>Step 1: Selecciona un workflow</h2>

      <ul>
        {WorkflowsList.map((workflow, index) => (
          <li key={index}>
            <div>
              <h3>{workflow.nombre}</h3>
              <p>{workflow.description}</p>
            </div>
            <div>
              <button type="button">
                <IoInformationCircleOutline />
              </button>
              <button
                type="button"
                onClick={() => handleWorkflowSelect(workflow.nombre)}
                className="signup__button"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <input
        type="hidden"
        {...register("workflow", {
          required: "Debes seleccionar un workflow antes de continuar",
        })}
      />

      {errors.workflow && (
        <p style={{ color: "red" }}>{errors.workflow.message}</p>
      )}
    </div>
  );
};

export default Step1;
