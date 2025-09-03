import FileSelector from "@/components/fileUpload/FileSelector";
import { ListUploadedFiles } from "./components/ListUploadedFiles";

export const UploadStep2 = () => {
  return (
    <>
      <div className="upload-files--init">
        <FileSelector />
      </div>
    </>
  );
};

export default UploadStep2;
