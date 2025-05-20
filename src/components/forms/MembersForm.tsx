"use client";

import { useCallback, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./membersForm.css";
import { IoMail } from "react-icons/io5";

export const MembersForm = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const projectName = "Project Name";

  return (
    <form className="members-form">
      <search className="input-group">
        <h2>
          <mark>{projectName}</mark>
        </h2>
        <TextEmailAreaDetected
          setEmails={setEmails}
          emails={emails}
          setIsValid={setIsValid}
        />
      </search>

      <div className="seats-info">
        <div>
          <span>Guest seats remaining: 3</span>
          <span>Member seats remaining:</span>
        </div>
        <div className="invite-buttons">
          <button
            disabled={!isValid}
            type="button"
            className="invite-button guest"
          >
            Invite as Guest
          </button>
          <button
            disabled={!isValid}
            type="button"
            className="invite-button member"
          >
            Invite as Member
          </button>
        </div>
      </div>

      <PeopleWithAccess emails={emails} />

      <div role="alert" className="warning">
        <FaExclamationTriangle size={52} className="warning-icon" />
        <p>
          All content across the project is shared with all users of the
          project. Please share responsibly. We will take down illegally
          distributed content and terminate the associated workspace account for
          copyright infringement.
        </p>
      </div>
    </form>
  );
};

export const PeopleWithAccess = ({ emails }: { emails: string[] }) => {
  return (
    <section className="people-with-access">
      <h3>
        <mark>People with access</mark>
      </h3>
      <ul>
        {emails.length === 0 ? (
          <li>
            <p>YOU HAVE NOT INVITED ANYONE YET :D</p>
          </li>
        ) : (
          emails.map((email, index) => (
            <PeopleWithAccessItem key={index} email={email} />
          ))
        )}
      </ul>
    </section>
  );
};

export const PeopleWithAccessItem = ({ email }: { email: string }) => {
  return (
    <li>
      <figure>
        <img src="https://avatar.iran.liara.run/public" alt="" />
        <figcaption>
          <h4>{email}</h4>
          <p>Member</p>
        </figcaption>
      </figure>
      <PeopleWithAccessItemOptions />
    </li>
  );
};

const OPTIONS = ["Remove access", "Make admin", "Send reminder"];

export const PeopleWithAccessItemOptions = () => {
  const [selectedValue, setSelectedValue] = useState<string>(OPTIONS[0]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedValue(event.target.value);
    },
    []
  );

  return (
    <div className="dropdown-details">
      <select
        className="dropdown-select"
        value={selectedValue}
        onChange={handleChange}
      >
        {OPTIONS.map((option) => (
          <option
            key={option}
            value={option}
            className={`dropdown-option ${
              selectedValue === option ? "active" : ""
            }`}
          >
            {option}
            {selectedValue === option && <span className="tick">✔</span>}
          </option>
        ))}
      </select>
    </div>
  );
};

export const TextEmailAreaDetected = ({
  emails,
  setEmails,
  setIsValid,
}: {
  emails: string[];
  setEmails: (emails: string[]) => void;
  setIsValid: (isValid: boolean) => void;
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const email = inputValue.trim().replace(/,$/, "");
      if (isValidEmail(email) && !emails.includes(email)) {
        const updated = [...emails, email];
        setEmails(updated);
        setIsValid(true);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "") {
      // Eliminar el último email si el input está vacío
      const updated = emails.slice(0, -1);
      setEmails(updated);
      setIsValid(updated.length > 0);
    }
  };

  const removeEmail = (email: string) => {
    const updated = emails.filter((e) => e !== email);
    setEmails(updated);
    setIsValid(updated.length > 0);
  };

  const isValidEmail = (email: string) =>
    /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);

  return (
    <div className="email-input-wrapper">
      <div>
        {emails.map((email) => (
          <span key={email} className="email-chip">
            {email}
            <button onClick={() => removeEmail(email)}>&times;</button>
          </span>
        ))}
      </div>
      <fieldset>
        <legend aria-label="Ingresá los correos electrónicos">
          <IoMail style={{ marginRight: "0.5rem" }} aria-hidden="true" />
        </legend>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="ej: juan@mail.com, ana@mail.com"
        />
      </fieldset>
    </div>
  );
};
