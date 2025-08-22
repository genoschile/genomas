import { IoIosArrowForward } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useSteps } from "../workflowContext";
import Link from "next/link";

export const WorkflowsList = [
  {
    nombre: "Annomaf",
    description: "Workflow for Annomaf",
    href: "/content/annomaf",
  },
  {
    nombre: "BetaFlow",
    description: "Workflow for BetaFlow",
    href: "/content/2",
  },
];

export const Step1 = () => {
  const { register, errors, nextStep, setValue, trigger } = useSteps();

  const handleWorkflowSelect = async (workflowName: string) => {
    setValue("workflow", workflowName, { shouldValidate: true });
    const isValid = await trigger("workflow");
    if (isValid) {
      nextStep();
    }
  };

  return (
    <div>
      <h2>Step 1: Selecciona un workflow</h2>
      <hr />

      <ul className="workflows-list">
        {WorkflowsList.map((workflow, index) => (
          <li key={index}>
            <div>
              <h3>{workflow.nombre}</h3>
              <p>{workflow.description}</p>
            </div>
            <div>
              <Link type="button" href={workflow.href}>
                <IoInformationCircleOutline />
              </Link>
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
