import { FooterLanding } from "@/components/footer/FooterLanding";
import FeaturesHeader from "@/components/headers/FeaturesHeader";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FeaturesHeader />
      <div className="login_signup--Layout">{children}</div>
      <FooterLanding />
    </>
  );
}
