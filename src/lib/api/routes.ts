import { BASE } from "./config";
import { authRoutes } from "./routes/auth";
import { genomasEnterpriseRoutes } from "./routes/genomasEnterprise";
import { genomasUserRoutes } from "./routes/genomasUser";

export const organizationRoutes = {
  getOrganizationResource: (orgId: string, resource: "users" | "groups") =>
    `${BASE}/api/organization/${orgId}/${resource}`,
};

export const routes = {
  ...authRoutes,
  ...genomasUserRoutes,
  ...genomasEnterpriseRoutes,
  ...organizationRoutes,
} as const;
