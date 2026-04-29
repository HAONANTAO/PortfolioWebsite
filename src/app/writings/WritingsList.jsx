"use client";
import { useState } from "react";
import Link from "next/link";
import ProjectTag from "../components/ProjectTag";

const FILTERS = [
  { label: "All",            value: "all"     },
  { label: "Project Notes",  value: "project" },
  { label: "AI Ideas",       value: "ideas"   },
];

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function WritingsList({ posts }) {
  const [filter, setFilter] = useState("all");

  const visible =
    filter === "all"
      ? posts
      : posts.filter((p) => (p.category || "ideas") === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2 items-center mb-10">
        {FILTERS.map((f) => (
          <ProjectTag
            key={f.value}
            tag={f.label}
            isSelected={filter === f.value}
            onClick={() => setFilter(f.value)}
          />
        ))}
      </div>

      <ul className="divide-y divide-zinc-900/10 dark:divide-zinc-100/10 border-y border-zinc-900/10 dark:border-zinc-100/10">
        {visible.map((post) => (
          <li key={post.slug} className="group">
            <Link
              href={`/writings/${post.slug}`}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8 py-7 px-2
                hover:bg-zinc-900/[0.03] dark:hover:bg-zinc-100/[0.04] transition-colors duration-200"
            >
              <div className="flex flex-col">
                <time className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums">
                  {formatDate(post.date)}
                </time>
                {post.readingTime && (
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1">
                    {post.readingTime}
                  </span>
                )}
                {post.category === "project" && (
                  <span className="mt-2 px-2 py-0.5 w-fit text-[10px] uppercase tracking-widest
                    text-zinc-500 dark:text-zinc-400 border border-zinc-900/15 dark:border-zinc-100/15 rounded">
                    Project
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline underline-offset-4 leading-snug">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="mt-2 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400 border border-zinc-900/10 dark:border-zinc-100/10 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-8">
          No posts in this category yet.
        </p>
      )}
    </>
  );
}
