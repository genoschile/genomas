import { IoIosHelpCircleOutline } from "react-icons/io";
import "./plan.css";

export function Plan() {
  return (
    <footer className="sidebar-org--plan">
      <div>
        <div>
          <p>Administrador</p>
          <p>Consutas al</p>
        </div>

        <button>
          <IoIosHelpCircleOutline />
        </button>
      </div>
    </footer>
  );
}
