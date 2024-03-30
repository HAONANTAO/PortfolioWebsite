import React from "react";
import NavLink from "./NavLink";
import { animateScroll as scroll } from "react-scroll"; // 导入 react-scroll
const MenuOverlay = ({ links }) => {
  return (
    <ul className="flex flex-col items-center py-4">
      {links.map((link, index) => (
        <li key={index}>
          <NavLink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
