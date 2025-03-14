"use client";

/* hooks */
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useRef, useState } from "react";

/* styles */
import "./section2.css";

/* components */
import Section from "./section";

const buttons = [
  { text: "Cancer Variants Analysis", href: "/cancer-variants" },
  { text: "Germline Variants Analysis", href: "/germline-variants" },
  { text: "Bla Variants Analysis", href: "/bla-variants" },
];

export default function sectionTwo2() {
  const h2Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRefs = useRef<HTMLDivElement | null>(null);

  const { observe, unobserve, entries } = useIntersectionObserver();

  const [isH2Visible, setIsH2Visible] = useState(false);
  const [isPVisible, setIsPVisible] = useState(false);
  const [isBoVisible, setIsBoVisible] = useState(false);

  useEffect(() => {
    const h2Element = h2Ref.current;
    const pElement = pRef.current;
    const dElement = buttonsRefs.current;

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
      if (entry.target === buttonsRefs.current)
        setIsBoVisible(entry.isIntersecting);
    });
  }, [entries]);

  return (
    <Section>
      <main className="sectionTwo__content">
        {/* Título */}
        <h2
          ref={h2Ref}
          className={`sectionTwo__title ${
            isH2Visible ? "visibleElement" : "hiddenElement"
          }`}
        >
          Discover How GENOMAS Can Empower You
        </h2>

        {/* Párrafo */}
        <p
          ref={pRef}
          className={`sectionTwo__description ${
            isPVisible ? "visibleElement" : "hiddenElement"
          }`}
        >
          GENOMAS offers a centralized platform for all your genomic data,
          ensuring your analyses are always synchronized, accessible, and
          secure.
        </p>

        {/* Botones */}
        <div ref={buttonsRefs} className="sectionTwo__buttons">
          {buttons.map((button, index) => (
            <a
              key={index}
              href={button.href}
              className={`sectionTwo__button ${
                isBoVisible ? "visibleElement" : "hiddenElement"
              }`}
            >
              {button.text}
            </a>
          ))}
        </div>
      </main>
    </Section>
  );
}
