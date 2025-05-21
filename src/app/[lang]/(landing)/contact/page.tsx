"use client";

import "./page.css";
import { Team } from "./components/Team";
import { OurStory } from "./components/OurStory";
import { AboutUsContainer } from "./components/AboutUsContainer";

export default function page() {
  return (
    <section className="contact--page">
      <AboutUsContainer />
      <OurStory />
      <Team />
    </section>
  );
}
