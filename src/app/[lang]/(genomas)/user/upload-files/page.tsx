/* styles */
import "./page.css";

/* components */
import FileSelector from "@/components/fileUpload/FileSelector";

import { ExampleFormClinical } from "./components/ExampleFormClinical";
import { ListUploadedFiles } from "./components/ListUploadedFiles";
import { ArticleContainer } from "@/components/container/ProjectHomeArticleContainer";

export default function Page() {
  return (
    <section>
      <ArticleContainer>
        <div className="" style={{ display: "flex", flexDirection: "column" }}>
          <h2 className="upload-files__title">
            Upload your VCF file and/or Clinical data (optional)
          </h2>
          <ExampleFormClinical />
        </div>
        <div className="upload-files--init">
          <FileSelector />
        </div>
        <ListUploadedFiles />
      </ArticleContainer>
    </section>
  );
}
