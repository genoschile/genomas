"use client"

import React, { useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function Section3() {
  const h2Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const button1Ref = useRef<HTMLButtonElement | null>(null);
  const button2Ref = useRef<HTMLButtonElement | null>(null);

  const { observe, unobserve, entries } = useIntersectionObserver();

  useEffect(() => {
    const elements = [h2Ref.current, pRef.current, imgRef.current, button1Ref.current, button2Ref.current];
    elements.forEach((element) => {
      if (element) observe(element);
    });

    return () => {
      elements.forEach((element) => {
        if (element) unobserve(element);
      });
    };
  }, [observe, unobserve]);

  const isVisible = (ref: React.RefObject<HTMLElement>) =>
    entries.some((entry) => entry.target === ref.current && entry.isIntersecting);

  return (
    <section className="container mx-auto px-8 py-8 md:h-screen flex flex-col items-center md:flex-row">
      {/* Contenido Izquierdo */}
      <div className="flex-1 text-left space-y-6">
        <h2
          ref={h2Ref}
          className={`${
            isVisible(h2Ref) ? 'visibleElement' : 'hiddenElement'
          } text-3xl md:text-4xl font-bold text-gray-800 leading-tight transition-opacity duration-500`}
        >
          Turn Your Genomic Data Into Actionable Insights
        </h2>
        <p
          ref={pRef}
          className={`${
            isVisible(pRef) ? 'visibleElement' : 'hiddenElement'
          } text-base md:text-lg text-gray-600 leading-relaxed max-w-lg transition-opacity duration-500`}
        >
          Stop spending hours interpreting complex genetic files. With GENOMAS, gain reliable,
          data-driven answers using advanced AI tailored for genomic analysis. Through GENOMAS,
          you can interact with your own digital expert to uncover accurate, trustworthy insights
          instantly. GENOMAS is built on cutting-edge methodologies you can depend on.
        </p>
        {/* Botón para pantallas medianas y grandes */}
        <div className="hidden md:block">
          <button
            ref={button1Ref}
            className={`${
              isVisible(button1Ref) ? 'visibleElement' : 'hiddenElement'
            } px-6 py-3 bg-color-primary text-white font-semibold rounded-lg shadow-md hover:bg-color-primary-dark transition-opacity duration-500`}
          >
            See more
          </button>
        </div>
      </div>

      {/* Imagen Derecha */}
      <div className="flex-1 flex flex-col items-center mt-8 md:mt-0">
        <img
          ref={imgRef}
          src="/images/reportfile.png"
          alt="Genomic Report"
          className={`${
            isVisible(imgRef) ? 'visibleElement' : 'hiddenElement'
          } w-full max-w-xs md:max-w-md object-cover transition-opacity duration-500`}
        />
        {/* Botón para pantallas pequeñas */}
        <div className="mt-6 md:hidden">
          <button
            ref={button2Ref}
            className={`${
              isVisible(button2Ref) ? 'visibleElement' : 'hiddenElement'
            } px-6 py-3 bg-color-primary text-white font-semibold rounded-lg shadow-md hover:bg-color-primary-dark transition-opacity duration-500`}
          >
            See more
          </button>
        </div>
      </div>
    </section>
  );
}
