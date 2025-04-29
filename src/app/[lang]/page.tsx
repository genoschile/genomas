/* components */
import TeamCarrousel from "@/components/sections/section5/TeamCarrousel";
import Section1 from "@/components/sections/Section1";
import Section2 from "@/components/sections/Section2";
import Section3 from "@/components/sections/Section3";
import Section4 from "@/components/sections/Section4";

/* styles */
import "./page.css";

export default function Home() {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <TeamCarrousel />
    </>
  );
}
