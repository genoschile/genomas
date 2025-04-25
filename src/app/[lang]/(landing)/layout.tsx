import { FooterLanding } from "@/components/footer/FooterLanding";
import "./layout.css";
import HeaderLanding from "@/components/headers/HeaderLanding";

export default function landingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLanding />
      <main className="landingLayout--main">{children}</main>
      <FooterLanding />
    </>
  );
}
