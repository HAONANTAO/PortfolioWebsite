import React,{useR} from "react";
import NavLink from "./NavLink";
import { animateScroll as scroll } from "react-scroll"; // 导入 react-scroll
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
          <NavLink
            onClick={handleProjectsClick}
            href={link.path}
            title={link.title}
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
