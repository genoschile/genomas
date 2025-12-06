import { IProject } from "@/lib/types/contextTypes";
import { createContext, useContext, useState, ReactNode, JSX } from "react";
import { useForm } from "react-hook-form";

export interface CustomFile {
  name: string;
  path: string;
  size: number;
  type?: string;
  accepted: boolean;
  message?: string;
  progress?: number;
}

import {
  FaSpinner,
  FaClock,
  FaDatabase,
  FaCheckCircle,
  FaExclamationTriangle,
  FaBan,
  FaPlay,
  FaCloudUploadAlt,
  FaTimesCircle,
} from "react-icons/fa";

export const UploadStatus = {
  IDLE: "idle", // Esperando la acción del usuario
  STAGED_IDLE: "staged_idle", // Archivos subidos, aún no procesados
  PENDING: "pending", // Procesando archivos
  UPLOAD_DB: "upload_db", // Subiendo archivos a la base de datos
  UPLOAD_ERROR: "upload_error", // Error al subir archivos
  UPLOAD_SUCCESS: "upload_success", // Carga exitosa de archivos
  UPLOAD_CANCELLED: "upload_cancelled", // Carga cancelada por el usuario
  UPLOAD_RESUME: "upload_resume", // Reanudar carga de archivos
};

export interface UploadForm {
  currentProjectId: string;
  files: File[];
  decompressFiles: CustomFile[];
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
  setError: ReturnType<typeof useForm<UploadForm>>["setError"];
  control: ReturnType<typeof useForm<UploadForm>>["control"];
  currentProject: IProject | null;
  setCurrentProject: (project: IProject | null) => void;
  ChangeCurrentProject: (project: IProject | null) => void;
  hasAutoAdvanced: boolean;
  handleChangeAutoAdvance: (value: boolean) => void;
  goToStep: (step: number) => void;
  uploadStatus: string;
  UploadStatus: typeof UploadStatus;
  setUploadStatus: (status: string) => void;
  renderUploadIcon: () => JSX.Element;
  getButtonIcon: () => JSX.Element | null;
  getButtonLabel: () => string;
}

const UploadStepsContext = createContext<StepsContextProps | undefined>(
  undefined
);

export const UploadStepsProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);
  const [hasAutoAdvanced, setHasAutoAdvanced] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>(UploadStatus.IDLE);

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

  const goToStep = (step: number) => {
    const validStep = Math.max(1, Math.min(step, 4));
    setCurrentStep(validStep);
  };

  const renderUploadIcon = () => {
    switch (uploadStatus) {
      case UploadStatus.PENDING:
        return <FaSpinner className="file-upload--icon rotate" size={50} />;

      case UploadStatus.STAGED_IDLE:
        return <FaClock className="file-upload--icon" size={50} />;

      case UploadStatus.UPLOAD_DB:
        return <FaDatabase className="file-upload--icon" size={50} />;

      case UploadStatus.UPLOAD_SUCCESS:
        return (
          <FaCheckCircle className="file-upload--icon success" size={50} />
        );

      case UploadStatus.UPLOAD_ERROR:
        return (
          <FaExclamationTriangle
            className="file-upload--icon error"
            size={50}
          />
        );

      case UploadStatus.UPLOAD_CANCELLED:
        return <FaBan className="file-upload--icon cancelled" size={50} />;

      case UploadStatus.UPLOAD_RESUME:
        return <FaPlay className="file-upload--icon resume" size={50} />;

      case UploadStatus.IDLE:
      default:
        return <FaCloudUploadAlt className="file-upload--icon" size={50} />;
    }
  };

  const getButtonIcon = () => {
    switch (uploadStatus) {
      case UploadStatus.IDLE:
      case UploadStatus.STAGED_IDLE:
        return <FaPlay />;
      case UploadStatus.PENDING:
        return <FaSpinner className="rotate" />;
      case UploadStatus.UPLOAD_DB:
        return <FaSpinner className="rotate" />;
      case UploadStatus.UPLOAD_SUCCESS:
        return <FaCheckCircle color="green" />;
      case UploadStatus.UPLOAD_ERROR:
        return <FaTimesCircle color="red" />;
      default:
        return null;
    }
  };

  const getButtonLabel = () => {
    switch (uploadStatus) {
      case UploadStatus.IDLE:
      case UploadStatus.STAGED_IDLE:
        return "Subir archivo ZIP";
      case UploadStatus.PENDING:
        return "Procesando ZIP...";
      case UploadStatus.UPLOAD_DB:
        return "Subiendo...";
      case UploadStatus.UPLOAD_SUCCESS:
        return "Carga completada";
      case UploadStatus.UPLOAD_ERROR:
        return "Reintentar carga";
      default:
        return "Cargar";
    }
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
        goToStep,
        uploadStatus,
        setUploadStatus,
        renderUploadIcon,
        UploadStatus,
        getButtonIcon,
        getButtonLabel,
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
