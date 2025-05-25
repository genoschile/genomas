export const getLocalStorageOrganization = (): string | null => {
  try {
    const raw = localStorage.getItem("genomaOrganization");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed?.id ?? null; 
  } catch (err) {
    console.error("Error parsing genomaOrganization from localStorage:", err);
    return null;
  }
};