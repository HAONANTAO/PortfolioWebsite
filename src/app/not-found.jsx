"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: "var(--bg)" }}>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <div className="flex items-baseline justify-center gap-2 mb-6">
          <span className="text-7xl sm:text-8xl font-semibold tracking-tighter"
            style={{ color: "var(--ink)" }}>
            4
          </span>
          <motion.span
            animate={{ rotate: [0, 12, -10, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl sm:text-8xl select-none"
            style={{ display: "inline-block", transformOrigin: "50% 60%" }}
          >
            🐢
          </motion.span>
          <span className="text-7xl sm:text-8xl font-semibold tracking-tighter"
            style={{ color: "var(--ink)" }}>
            4
          </span>
        </div>

        <h1 className="serif-italic text-3xl sm:text-4xl mb-4"
          style={{ color: "var(--ink-2)" }}>
          The turtle got lost.
        </h1>

        <p className="text-sm leading-relaxed mb-8"
          style={{ color: "var(--ink-3)" }}>
          This page doesn't exist — or maybe it never did. Either way,
          there's nothing here. Let's get you back to somewhere real.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 text-sm font-medium rounded-md transition-opacity hover:opacity-90"
            style={{ background: "var(--ink)", color: "var(--bg)" }}
          >
            Home
          </Link>
          <Link
            href="/writings"
            className="px-5 py-2.5 text-sm font-medium rounded-md border transition-colors hover:bg-white dark:hover:bg-zinc-100/[0.05]"
            style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}
          >
            Writings →
          </Link>
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-widest"
          style={{ color: "var(--ink-3)" }}>
          Or press <kbd className="px-1.5 py-0.5 mx-1 rounded border font-mono normal-case"
            style={{ borderColor: "var(--line)" }}>⌘K</kbd> to jump anywhere
        </p>
      </motion.div>
    </main>
  );
}
