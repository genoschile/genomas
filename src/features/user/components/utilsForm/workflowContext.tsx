import { createContext, useContext, useState, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { SignUpForm } from "./WorkflowsForm";

interface StepsContextProps {
  currentStep: number;
  nextStep: () => Promise<void>;
  previousStep: () => void;
  register: ReturnType<typeof useForm<SignUpForm>>["register"];
  errors: ReturnType<typeof useForm<SignUpForm>>["formState"]["errors"];
  setValue: ReturnType<typeof useForm<SignUpForm>>["setValue"]; 
  trigger: ReturnType<typeof useForm<SignUpForm>>["trigger"];   
}

const StepsContext = createContext<StepsContextProps | undefined>(undefined);

export const StepsProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    formState: { errors },
    trigger,
    setValue,
  } = useForm<SignUpForm>();

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
    <StepsContext.Provider
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
    </StepsContext.Provider>
  );
};

export const useSteps = () => {
  const ctx = useContext(StepsContext);
  if (!ctx) throw new Error("useSteps debe usarse dentro de StepsProvider");
  return ctx;
};
