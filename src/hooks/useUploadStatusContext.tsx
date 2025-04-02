import { UploadStatusContext } from "@/context/UploadStatusContext";
import { use } from "react";

export const useUploadStatusContext = () => {
  const context = use(UploadStatusContext);

  if (!context) {
    throw new Error("UploadStatusContext Error");
  }

  return context;
};
