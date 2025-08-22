import "./uploadForm.css";
import FileSelector from "@/components/fileUpload/FileSelector";
import { ListUploadedFiles } from "../../upload-files/components/ListUploadedFiles";
import { FooterModalUsersOptions } from "./FooterModalUsersOptions";

export const UploadForm = () => {
  return (
    <div className="upload-files--container">
      <div className="upload-files--init">
        <FileSelector />
      </div>
      <ListUploadedFiles />
      <FooterModalUsersOptions />
    </div>
  );
};
