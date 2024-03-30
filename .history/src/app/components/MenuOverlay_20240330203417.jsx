import React, { useRef } from "react";
import NavLink from "./NavLink";
import { Link as ScrollLink } from "react-scroll";
("react-scroll"); // 导入 react-scroll
const MenuOverlay = ({ links }) => {
  // 平滑点击跳转
  const projectsSectionRef = useRef(null);

  // 点击项目链接时进行平滑滚动
  const handleProjectsClick = () => {
    scroll.scrollTo(projectsSectionRef.current.offsetTop, {
      smooth: true,
    });
  };

  return (
    <ul className="flex flex-col items-center py-4">
      {links.map((link, index) => (
        <li key={index}>
          <ScrollLink></ScrollLink>
          <NavLink
            onClick={() => handleProjectsClick(link.path)}
            href={link.path}
            title={link.title}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
