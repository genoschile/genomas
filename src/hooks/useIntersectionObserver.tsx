"use client";

import { useEffect, useState, useRef, useCallback } from "react";

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
  const observedElements = useRef<Set<Element>>(new Set()); // Evita observaciones duplicadas

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (observedEntries) => {
          console.log("Observed entries:", observedEntries);
          setEntries(observedEntries);
        },
        { root, rootMargin, threshold }
      );
    }

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      observedElements.current.clear();
    };
  }, [root, rootMargin, threshold]);

  const observe = useCallback((element: Element) => {
    if (
      observerRef.current &&
      element &&
      !observedElements.current.has(element)
    ) {
      console.log("Observing element:", element);
      observerRef.current.observe(element);
      observedElements.current.add(element);
    }
  }, []);

  const unobserve = useCallback((element: Element) => {
    if (
      observerRef.current &&
      element &&
      observedElements.current.has(element)
    ) {
      console.log("Unobserving element:", element);
      observerRef.current.unobserve(element);
      observedElements.current.delete(element);
    }
  }, []);

  return { observe, unobserve, entries };
};
