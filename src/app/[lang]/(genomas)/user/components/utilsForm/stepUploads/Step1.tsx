import FileSelector from "@/components/fileUpload/FileSelector";
import { ListUploadedFiles } from "../../../upload-files/components/ListUploadedFiles";

export const UploadStep1 = () => {
  return (
    <div>
      <div className="upload-files--init">
        <FileSelector />
      </div>
      <ListUploadedFiles />
    </div>
  );
};

export default UploadStep1;