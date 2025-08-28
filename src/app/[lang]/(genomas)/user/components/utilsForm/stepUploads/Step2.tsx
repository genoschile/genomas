import FileSelector from "@/components/fileUpload/FileSelector";
import { ListUploadedFiles } from "../../../upload-files/components/ListUploadedFiles";

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
