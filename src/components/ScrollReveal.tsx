"use client";

import React, { ReactNode, memo } from "react";
import { motion, Variants } from "framer-motion";

interface ScrollRevealProps {
  children?: ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  style?: React.CSSProperties;
  staggerChildren?: boolean; // NEW: Enable stagger for children
  staggerDelay?: number; // NEW: Delay between each child
}

// PERFORMANCE: Memoized to prevent unnecessary re-renders
const ScrollReveal = memo(function ScrollReveal({
  children = null,
  className = "",
  delay = 0,
  direction = "up",
  distance = 15,
  style = {},
  staggerChildren = false,
  staggerDelay = 0.05,
}: ScrollRevealProps) {
  // PERFORMANCE: Use translate3d for hardware acceleration
  const getTransform = (dir: string, dist: number) => {
    switch (dir) {
      case "left":
        return `translate3d(-${dist}px, 0, 0)`;
      case "right":
        return `translate3d(${dist}px, 0, 0)`;
      case "up":
        return `translate3d(0, ${dist}px, 0)`;
      case "down":
        return `translate3d(0, -${dist}px, 0)`;
      default:
        return `translate3d(0, 0, 0)`;
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: 0,
      transform: getTransform(direction, distance),
    },
    visible: staggerChildren
      ? {
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
          transition: {
            duration: 0.3,
            delay: delay / 1500,
            ease: "easeOut",
            staggerChildren: staggerDelay / 2,
            delayChildren: delay / 1500,
          },
        }
      : {
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
          transition: {
            duration: 0.3,
            delay: delay / 1500,
            ease: "easeOut",
          },
        },
  };

  // PERFORMANCE: Child animation for staggered items
  const childVariants: Variants = {
    hidden: { opacity: 0, transform: getTransform(direction, distance / 2) },
    visible: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
      transition: {
        duration: 0.25,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "100px", amount: 0 }}
      variants={variants}
      className={className}
      style={{
        ...style,
        // PERFORMANCE: Force hardware acceleration
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {staggerChildren
        ? React.Children.map(children, (child) =>
            React.isValidElement(child) ? (
              <motion.div variants={childVariants}>{child}</motion.div>
            ) : (
              child
            )
          )
        : children}
    </motion.div>
  );
});

export default ScrollReveal;
