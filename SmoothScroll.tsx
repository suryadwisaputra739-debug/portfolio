"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

interface SmoothScrollProps {
  enabled: boolean;
}

/**
 * Lenis smooth scroll, driven by GSAP's ticker so Lenis and any future
 * GSAP-driven scroll animations stay perfectly in sync on one RAF loop.
 * Only initializes once the intro has been dismissed (enabled = true).
 */
export default function SmoothScroll({ enabled }: SmoothScrollProps) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [enabled]);

  return null;
}
