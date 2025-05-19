import { GrConfigure } from "react-icons/gr";

import "./accountToggle.css";
import { useOrganizationContext } from "@/hooks/useOrganization";

export function AccountToggle() {
  const { name, email } = useOrganizationContext();

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
}
