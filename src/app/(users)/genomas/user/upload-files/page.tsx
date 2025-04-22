import FileUpload from "@/components/fileUpload/FileUpload";
import "./page.css";
import { UploadFilesTags } from "@/components/upload-files/UploadFilesTags";
import { ExampleFormClinical } from "@/components/upload-files/ExampleFormClinical";

/*

cambiar el icon al subir color verde de ok! al presubir 
generar estados (presub stagging - al apretar load validar id?)


si me suben multiples archivos cambiar visualización a una matriz
css columnas predeterminadas
edad
sexo
id
enfermedad
type
type secuenc
type fuente
botoncito de más

*/

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
      </article>
      <ExampleFormClinical />

      {/* <UploadFilesTags /> */}
    </section>
  );
}
