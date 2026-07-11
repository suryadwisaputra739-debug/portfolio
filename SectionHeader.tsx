"use client";

import { motion } from "framer-motion";

export default function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      <motion.div
        className="mt-3 h-1 rounded-full bg-gradient-to-r from-secondary to-accent"
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  );
}
