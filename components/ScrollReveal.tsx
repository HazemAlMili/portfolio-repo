"use client";

import { useEffect, useState, useRef, ReactNode, useMemo } from "react";

interface ScrollRevealProps {
  children?: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  style?: React.CSSProperties;
}

// ============================================================================
// CONSTANTS - GPU Optimization
// ============================================================================

const BASE_STYLES: React.CSSProperties = {
  transform: 'translate3d(0, 0, 0)', // Force GPU layer
  backfaceVisibility: 'hidden',
} as const;

// ============================================================================
// COMPONENT
// ============================================================================

export default function ScrollReveal({
  children = null,
  className = "",
  threshold = 0.1,
  delay = 0,
  style = {},
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // IntersectionObserver
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

  // Memoize combined styles (prevent recreation)
  const combinedStyles = useMemo(() => ({
    ...BASE_STYLES,
    opacity: isVisible ? 1 : 0,
    transitionDelay: `${delay}ms`,
    ...style,
  }), [isVisible, delay, style]);

  // Cleanup will-change after animation completes
  useEffect(() => {
    if (isVisible && ref.current) {
      // Add will-change during animation
      ref.current.style.willChange = 'opacity, transform';
      
      // Remove after transition (600ms + delay)
      const timer = setTimeout(() => {
        if (ref.current) {
          ref.current.style.willChange = 'auto';
        }
      }, 600 + delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className} ${isVisible ? "fade-in-up" : ""}`}
      style={combinedStyles}
    >
      {children}
    </div>
  );
}
