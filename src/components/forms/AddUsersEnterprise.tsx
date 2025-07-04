"use client";

import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";
import { routes } from "@/lib/api/routes";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { useState } from "react";
import { toast } from "react-toastify";

export const AddUsersEnterprise = () => {
  const { addUsers } = useDataTableUserEnterpriseContext();

  const [form, setForm] = useState({
    email: "",
    encryptedPassword: "",
    userType: "CLIENT",
    name: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const organizationId = getLocalStorageOrganization();

      if (!organizationId) {
        toast.error("Organization ID is, error interno.");
        return;
      }

      const res = await fetch(routes.addUserEnterprise(organizationId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          organizationId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.message || "Failed to add user."}`);
        setErrorMessage(`Failed to add user: ${errorData.message}`);
        return;
      }

      const data = await res.json();

      if (!data || !data.success) {
        toast.error("Error adding user.");
        setErrorMessage(`Failed to add user: ${data.message}`);
        return;
      }

      addUsers([data.data]);
      toast.success("User added successfully!");

      setForm({
        email: "",
        encryptedPassword: "",
        userType: "CLIENT",
        name: "",
      });
      setErrorMessage("");
    } catch (error) {
      toast.error("Error adding user.");
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "400px", margin: "0 auto" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem", width: "100%" }}
          />
        </label>

        <label>
          Name:
          <input
            type="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem", width: "100%" }}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="encryptedPassword"
            value={form.encryptedPassword}
            onChange={handleChange}
            required
            style={{ padding: "0.5rem", width: "100%" }}
          />
        </label>

        <label>
          Role:
          <select
            name="userType"
            value={form.userType}
            onChange={handleChange}
            style={{ padding: "0.5rem", width: "100%" }}
          >
            <option value="CLIENT">Client</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>

        <p>{errorMessage}</p>

        <button
          type="submit"
          style={{
            padding: "0.75rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
          }}
        >
          Add User
        </button>
      </form>
    </div>
  );
};
