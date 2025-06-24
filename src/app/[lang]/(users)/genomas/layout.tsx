import { SessionContextProvider } from "@/context/SessionContext";

export default async function GenomasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionContextProvider>{children}</SessionContextProvider>;
}
