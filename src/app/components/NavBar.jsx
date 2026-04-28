"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";

const navLinks = [
  { title: "About",    path: "#about",    type: "anchor" },
  { title: "Projects", path: "#projects", type: "anchor" },
  { title: "Writing",  path: "/writings", type: "route"  },
  { title: "Contact",  path: "#contact",  type: "anchor" },
];

const NavBar = () => {
  const [navbarOpen,    setNavbarOpen]    = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHome) {
        setActiveSection("");
        return;
      }

      const sectionIds = navLinks
        .filter((l) => l.type === "anchor")
        .map((l) => l.path.slice(1));
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) current = id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const hrefFor = (link) => {
    if (link.type === "route") return link.path;
    return isHome ? link.path : `/${link.path}`;
  };

  const isLinkActive = (link) => {
    if (link.type === "route") return pathname.startsWith(link.path);
    return isHome && activeSection === link.path.slice(1);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b border-zinc-900/10"
          : "border-b border-transparent"
      }`}
      style={scrolled ? { background: 'rgba(247,245,240,0.85)' } : {}}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 py-4 max-w-5xl mx-auto">

        <Link href="/" className="signature text-2xl text-zinc-900 leading-none hover:opacity-70 transition-opacity">
          Aaron
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link, i) => {
            const isActive = isLinkActive(link);
            const href = hrefFor(link);
            const LinkTag = link.type === "route" ? Link : "a";
            return (
              <LinkTag
                key={i}
                href={href}
                className={`text-sm transition-colors ${
                  isActive ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {link.title}
              </LinkTag>
            );
          })}

          <a
            href="/PDFs/resume0428.docx"
            className="cta-resume px-3.5 py-1.5 text-sm text-white bg-zinc-900 rounded-md transition-colors"
          >
            Résumé
          </a>
        </div>

        <div className="block md:hidden">
          <button
            onClick={() => setNavbarOpen(p => !p)}
            aria-label={navbarOpen ? "Close menu" : "Open menu"}
            className="text-zinc-700 hover:text-zinc-900"
          >
            <AnimatePresence mode="wait" initial={false}>
              {navbarOpen ? (
                <motion.span key="x"   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                  <XMarkIcon className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span key="bar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                  <Bars3Icon className="w-6 h-6" />
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
