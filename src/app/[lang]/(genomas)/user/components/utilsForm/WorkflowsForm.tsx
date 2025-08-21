"use client";
import "./workflowsForm.css";
import { lazy, Suspense } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSteps } from "./workflowContext";
import { StepWorkflowsProgress } from "./StepWorkflowsProgress";

export type SignUpForm = {
  workflow?: string;
};

/* lazy */
const Step1 = lazy(() => import("./stepWorkflows/Step1"));
const Step2 = lazy(() => import("./stepWorkflows/Step2"));
const Step3 = lazy(() => import("./stepWorkflows/Step3"));

/*

* Step 1 => choose your pipeline or workflows
* Step 2 => choose your data source
* Step 3 => send data to api
*/

export const WorkflowsForm = () => {
  const { handleSubmit } = useForm<SignUpForm>();
  const { currentStep } = useSteps();

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <StepWorkflowsProgress />
      <form className="signup__step" onSubmit={handleSubmit(onSubmit)}>
        <Suspense fallback={<div className="signup__loading">Loading...</div>}>
          {currentStep === 1 && <Step1 />}

          {currentStep === 2 && <Step2 />}

          {currentStep === 3 && <Step3 />}
        </Suspense>
      </form>
    </div>
  );
};
