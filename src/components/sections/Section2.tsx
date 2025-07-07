"use client";

/* hooks */
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useEffect, useRef, useState } from "react";

/* components */
import Section from "./section";
import { useTranslations } from "@/context/I18nClientProvider";

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

  const { t } = useTranslations();

  const buttonsData = [
    { text: t("landing.section2.button.0"), href: "/cancer-variants" },
    { text: t("landing.section2.button.1"), href: "/germline-variants" },
    { text: t("landing.section2.button.2"), href: "/bla-variants" },
  ];

  const infoSectionData = {
    title: t("landing.section2.title"),
    description: t("landing.section2.description"),
  };

  return (
    <Section>
      <div className="section__content sectionTwo__content">
        {/* Título */}
        <h2
          ref={h2Ref}
          className={`section__title sectionTwo__title ${
            isH2Visible ? "visibleElement" : "hiddenElement"
          }`}
        >
          {infoSectionData.title}
        </h2>

        {/* Párrafo */}
        <p
          ref={pRef}
          className={`section__description sectionTwo__description ${
            isPVisible ? "visibleElement" : "hiddenElement"
          }`}
        >
          {infoSectionData.description}
        </p>

        {/* Botones */}
        <div ref={buttonsRefs} className="sectionTwo__buttons">
          {buttonsData.map((button, index) => (
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
      </div>
    </Section>
  );
}
