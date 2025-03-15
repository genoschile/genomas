"use client";

import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import "./section3.css";
import Section from "./section";

export default function Section3() {
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

  return (
    <Section className="section3">
      <div className="section3__content">
        <h2
          ref={h2Ref}
          className={`section3__title ${
            isH2Visible ? "visibleElement" : "hiddenElement"
          }`}
        >
          Turn Your Genomic Data Into Actionable Insights
        </h2>
        <p
          ref={pRef}
          className={`section3__description ${
            isPVisible ? "visibleElement" : "hiddenElement"
          }`}
        >
          Stop spending hours interpreting complex genetic files. With GENOMAS,
          gain reliable, data-driven answers using advanced AI tailored for
          genomic analysis.
        </p>

        <div className="section3__containerButtons">
          <button
            ref={button1Ref}
            className={`section3__button ${
              isButton1Visible ? "visibleElement" : "hiddenImage"
            }`}
          >
            See more
          </button>
        </div>

        <figure className="section3__image-container">
          <img
            ref={imgRef}
            src="/images/reportfile.png"
            alt="Genomic Report"
            className={`section3__image ${
              isImgVisible ? "visibleImage" : "hiddenImageRight"
            }`}
          />
        </figure>
      </div>
    </Section>
  );
}
