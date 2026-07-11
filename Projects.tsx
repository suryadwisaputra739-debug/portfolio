"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { projects } from "@/lib/data";
import { iconMap } from "@/lib/icon-map";

export default function Projects() {
  return (
    <section id="projects" className="bg-gradient-to-b from-accent/5 to-transparent px-6 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Projects & Work" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((project, i) => {
            const Icon = iconMap[project.icon];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                whileHover={{ y: -10 }}
                className="overflow-hidden rounded-2xl border border-border bg-secondary/[0.08] backdrop-blur-xl transition-colors hover:border-secondary hover:shadow-[0_20px_60px_rgba(102,126,234,0.3)]"
              >
                <div
                  className={`flex h-48 items-center justify-center bg-gradient-to-br ${project.gradient} text-white transition-transform duration-500 hover:scale-110`}
                >
                  <Icon size={56} />
                </div>
                <div className="p-8">
                  <h3 className="mb-3 text-lg font-semibold">{project.title}</h3>
                  <p className="mb-5 text-sm leading-relaxed text-text-light">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary/20 px-3 py-1 text-xs text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
