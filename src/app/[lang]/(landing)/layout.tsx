import "./layout.css";
import { FooterLanding } from "@/components/footer/FooterLanding";
import HeaderLanding from "@/components/headers/HeaderLanding";
import { unstable_ViewTransition as ViewTransition } from "react";
import { ConfigOptions } from "./ConfigOptions";

export default function landingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLanding />
      <ViewTransition name="page">
        <main className="home-main">{children}</main>
      </ViewTransition>
      <FooterLanding />
      <ConfigOptions />
    </>
  );
}
