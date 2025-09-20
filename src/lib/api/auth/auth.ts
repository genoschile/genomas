import { SignJWT, jwtVerify } from "jose";

const ACCESS_TOKEN_SECRET = new TextEncoder().encode(
  process.env.ACCESS_TOKEN_SECRET!
);
const REFRESH_TOKEN_SECRET = new TextEncoder().encode(
  process.env.REFRESH_TOKEN_SECRET!
);

// export interface AuthPayload extends JWTPayload {}

export type AuthPayload = {
  id: string;
  type: "user" | "organization";
  userType?: "admin" | "client";
  role?: "OWNER" | "ADMIN" | "EDITOR" | "VIEWER";
} & Record<string, unknown>;

export async function generateAccessToken(payload: AuthPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("15m")
    .sign(ACCESS_TOKEN_SECRET);
}

export async function generateRefreshToken(payload: AuthPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(REFRESH_TOKEN_SECRET);
}

export async function verifyAccessToken(token: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify(token, ACCESS_TOKEN_SECRET);
  return payload as AuthPayload; // casteo seguro
}

export async function verifyRefreshToken(token: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify(token, REFRESH_TOKEN_SECRET);
  return payload as AuthPayload; // casteo seguro
}
