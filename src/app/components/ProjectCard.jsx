/*
 * @Date: 2025-01-18 16:18:52
 * @LastEditors: 陶浩南 taoaaron5@gmail.com
 * @LastEditTime: 2025-05-20 20:34:44
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
          {/* 链接按钮 */}
          <div className="flex gap-4 mt-4">
            <Link
              href={gitUrl}
              className="transition-transform transform hover:scale-110">
              <div className="flex items-center space-x-2 bg-[#24292e] text-white px-3 py-1 rounded-full">
                <CodeBracketIcon className="w-4 h-4" />
                <span className="text-sm">GitHub</span>
              </div>
            </Link>

            <Link
              href={preview}
              target="_blank"
              className="transition-transform transform hover:scale-110">
              <div className="flex items-center px-3 py-1 space-x-2 text-white bg-blue-600 rounded-full">
                <EyeIcon className="w-4 h-4" />
                <span className="text-sm">Live Demo</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* explanations */}
      {/* 底部信息 */}
      <div className="mt-4 text-white rounded-b-xl bg-[#181818] py-6 px-4">
        <h5 className="mb-2 text-xl font-semibold">{title}</h5>
        <p className="text-[#ADB7BE]  text-sm line-clamp-4">{description}</p>

        {/* 添加技术栈标签预览 */}
        <div className="flex flex-wrap gap-2 mt-3">
          {tech &&
            tech.map((te, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-[#2d2d2d] text-[#ADB7BE] rounded-full">
                {te}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
