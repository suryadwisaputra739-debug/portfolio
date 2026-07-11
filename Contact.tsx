"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { siteConfig } from "@/lib/data";
import { InstagramIcon, LinkedinIcon, TiktokIcon, WhatsappIcon } from "./SocialIcons";

const contactCards = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    icon: Phone,
    label: "WhatsApp",
    value: siteConfig.whatsappDisplay,
    href: siteConfig.whatsapp,
  },
  { icon: MapPin, label: "Location", value: siteConfig.location, href: null },
];

const socials = [
  { Icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
  { Icon: LinkedinIcon, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { Icon: TiktokIcon, href: siteConfig.social.tiktok, label: "TikTok" },
  { Icon: WhatsappIcon, href: siteConfig.whatsapp, label: "WhatsApp" },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-gradient-to-b from-transparent to-accent/5 px-6 py-28 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader title="Get In Touch" />

        <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              const content = (
                <>
                  <Icon size={36} className="mx-auto mb-4 text-secondary transition-transform group-hover:scale-125 group-hover:rotate-6 group-hover:text-accent" />
                  <h3 className="mb-2 text-base font-semibold">{card.label}</h3>
                  {card.href ? (
                    <span className="break-all text-secondary transition-colors group-hover:text-accent">
                      {card.value}
                    </span>
                  ) : (
                    <span className="text-text-light">{card.value}</span>
                  )}
                </>
              );

              return (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * i }}
                  whileHover={{ y: -10 }}
                  className="group rounded-2xl border border-border bg-secondary/[0.08] p-8 text-center backdrop-blur-xl transition-colors hover:border-secondary hover:bg-secondary/[0.15] hover:shadow-[0_20px_60px_rgba(102,126,234,0.3)]"
                >
                  {card.href ? (
                    <a href={card.href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {socials.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                whileHover={{ y: -10, scale: 1.15 }}
                className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-2 border-border bg-secondary/10 text-secondary transition-all hover:border-secondary hover:bg-gradient-to-br hover:from-secondary hover:to-accent hover:text-white hover:shadow-[0_20px_50px_rgba(102,126,234,0.4)]"
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
