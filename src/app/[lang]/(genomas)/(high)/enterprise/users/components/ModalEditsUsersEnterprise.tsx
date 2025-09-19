import "./editUsersEnterprise.css";
import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";
import { useModalContext } from "@/hooks/useModalsProject";
import { useEffect, useState } from "react";
import { routes } from "@/lib/api/routes";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";

export const ModalEditsUsersEnterprise = ({ userId }: { userId: string }) => {
  const { addUsers, users } = useDataTableUserEnterpriseContext();

  const findUserById = (id: string) => {
    return users.find((u) => u.id === id);
  };

  const { closeModal } = useModalContext();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    email: "",
    encryptedPassword: "",
    userType: "CLIENT",
    name: "",
  });

  useEffect(() => {
    if (userId) {
      const user = findUserById(userId);
      if (user) {
        setForm({
          email: user.email,
          encryptedPassword: "",
          userType: user.role,
          name: user.name,
        });
      }
    }
  }, [userId, users]);

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

        <button type="submit">Edit User</button>
      </form>
    </div>
  );
};
