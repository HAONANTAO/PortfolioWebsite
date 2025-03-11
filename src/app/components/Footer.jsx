import React from "react";

const Footer = () => {
  return (
    <footer className="z-10 footer border border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container flex items-center justify-between p-2">
        <img
          className="hidden w-20 h-auto md:block "
          src="/images/icons/tao2.png"
          alt="tao.png"
        />
        <p className="text-slate-600">Developed by HAONAN TAO</p>
      </div>
    </footer>
  );
};

export default Footer;
