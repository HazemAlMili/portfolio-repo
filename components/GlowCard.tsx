"use client";

import React, { useRef, useState, useCallback, memo, ReactNode } from "react";
import "../styles/GlowCard.css";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  glowColor?: string;
  glowSize?: number;
}

// PERFORMANCE: Throttle function to limit execution frequency
function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// PERFORMANCE: Memoized to prevent unnecessary re-renders
const GlowCard = memo(function GlowCard({
  children,
  className = "",
  contentClassName = "",
  glowColor = "rgba(255, 255, 255, 0.15)",
  glowSize = 400,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // PERFORMANCE: Throttled mousemove to ~60fps (16ms)
  const handleMouseMove = useCallback(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });
    }, 16), // ~60fps
    []
  );

  // PERFORMANCE: Memoized handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={
        {
          position: "relative",
          overflow: "hidden",
          "--mouse-x": `${mousePos.x}px`,
          "--mouse-y": `${mousePos.y}px`,
          "--glow-color": glowColor,
          "--glow-size": `${glowSize}px`,
          "--glow-opacity": isHovered ? "1" : "0",
          // PERFORMANCE: Force GPU compositing
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        } as React.CSSProperties
      }
    >
      {/* Glow Effect Layer */}
      <div className="glow-overlay" />

      {/* Content Layer */}
      <div className="glow-content">{children}</div>
    </div>
  );
});

export default GlowCard;
