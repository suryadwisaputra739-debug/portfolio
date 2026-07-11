"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import KeycapScene, { type KeycapHandle } from "./EnterKeycap3D";

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const keycapRef = useRef<KeycapHandle>(null);
  const [revealing, setRevealing] = useState(false);
  const [mounted, setMounted] = useState(true);

  // ENTER key triggers the exact same GSAP press sequence as a click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !revealing) {
        keycapRef.current?.press();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [revealing]);

  // Called by the 3D scene once the GSAP press timeline finishes settling
  const handlePressComplete = useCallback(() => {
    setRevealing(true);
  }, []);

  // Called by Framer Motion once the mask-reveal animation finishes
  const handleRevealComplete = useCallback(() => {
    setMounted(false);
    onEnter();
  }, [onEnter]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f1729] via-[#1a2847] to-[#0f1729]"
        initial={{ clipPath: "circle(150% at 50% 55%)" }}
        animate={{
          clipPath: revealing ? "circle(0% at 50% 55%)" : "circle(150% at 50% 55%)",
        }}
        transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => revealing && handleRevealComplete()}
      >
        {/* Ambient CSS light blobs (cheap, decorative, behind the canvas) */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[120px]" />
          <div className="absolute -right-32 -bottom-32 h-[420px] w-[420px] rounded-full bg-accent/20 blur-[120px]" />
        </div>

        {/* Fade the whole scene slightly once revealing starts */}
        <motion.div
          className="relative flex h-[420px] w-full max-w-xl items-center justify-center"
          animate={{ opacity: revealing ? 0 : 1 }}
          transition={{ duration: 0.35 }}
        >
          <Canvas
            camera={{ position: [0, 1.1, 3.4], fov: 32 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
          >
            <KeycapScene ref={keycapRef} onPressComplete={handlePressComplete} />
          </Canvas>
        </motion.div>

        {/* Hint text - breathing fade via Framer Motion */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-1 text-center"
          animate={{ opacity: revealing ? 0 : [0.4, 1, 0.4] }}
          transition={
            revealing
              ? { duration: 0.3 }
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <span className="text-lg font-semibold tracking-[0.2em] text-white">
            Press ENTER
          </span>
          <span className="text-sm tracking-wider text-text-light">
            or click the key
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
