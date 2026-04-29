"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";

export default function ThemeToggle({ className = "", showLabel = false }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key.toLowerCase() !== "t") return;
      // ignore when typing in inputs / when modifier held
      const tag = (e.target.tagName || "").toLowerCase();
      if (["input", "textarea"].includes(tag) || e.target.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [resolvedTheme, setTheme]);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative inline-flex items-center justify-center rounded-md
        border transition-colors w-7 h-7
        border-zinc-900/10 hover:border-zinc-900/25 bg-white/40
        dark:border-zinc-100/10 dark:hover:border-zinc-100/25 dark:bg-zinc-100/[0.04]
        text-zinc-600 hover:text-zinc-900
        dark:text-zinc-400 dark:hover:text-zinc-100
        ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && (isDark ? (
          <motion.span key="moon"
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.18 }}>
            <MoonIcon className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span key="sun"
            initial={{ rotate: 45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -45, opacity: 0 }}
            transition={{ duration: 0.18 }}>
            <SunIcon className="w-4 h-4" />
          </motion.span>
        ))}
      </AnimatePresence>
      {showLabel && <span className="ml-2 text-xs">{isDark ? "Dark" : "Light"}</span>}
    </button>
  );
}
