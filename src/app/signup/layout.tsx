/* styles */
import "./page.css"

import Footer from "@/components/footer/FooterLanding";
import FeaturesHeader from "@/components/headers/FeaturesHeader";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <FeaturesHeader />
      <div className="loginLayout">{children}</div>
      <Footer />
    </>
  );
}
