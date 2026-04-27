"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectsData from "../Data/ProjectsData.js";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { CodeBracketIcon, EyeIcon, BookOpenIcon } from "@heroicons/react/24/outline";
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

  const featured = ProjectsData[0]; // DocuMind — always first
  const rest = ProjectsData.slice(1);
  const featuredWriting = findRelatedWriting(featured, writings);

  // When "All": featured card handles DocuMind, grid shows the rest.
  // When filtered: grid shows all matching projects (including DocuMind if it matches).
  const showFeatured = tag === "All";
  const gridProjects = tag === "All"
    ? rest
    : ProjectsData.filter((p) => p.tag.includes(tag));

  const totalShown = showFeatured
    ? 1 + gridProjects.length
    : gridProjects.length;

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" ref={ref} className="relative py-12">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <p className="text-xs font-mono text-cyan-500/50 tracking-[0.3em] uppercase mb-2">
          // 03 &nbsp; PROJECT_LOGS
        </p>
        <div className="flex items-end gap-4 mb-1">
          <h2 className="text-4xl font-bold gradient-text-animated">My Projects</h2>
          <span className="text-xs font-mono text-[#555] mb-1.5">
            [{totalShown} loaded]
          </span>
        </div>
        <div className="h-px w-20 bg-gradient-to-r from-cyan-500/60 to-transparent" />
      </motion.div>

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap gap-2 justify-start items-center py-7 mt-2">
        <span className="text-[10px] font-mono text-[#555] mr-1">filter:</span>
        {FILTERS.map((t) => (
          <ProjectTag key={t} onClick={setTag} tag={t} isSelected={tag === t} />
        ))}
      </div>

      {/* ── Featured card (DocuMind) ── */}
      {showFeatured && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5 }}
          className="mb-8 rounded-2xl overflow-hidden border border-cyan-500/20
            bg-[#0a0a0f]/90 hover:border-cyan-500/40
            transition-colors duration-300 group">

          <div className="grid md:grid-cols-2">

            {/* Left: content */}
            <div className="p-7 lg:p-9 flex flex-col justify-center">

              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase
                  text-cyan-400 border border-cyan-500/30 rounded-full bg-cyan-500/5">
                  Flagship Project
                </span>
                <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase
                  text-violet-400 border border-violet-500/30 rounded-full bg-violet-500/5">
                  AI · RAG · SaaS
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                {featured.title}
              </h3>

              <p className="text-[#ADB7BE] text-sm leading-relaxed mb-4">
                {featured.description}
              </p>

              {featured.metric && (
                <p className="text-[10px] font-mono text-cyan-400/70
                  border-l-2 border-cyan-500/30 pl-2 leading-relaxed mb-5">
                  {featured.metric}
                </p>
              )}

              {featured.Tech && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featured.Tech.map((te) => (
                    <span key={te}
                      className="px-2 py-0.5 text-[10px] font-mono border border-cyan-500/20
                        bg-cyan-500/5 text-cyan-400/80 rounded-full">
                      {te}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                <Link href={featured.gitUrl}>
                  <div className="flex items-center gap-2 bg-[#0f0f14] border border-cyan-500/40
                    text-cyan-400 px-4 py-2 rounded-full text-sm font-medium
                    hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:border-cyan-400
                    transition-all duration-200">
                    <CodeBracketIcon className="w-4 h-4" /> GitHub
                  </div>
                </Link>
                <Link href={featured.preview} target="_blank">
                  <div className="flex items-center gap-2 border border-violet-500/40
                    text-violet-300 px-4 py-2 rounded-full text-sm font-medium
                    hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:border-violet-400
                    transition-all duration-200">
                    <EyeIcon className="w-4 h-4" /> Live Demo
                  </div>
                </Link>
              </div>

              {featuredWriting && (
                <Link
                  href={`/writings/${featuredWriting.slug}`}
                  className="group/dive mt-5 flex items-center gap-2 text-xs font-mono
                    text-cyan-400/80 hover:text-cyan-300 transition-colors w-fit"
                >
                  <BookOpenIcon className="w-3.5 h-3.5" />
                  <span className="opacity-70">Deep dive:</span>
                  <span className="underline decoration-cyan-500/30 underline-offset-4 group-hover/dive:decoration-cyan-400">
                    {featuredWriting.title}
                  </span>
                  <span className="transition-transform group-hover/dive:translate-x-1">→</span>
                </Link>
              )}
            </div>

            {/* Right: image */}
            <div
              className="relative h-56 md:h-auto img-pan scan-overlay min-h-[220px]"
              style={{
                background: `url(${featured.imgUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/30 to-transparent md:block hidden" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0a0a0f] to-transparent md:hidden" />
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Project grid ── */}
      <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
        {gridProjects.map((project, index) => (
          <motion.li
            key={project.id}
            initial="initial"
            variants={cardVariants}
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.4, delay: index * 0.1 }}>
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
