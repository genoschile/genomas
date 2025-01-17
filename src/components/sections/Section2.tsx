"use client"

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useEffect, useRef } from 'react';

export default function Section2() {
  const h1Ref = useRef<HTMLHeadingElement | null>(null);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { observe, unobserve, entries } = useIntersectionObserver();

  useEffect(() => {
    if (h1Ref.current) {
      observe(h1Ref.current);
    }
    if (pRef.current) {
      observe(pRef.current);
    }
    buttonRefs.current.forEach((button) => {
      if (button) observe(button);
    });

    return () => {
      if (h1Ref.current) {
        unobserve(h1Ref.current);
      }
      if (pRef.current) {
        unobserve(pRef.current);
      }
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
    <section className="container mx-auto md:h-screen bg-color-primary flex flex-col justify-between p-16 items-center text-center space-y-8 px-4 ">
      {/* Título */}
      <h2
        ref={h1Ref}
        className={`${
          isVisible ? 'visibleElement' : 'hiddenElement'
        } text-4xl font-bold text-white leading-tight `}
      >
        Discover How GENOMAS Can Empower You
      </h2>

      {/* Párrafo */}
      <p
        ref={pRef}
        className={`${
          isVisible ? 'visibleElement' : 'hiddenElement'
        } text-lg text-white leading-relaxed max-w-3xl`}
      >
        GENOMAS offers a centralized platform for all your genomic data,
        ensuring your analyses are always synchronized, accessible, and secure.
      </p>

      {/* Botones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-8">
        {['Cancer Variants Analysis', 'Germline Variants Analysis', 'Bla Variants Analysis'].map(
          (text, index) => (
            <button
              key={index}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              className={`${
                isVisible ? 'visibleElement' : 'hiddenElement'
              } px-4 py-2 bg-white text-color-skyBlue font-semibold rounded-lg shadow-md hover:bg-gray-200 text-2xl`}
            >
              {text}
            </button>
          )
        )}
      </div>
    </section>
  );
}
