import { GrConfigure } from "react-icons/gr";
import "./accountToggle.css";
import { useSessionContext } from "@/features/auth/hooks/useSession";

interface AccountToggleProps {
  role?: "admin" | "user";
}

export function AccountToggle({ role }: AccountToggleProps) {
  if (role === "admin") {
    return <AdminContentToggle />;
  }

  if (role === "user") {
    return <AccountContentToggle />;
  }

  return <div className="loading">Cargando...</div>;
}

export const AccountContentToggle = () => {
  const { organization } = useSessionContext();
  const { name, email } = organization || {};

  if (!name && !email) {
    return <div className="loading">Cargando organización...</div>;
  }

  return (
    <header className="sidebar-org--account-header">
      <button>
        <img src="https://api.dicebear.com/9.x/notionists/svg" alt="avatar" />

        <div>
          <span>{name}</span>
          <span>{email}</span>
        </div>

        <span>
          <GrConfigure className="icon" />
        </span>
      </button>
    </header>
  );
};

export const AdminContentToggle = () => {
  return (
    <header className="sidebar-org--account-header ">
      <button>
        <span>👑 Admin Panel</span>
      </button>
    </header>
  );
};
