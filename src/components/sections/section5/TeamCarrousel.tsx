"use client";

import Section from "../section";
import CarrouselCards from "./CarrouselCards";
import "./section5.css"

const TeamSection = () => {
  return (
    <Section className="team-section">
      <div className="team-section__content">
        <h2 className="team-section__title">
          Meet the Team Behind GENOMAS
        </h2>
        <p className="team-section__description">
          Our interdisciplinary team of bioinformaticians, clinical physicians,
          engineers, and researchers brings diverse expertise and insights.
          Together, we deliver innovative solutions informed by experience and
          tailored to address complex challenges in healthcare and genomics.
        </p>
        <CarrouselCards />
      </div>
    </Section>
  );
};

export default TeamSection;