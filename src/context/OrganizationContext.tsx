"use client";

import { createContext, useState, useEffect, useCallback } from "react";

// Puedes mover este tipo a un archivo separado si lo usas en más lugares
type Organization = {
  id: string | null;
  name: string | null;
  email: string | null;
};

type OrganizationContextType = Organization & {
  updateOrganization: (org: {
    id: string;
    name: string;
    email: string;
  }) => void;
  logout: () => void;
};

// Contexto con valores iniciales
export const OrganizationContext = createContext<OrganizationContextType>({
  id: null,
  name: null,
  email: null,
  updateOrganization: () => {},
  logout: () => {},
});

export function OrganizationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [organization, setOrganization] = useState<Organization>({
    id: null,
    name: null,
    email: null,
  });

  // Cargar desde localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem("genomaOrganization");
    if (stored) {
      const parsed = JSON.parse(stored);
      setOrganization({
        id: parsed.id ?? null,
        name: parsed.name ?? null,
        email: parsed.email ?? null,
      });
    }
  }, []);

  // Actualizar organización y guardar en localStorage
  const updateOrganization = useCallback(
    (org: { id: string; name: string; email: string }) => {
      setOrganization(org);
      localStorage.setItem("genomaOrganization", JSON.stringify(org));
    },
    []
  );

  // Logout: borrar estado y localStorage
  const logout = useCallback(() => {
    setOrganization({ id: null, name: null, email: null });
    localStorage.removeItem("genomaOrganization");
  }, []);

  return (
    <OrganizationContext.Provider
      value={{
        ...organization,
        updateOrganization,
        logout,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}
