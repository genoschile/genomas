"use client";

import "./addUsersEnterprise.css";
import { useDataTableUserEnterpriseContext } from "@/features/enterprise/context/DataTableUserEnterpriseContext";
import { useModalContext } from "@/features/modals/hooks/useModalsProject";
import { routes } from "@/lib/api/routes";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";

export const AddUsersEnterprise = () => {
  const { addUsers } = useDataTableUserEnterpriseContext();
  const { closeModal } = useModalContext();
  const [form, setForm] = useState({
    email: "",
    encryptedPassword: "",
    userType: "CLIENT",
    name: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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
      closeModal();

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
    <div className="add-users-enterprise">
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
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
          />
        </label>
        <label className="password-label-add-enterprise">
          Password:
          <div>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="encryptedPassword"
              value={form.encryptedPassword}
              onChange={handleChange}
              required
            />
            {isPasswordVisible ? (
              <FaEyeSlash
                className="eyes-icons"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoEyeSharp
                className="eyes-icons"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        </label>

        <label>
          Role:
          <select name="userType" value={form.userType} onChange={handleChange}>
            <option value="CLIENT">Client</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>

        <p>{errorMessage}</p>

        <button type="submit">Add User</button>
      </form>
    </div>
  );
};
