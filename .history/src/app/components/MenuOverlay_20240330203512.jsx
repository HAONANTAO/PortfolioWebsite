import React from "react";
import { Link as ScrollLink } from "react-scroll"; // 导入 react-scroll 的 Link 组件

const MenuOverlay = ({ links }) => {
  return (
    <ul className="flex flex-col items-center py-4">
      {links.map((link, index) => (
        <li key={index}>
          {/* 使用 react-scroll 的 Link 组件 */}
          <ScrollLink
            to={link.path} // 目标元素的 ID
            spy={true}
            smooth={true}
            offset={-70} // 可选：偏移量，可以根据实际情况调整
            duration={500} // 可选：滚动持续时间，单位为毫秒
            className="cursor-pointer" // 可选：添加样式
          >
            {link.title}
          </ScrollLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
