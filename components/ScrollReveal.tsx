"use client";

import { useEffect, useState, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children?: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children = null,
  className = "",
  threshold = 0.1,
  delay = 0,
  style = {},
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "fade-in-up" : ""}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
