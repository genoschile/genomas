import { FooterLanding } from "@/features/landing/components/FooterLanding";
import { HeaderLanding } from "@/features/landing/components/HeaderLanding";
import { ViewTransition } from "react";
import { ConfigOptions } from "@/features/landing/components/ConfigOptions";

export default function landingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderLanding />
      <ViewTransition name="page">
        <main
          style={{
            display: "grid",
            gap: "2rem",
          }}
        >
          {children}
        </main>
      </ViewTransition>
      <FooterLanding />
      <ConfigOptions />
    </>
  );
}
