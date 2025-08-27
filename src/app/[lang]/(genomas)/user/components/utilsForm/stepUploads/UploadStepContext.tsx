import { createContext, useContext, useState, ReactNode } from "react";
import { useForm } from "react-hook-form";

export interface UploadForm {
  files: File[];
}

interface StepsContextProps {
  currentStep: number;
  nextStep: () => Promise<void>;
  previousStep: () => void;
  register: ReturnType<typeof useForm<UploadForm>>["register"];
  errors: ReturnType<typeof useForm<UploadForm>>["formState"]["errors"];
  setValue: ReturnType<typeof useForm<UploadForm>>["setValue"];
  trigger: ReturnType<typeof useForm<UploadForm>>["trigger"];
}

const UploadStepsContext = createContext<StepsContextProps | undefined>(undefined);

export const UploadStepsProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<UploadForm>();

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <UploadStepsContext.Provider
      value={{
        currentStep,
        nextStep,
        previousStep,
        register,
        errors,
        setValue,
        trigger,
      }}
    >
      {children}
    </UploadStepsContext.Provider>
  );
};

export const useUploadSteps = () => {
  const ctx = useContext(UploadStepsContext);
  if (!ctx) throw new Error("useUploadSteps debe usarse dentro de UploadStepsProvider");
  return ctx;
};
