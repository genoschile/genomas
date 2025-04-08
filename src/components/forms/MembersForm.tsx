"use client";

import { useEffect, useRef, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import "./membersForm.css";
import { IoMail } from "react-icons/io5";
import { createPortal } from "react-dom";
import ReactDOM from "react-dom";

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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Remove access");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [open]);

  const dropdown = (
    <ul
      className="dropdown-menu-float"
      style={{
        position: "fixed",
        top: position.top,
        left: position.left,
        zIndex: 100000,
      }}
    >
      {OPTIONS.map((option) => (
        <li key={option}>
          <button
            className={`dropdown-option ${selected === option ? "active" : ""}`}
            onClick={() => {
              setSelected(option);
              setOpen(false);
            }}
          >
            {option}
            {selected === option && <span className="tick">✔</span>}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="dropdown-details">
      <button
        className="dropdown-toggle"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        ref={buttonRef} // Asocia la referencia al botón
      >
        {selected}
      </button>
      {open && createPortal(dropdown, document.body)}
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
