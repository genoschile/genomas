import { use } from "react";
import { SessionContext } from "@/features/auth/context/SessionContext";

export const useSessionContext = () => {
  const context = use(SessionContext);

  if (!context) {
    throw new Error(
      "SessionContext errr - useSessionContext must be used within a SessionContextProvider"
    );
  }

  return context;
};
