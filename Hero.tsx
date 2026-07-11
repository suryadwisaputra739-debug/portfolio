"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-8 pt-32 md:px-8"
    >
      <div className="mx-auto grid max-w-6xl w-full grid-cols-1 items-center gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            <span className="block">Hi, I&apos;m</span>
            <span className="block">Surya Dwi</span>
            <span className="block bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent">
              Saputra
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-text-light leading-relaxed">
            An Administration specialist and problem solver passionate about
            creating efficient, elegant systems. I transform complex
            organizational challenges into streamlined solutions with
            precision and creativity.
          </p>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-gradient-to-br from-secondary to-accent px-7 py-3 font-semibold shadow-[0_10px_30px_rgba(102,126,234,0.25)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(102,126,234,0.4)]"
          >
            Learn More
            <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <div className="group relative h-[340px] w-[280px] overflow-hidden rounded-[20px] border-2 border-border bg-secondary/10 shadow-[0_50px_120px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all hover:-translate-y-2 hover:border-secondary hover:shadow-[0_0_60px_rgba(102,126,234,0.4)] md:h-[400px] md:w-[350px]">
            <Image
              src={siteConfig.profile}
              alt={siteConfig.name}
              fill
              sizes="350px"
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[10%] top-[20%] h-1 w-1 rounded-full bg-secondary/60" />
        <div className="absolute left-[70%] top-[35%] h-1 w-1 rounded-full bg-secondary/60" />
        <div className="absolute left-[30%] top-[75%] h-1 w-1 rounded-full bg-secondary/60" />
      </div>
    </section>
  );
}
