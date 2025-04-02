import { FileStagingAreaContext } from "@/context/FileStagingAreaContext";
import { use } from "react";

export const useFileStagingAreaContext = () => {
  const context = use(FileStagingAreaContext);

  if (!context) {
    throw new Error("useFileStagingAreaContext Error");
  }

  return context;
}