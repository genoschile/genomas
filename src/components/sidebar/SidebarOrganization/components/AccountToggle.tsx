import { GrConfigure } from "react-icons/gr";

import "./accountToggle.css";

export function AccountToggle() {
  return (
    <header className="sidebar-org--account-header">
      <button>
        <img src="https://api.dicebear.com/9.x/notionists/svg" alt="avatar" />

        <div>
          <span>Bnejamin</span>
          <span>bastudillo.alarcon@gmail.com</span>
        </div>

        <span>
          <GrConfigure className="icon" />
        </span>
      </button>
    </header>
  );
}
