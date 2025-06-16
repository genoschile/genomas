export const getLocalStorageOrganization = (
  key: "genomaOrganization" | "genomaUser" = "genomaOrganization"
): string | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    return parsed?.id ?? null;
  } catch (err) {
    console.error(`Error parsing ${key} from localStorage:`, err);
    return null;
  }
};
