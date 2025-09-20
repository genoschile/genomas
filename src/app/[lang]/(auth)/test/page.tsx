"use client";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const { loginEnterprise, fetchWithAuth, logout } = useAuth();

  async function handleLogin() {
    await loginEnterprise("manzana@genomas.cl", "manzana1");
  }

  async function getMe() {
    const res = await fetchWithAuth("/api/auth/me");
    console.log(await res.json());
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={getMe}>Get Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
