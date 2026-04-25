import React from "react";
import Link from "next/link";
import Image from "next/image";
import AnimatedLogo from "./AnimatedLogo";

const Footer = () => {
  return (
    <footer className="relative border-t border-[#1a1a2e] text-white overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/2 via-transparent to-violet-500/2 pointer-events-none" />

      <div className="container flex flex-col md:flex-row items-center justify-between px-6 py-5 relative z-10 gap-4">

        <div className="hidden md:block">
          <AnimatedLogo />
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#555]">
          <span className="text-cyan-500/40">▸</span>
          <span>Built with</span>
          {["Next.js", "React", "Tailwind", "Framer Motion"].map((t) => (
            <span key={t} className="text-[#444] hover:text-cyan-500/70 transition-colors cursor-default">{t}</span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com/HAONANTAO",                  src: "/images/icons/github-icon.svg",   label: "GitHub"   },
            { href: "https://www.linkedin.com/in/haonan-tao-4a9855270/", src: "/images/icons/linkedin-icon.svg", label: "LinkedIn" },
          ].map(({ href, src, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-lg
                border border-[#1a1a2e] bg-[#0a0a10] opacity-50
                hover:opacity-100 hover:border-cyan-500/40
                hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]
                transition-all duration-200">
              <Image src={src} alt={label} width={16} height={16} />
            </Link>
          ))}

          <p className="text-xs font-mono text-[#444] ml-1">
            © 2025{" "}
            <span className="gradient-text-animated font-semibold text-sm">HAONAN TAO</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
