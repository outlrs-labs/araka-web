import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook that triggers a CSS class when an element enters the viewport.
 * Uses IntersectionObserver for performance.
 * Respects prefers-reduced-motion.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isVisible };
}

/**
 * Generates stagger delay styles for child elements.
 * @param {number} index - The index of the child element
 * @param {number} baseDelay - Base delay in ms (default: 100)
 * @returns {object} Style object with transitionDelay
 */
export function staggerDelay(index, baseDelay = 100) {
  return {
    transitionDelay: `${index * baseDelay}ms`,
  };
}
