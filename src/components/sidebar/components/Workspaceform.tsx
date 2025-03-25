"use client";

import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import "./workspaceform.css";

export const WorkspaceForm = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!workspaceName.trim()) {
      setError("Project name is required.");
      return;
    }
    setError("");
    alert("Project created!");
  };

  return (
    <form className="workspace-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Project Name"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <textarea
          placeholder="Project Description (Optional)"
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
        <button type="button" className="skip-button">
          Skip for now
        </button>
        <button type="submit" className="create-button">
          Create
        </button>
      </div>
    </form>
  );
};
