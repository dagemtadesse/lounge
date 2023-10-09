import { useEffect, useRef } from "react";

export const usePaginator = (paginator: () => void) => {
  const elementRef = useRef(null);
  useEffect(() => {
    if (elementRef.current == null) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          paginator();
          observer.disconnect();
        }
      });
    });

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [paginator]);

  return elementRef;
};
