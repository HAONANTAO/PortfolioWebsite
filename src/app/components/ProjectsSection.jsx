"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectsData from "../Data/ProjectsData.js";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filteredProjects = ProjectsData.filter((p) => p.tag.includes(tag));

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" ref={ref} className="relative py-12">
      {/* Header */}
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
            [{filteredProjects.length} loaded]
          </span>
        </div>
        <div className="h-px w-20 bg-gradient-to-r from-cyan-500/60 to-transparent" />
      </motion.div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 justify-start items-center py-7 mt-2">
        <span className="text-[10px] font-mono text-[#555] mr-1">filter:</span>
        {["All", "React", "NextJS", "TypeScript", "ReactNative"].map((t) => (
          <ProjectTag key={t} onClick={setTag} tag={t} isSelected={tag === t} />
        ))}
      </div>

      <ul className="grid gap-6 md:grid-cols-3 md:gap-8">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            initial="initial"
            variants={cardVariants}
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.4, delay: index * 0.12 }}>
            <ProjectCard
              imgUrl={project.imgUrl}
              title={project.title}
              description={project.description}
              gitUrl={project.gitUrl}
              preview={project.preview}
              tag={project.tag}
              tech={project.Tech}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
