import { CurrentListProjectsSelect } from "./components/CurrentListProjectsSelect";
import "./components/dropdownWorkspace.css";

export const UploadStep1 = () => {
  return (
    <>
      <h2>What project are you going to upload your files to?</h2>
      <div className="dropdown-content">
        <CurrentListProjectsSelect />
      </div>
    </>
  );
};

export default UploadStep1;
