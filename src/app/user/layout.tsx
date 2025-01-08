import { AuthContextProvider } from "@/context/authContext";
import { UserContextProvider } from "@/context/userContext";

export default function userLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </AuthContextProvider>
  );
}
