"use client";
import React, { useState } from "react";
import Link from "next/link";

import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
// 创一个列表
const navLinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
];
const NavBar = () => {
  // dropdown list open?
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100 border border-[#33353F]">
      <div className="flex-wrap items-center justify-between p-4 py-2 text-white lg:py-4 lg:flex ma-auto">
        <Link
          href={"/"}
          className="text-2xl font-semibold text-white md:text-5xl">
          <img src="/images/icons/tao.png" alt="tao.png" />
        </Link>
        {/* 为了给手机端使用 */}
        <div className="block mobile-menu md:hidden">
          {navbarOpen ? (
            <button
              onClick={() => setNavbarOpen((prevState) => !prevState)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
              <XMarkIcon className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen((prevState) => !prevState)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
              <Bars3Icon className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="hidden menu md:block md:w-auto " id="navbar">
          <ul className="flex p-4 mt-0 md:p-0 md:flex-row md:space-x-8">
            <MenuOverlay links={navLinks} />
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default NavBar;
