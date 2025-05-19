/*
 * @Date: 2025-01-18 16:18:52
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-05-19 22:13:32
 * @FilePath: /PortfolioWebsite/src/app/components/ProjectCard.jsx
 */
import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const ProjectCard = ({
  imgUrl,
  title,
  description,
  gitUrl,
  preview,
  tag,
  tech,
}) => {
  return (
    <div>
      {/* 图片作为背景 */}
      <div
        className="relative h-52 rounded-t-xl md:h-72 group"
        style={{
          background: `url(${imgUrl})`,
          // 填满
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat", // 确保背景图像不重复出现
          height: "230px",
        }}>
        <div className="overlay flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-opacity-0 hidden bg-[#181818] group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 p-4">
          {/* 项目描述部分 */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex flex-wrap gap-2 justify-center mb-4 text-blue-300">
              {tech &&
                tech.map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm text-white rounded-full">
                    {item}
                  </span>
                ))}
            </div>
          </div>
          <div className="flex">
            <Link
              href={gitUrl}
              className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE]  hover:border-white group/link">
              <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE]  cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white "></CodeBracketIcon>
            </Link>

            <Link
              href={preview}
              target="_blank" // 新标签页打开链接
              className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE]  hover:border-white group/link">
              <EyeIcon className="h-10 w-10 text-[#ADB7BE]  cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white "></EyeIcon>
            </Link>
          </div>
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
