"use client";
import React from "react";
import { motion } from "framer-motion";

const stats = [
  { value: "6+", label: "Apps shipped" },
  { value: "1",  label: "On the App Store" },
  { value: "3",  label: "Certifications" },
  { value: "2+", label: "Years building" },
];

const AchievementSection = () => {
  return (
    <section className="py-16 border-t border-zinc-900/10 dark:border-zinc-100/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8">
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          By the numbers
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">

        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums">
              {stat.value}
            </span>
            <span className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              {stat.label}
            </span>
          </div>
        ))}

      </motion.div>
    </section>
  );
};

export default AchievementSection;
