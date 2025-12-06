"use client";

import { useSessionContext } from "@/features/auth/hooks/useSession";

export function useFetchWithAuth() {
  const { accessToken, setAccessToken } = useSessionContext();

  async function fetchWithAuth(url: string, options: RequestInit = {}) {
    let res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    });

    if (res.status === 401) {
      const refreshRes = await fetch("/api/auth/refresh", {
        credentials: "include",
        method: "POST",
      });

      if (refreshRes.ok) {
        const { accessToken: newAccess } = await refreshRes.json();

        // Guardamos el nuevo token en el contexto y localStorage
        setAccessToken(newAccess);

        // Reintentamos la request original
        res = await fetch(url, {
          ...options,
          headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${newAccess}`,
          },
        });
      }
    }

    return res;
  }

  return { fetchWithAuth };
}
