"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import "./section4.css";
import Section from "./section";
import { useTranslations } from "@/context/I18nClientProvider";

const InfoSection = {
  title: "Turn Your Genomic Data Into Actionable Insights",
  description:
    "          Stop spending hours interpreting complex genetic files. With GENOMAS,           gain reliable, data-driven answers using advanced AI tailored for           genomic analysis.",
};

export default function Section4() {
  const h2Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const button1Ref = useRef<HTMLButtonElement | null>(null);

  const { observe, unobserve, entries } = useIntersectionObserver();

  const [isH2Visible, setIsH2Visible] = useState(false);
  const [isPVisible, setIsPVisible] = useState(false);
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [isButton1Visible, setIsButton1Visible] = useState(false);

  useEffect(() => {
    const elements = [
      { ref: h2Ref, setVisible: setIsH2Visible },
      { ref: pRef, setVisible: setIsPVisible },
      { ref: imgRef, setVisible: setIsImgVisible },
      { ref: button1Ref, setVisible: setIsButton1Visible },
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
      if (entry.target === imgRef.current)
        setIsImgVisible(entry.isIntersecting);
      if (entry.target === button1Ref.current)
        setIsButton1Visible(entry.isIntersecting);
    });
  }, [entries]);

    const { t } = useTranslations();
  
    const section4Data = {
      title: t("landing.section3.title"),
      description: t("landing.section3.description"),
      buttonText: t("landing.section3.button"),
      buttonHref: "/see-more",
    };

  return (
    <Section className="section3">
      <div className="section3__content alternate-layout">
        <h2
          ref={h2Ref}
          className={`section3__title ${
            isH2Visible ? "visibleElement" : "hiddenElement"
          }`}
        >
          {section4Data.title}
        </h2>
        <p
          ref={pRef}
          className={`section3__description ${
            isPVisible ? "visibleElement" : "hiddenElement"
          }`}
        >
          {section4Data.description}
        </p>

        <div className="section3__containerButtons">
          <button
            ref={button1Ref}
            className={`section3__button section4__button ${
              isButton1Visible ? "visibleElement" : "hiddenImage"
            }`}
          >
            {section4Data.buttonText}
          </button>
        </div>

        <figure className="section3__image-container">
          <img
            ref={imgRef}
            src="/images/reportfile.png"
            alt="Genomic Report"
            className={`section3__image ${
              isImgVisible ? "visibleImage" : "hiddenImageLeft"
            }`}
          />
        </figure>
      </div>
    </Section>
  );
}
