import { AuthContext } from "@/context/authContext";
import { use } from "react";

export const useUserContext = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
