"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

export default function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const rect = element.getBoundingClientRect();
    const focusRegion = element.closest("a") ?? element;
    // Keep server-rendered content visible, including without JavaScript.
    // Animate only content reached later while scrolling, never the first paint.
    if (
      preference.matches ||
      focusRegion.contains(document.activeElement) ||
      (rect.top < window.innerHeight && rect.bottom > 0)
    ) {
      element.dataset.reveal = "static";
      return;
    }

    element.dataset.reveal = "pending";
    const inset = Math.min(56, Math.round(window.innerHeight * 0.08));
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        element.dataset.reveal = preference.matches || focusRegion.contains(document.activeElement)
          ? "static"
          : "in";
      },
      { rootMargin: `0px 0px -${inset}px 0px`, threshold: 0 },
    );
    const stop = () => {
      observer.disconnect();
      element.dataset.reveal = "static";
    };
    const onPreferenceChange = () => {
      if (preference.matches) stop();
    };
    observer.observe(element);
    focusRegion.addEventListener("focusin", stop);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      stop();
      focusRegion.removeEventListener("focusin", stop);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${Math.min(Math.max(delay, 0), 0.12)}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
