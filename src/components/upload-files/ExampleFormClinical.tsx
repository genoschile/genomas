import "./exampleFormClinical.css";

export const ExampleFormClinical = () => {
  return (
    <article className="upload-files__clinical-form">
      <h2 className="upload-files__clinical-form-title">
        Form of clinical data (optional)
      </h2>
      <form className="upload-files__form">
        <div className="upload-files__form-group">
          <label htmlFor="input1" className="upload-files__form-label">
            <span>ID sample</span>
          </label>
          <div>
            <textarea
              id="input1"
              name="input1"
              rows={4}
              cols={50}
              className="upload-files__form-textarea"
            />
          </div>
        </div>
        <div className="upload-files__form-group">
          <label htmlFor="input2" className="upload-files__form-label">
            Disease:
          </label>
          <div>
            <textarea
              id="input1"
              name="input1"
              rows={4}
              cols={50}
              className="upload-files__form-textarea"
            />
          </div>
        </div>
        <div className="upload-files__form-group">
          <label htmlFor="input3" className="upload-files__form-label">
            Type of sample:
          </label>
          <div>
            <textarea
              id="input1"
              name="input1"
              rows={4}
              cols={50}
              className="upload-files__form-textarea"
            />
          </div>
        </div>
        <div className="upload-files__form-group">
          <label htmlFor="input4" className="upload-files__form-label">
            Sequencing
          </label>
          <div>
            <textarea
              id="input1"
              name="input1"
              rows={4}
              cols={50}
              className="upload-files__form-textarea"
            />
          </div>
        </div>
      </form>
    </article>
  );
};
