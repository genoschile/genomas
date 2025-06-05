import { ImCloudUpload } from "react-icons/im";
import { FaDownload } from "react-icons/fa";
import { PiWarningOctagonFill } from "react-icons/pi";
import { MdOutlineAlignHorizontalLeft } from "react-icons/md";

export const UploadInstructions = ({
  setShowExample = () => {},
}: {
  setShowExample: (show: boolean) => void;
}) => {
  return (
    <div
      className="upload-instructions--overlay"
      onClick={() => setShowExample(false)}
    >
      <div
        className="upload-instructions"
        onClick={(e) => e.stopPropagation()} // Para que no se cierre al hacer clic dentro
      >
        <header>
          <h2 className="upload-instructions__title">
            CSV Files Upload Instructions
          </h2>

          <p>Do you need to analyze multiple files?</p>
          <small>
            In case of using multiple files, upload 2 CSV files with the
            following information:
          </small>
        </header>

        <article>
          <h2>Clinical Data Form</h2>
          <p>This file should include the basic information for each sample.</p>

          <p>
            Expected columns (you can add additional columns):
            <strong>
              <FaDownload />
              Sample ID, age, sex, disease, sample type, sequencing
            </strong>
            <br />
            Example:
            <a href="/path/to/clinical-data-template.csv" download>
              <strong>Download Clinical Data Template</strong>
            </a>
          </p>
        </article>

        <article>
          <h2>Clinical Data Form</h2>
          <p>This file should include the basic information for each sample.</p>

          <p>
            Expected columns (you can add additional columns):
            <strong>
              Sample ID, age, sex, disease, sample type, sequencing
            </strong>
            <br />
            Example:
            <a href="/path/to/clinical-data-template.csv" download>
              <strong>Download Clinical Data Template</strong>
            </a>
          </p>
        </article>

        <article className="upload-instructions__list">
          <ul>
            <li>
              <div>
                <span>
                  <MdOutlineAlignHorizontalLeft />
                </span>
                <span>
                  Make sure that the values in the "Sample Id" column match
                  exactly between the two files.
                </span>
              </div>
            </li>
            <li>
              <div>
                <span>
                  <ImCloudUpload />
                </span>
                <span>
                  Once both files are ready, drag and drop them here or select
                  them from your device.
                </span>
              </div>
            </li>
            <li>
              <div>
                <span>
                  <PiWarningOctagonFill />
                </span>
                <span>Only .csv files are accepted.</span>
              </div>
            </li>
          </ul>
        </article>
        <nav>
          <button onClick={() => setShowExample(false)}>Close</button>
          <button>Got it</button>
        </nav>
      </div>
    </div>
  );
};
