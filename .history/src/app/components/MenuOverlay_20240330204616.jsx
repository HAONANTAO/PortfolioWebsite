import React from "react";
import { Link as ScrollLink } from "react-scroll"; // 导入 react-scroll 的 Link 组件
// import NavLink from "./NavLink"; // 导入你的 NavLink 组件

const MenuOverlay = ({ links }) => {
  return (
    <ul className="flex flex-col items-center py-4">
      {links.map((link, index) => (
        <li key={index}>
          {/* 使用 react-scroll 的 Link 组件包裹 NavLink 组件 */}
          <ScrollLink
            to={link.path} // 目标元素的 ID
            spy={true}
            offset={400}
            smooth={true}
            duration={500} // 可选：滚动持续时间，单位为毫秒
            className="text-2xl text-purple-300 cursor-pointer" // 可选：添加样式
            onClick={(event) => {
              // 阻止默认的链接行为
              event.preventDefault();
              // 执行平滑滚动操作
              window.scrollTo({
                top: document.querySelector(link.path).offsetTop - 70,
                behavior: "smooth",
              });
            }}>
            {link.title}
          </ScrollLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
