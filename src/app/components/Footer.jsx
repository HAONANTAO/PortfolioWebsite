import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative border-t border-zinc-900/10">
      <div className="container max-w-5xl flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 py-8 gap-4">

        <div className="flex items-baseline gap-2">
          <span className="signature text-2xl text-zinc-900 leading-none">Aaron</span>
          <span className="text-xs text-zinc-400">© 2026 · Built with Next.js</span>
        </div>

        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com/HAONANTAO",                       src: "/images/icons/github-icon.svg",   label: "GitHub"   },
            { href: "https://www.linkedin.com/in/haonan-tao-4a9855270/",  src: "/images/icons/linkedin-icon.svg", label: "LinkedIn" },
          ].map(({ href, src, label }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="opacity-40 hover:opacity-100 transition-opacity">
              <Image src={src} alt={label} width={16} height={16} />
            </Link>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
