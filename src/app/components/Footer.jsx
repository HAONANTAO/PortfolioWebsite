import React from "react";

const Footer = () => {
  return (
    <footer className="relative border-t border-[#1a1a2e] text-white overflow-hidden">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/2 via-transparent to-violet-500/2 pointer-events-none" />

      <div className="container flex flex-col md:flex-row items-center justify-between px-6 py-5 relative z-10 gap-3">
        <img
          className="hidden w-14 h-auto md:block transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]"
          src="/images/icons/tao2.png"
          alt="logo"
        />

        <div className="flex items-center gap-4 text-xs font-mono text-[#555]">
          <span className="text-cyan-500/40">▸</span>
          <span>Built with</span>
          {["Next.js", "React", "Tailwind", "Framer Motion"].map((t, i) => (
            <span key={t} className="text-[#444] hover:text-cyan-500/70 transition-colors cursor-default">{t}</span>
          ))}
        </div>

        <p className="text-xs font-mono text-[#444]">
          © 2025{" "}
          <span className="gradient-text-animated font-semibold text-sm">HAONAN TAO</span>
          {" "}· AI Engineer
        </p>
      </div>
    </footer>
  );
};

export default Footer;
