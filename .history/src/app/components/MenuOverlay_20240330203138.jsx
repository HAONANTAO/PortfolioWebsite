import React from "react";
import NavLink from "./NavLink";
import { animateScroll as scroll } from "react-scroll"; // 导入 react-scroll

const MenuOverlay = ({ links }) => {
  // 点击项目链接时进行平滑滚动
  const handleProjectsClick = (path) => {
    scroll.scrollTo(path, {
      smooth: true,
    });
  };

  return (
    <ul className="flex flex-col items-center py-4">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink
            onClick={() => handleProjectsClick(link.path)} // 传递链接的路径作为参数
            href={link.path}
            title={link.title}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
