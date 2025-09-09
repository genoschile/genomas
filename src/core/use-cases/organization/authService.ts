export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  let token = localStorage.getItem("accessToken");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  const newToken = res.headers.get("Authorization")?.replace("Bearer ", "");
  if (newToken) {
    localStorage.setItem("accessToken", newToken);
  }

  if (res.status === 401) {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    return null;
  }

  return res.json();
}
