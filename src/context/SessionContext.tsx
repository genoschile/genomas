"use client";

import { createContext, useState, useEffect, useCallback } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  userType?: "admin" | "user" | "guest";
}

export interface Organization {
  id: string;
  name: string;
  email: string;
}

interface SessionContextType {
  user: User | null;
  organization: Organization | null;
  isLogged: boolean;
  switchSession: (user: User, org: Organization) => void;
  logout: () => void;
  updateOrganization: (org: Organization) => void;
  clearOrganization: () => void;
  clearUser: () => void;
  updateUser: (user: User) => void;
}

export const SessionContext = createContext<SessionContextType>({
  user: null,
  organization: null,
  isLogged: false,
  switchSession: () => {},
  logout: () => {},
  updateOrganization: () => {},
  clearOrganization: () => {},
  clearUser: () => {},
  updateUser: () => {},
});

export function SessionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("genomaUser");
    const storedOrg = localStorage.getItem("genomaOrganization");
    const storedAuth = localStorage.getItem("genomaAuth");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedOrg) setOrganization(JSON.parse(storedOrg));
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      setIsLogged(parsed.isLogged);
    }
  }, []);

  const updateOrganization = useCallback((org: Organization) => {
    setOrganization(org);
    localStorage.setItem("genomaOrganization", JSON.stringify(org));
  }, []);

  const switchSession = useCallback((user: User, org: Organization) => {
    setUser(user);
    setOrganization(org);
    setIsLogged(true);

    localStorage.setItem("genomaUser", JSON.stringify(user));
    localStorage.setItem("genomaOrganization", JSON.stringify(org));
    localStorage.setItem("genomaAuth", JSON.stringify({ isLogged: true }));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOrganization(null);
    setIsLogged(false);

    localStorage.removeItem("genomaUser");
    localStorage.removeItem("genomaOrganization");
    localStorage.removeItem("genomaAuth");
  }, []);

  const clearOrganization = useCallback(() => {
    setOrganization(null);
    localStorage.removeItem("genomaOrganization");
  }, []);

  const updateUser = useCallback((user: User) => {
    setUser(user);
    localStorage.setItem("genomaUser", JSON.stringify(user));
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    localStorage.removeItem("genomaUser");
  }, []);

  return (
    <SessionContext.Provider
      value={{
        user,
        organization,
        isLogged,
        switchSession,
        logout,
        updateOrganization,
        clearOrganization,
        clearUser,
        updateUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
