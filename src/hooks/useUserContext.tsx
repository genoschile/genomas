import { UserContext } from "@/context/userContext";
import { use } from "react";

export const useUserContext = () => {
  const context = use(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
