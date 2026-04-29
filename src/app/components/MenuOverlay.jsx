"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuOverlay = ({ links }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleAnchorClick = (event, path) => {
    if (!isHome) return; // let normal navigation happen
    event.preventDefault();
    const el = document.querySelector(path);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
    }
  };

  return (
    <ul className="flex flex-col items-center py-4 gap-2">
      {links.map((link, index) => {
        if (link.type === "route") {
          return (
            <li key={index}>
              <Link
                href={link.path}
                className="text-2xl text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors cursor-pointer"
              >
                {link.title}
              </Link>
            </li>
          );
        }
        const href = isHome ? link.path : `/${link.path}`;
        return (
          <li key={index}>
            <a
              href={href}
              onClick={(e) => handleAnchorClick(e, link.path)}
              className="text-2xl text-zinc-700 hover:text-zinc-900 transition-colors cursor-pointer"
            >
              {link.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default MenuOverlay;
