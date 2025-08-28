import "./uploadForm.css";
import { FooterModalUsersOptions } from "./FooterModalUsersOptions";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import {
  UploadForm as UploadInterfaceForm,
  useUploadSteps,
} from "./stepUploads/UploadStepContext";
import { SubmitHandler, useForm } from "react-hook-form";

const Step1 = dynamic(() => import("./stepUploads/Step1"), {
  loading: () => <div className="signup__loading">Loading...</div>,
  ssr: false,
});

const Step2 = dynamic(() => import("./stepUploads/Step2"), {
  loading: () => <div className="signup__loading">Loading...</div>,
  ssr: false,
});

const Step3 = dynamic(() => import("./stepUploads/Step3"), {
  loading: () => <div className="signup__loading">Loading...</div>,
  ssr: false,
});

export const UploadForm = () => {
  const { handleSubmit } = useForm<UploadInterfaceForm>();
  const { currentStep, nextStep, previousStep } = useUploadSteps();

  const onSubmit: SubmitHandler<UploadInterfaceForm> = async (data) => {
    console.log(data);
  };

  return (
    <div className="upload-files--container">
      <form className="signup__step" onSubmit={handleSubmit(onSubmit)}>
        <Suspense fallback={<div className="signup__loading">Loading...</div>}>
          {currentStep === 1 && <Step1 />}

          {currentStep === 2 && <Step2 />}

          {currentStep === 3 && <Step3 />}
        </Suspense>
      </form>
      <nav>
        <button onClick={previousStep}>back</button>
        <button onClick={nextStep}>Next</button>
      </nav>
      <FooterModalUsersOptions />
    </div>
  );
};
