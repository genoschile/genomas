import { BASE } from "@lib/api/config";

export const authRoutes = {
  loginUser: () => `${BASE}/api/auth/user`,
  loginEnterprise: () => `${BASE}/api/auth/organization`,
  loginAdmin: () => `${BASE}/api/auth/admin`,
  signUp: () => `${BASE}/api/users/signup`,
  signUpEnterprise: () => `${BASE}/api/organization`,
  loginDefaultAdmin: () => `/api/auth/switch_admin`,
};
