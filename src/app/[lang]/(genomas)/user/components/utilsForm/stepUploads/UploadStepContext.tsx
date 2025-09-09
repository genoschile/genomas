import { IProject } from "@/lib/types/contextTypes";
import { createContext, useContext, useState, ReactNode } from "react";
import { useForm } from "react-hook-form";

export interface UploadForm {
  currentProjectId: string;
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
  watch: ReturnType<typeof useForm<UploadForm>>["watch"];
  currentProject: IProject | null;
  setCurrentProject: (project: IProject | null) => void;
  ChangeCurrentProject: (project: IProject | null) => void;
  control: ReturnType<typeof useForm<UploadForm>>["control"];
  hasAutoAdvanced: boolean;
  handleChangeAutoAdvance: (value: boolean) => void;
  setError: ReturnType<typeof useForm<UploadForm>>["setError"];
}

const UploadStepsContext = createContext<StepsContextProps | undefined>(
  undefined
);

export const UploadStepsProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);
  const [hasAutoAdvanced, setHasAutoAdvanced] = useState(false);

  const handleChangeAutoAdvance = (value: boolean) => {
    setHasAutoAdvanced(!value);
  };

  const ChangeCurrentProject = (project: IProject | null) => {
    setCurrentProject(project);
  };
  const {
    register,
    formState: { errors },
    trigger,
    setValue,
    watch,
    control,
    setError,
  } = useForm<UploadForm>();

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
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
        currentProject,
        setCurrentProject,
        ChangeCurrentProject,
        watch,
        control,
        hasAutoAdvanced,
        handleChangeAutoAdvance,
        setError,
      }}
    >
      {children}
    </UploadStepsContext.Provider>
  );
};

export const useUploadSteps = () => {
  const ctx = useContext(UploadStepsContext);
  if (!ctx)
    throw new Error("useUploadSteps debe usarse dentro de UploadStepsProvider");
  return ctx;
};
