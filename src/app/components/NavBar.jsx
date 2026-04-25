"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import AnimatedLogo from "./AnimatedLogo";

const navLinks = [
  { title: "About",    path: "#about"    },
  { title: "Projects", path: "#projects" },
  { title: "Contact",  path: "#contact"  },
];

const NavBar = () => {
  const [navbarOpen,     setNavbarOpen]     = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sectionIds = navLinks.map(l => l.path.slice(1));
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-[#060608]/80 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_4px_30px_rgba(6,182,212,0.05)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Gradient accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="flex items-center justify-between px-6 py-3 lg:py-3.5 max-w-7xl mx-auto">

        {/* Logo */}
        <Link href="/" className="hidden md:block">
          <AnimatedLogo />
        </Link>
        <Link href="/" className="md:hidden">
          <span className="text-cyan-400 font-mono text-sm tracking-widest">AT_</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.path.slice(1);
            return (
              <a
                key={i}
                href={link.path}
                className="relative text-sm font-mono group flex flex-col items-center gap-0.5"
              >
                <span
                  className={`transition-colors duration-200 ${
                    isActive ? "text-cyan-400" : "text-[#ADB7BE] hover:text-cyan-400"
                  }`}
                >
                  <span className="text-cyan-500/40 mr-1 text-xs">0{i + 1}.</span>
                  {link.title}
                </span>

                {/* Animated underline */}
                <span className="relative block h-px w-full overflow-hidden">
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-violet-500"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    style={{ transformOrigin: "left" }}
                  />
                  {/* Hover underline for non-active */}
                  {!isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-violet-500/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  )}
                </span>
              </a>
            );
          })}

          <a href="/PDFs/Resume0913.pdf">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 18px rgba(6,182,212,0.35)" }}
              whileTap={{ scale: 0.96 }}
              className="px-4 py-1.5 text-sm font-mono text-cyan-400 border border-cyan-500/40 rounded
                hover:bg-cyan-500/10 hover:border-cyan-400 transition-colors duration-200"
            >
              Resume
            </motion.button>
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="block md:hidden">
          <button
            onClick={() => setNavbarOpen(p => !p)}
            className="flex items-center px-3 py-2 border rounded border-cyan-500/30 text-cyan-400 hover:border-cyan-400"
          >
            <AnimatePresence mode="wait" initial={false}>
              {navbarOpen ? (
                <motion.span key="x"   initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <XMarkIcon className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span key="bar" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Bars3Icon className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {navbarOpen && <MenuOverlay links={navLinks} />}
    </nav>
  );
};

export default NavBar;
