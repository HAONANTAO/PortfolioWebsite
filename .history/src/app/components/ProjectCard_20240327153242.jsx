import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const ProjectCard = ({ imgUrl, title, description, gitUrl, preview }) => {
  return (
    <div>
      {/* 图片作为背景 */}
      <div
        className="relative h-52 md:h-72 rounded-t-xl group "
        style={{
          background: `url(${imgUrl})`,
          backgroundSize: "contain",
          height: "400px",
        }}>
        <div className="overlay flex items-center justify-center absolute top-0 left-0 w-full h-full bg-opacity-0 hidden bg-[#181818] group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE]  hover:border-white group/link">
            <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE]  cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white "></CodeBracketIcon>
          </Link>

          <Link
            href={preview}
            className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE]  hover:border-white group/link">
            <EyeIcon className="h-10 w-10 text-[#ADB7BE]  cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white "></EyeIcon>
          </Link>
        </div>
      </div>
      {/* explanations */}
      <div className="mt-4 text-white rounded-b-xl bg-[#181818] py-6 px-4">
        <h5 className="mb-2 text-xl font-semibold">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
