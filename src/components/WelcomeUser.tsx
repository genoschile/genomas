"use client"

import { useUserContext } from "@/hooks/useUserContext";

export function WelcomeUser() {
  const { name, email } = useUserContext();

  return (
    <p className="text-lg font-bold hidden sm:block">
      {name ? `Bienvenido, ${name}!` : `Bienvenido: ${email}`}
    </p>
  );
}
