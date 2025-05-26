"use client";

import { useSessionContext } from "@/hooks/useSession";
import "./welcomeUser.css";

export function WelcomeUser() {
  const { user } = useSessionContext();

  const { name, email } = user || {};

  return (
    <p className="welcomeUser">
      {name ? `Welcome, ${name}!` : `Welcome: ${email}`}
    </p>
  );
}
