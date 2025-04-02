import { IoIosAdd } from "react-icons/io";
import "./projectHeaderUser.css";

export function ProjectHeaderUser() {
  return (
    <header className="project__home--header">
      <h2>User Project</h2>
      <nav>
        <button>
          <IoIosAdd size="24" /> New
        </button>
        <button>Move To Trash</button>
      </nav>
    </header>
  );
}
