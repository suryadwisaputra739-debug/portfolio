"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import { certificates } from "@/lib/data";
import { iconMap } from "@/lib/icon-map";

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="bg-gradient-to-b from-secondary/5 to-transparent px-6 py-28 md:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Certificates & Achievements" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certificates.map((cert, i) => {
            const Icon = iconMap[cert.icon];
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.08 * i }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group rounded-2xl border border-border bg-secondary/[0.08] p-8 text-center backdrop-blur-xl transition-colors hover:border-secondary hover:bg-secondary/[0.15] hover:shadow-[0_20px_60px_rgba(102,126,234,0.3)]"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-accent text-white shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-transform duration-500 group-hover:rotate-y-180">
                  <Icon size={26} />
                </div>
                <h3 className="mb-1.5 text-base font-semibold">{cert.title}</h3>
                <p className="text-sm text-text-light">{cert.org}</p>
                <p className="mt-2.5 text-sm font-semibold text-secondary">{cert.year}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
