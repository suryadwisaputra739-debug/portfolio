"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-primary/95 shadow-2xl backdrop-blur-xl" : "bg-primary/70 backdrop-blur-md"
      } border-b border-border`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4 md:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="font-display text-2xl font-bold transition-transform hover:scale-110"
        >
          <span className="bg-gradient-to-br from-secondary to-accent bg-clip-text text-transparent">
            S
          </span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`relative py-2 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-gradient-to-r after:from-secondary after:to-accent after:transition-all after:content-[''] ${
                active === link.href
                  ? "text-secondary after:w-full"
                  : "text-text-light after:w-0 hover:text-secondary hover:after:w-full"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href={siteConfig.cv}
          download
          className="hidden items-center gap-2 rounded-full bg-gradient-to-br from-secondary to-accent px-5 py-2.5 text-sm font-semibold shadow-[0_10px_30px_rgba(102,126,234,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(102,126,234,0.4)] md:flex"
        >
          <Download size={16} />
          Download CV
        </a>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          className="relative z-50 flex h-9 w-9 items-center justify-center md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 top-[65px] z-40 bg-black/30 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute left-0 top-full z-40 w-full border-b border-border bg-primary/98 backdrop-blur-xl md:hidden"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-0 p-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                    className="border-b border-border px-4 py-4 font-medium text-text-light transition-colors hover:bg-secondary/10 hover:text-secondary"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href={siteConfig.cv}
                  download
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + navLinks.length * 0.05, duration: 0.35 }}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-secondary to-accent px-5 py-3.5 font-semibold shadow-[0_10px_30px_rgba(102,126,234,0.3)]"
                >
                  <Download size={16} />
                  Download CV
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
