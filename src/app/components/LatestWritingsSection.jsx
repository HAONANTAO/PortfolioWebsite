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
  const latest = posts.slice(0, 4);

  if (latest.length === 0) return null;

  return (
    <section id="writings-preview" ref={ref} className="relative py-20 border-t border-zinc-900/10 dark:border-zinc-100/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <div>
            <h2 className="serif text-4xl sm:text-5xl font-normal text-zinc-900 dark:text-zinc-100 mb-2">
              Writing
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Notes on building, shipping, and what I'm learning along the way.
            </p>
          </div>
          <Link
            href="/writings"
            className="group flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900
              dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-1"
          >
            <span>All posts</span>
            <ArrowRightIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>

      <ul className="divide-y divide-zinc-900/10 dark:divide-zinc-100/10 border-y border-zinc-900/10 dark:border-zinc-100/10">
        {latest.map((post, i) => (
          <motion.li
            key={post.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <Link
              href={`/writings/${post.slug}`}
              className="group grid grid-cols-[7rem_1fr_auto] sm:grid-cols-[9rem_1fr_auto] items-baseline gap-6 py-5
                hover:bg-zinc-900/[0.03] dark:hover:bg-zinc-100/[0.04] -mx-4 px-4 rounded-md transition-colors"
            >
              <time className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums shrink-0">
                {formatDate(post.date)}
              </time>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-medium text-zinc-900 dark:text-zinc-100 group-hover:underline underline-offset-4 leading-snug">
                  {post.title}
                </h3>
                {post.summary && (
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {post.summary}
                  </p>
                )}
              </div>

              <span className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 group-hover:translate-x-0.5 transition-all shrink-0">
                →
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default LatestWritingsSection;
