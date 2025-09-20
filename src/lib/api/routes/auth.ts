import { BASE } from "@lib/api/config";

export const authRoutes = {
  loginUser: () => `${BASE}/api/users/login`,
  loginEnterprise: () => `${BASE}/api/users/login/enterprise`,
  loginAdmin: () => `${BASE}/api/admin/login`,
  signUp: () => `${BASE}/api/users/signup`,
  signUpEnterprise: () => `${BASE}/api/organization`,
  loginDefaultAdmin: () => `/api/users/defaultAdmin`,
};
