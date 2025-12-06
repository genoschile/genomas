/* components */
import { FooterLanding } from "@/features/landing/components/FooterLanding";
import FeaturesHeader from "@/components/headers/FeaturesHeader";

/* context */
import { SessionContextProvider } from "@/features/auth/context/SessionContext";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionContextProvider>
      <FeaturesHeader />
      <main className="login_signup--Layout">{children}</main>
      <FooterLanding />
    </SessionContextProvider>
  );
}
