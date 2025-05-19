"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import type { UserContextType } from "@/lib/types/contextTypes";

export const UserContext = createContext<UserContextType>({
  name: null,
  email: null,
  updateUser: () => {},
  id: null,
  logout: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<{
    name: string | null;
    email: string | null;
    id: number | null;
  }>({
    name: null,
    email: null,
    id: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("genomaUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser({
        name: parsed.name ?? null,
        email: parsed.email ?? null,
        id: parsed.id ?? null,
      });
    }
  }, []);

  const updateUser = useCallback(
    ({ name, email, id }: { name: string; email: string; id: number }) => {
      const updated = { name, email, id };
      setUser(updated);
      localStorage.setItem("genomaUser", JSON.stringify(updated));
    },
    []
  );

  const logout = () => {
    setUser({ name: null, email: null, id: null });
    localStorage.removeItem("genomaUser");
  };

  return (
    <UserContext.Provider
      value={{
        logout,
        name: user.name,
        email: user.email,
        id: user.id,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
