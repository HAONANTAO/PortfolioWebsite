import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active
    ? "text-zinc-900 dark:text-zinc-100"
    : "text-zinc-400 dark:text-zinc-500";

  return (
    <button onClick={selectTab} className="group">
      <p className={`mr-3 text-sm font-medium hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        transition={{ duration: 0.25 }}
        className="h-px mt-2 mr-3 bg-zinc-900 dark:bg-zinc-100"
      />
    </button>
  );
};

export default TabButton;
