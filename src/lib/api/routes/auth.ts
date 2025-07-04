import { BASE } from "@lib/api/config";

export const authRoutes = {
  login: () => `${BASE}/api/users/login`,
  loginEnterprise: () => `${BASE}/api/users/login/enterprise`,
  signUp: () => `${BASE}/api/users/signup`,
  signUpEnterprise: () => `${BASE}/api/organization`,
  loginDefaultAdmin: () => `/api/users/defaultAdmin`,
};
