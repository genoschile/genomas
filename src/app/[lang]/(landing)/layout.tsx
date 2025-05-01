import { FooterLanding } from "@/components/footer/FooterLanding";
import HeaderLanding from "@/components/headers/HeaderLanding";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function landingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLanding />
      <ViewTransition name="page">
        <main>{children}</main>
      </ViewTransition>
      <FooterLanding />
    </>
  );
}
