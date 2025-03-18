import { useState } from "react";
import DropdownMenu from "../dropdowns/DropdownUser";
import { WelcomeUser } from "./WelcomeUser";
import "./userOptions.css";

export default function UserOptions() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="user-options">
      <WelcomeUser />
      <div className="user-options__dropdown-container">
        <img
          src="/images/user.png"
          alt="User"
          className="user-options__avatar"
          onClick={toggleDropdown}
        />
        {dropdownVisible && (
          <div className="user-options__dropdown-fallback">
            <DropdownMenu />
          </div>
        )}
      </div>
    </div>
  );
}
