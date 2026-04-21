import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? "text-cyan-400" : "text-[#ADB7BE]";

  return (
    <button onClick={selectTab} className="group">
      <p className={`mr-3 font-semibold hover:text-cyan-400 transition-colors duration-200 ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        transition={{ duration: 0.3 }}
        className="h-0.5 mt-2 mr-3 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full shadow-[0_0_6px_rgba(6,182,212,0.6)]"
      />
    </button>
  );
};

export default TabButton;
