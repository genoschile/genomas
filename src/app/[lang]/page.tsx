/* components */
import TeamCarrousel from "@/components/sections/section5/TeamCarrousel";
import Section1 from "@/components/sections/Section1";
import Section2 from "@/components/sections/Section2";
import Section3 from "@/components/sections/Section3";
import Section4 from "@/components/sections/Section4";
import HeaderLanding from "@/components/headers/HeaderLanding";
import { FooterLanding } from "@/components/footer/FooterLanding";

/* styles */
import "./page.css";

export default function Home() {
  return (
    <>
      <div className="layout">
        <HeaderLanding />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <TeamCarrousel />
      </div>
      <FooterLanding />
    </>
  );
}
