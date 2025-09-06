import { CurrentListProjectsSelect } from "./components/CurrentListProjectsSelect";
import { useUploadSteps } from "./UploadStepContext";
import "./components/dropdownWorkspace.css";

export const UploadStep1 = () => {
  const { register, errors } = useUploadSteps();

  return (
    <div className="dropdown-content">
      <h2>What project are you going to upload your files to?</h2>
      <CurrentListProjectsSelect />

      <input
        type="hidden"
        {...register("currentProjectId", {
          required: "You must select a project before continuing",
        })}
      />
      {errors.currentProjectId && (
        <p className="error-message">{errors.currentProjectId.message}</p>
      )}
    </div>
  );
};

export default UploadStep1;
