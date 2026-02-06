"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

// PERFORMANCE: Optimized for zero-lag performance
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // PERFORMANCE: Reduced duration for snappier feel
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // PERFORMANCE: Reduced multipliers for less computation per frame
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      // PERFORMANCE: Enable infinite scrolling optimization
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
