"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
];

const NavBar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="about"
      className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${
        scrolled
          ? "bg-[#060608]/80 backdrop-blur-xl border-b border-cyan-500/10 shadow-[0_4px_30px_rgba(6,182,212,0.05)]"
          : "bg-transparent border-b border-transparent"
      }`}>
      {/* Gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="flex items-center justify-between px-6 py-3 lg:py-4 max-w-7xl mx-auto">
        <Link href={"/"}>
          <img
            className="w-16 h-auto transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.9)] hidden md:block"
            src="/images/icons/tao2.png"
            alt="logo"
          />
          <span className="md:hidden text-cyan-400 font-mono text-sm tracking-widest">AT_</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className="relative text-[#ADB7BE] hover:text-cyan-400 transition-colors duration-200 text-sm font-mono group">
              <span className="text-cyan-500/40 mr-1 text-xs">0{i + 1}.</span>
              {link.title}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-cyan-400 to-violet-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="/PDFs/Resume0913.pdf">
            <button className="px-4 py-1.5 text-sm font-mono text-cyan-400 border border-cyan-500/40 rounded
              hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]
              transition-all duration-200">
              Resume
            </button>
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="block md:hidden">
          <button
            onClick={() => setNavbarOpen(p => !p)}
            className="flex items-center px-3 py-2 border rounded border-cyan-500/30 text-cyan-400 hover:border-cyan-400">
            {navbarOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {navbarOpen && <MenuOverlay links={navLinks} />}
    </nav>
  );
};

export default NavBar;
