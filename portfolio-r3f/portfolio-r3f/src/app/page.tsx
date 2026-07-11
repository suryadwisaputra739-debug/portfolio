"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import IntroScreen from "@/components/intro/IntroScreen";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingBackground from "@/components/FloatingBackground";

export default function Home() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = entered ? "auto" : "hidden";
  }, [entered]);

  const handleEnter = useCallback(() => setEntered(true), []);

  return (
    <>
      {!entered && <IntroScreen onEnter={handleEnter} />}

      <SmoothScroll enabled={entered} />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, filter: "blur(16px)" }}
        animate={
          entered
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : { opacity: 0, scale: 0.96, filter: "blur(16px)" }
        }
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <FloatingBackground />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <BackToTop />
        <Footer />
      </motion.div>
    </>
  );
}
