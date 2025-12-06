import { ProjectContext } from "@/features/user/context/ProjectContext";
import { use } from "react";

export const useProjectContext = () => {
  const context = use(ProjectContext);

  if (!context) {
    throw new Error("useProjectContext");
  }

  return context;
};
