import { useEffect, useRef } from 'react';

export function useReveal(threshold = 0.12, rootMargin = '-32px 0px') {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

export function useRevealChildren(selector = '.reveal-child', threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const parent = ref.current;
    if (!parent) return;
    const children = parent.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '-20px 0px' }
    );

    children.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, [selector, threshold]);

  return ref;
}
