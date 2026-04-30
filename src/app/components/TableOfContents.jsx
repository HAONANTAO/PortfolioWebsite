"use client";
import { useEffect, useState } from "react";

export default function TableOfContents({ headings = [] }) {
  const [activeSlug, setActiveSlug] = useState(null);

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost heading currently in the activation zone.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSlug(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="hidden xl:block sticky top-28 self-start w-[200px]">
      <h4 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
        On this page
      </h4>
      <ul className="space-y-1 text-[13px] leading-snug">
        {headings.map((h) => {
          const isActive = activeSlug === h.slug;
          return (
            <li key={h.slug}>
              <a
                href={`#${h.slug}`}
                className={`block border-l-2 py-1 transition-colors ${
                  h.level === 3 ? "pl-6" : "pl-3"
                } ${
                  isActive
                    ? "text-[color:var(--accent)] font-medium"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-200"
                }`}
                style={{
                  borderLeftColor: isActive
                    ? "var(--accent)"
                    : "var(--line)",
                }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
