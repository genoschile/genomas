import FileUpload from "@/components/fileUpload/FileUpload";
import "./page.css";

export default function Page() {
  return (
    <section className="upload-files">
      <article className="upload-files__container">
        <div className="upload-files__files-section">
          <h2 className="upload-files__title">
            Upload your VCF file and/or Clinical data (optional)
          </h2>
          <FileUpload />
          <footer className="upload-files__warnings">
            <small className="upload-files__warning-text">
              If you have clinical data for multiple samples, upload it as
              clinical.csv, following the example provided. Ensure that the
              sample identifiers match the identifiers in the variants file.
            </small>
            <strong className="upload-files__example-link">Example here</strong>
          </footer>
        </div>
        <div className="upload-files__tags-section">
          <h2 className="upload-files__tags-title">
            ¿Quieres agregar más información como tag?
          </h2>
          <textarea className="upload-files__tags-textarea"></textarea>
        </div>
      </article>

      <article className="upload-files__clinical-form">
        <h2 className="upload-files__clinical-form-title">
          Form of clinical data (optional)
        </h2>
        <form className="upload-files__form">
          <div className="upload-files__form-group">
            <label htmlFor="input1" className="upload-files__form-label">
              Input 1:
            </label>
            <textarea
              id="input1"
              name="input1"
              rows={4}
              cols={50}
              className="upload-files__form-textarea"
            />
          </div>
          <div className="upload-files__form-group">
            <label htmlFor="input2" className="upload-files__form-label">
              Input 2:
            </label>
            <textarea
              id="input2"
              name="input2"
              rows={4}
              cols={50}
              className="upload-files__form-textarea"
            />
          </div>
          <div className="upload-files__form-group">
            <label htmlFor="input3" className="upload-files__form-label">
              Input 3:
            </label>
            <textarea
              id="input3"
              name="input3"
              rows={4}
              cols={50}
              className="upload-files__form-textarea"
            />
          </div>
          <div className="upload-files__form-group">
            <label htmlFor="input4" className="upload-files__form-label">
              Input 4:
            </label>
            <textarea
              id="input4"
              name="input4"
              rows={4}
              cols={50}
              className="upload-files__form-textarea"
            />
          </div>
        </form>
      </article>
    </section>
  );
}
