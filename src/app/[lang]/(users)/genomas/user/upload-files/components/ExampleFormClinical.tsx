"use client";
import { useState } from "react";


import "./exampleFormClinical.css";
import { UploadInstructions } from "./UploadInstructions";

export const ExampleFormClinical = () => {
  const [showExample, setShowExample] = useState(false);

  return (
    <>
      <footer className="upload-files__warnings">
        <small className="upload-files__warning-text">
          If you have clinical data for multiple samples, upload it as
          clinical.csv, following the example provided. Ensure that the sample
          identifiers match the identifiers in the variants file.
        </small>
        <strong
          className="upload-files__example-link"
          onClick={() => setShowExample(true)}
        >
          Example here
        </strong>
      </footer>

      {showExample && <UploadInstructions setShowExample={setShowExample} />}
    </>
  );
};
