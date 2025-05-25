import { FileStagingAreaProvider } from "@/context/FileStagingAreaContext";
import { UploadStatusProvider } from "@/context/UploadStatusContext";

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FileStagingAreaProvider>
      <UploadStatusProvider>{children}</UploadStatusProvider>
    </FileStagingAreaProvider>
  );
}
