"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { skills } from "@/lib/data";
import { iconMap } from "@/lib/icon-map";

export default function Skills() {
  return (
    <section id="skills" className="bg-gradient-to-b from-accent/5 to-transparent px-6 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Skills & Expertise" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon];
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.08 * i }}
                whileHover={{ y: -10 }}
                className="group rounded-2xl border border-border bg-secondary/[0.08] p-8 text-center backdrop-blur-xl transition-colors hover:border-secondary hover:bg-secondary/[0.15] hover:shadow-[0_20px_60px_rgba(102,126,234,0.3)]"
              >
                <Icon
                  size={40}
                  className="mx-auto mb-5 text-secondary transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-125 group-hover:text-accent"
                />
                <h3 className="mb-3 text-lg font-semibold">{skill.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-text-light">{skill.desc}</p>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-secondary to-accent shadow-[0_0_20px_rgba(102,126,234,0.5)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
