"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectsData from "../Data/ProjectsData.js";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { CodeBracketIcon, EyeIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const FILTERS = ["All", "AI", "NextJS", "TypeScript"];

const findRelatedWriting = (project, writings) =>
  writings.find(
    (w) => w.category === "project" && w.project === project.title
  );

const ProjectsSection = ({ writings = [] }) => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const featured = ProjectsData[0];
  const rest = ProjectsData.slice(1);
  const featuredWriting = findRelatedWriting(featured, writings);

  const showFeatured = tag === "All";
  const gridProjects = tag === "All"
    ? rest
    : ProjectsData.filter((p) => p.tag.includes(tag));

  const cardVariants = {
    initial: { y: 24, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" ref={ref} className="relative py-20 border-t border-zinc-900/10">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <h2 className="serif text-4xl sm:text-5xl font-normal text-zinc-900 mb-3">Selected work</h2>
        <p className="text-zinc-500 text-sm max-w-xl mb-10">
          A handful of things I've shipped — each link is a real product or a working repo.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((t) => (
          <ProjectTag key={t} onClick={setTag} tag={t} isSelected={tag === t} />
        ))}
      </div>

      {showFeatured && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-xl overflow-hidden border border-zinc-900/10
            hover:border-zinc-900/25 transition-colors duration-300 group bg-white
            shadow-[0_4px_24px_rgba(0,0,0,0.04)]">

          <div className="grid md:grid-cols-2">

            <div className="p-7 lg:p-9 flex flex-col justify-center">

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                  Featured
                </span>
                <span className="h-px w-8 bg-zinc-900/15" />
                <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                  AI · RAG · SaaS
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-semibold text-zinc-900 mb-3">
                {featured.title}
              </h3>

              <p className="text-zinc-600 text-sm leading-relaxed mb-5">
                {featured.description}
              </p>

              {featured.metric && (
                <p className="text-xs text-zinc-500 leading-relaxed mb-5">
                  {featured.metric}
                </p>
              )}

              {featured.Tech && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featured.Tech.map((te) => (
                    <span key={te}
                      className="px-2 py-0.5 text-[11px] text-zinc-700 border border-zinc-900/10 rounded">
                      {te}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3 flex-wrap items-center mb-5">
                <Link href={featured.gitUrl} className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 transition-colors">
                  <CodeBracketIcon className="w-4 h-4" /> GitHub
                </Link>
                <span className="text-zinc-300">·</span>
                <Link href={featured.preview} target="_blank" className="flex items-center gap-2 text-sm text-zinc-700 hover:text-zinc-900 transition-colors">
                  <EyeIcon className="w-4 h-4" /> Live
                </Link>
              </div>

              {featuredWriting && (
                <Link
                  href={`/writings/${featuredWriting.slug}`}
                  className="group/dive flex items-center gap-3 px-4 py-3 rounded-lg
                    border border-zinc-900/10 bg-zinc-900/[0.025]
                    hover:border-zinc-900/25 hover:bg-zinc-900/[0.04] transition-colors w-fit max-w-full"
                >
                  <div className="flex-1 min-w-0">
                    <span className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-0.5">
                      Deep dive
                    </span>
                    <span className="block text-sm font-medium text-zinc-800 line-clamp-1">
                      {featuredWriting.title}
                    </span>
                  </div>
                  <ArrowRightIcon className="w-4 h-4 text-zinc-400 shrink-0
                    transition-transform group-hover/dive:translate-x-0.5 group-hover/dive:text-zinc-700" />
                </Link>
              )}
            </div>

            <div
              className="relative h-56 md:h-auto img-pan min-h-[260px]"
              style={{
                background: `url(${featured.imgUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
              }}>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/15 to-transparent md:hidden" />
            </div>
          </div>
        </motion.div>
      )}

      <ul className="grid gap-6 md:grid-cols-3">
        {gridProjects.map((project, index) => (
          <motion.li
            key={project.id}
            initial="initial"
            variants={cardVariants}
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.4, delay: index * 0.06 }}>
            <ProjectCard
              imgUrl={project.imgUrl}
              title={project.title}
              description={project.description}
              metric={project.metric}
              gitUrl={project.gitUrl}
              preview={project.preview}
              tag={project.tag}
              tech={project.Tech}
              relatedWriting={findRelatedWriting(project, writings)}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
