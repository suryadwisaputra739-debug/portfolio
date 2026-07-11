"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import CountUp from "./CountUp";
import { stats } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="bg-gradient-to-b from-secondary/5 to-transparent px-6 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="About Me" />

        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6 text-text-light leading-[1.9]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              I&apos;m an Office Administration Education student at Universitas
              Negeri Surabaya, dedicated to mastering the art of organizational
              excellence. With a keen eye for detail and a creative approach to
              problem-solving, I transform administrative processes into
              streamlined, efficient systems.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              My journey spans from customer service excellence to strategic
              administrative support, with hands-on experience in real-world
              business operations. I believe that great administration is the
              backbone of successful organizations.
            </motion.p>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="rounded-2xl border border-border bg-secondary/10 p-5 text-center backdrop-blur-xl transition-colors hover:border-secondary hover:bg-secondary/15"
              >
                <CountUp target={stat.target} suffix={stat.suffix} />
                <span className="mt-2 block whitespace-pre-line text-xs leading-tight text-text-light">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
