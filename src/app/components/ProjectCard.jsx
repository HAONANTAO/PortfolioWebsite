'use client'
import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, metric, gitUrl, preview, tag, tech }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-80, 80], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-8, 8]), { stiffness: 200, damping: 20 });
  const glowX   = useTransform(x, [-80, 80], [0, 100]);
  const glowY   = useTransform(y, [-80, 80], [0, 100]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="rounded-xl overflow-hidden border border-[#33353F]/60
        hover:border-cyan-500/30 transition-border duration-300
        bg-[#0a0a0f]/90 cursor-default"
      whileHover={{ scale: 1.02 }}>

      {/* Image */}
      <div
        className="relative h-52 md:h-[230px] group scan-overlay img-pan"
        style={{
          background: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0a0a0f] to-transparent" />

        {/* Mouse-following glow highlight */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(6,182,212,0.12), transparent 60%)`,
            ),
          }}
        />

        {/* Hover overlay */}
        <div className="overlay flex-col items-center justify-center absolute top-0 left-0 w-full h-full
          bg-opacity-0 hidden bg-[#080810] group-hover:flex group-hover:bg-opacity-88
          transition-all duration-400 p-4">
          <div className="flex gap-3">
            <Link href={gitUrl} className="hover:scale-110 transition-transform">
              <div className="flex items-center gap-2 bg-[#0f0f14] border border-cyan-500/40
                text-cyan-400 px-4 py-1.5 rounded-full text-sm font-medium
                hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-shadow">
                <CodeBracketIcon className="w-4 h-4" /> GitHub
              </div>
            </Link>
            <Link href={preview} target="_blank" className="hover:scale-110 transition-transform">
              <div className="flex items-center gap-2 border border-violet-500/40
                text-violet-300 px-4 py-1.5 rounded-full text-sm font-medium
                hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-shadow">
                <EyeIcon className="w-4 h-4" /> Live Demo
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="py-5 px-4">
        <h5 className="mb-2 text-base font-semibold text-white">{title}</h5>
        <p className="text-[#ADB7BE] text-sm line-clamp-3 leading-relaxed">{description}</p>

        {metric && (
          <p className="mt-2.5 text-[10px] font-mono text-cyan-400/70 border-l-2 border-cyan-500/30 pl-2 leading-relaxed">
            {metric}
          </p>
        )}

        {tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {tech.map((te, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-mono border border-cyan-500/20
                  bg-cyan-500/5 text-cyan-400/80 rounded-full
                  hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-150">
                {te}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
