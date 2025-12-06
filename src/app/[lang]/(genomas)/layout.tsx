import { SessionContextProvider } from "@/features/auth/context/SessionContext";

export default async function GenomasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionContextProvider>{children}</SessionContextProvider>;
}
