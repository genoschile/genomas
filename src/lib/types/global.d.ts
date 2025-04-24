import type { JWTPayload } from "jose"; 

export type Roles = "admin" | "user";

declare global {
  interface CustomJwtSessionClaims extends JWTPayload {
    userId: string;
    metadata: {
      role?: Roles;
    };
  }
}
