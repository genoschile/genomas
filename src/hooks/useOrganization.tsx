import { OrganizationContext } from "@/context/OrganizationContext";
import { use } from "react";

export const useOrganizationContext = () => {
  const context = use(OrganizationContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
