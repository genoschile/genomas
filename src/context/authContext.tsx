"use client";

import type { AuthContextType } from "@/lib/types/contextTypes";
import { createContext, useState, useCallback, useEffect } from "react";

const localStorageAuth = "genomaAuth";

export const AuthContext = createContext<AuthContextType>({
  isLogged: false,
  updateAuth: () => {},
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem(localStorageAuth);

    if (storedAuth) {
      const { isLogged } = JSON.parse(storedAuth);

      setIsLogged(isLogged);
    }
  }, []);

  const updateAuth = useCallback(({ isLogged }: { isLogged: boolean }) => {
    setIsLogged(isLogged);

    localStorage.setItem(localStorageAuth, JSON.stringify({ isLogged }));
  }, []);

  return <AuthContext value={{ isLogged, updateAuth }}>{children}</AuthContext>;
}
