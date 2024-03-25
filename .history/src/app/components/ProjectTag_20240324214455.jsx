import React from "react";

const ProjectTag = ({ tag, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? "text-white border-purple-500"
    : "text-[#ADB78BE] border-slate-600 hover:border-white";
  return (
    <button
      onClick={() => onClick(tag)}
      className={`${buttonStyles} rounded-full border px-6 py-3 text-xl cursor-pointer`}>
      {tag}
    </button>
  );
};

export default ProjectTag;
