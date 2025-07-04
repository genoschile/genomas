import { routes } from "@/lib/api/routes";
import { getLocalStorageOrganization } from "@utils/getLocalStorageOrganization";

export const getOrganizationData = async (resource: "users" | "groups") => {
  const organization = getLocalStorageOrganization();

  if (!organization) {
    throw new Error("Organización no encontrada en localStorage");
  }

  const res = await fetch(
    routes.getOrganizationResource(organization, resource)
  );

  if (!res.ok) {
    throw new Error(`Error al obtener ${resource}`);
  }

  return await res.json();
};
