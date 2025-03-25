"use client";

import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./membersForm.css";

export const MembersForm = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Validar si hay al menos un correo válido
    const emailArray = value.split(",").map((email) => email.trim());
    const validEmails = emailArray.filter((email) =>
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)
    );

    setEmails(validEmails);
    setIsValid(validEmails.length > 0);
  };

  return (
    <form className="members-form">
      <div className="input-group">
        <textarea
          placeholder="Enter emails separated by commas"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      <div className="seats-info">
        <span>Guest seats remaining: 3</span>
        <span>Member seats remaining:</span>
        <div className="invite-buttons">
          <button type="button" className="invite-button guest">
            Invite as Guest
          </button>
          <button type="button" className="invite-button member">
            Invite as Member
          </button>
        </div>
      </div>

      <div className="warning">
        <FaExclamationTriangle 
        size={52}
        className="warning-icon" />
        <p>
          All content across the project is shared with all users of the
          project. Please share responsibly. We will take down illegally
          distributed content and terminate the associated workspace account for
          copyright infringement.
        </p>
      </div>

      <div className="action-buttons">
        <button type="button" className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="invite-submit" disabled={!isValid}>
          Invite
        </button>
      </div>
    </form>
  );
};
