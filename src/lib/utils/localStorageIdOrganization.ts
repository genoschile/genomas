export const localStorageIdOrganization = (): {
  id?: string;
  [key: string]: any;
} => {
  if (typeof window === "undefined") return {};

  const orgRaw = localStorage.getItem("genomaOrganization");
  try {
    return orgRaw ? JSON.parse(orgRaw) : {};
  } catch (error) {
    console.warn("Error parsing genomaOrganization from localStorage:", error);
    return {};
  }
};
