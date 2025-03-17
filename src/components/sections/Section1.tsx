"use client";

import { useEffect, useRef, useState } from "react";
import Carrousel from "../carrousel/Carrousel";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Section from "./section";
import "./section1.css";

const InfoSection = {
  title: "Genomics, Bioinformatics, AI Shaping the future of health",
  description:
    "Genomas is an AI-powered platform for decoding genetic data. It offers functional variant annotations, diagnostic insights,  treatment options, and an interactive chat to explore automated     reports with ease.",
};

export default function Section1() {
  const h2Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const carrouselRef = useRef<HTMLDivElement | null>(null);

  const { observe, unobserve, entries } = useIntersectionObserver();

  const [isH2Visible, setIsH2Visible] = useState(false);
  const [isPVisible, setIsPVisible] = useState(false);
  const [isDiVisible, setIsDiVisible] = useState(false);

  useEffect(() => {
    const h2Element = h2Ref.current;
    const pElement = pRef.current;
    const dElement = carrouselRef.current;

    if (h2Element) observe(h2Element);
    if (pElement) observe(pElement);
    if (dElement) observe(dElement);

    return () => {
      if (h2Element) unobserve(h2Element);
      if (pElement) unobserve(pElement);
      if (dElement) unobserve(dElement);
    };
  }, [observe, unobserve]); // No ponemos directamente h2Ref.current para evitar loops

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.target === h2Ref.current) setIsH2Visible(entry.isIntersecting);
      if (entry.target === pRef.current) setIsPVisible(entry.isIntersecting);
      if (entry.target === carrouselRef.current)
        setIsDiVisible(entry.isIntersecting);
    });
  }, [entries]);

  return (
    <Section className="section">
      <div className="section__content">
        {/* Contenedor principal */}
        <div className="section__main">
          {/* Título */}
          <h2
            ref={h2Ref}
            className={`section__title ${
              isH2Visible ? "visibleElement" : "hiddenElement"
            }`}
          >
            {InfoSection.title}
          </h2>

          {/* Descripción */}
          <p
            ref={pRef}
            className={`section__description ${
              isPVisible ? "visibleElement" : "hiddenElement"
            }`}
          >
            {InfoSection.description}
          </p>
        </div>

        <div
          ref={carrouselRef}
          className={`section__img ${
            isDiVisible ? "visibleElement" : "hiddenElement"
          }`}
        >
          <Carrousel />
        </div>
      </div>
    </Section>
  );
}
