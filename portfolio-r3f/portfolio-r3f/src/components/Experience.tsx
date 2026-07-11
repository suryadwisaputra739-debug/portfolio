"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="bg-gradient-to-b from-transparent to-secondary/5 px-6 py-28 md:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title="Experience" />

        <div className="relative border-l-2 border-gradient-to-b pl-8">
          <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-secondary via-accent to-transparent" />

          {experience.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              whileHover={{ x: 10 }}
              className="group relative mb-10 rounded-2xl border border-border bg-secondary/[0.08] p-8 backdrop-blur-xl transition-colors hover:border-secondary hover:bg-secondary/[0.15] hover:shadow-[0_20px_60px_rgba(102,126,234,0.2)]"
            >
              <span className="absolute -left-[2.55rem] top-9 h-5 w-5 rounded-full border-4 border-primary bg-secondary shadow-[0_0_20px_rgba(102,126,234,0.5)] transition-transform duration-300 group-hover:scale-125 group-hover:bg-accent" />

              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm font-semibold text-secondary">{item.role}</p>
              <p className="mt-1 text-sm text-text-light">{item.period}</p>
              <p className="mt-4 leading-relaxed text-text-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
