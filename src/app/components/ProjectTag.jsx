import React from "react";

const ProjectTag = ({ tag, onClick, isSelected }) => {
  return (
    <button
      onClick={() => onClick(tag)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border cursor-pointer ${
        isSelected
          ? "border-cyan-500/70 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]"
          : "border-[#33353F] text-[#ADB7BE] hover:border-cyan-500/40 hover:text-cyan-400/80 hover:bg-cyan-500/5"
      }`}>
      {tag}
    </button>
  );
};

export default ProjectTag;
