"use client";

import { useEffect, useRef, useState } from "react";
import Section from "../section";
import CarrouselCards from "./CarrouselCards";
import "./section5.css";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const InfoSection = {
  title: "Meet the Team Behind GENOMAS",
  description:
    "          Our interdisciplinary team of bioinformaticians, clinical physicians,           engineers, and researchers brings diverse expertise and insights.           Together, we deliver innovative solutions informed by experience and           tailored to address complex challenges in healthcare and genomics.",
};

const TeamSection = () => {
  const h2Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);

  const { observe, unobserve, entries } = useIntersectionObserver();

  const [isH2Visible, setIsH2Visible] = useState(false);
  const [isPVisible, setIsPVisible] = useState(false);

  useEffect(() => {
    const elements = [
      { ref: h2Ref, setVisible: setIsH2Visible },
      { ref: pRef, setVisible: setIsPVisible },
    ];

    elements.forEach(({ ref }) => ref.current && observe(ref.current));

    return () => {
      elements.forEach(({ ref }) => ref.current && unobserve(ref.current));
    };
  }, [observe, unobserve]);

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.target === h2Ref.current) setIsH2Visible(entry.isIntersecting);
      if (entry.target === pRef.current) setIsPVisible(entry.isIntersecting);
    });
  }, [entries]);

  return (
    <Section className="team-section">
      <div className="team-section__content">
        <h2
          ref={h2Ref}
          className={`team-section__title ${
            isH2Visible ? "visibleImage" : "hiddenImage"
          }`}
        >
          {InfoSection.title}
        </h2>
        <p
          ref={pRef}
          className={`team-section__description ${
            isPVisible ? "visibleImageRight" : "hiddenImageRight"
          }`}
        >
          {InfoSection.description}
        </p>
        <CarrouselCards />
      </div>
    </Section>
  );
};

export default TeamSection;
