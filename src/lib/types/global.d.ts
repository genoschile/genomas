import type { JWTPayload } from "jose"; // asegúrate de importar esto donde lo uses

export type Roles = "admin" | "user";

declare global {
  interface CustomJwtSessionClaims extends JWTPayload {
    userId: string;
    metadata: {
      role?: Roles;
    };
  }
}
