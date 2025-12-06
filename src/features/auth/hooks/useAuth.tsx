"use client";

import { routes } from "@/lib/api/routes";
import { useState } from "react";

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

  return { accessToken, loginEnterprise, loginUser, logout };
}
