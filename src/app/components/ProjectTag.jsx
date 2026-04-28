import React from "react";

const ProjectTag = ({ tag, onClick, isSelected }) => {
  return (
    <button
      onClick={() => onClick(tag)}
      className={`px-3.5 py-1.5 rounded-md text-sm transition-colors duration-200 ${
        isSelected
          ? "bg-zinc-900 text-white"
          : "text-zinc-500 hover:text-zinc-900"
      }`}>
      {tag}
    </button>
  );
};

export default ProjectTag;
