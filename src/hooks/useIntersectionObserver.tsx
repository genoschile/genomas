"use client";

import { useEffect, useState, useRef } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = ({
  root = null,
  rootMargin = "-2px",
  threshold = 0.1,
}: IntersectionObserverOptions = {}) => {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observedEntries) => {
        console.log("Observed entries:", observedEntries);
        setEntries(observedEntries);
      },
      { root, rootMargin, threshold }
    );

    observerRef.current = observer;

    return () => observer.disconnect(); // Cleanup
  }, [root, rootMargin, threshold]);

  const observe = (element: Element) => {
    if (observerRef.current && element) {
      console.log("Observing element:", element); 
      observerRef.current.observe(element);
    }
  };

  const unobserve = (element: Element) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element);
    }
  };

  return { observe, unobserve, entries };
};
