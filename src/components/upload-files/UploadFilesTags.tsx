import "./uploadFilesTags.css"

export const UploadFilesTags = () => {
  return (
    <div className="upload-files__tags-section">
      <h2 className="upload-files__tags-title">
        ¿Quieres agregar más información como tag?
      </h2>
      <textarea className="upload-files__tags-textarea"></textarea>
    </div>
  );
};
