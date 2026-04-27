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
      <div className="flex flex-wrap gap-2 items-center mb-8">
        <span className="text-[10px] font-mono text-[#555] mr-1">filter:</span>
        {FILTERS.map((f) => (
          <ProjectTag
            key={f.value}
            tag={f.label}
            isSelected={filter === f.value}
            onClick={() => setFilter(f.value)}
          />
        ))}
      </div>

      <ul className="divide-y divide-[#33353F]/40 border-y border-[#33353F]/40">
        {visible.map((post) => (
          <li key={post.slug} className="group">
            <Link
              href={`/writings/${post.slug}`}
              className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-8 py-7 px-2
                hover:bg-cyan-500/[0.03] transition-colors duration-200"
            >
              <div className="flex flex-col">
                <time className="text-xs font-mono text-cyan-400/60">
                  {formatDate(post.date)}
                </time>
                {post.readingTime && (
                  <span className="text-[10px] font-mono text-[#666] mt-1">
                    {post.readingTime}
                  </span>
                )}
                {post.category === "project" && (
                  <span className="mt-2 px-2 py-0.5 w-fit text-[9px] font-mono tracking-widest uppercase
                    text-violet-300 border border-violet-500/30 bg-violet-500/5 rounded-full">
                    Project
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="mt-2 text-[#ADB7BE] text-sm leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                )}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono border border-cyan-500/20
                          bg-cyan-500/5 text-cyan-400/80 rounded-full"
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
        <p className="text-[#ADB7BE] text-sm font-mono mt-8">
          // no posts in this category yet
        </p>
      )}
    </>
  );
}
