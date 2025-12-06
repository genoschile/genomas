"use client";

import "./page.css";
import { AboutUsContainer } from "./components/AboutUsContainer";
import { OurStory } from "./components/OurStory";
import { Team } from "./components/Team";

export const ContactPage = () => {
  return (
    <section className="contact--page">
      <AboutUsContainer />
      <OurStory />
      <Team />
    </section>
  );
};
