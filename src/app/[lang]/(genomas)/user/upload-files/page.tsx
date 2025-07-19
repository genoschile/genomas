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
        <h2 className="upload-files__title">
          Upload your VCF file and/or Clinical data (optional)
        </h2>
        <div className="upload-files--init">
          <FileSelector />
        </div>
        <ExampleFormClinical />
      </ArticleContainer>

      <ArticleContainer>
        <ListUploadedFiles />
      </ArticleContainer>
    </section>
  );
}
