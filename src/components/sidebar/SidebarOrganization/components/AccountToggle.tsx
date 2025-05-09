import { GrConfigure } from "react-icons/gr";

export function AccountToggle() {
  return (
    <header>
      <button>
        <img src="https://api.dicebear.com/9.x/notionists/svg" alt="avatar" />

        <div>
          <span>Bnejamin</span>
          <span>bastudillo.alarcon@gmail.com</span>
        </div>

        <GrConfigure className="icon" />
      </button>
    </header>
  );
}
