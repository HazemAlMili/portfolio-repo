"use client";

import React, { useRef, useState, ReactNode } from "react";
import "../styles/GlowCard.css";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
}

export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(255, 255, 255, 0.15)",
  glowSize = 400,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        "--mouse-x": `${mousePos.x}px`,
        "--mouse-y": `${mousePos.y}px`,
        "--glow-color": glowColor,
        "--glow-size": `${glowSize}px`,
        "--glow-opacity": isHovered ? "1" : "0",
      } as React.CSSProperties}
    >
      {/* Glow Effect Layer */}
      <div className="glow-overlay" />
      
      {/* Content Layer */}
      <div className="glow-content">
        {children}
      </div>
    </div>
  );
}
