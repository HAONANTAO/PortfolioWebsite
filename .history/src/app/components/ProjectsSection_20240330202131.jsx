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

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = ProjectsData.filter((project) =>
    project.tag.includes(tag),
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  return (
    <section id="projects" ref={ref} className="mt-100">
      <h2 className="text-4xl font-bold">My Projects</h2>
      <div className="flex flex-row items-center justify-center gap-2 py-6 text-white">
        <ProjectTag
          onClick={handleTagChange}
          tag="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          tag="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          tag="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul className="grid gap-8 md:grid-cols-3 md:gap-14">
        {filteredProjects.map((project, index) => {
          return (
            <motion.li
              key={index}
              initial="initial"
              variants={cardVariants}
              animate={isInView ? "animate" : "initial"}
              // 每一个index 后面的多延迟一点
              transition={{ duration: 0.3, delay: index * 0.4 }}>
              <ProjectCard
                key={project.id}
                imgUrl={project.imgUrl}
                title={project.title}
                description={project.description}
                gitUrl={project.gitUrl}
                preview={project.preview}
              />
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
};

export default ProjectsSection;
