"use client";

import { useUserContext } from "@/hooks/useUserContext";
import "./welcomeUser.css";

export function WelcomeUser() {
  const { name, email } = useUserContext();

  return (
    <p className="welcomeUser">
      {name ? `Welcome, ${name}!` : `Welcome: ${email}`}
    </p>
  );
}
