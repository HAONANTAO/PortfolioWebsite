"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const LatestWritingsSection = ({ posts = [] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const latest = posts.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section id="writings-preview" ref={ref} className="relative py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-mono text-cyan-500/50 tracking-[0.3em] uppercase mb-2">
          // 04 &nbsp; WRITINGS
        </p>
        <div className="flex items-end justify-between gap-4 mb-1 flex-wrap">
          <div className="flex items-end gap-4">
            <h2 className="text-4xl font-bold gradient-text-animated">
              Latest Writings
            </h2>
            <span className="text-xs font-mono text-[#555] mb-1.5">
              [{posts.length} total]
            </span>
          </div>
          <Link
            href="/writings"
            className="group flex items-center gap-1.5 text-xs font-mono text-cyan-400/80
              hover:text-cyan-300 transition-colors mb-1.5"
          >
            <span>View all</span>
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="h-px w-20 bg-gradient-to-r from-cyan-500/60 to-transparent" />
      </motion.div>

      {/* Posts grid */}
      <ul className="grid gap-5 md:grid-cols-3 mt-8">
        {latest.map((post, i) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Link
              href={`/writings/${post.slug}`}
              className="group flex flex-col h-full p-5 rounded-xl border border-[#33353F]/60
                bg-[#0a0a0f]/90 hover:border-cyan-500/30 transition-all duration-300
                hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]"
            >
              <div className="flex items-center gap-2 mb-3">
                <time className="text-[10px] font-mono text-cyan-400/60">
                  {formatDate(post.date)}
                </time>
                {post.category === "project" && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-widest uppercase
                    text-violet-300 border border-violet-500/30 bg-violet-500/5 rounded-full">
                    Project
                  </span>
                )}
              </div>

              <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors mb-2 leading-snug">
                {post.title}
              </h3>

              {post.summary && (
                <p className="text-[#ADB7BE] text-xs leading-relaxed line-clamp-3 mb-4">
                  {post.summary}
                </p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-auto">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 text-[9px] font-mono border border-cyan-500/20
                        bg-cyan-500/5 text-cyan-400/80 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400/60 group-hover:text-cyan-300 transition-colors">
                Read
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default LatestWritingsSection;
