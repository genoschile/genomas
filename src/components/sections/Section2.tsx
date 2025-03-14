"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import "./section2.css";
import Section from "./section";

export default function sectionTwo2() {
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { observe, unobserve, entries } = useIntersectionObserver();

  useEffect(() => {
    if (h1Ref.current) observe(h1Ref.current);
    if (pRef.current) observe(pRef.current);
    buttonRefs.current.forEach((button) => {
      if (button) observe(button);
    });

    return () => {
      if (h1Ref.current) unobserve(h1Ref.current);
      if (pRef.current) unobserve(pRef.current);
      buttonRefs.current.forEach((button) => {
        if (button) unobserve(button);
      });
    };
  }, []);

  const isVisible = entries.some(
    (entry) =>
      entry.isIntersecting &&
      (entry.target === h1Ref.current ||
        entry.target === pRef.current ||
        buttonRefs.current.includes(entry.target as HTMLButtonElement))
  );

  return (
    <Section>
      <main className="sectionTwo__content">
        {/* Título */}
        <h2
          ref={h1Ref}
          className={`sectionTwo__title ${
            isVisible
              ? "sectionTwo--visible"
              : "sectionTwo--hidden"
          }`}
        >
          Discover How GENOMAS Can Empower You
        </h2>

        {/* Párrafo */}
        <p
          ref={pRef}
          className={`sectionTwo__description ${
            isVisible
              ? "sectionTwo--visible"
              : "sectionTwo--hidden"
          }`}
        >
          GENOMAS offers a centralized platform for all your genomic data,
          ensuring your analyses are always synchronized, accessible, and
          secure.
        </p>

        {/* Botones */}
        <div className="sectionTwo__buttons">
          {[
            "Cancer Variants Analysis",
            "Germline Variants Analysis",
            "Bla Variants Analysis",
          ].map((text, index) => (
            <button
              key={index}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              className={`sectionTwo__button ${
                isVisible
                  ? "sectionTwo--visible"
                  : "sectionTwo--hidden"
              }`}
            >
              {text}
            </button>
          ))}
        </div>
      </main>
    </Section>
  );
}
