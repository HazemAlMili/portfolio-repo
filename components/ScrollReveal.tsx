"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface ScrollRevealProps {
  children?: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children = null,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  style = {},
}: ScrollRevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.21, 1.02, 0.73, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
