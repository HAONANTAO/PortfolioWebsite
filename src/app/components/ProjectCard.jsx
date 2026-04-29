'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CodeBracketIcon, EyeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, metric, gitUrl, preview, tag, tech, relatedWriting }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group rounded-xl overflow-hidden border border-zinc-900/10
        hover:border-zinc-900/25 bg-white/70
        dark:border-zinc-100/10 dark:hover:border-zinc-100/25 dark:bg-zinc-100/[0.03]
        backdrop-blur-sm transition-colors duration-300 h-full flex flex-col">

      <div
        className="relative h-48 md:h-[200px] overflow-hidden"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)' }}
      >
        <Image
          src={imgUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover img-pan-img"
        />
      </div>

      <div className="py-5 px-5 flex-1 flex flex-col">
        <h5 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-100">{title}</h5>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 leading-relaxed">{description}</p>

        {metric && (
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500 leading-relaxed">
            {metric}
          </p>
        )}

        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tech.slice(0, 4).map((te, i) => (
              <span
                key={i}
                className="px-1.5 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400 border border-zinc-900/10 dark:border-zinc-100/10 rounded">
                {te}
              </span>
            ))}
          </div>
        )}

        {/* Deep dive — surfaces the related writing prominently */}
        {relatedWriting && (
          <Link
            href={`/writings/${relatedWriting.slug}`}
            className="group/dive mt-4 flex items-start gap-2 px-3 py-2.5 rounded-lg
              border border-zinc-900/10 bg-zinc-900/[0.025]
              hover:border-zinc-900/25 hover:bg-zinc-900/[0.04]
              dark:border-zinc-100/10 dark:bg-zinc-100/[0.03]
              dark:hover:border-zinc-100/25 dark:hover:bg-zinc-100/[0.06]
              transition-colors"
          >
            <div className="flex-1 min-w-0">
              <span className="block text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-0.5">
                Deep dive
              </span>
              <span className="block text-xs font-medium text-zinc-800 dark:text-zinc-200 line-clamp-2 leading-snug">
                {relatedWriting.title}
              </span>
            </div>
            <ArrowRightIcon className="w-3.5 h-3.5 mt-2 text-zinc-400 dark:text-zinc-500 shrink-0
              transition-transform group-hover/dive:translate-x-0.5 group-hover/dive:text-zinc-700 dark:group-hover/dive:text-zinc-200" />
          </Link>
        )}

        <div className="mt-auto pt-4 flex items-center gap-3 text-sm">
          <Link href={gitUrl} className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
            <CodeBracketIcon className="w-4 h-4" /> Code
          </Link>
          <span className="text-zinc-300 dark:text-zinc-600">·</span>
          <Link href={preview} target="_blank" className="flex items-center gap-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors">
            <EyeIcon className="w-4 h-4" /> Live
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
