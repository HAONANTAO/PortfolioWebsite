import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative border-t border-zinc-900/10 dark:border-zinc-100/10">
      <div className="container max-w-5xl flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 py-8 gap-4">

        <div className="flex items-baseline gap-2">
          <span className="signature text-2xl text-zinc-900 dark:text-zinc-100 leading-none">Aaron</span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">© 2026 · Built with Next.js</span>
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
              className="opacity-40 hover:opacity-100 transition-opacity dark:invert">
              <Image src={src} alt={label} width={16} height={16} />
            </Link>
          ))}
          <Link
            href="/feed.xml"
            aria-label="RSS feed"
            className="text-xs text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 4.44A19.56 19.56 0 0 1 23.56 24h-2.83A16.74 16.74 0 0 0 4 7.27V4.44zm0 5.66a13.9 13.9 0 0 1 13.9 13.9h-2.83A11.07 11.07 0 0 0 4 12.93V10.1z"/>
            </svg>
            RSS
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
