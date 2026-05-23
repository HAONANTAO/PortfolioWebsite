"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

// Dates verified from public sources: App Store releaseDate (Money Recorder)
// and GitHub repo created_at (everything else).
const ITEMS = [
  {
    date: "Jun 2026",
    title: "ShangXue · Teacher Salary System",
    note: "Internship at Shangxue Tutoring (Mar–Jun 2026) — production payroll, 3-tier RBAC, bilingual",
    href: "https://mx-career.vercel.app",
  },
  {
    date: "May 2026",
    title: "EchoReply",
    note: "AI email coach for Gmail — Manifest V3, vanilla JS, zero backend",
    href: "https://chromewebstore.google.com/detail/leibhmkahdofhfallekeoljmiajcjjlk",
  },
  {
    date: "May 2026",
    title: "DocuMind",
    note: "Streaming RAG, source citations, multi-turn memory",
    href: "https://docu-mind-neon.vercel.app",
  },
  {
    date: "Apr 2026",
    title: "Portfolio refresh",
    note: "Light/dark theme · ⌘K palette · MDX writings · RSS feed",
    href: "/",
  },
  {
    date: "Jul 2025",
    title: "AllStorage",
    note: "Passwordless cloud storage SaaS — Next.js 15 + AppWrite",
    href: "https://all-storage.vercel.app",
  },
  {
    date: "Apr 2025",
    title: "Money Recorder",
    note: "Live on the App Store — React Native + Expo",
    href: "https://apps.apple.com/us/app/moneyrecorder/id6744058988",
  },
];

export default function RecentlyShipped() {
  return (
    <section className="py-16 border-t border-zinc-900/10 dark:border-zinc-100/10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-baseline justify-between gap-4 flex-wrap"
      >
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Recently shipped
        </span>
        <Link
          href="#projects"
          className="text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200 transition-colors"
        >
          All projects ↓
        </Link>
      </motion.div>

      <ul className="divide-y divide-zinc-900/[0.06] dark:divide-zinc-100/[0.06] border-y border-zinc-900/[0.06] dark:border-zinc-100/[0.06]">
        {ITEMS.map((item, i) => {
          const isExternal = item.href?.startsWith("http");
          const dateClasses = item.accent
            ? "text-[color:var(--accent)] font-medium"
            : "text-zinc-400 dark:text-zinc-500";

          return (
            <motion.li
              key={`${item.date}-${item.title}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Link
                href={item.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group grid grid-cols-[5.5rem_1fr_auto] sm:grid-cols-[7rem_1fr_auto] items-baseline gap-4 sm:gap-6 py-4
                  hover:bg-zinc-900/[0.025] dark:hover:bg-zinc-100/[0.04] -mx-4 px-4 rounded-md transition-colors"
              >
                <span className={`text-[11px] uppercase tracking-widest tabular-nums shrink-0 ${dateClasses}`}>
                  {item.date}
                  {item.accent && (
                    <span className="relative ml-1.5 inline-flex h-1 w-1 align-middle">
                      <span className="ping-slow absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{ background: "var(--accent)" }} />
                      <span className="relative inline-flex h-1 w-1 rounded-full"
                        style={{ background: "var(--accent)" }} />
                    </span>
                  )}
                </span>

                <div className="min-w-0">
                  <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:underline underline-offset-4 leading-snug">
                    {item.title}
                  </span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                    {item.note}
                  </span>
                </div>

                {isExternal && (
                  <ArrowUpRightIcon className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
                )}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
