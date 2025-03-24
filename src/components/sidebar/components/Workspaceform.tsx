"use client";

import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import "./workspaceform.css";

export const WorkspaceForm = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!workspaceName.trim()) {
      setError("Workspace name is required.");
      return;
    }
    setError("");
    alert("Workspace created!");
  };

  return (
    <div className="workspace-form">
      <div className="input-group">
        <input
          type="text"
          placeholder="Workspace Name"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <textarea
          placeholder="Workspace Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {error && (
        <div className="error-message">
          <FaExclamationCircle className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      <div className="button-group">
        <button className="skip-button">Skip for now</button>
        <button className="create-button" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};
