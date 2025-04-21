import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { JWT_SECRET } from "@Config/env";

const key = new TextEncoder().encode(JWT_SECRET);

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as "lax" | "strict" | "none",
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(
  payload: CustomJwtSessionClaims
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as { userId: number | string };
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieValue = await cookies();
  const cookieGetValue = cookieValue.get(cookie.name)?.value;

  if (!cookieGetValue) return null;
  return decrypt(cookieGetValue);
}

export async function setSession(userId: string, metadata?: any) {
  const session = await encrypt({ userId, metadata });
  const expires = new Date(Date.now() + cookie.duration);

  const cookieValue = await cookies();

  cookieValue.set(cookie.name, session, {
    ...cookie.options,
    expires,
  });
}

export async function removeSession() {
  const cookieValue = await cookies();
  cookieValue.delete(cookie.name);
}
