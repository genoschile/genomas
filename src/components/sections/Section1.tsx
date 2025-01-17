"use client";

import { useEffect, useRef } from "react";
import Carrousel from "../Carrousel";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

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
    <section className="container mx-auto h-auto md:h-screen flex items-center">
      <div className="w-full px-8 py-6 flex flex-col justify-between">
        {/* Contenedor principal */}
        <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Título */}
          <h2
            ref={h2Ref}
            className={`${
              isVisible ? "visibleElement" : "hiddenElement"
            } text-4xl font-bold leading-tight text-gray-800 md:w-1/2`}
          >
            Genomics, Bioinformatics, AI
            <br />
            Shaping the future of health
          </h2>

          {/* Descripción */}
          <p
            ref={pRef}
            className={`${
              isVisible ? "visibleElement" : "hiddenElement"
            } text-lg text-gray-600 leading-relaxed md:w-1/2`}
          >
            Genomas is an AI-powered platform for decoding genetic data. It
            offers functional variant annotations, diagnostic insights,
            treatment options, and an interactive chat to explore automated
            reports with ease.
          </p>
        </div>

        <Carrousel />
      </div>
    </section>
  );
}
