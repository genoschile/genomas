"use client";

import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import "./workspaceform.css";
import { useUserWorkspacesContext } from "@/context/userWorkspacesContext";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";

export const WorkspaceForm = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const { selectedWorkspaceId, addWorkspace } = useUserWorkspacesContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (!selectedWorkspaceId) {
      setError("Please select a workspace.");
      return;
    }

    const currentUserId = getLocalStorageOrganization("genomaUser");

    if (!currentUserId) {
      setError("User not found. Please log in.");
      return;
    }

    const projectData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      workspaceId: selectedWorkspaceId,
      ownerId: currentUserId,
      users: [{ id: currentUserId }],
    };

    if (!workspaceName.trim()) {
      setError("Project name is required.");
      return;
    }
    setError("");

    try {
      // Simulate API call to create workspace
      const newWorkspace = {
        name: workspaceName,
        description: description.trim() || "No description provided",
      };

      console.log("Creating workspace:", newWorkspace);

      const response = await fetch(
        `/api/workspaces/${selectedWorkspaceId}/projects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(projectData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al crear el proyecto");
      }

      const data = await response.json();

      console.log("Workspace created response:", data);

      addWorkspace(data.data);

      console.log("Proyecto creado exitosamente");

      // faltan datos de que estan en el localStorage

      setWorkspaceName("");
      setDescription("");
      alert("Workspace created successfully!");
    } catch (error) {
      setError("Failed to create workspace. Please try again.");
    }
  };

  return (
    <form className="workspace-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          name="name"
          type="text"
          placeholder="Project Name"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <textarea
          name="description"
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

      <div className="workspace-form--button-group">
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
