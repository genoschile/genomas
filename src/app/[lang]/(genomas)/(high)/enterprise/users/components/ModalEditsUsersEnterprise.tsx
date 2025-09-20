import "./editUsersEnterprise.css";
import { useDataTableUserEnterpriseContext } from "@/context/enterprise/DataTableUserEnterpriseContext";
import { useModalContext } from "@/hooks/useModalsProject";
import { useEffect, useState } from "react";
import { routes } from "@/lib/api/routes";
import { getLocalStorageOrganization } from "@/utils/getLocalStorageOrganization";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useSessionContext } from "@/hooks/useSession";

export const ModalEditsUsersEnterprise = ({ userId }: { userId: string }) => {
  const { addUsers, users } = useDataTableUserEnterpriseContext();

  const { accessToken } = useSessionContext();

  const { closeModal } = useModalContext();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    email: "",
    encryptedPassword: "",
    confirmPassword: "",
    userType: "CLIENT",
    name: "",
  });

  const findUserById = (id: string) => {
    return users.find((u) => u.id === id);
  };

  useEffect(() => {
    if (userId) {
      const user = findUserById(userId);
      if (user) {
        setForm({
          email: user.email,
          encryptedPassword: "",
          confirmPassword: "",
          userType: user.userType,
          name: user.name,
        });
      }

      if (!user) {
        toast.error("User not found.");
        closeModal();
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

    if (form.encryptedPassword || form.confirmPassword) {
      if (form.encryptedPassword !== form.confirmPassword) {
        setErrorMessage("Las contraseñas no coinciden.");
        toast.error("Las contraseñas no coinciden.");
        return;
      }
    }

    try {
      console.log("Submitting form:", accessToken);

      const organizationId = getLocalStorageOrganization();

      if (!organizationId) {
        toast.error("Organization ID is, error interno.");
        return;
      }

      const payload: any = {
        email: form.email,
        name: form.name,
        userType: form.userType,
      };

      if (form.encryptedPassword) {
        payload.encryptedPassword = form.encryptedPassword;
      }

      const res = await fetch(routes.editUserFromOrganization(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ ...payload }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(`Error: ${errorData.message || "Failed to edit user."}`);
        setErrorMessage(`Failed to edit user: ${errorData.message}`);
        return;
      }

      const data = await res.json();

      if (!data || !data.success) {
        toast.error("Error edit user.");
        setErrorMessage(`Failed to edit user: ${data.message}`);
        return;
      }
    } catch (error) {
      toast.error("Error edit user.");
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
          New Password:
          <div>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="encryptedPassword"
              value={form.encryptedPassword}
              onChange={handleChange}
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

        <label className="password-label-add-enterprise">
          Repeat New Password:
          <div>
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
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
