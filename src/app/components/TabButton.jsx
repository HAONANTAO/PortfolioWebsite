import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? "text-zinc-900" : "text-zinc-400";

  return (
    <button onClick={selectTab} className="group">
      <p className={`mr-3 text-sm font-medium hover:text-zinc-900 transition-colors duration-200 ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        transition={{ duration: 0.25 }}
        className="h-px mt-2 mr-3 bg-zinc-900"
      />
    </button>
  );
};

export default TabButton;
