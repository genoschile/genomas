"use client";

import type { UserContextType } from "@/lib/types/contextTypes";
import { createContext, useState, useCallback, useEffect } from "react";

export const UserContext = createContext<UserContextType>({
  name: null,
  email: null,
  updateUser: () => {},
  id: null,
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("genomaUser");

    if (storedUser) {
      const { name, id } = JSON.parse(storedUser);
      setName(name);
      setEmail(email);
      setId(id);
    }
  }, []);

  const updateUser = useCallback(
    ({ name, id, email }: { name: string; id: number; email: string }) => {
      setName(name);
      setEmail(email);
      setId(id);

      localStorage.setItem("genomaUser", JSON.stringify({ name, id, email }));
    },
    []
  );

  return (
    <UserContext value={{ name, updateUser, email, id }}>
      {children}
    </UserContext>
  );
}

/* const [user, setUser] = useState<{
  name: string | null;
  email: string | null;
  id: number | null;
  isLogged: boolean;
}>({
  name: null,
  email: null,
  id: null,
  isLogged: false,
});

const updateUser = (updates: Partial<typeof user>) => {
  setUser((prev) => ({ ...prev, ...updates }));
};
 */
