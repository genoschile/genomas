"use client";

import { routes } from "@/lib/api/routes";
import { useState } from "react";

type LoginUserResponse = {
  success: boolean;
  message: string;
  data?: {
    email: string;
    id: string;
    name: string;
    organizationId: string;
    userType: string;
    accessToken: string;
  };
};

type LoginOrganizationResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
    accessToken: string;
  };
};

export function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAccessToken(null);
  }

  async function loginEnterprise(email: string, password: string) {
    const res = await fetch(routes.loginEnterprise(), {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data: LoginOrganizationResponse = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }
    if (!data.data) {
      return {
        success: false,
        message: "Login failed",
      };
    }
    setAccessToken(data.data.accessToken);
    return { success: true, message: "Login successful", data: data.data };
  }

  async function loginUser(email: string, password: string) {
    const res = await fetch(routes.loginUser(), {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data: LoginUserResponse = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Login failed",
      };
    }

    if (!data.data) {
      return {
        success: false,
        message: "Login failed",
      };
    }

    setAccessToken(data.data.accessToken);
    return { success: true, message: "Login successful", data: data.data };
  }

  async function fetchWithAuth(url: string, options: RequestInit = {}) {
    let res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 401) {
      const refreshRes = await fetch("/api/auth/refresh", {
        credentials: "include",
        method: "POST",
      });
      if (refreshRes.ok) {
        const { accessToken: newAccess } = await refreshRes.json();
        setAccessToken(newAccess);
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

  return { accessToken, loginEnterprise, loginUser, fetchWithAuth, logout };
}
