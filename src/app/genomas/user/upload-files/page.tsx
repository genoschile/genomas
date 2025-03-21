import FileUpload from "@/components/fileUpload/FileUpload";
import "./page.css";

export default function page() {
  return (
    <section className="upload-files__section">
      <article>
        <div className="upload-files__files">
          <h2 className="upload-files__title">
            Upload your VCF file and/or Clinical data (optional)
          </h2>
          <FileUpload />
          <footer className="upload-files__warnings">
            <small>
              If you have clinical data for multiple samples, upload it as
              clinical.csv, following the example provided. Ensure that the
              sample identifiers match the identifiers in the variants file.
            </small>
            <strong>Example here</strong>
          </footer>
        </div>
        <div className="upload-files__tags">
          <h2>¿Quieres agregar más información como tag?</h2>
          <textarea></textarea>
        </div>
      </article>

      <article>
        <h2>Form of clinical data (optional)</h2>
        <form>
          <div>
            <label htmlFor="input1">Input 1:</label>
            <textarea id="input1" name="input1" rows={4} cols={50} />
          </div>
          <div>
            <label htmlFor="input2">Input 2:</label>
            <textarea id="input2" name="input2" rows={4} cols={50} />
          </div>
          <div>
            <label htmlFor="input3">Input 3:</label>
            <textarea id="input3" name="input3" rows={4} cols={50} />
          </div>
          <div>
            <label htmlFor="input4">Input 4:</label>
            <textarea id="input4" name="input4" rows={4} cols={50} />
          </div>
        </form>
      </article>
    </section>
  );
}
