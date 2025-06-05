/* styles */
import "./page.css";

/* components */
import FileSelector from "@/components/fileUpload/FileSelector";

import { ExampleFormClinical } from "./components/ExampleFormClinical";
import { ListUploadedFiles } from "./components/ListUploadedFiles";

export default function Page() {
  return (
    <section className="upload-files">
      <article className="upload-files__container">
        <div className="upload-files__files-section">
          <h2 className="upload-files__title">
            Upload your VCF file and/or Clinical data (optional)
          </h2>
          <div className="upload-files--init">
            <FileSelector />
          </div>
          <ExampleFormClinical />
        </div>
      </article>

      <article>
        <ListUploadedFiles />
      </article>
    </section>
  );
}
