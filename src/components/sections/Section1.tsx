"use client";

import { useEffect, useRef } from "react";
import Carrousel from "../carrousel/Carrousel";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import Section from "./section";
import "./section1.css";

export default function Section1() {
  const h2Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);

  const { observe, unobserve, entries } = useIntersectionObserver();

  useEffect(() => {
    if (h2Ref.current) {
      observe(h2Ref.current);
    }
    if (pRef.current) {
      observe(pRef.current);
    }
    return () => {
      if (h2Ref.current) {
        unobserve(h2Ref.current);
      }
      if (pRef.current) {
        unobserve(pRef.current);
      }
    };
  }, []);

  const isVisible = entries.some(
    (entry) =>
      (entry.target === h2Ref.current || entry.target === pRef.current) &&
      entry.isIntersecting
  );

  return (
    <Section className={`section`}>
      <div className="section__content">
        {/* Contenedor principal */}
        <div className="section__main">
          {/* Título */}
          <h2
            ref={h2Ref}
            className={`section__title ${
              isVisible ? "visible-element" : "hidden-element"
            }`}
          >
            Genomics, Bioinformatics, AI
            <br />
            Shaping the future of health
          </h2>

          {/* Descripción */}
          <p
            ref={pRef}
            className={`section__description ${
              isVisible ? "visible-element" : "hidden-element"
            }`}
          >
            Genomas is an AI-powered platform for decoding genetic data. It
            offers functional variant annotations, diagnostic insights,
            treatment options, and an interactive chat to explore automated
            reports with ease.
          </p>
        </div>

        <div className="section__img">
          <Carrousel />
        </div>
      </div>
    </Section>
  );
}
