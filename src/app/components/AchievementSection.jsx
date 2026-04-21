"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  FolderOpenIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), { ssr: false });

const stats = [
  { metric: "AI Projects",    value: "10", postfix: "+", icon: FolderOpenIcon,  color: "cyan",    label: "PROJECTS_TOTAL" },
  { metric: "Certifications", value: "4",  postfix: "+", icon: AcademicCapIcon, color: "violet",  label: "CERTS_EARNED"   },
  { metric: "Yrs Experience", value: "2",  postfix: "+", icon: CalendarDaysIcon,color: "emerald", label: "YRS_EXPERIENCE" },
];

const palette = {
  cyan:    { text: "text-cyan-400",    border: "border-cyan-500/20",    bg: "bg-cyan-500/5",    icon: "text-cyan-400",    glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.18)]",    bar: "from-cyan-500" },
  violet:  { text: "text-violet-400",  border: "border-violet-500/20",  bg: "bg-violet-500/5",  icon: "text-violet-400",  glow: "hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]",   bar: "from-violet-500" },
  amber:   { text: "text-amber-400",   border: "border-amber-500/20",   bg: "bg-amber-500/5",   icon: "text-amber-400",   glow: "hover:shadow-[0_0_30px_rgba(251,191,36,0.18)]",   bar: "from-amber-500" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5", icon: "text-emerald-400", glow: "hover:shadow-[0_0_30px_rgba(52,211,153,0.18)]",   bar: "from-emerald-500" },
};

const AchievementSection = () => {
  return (
    <div className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <p className="text-xs font-mono text-cyan-500/50 tracking-[0.3em] uppercase mb-6">
          // 01 &nbsp; CAREER_STATS
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const c = palette[stat.color];
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative flex flex-col p-8 rounded-2xl border ${c.border} ${c.bg} ${c.glow}
                bg-[#060608]/80 transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-default`}>

              {/* Background decoration */}
              <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${c.bar} to-transparent opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />

              {/* Label */}
              <span className={`text-[9px] font-mono tracking-widest uppercase mb-4 ${c.text} opacity-50`}>
                {stat.label}
              </span>

              {/* Icon */}
              <Icon className={`w-9 h-9 ${c.icon} opacity-25 group-hover:opacity-55 transition-opacity mb-4`} />

              {/* Number */}
              <div className={`flex items-baseline gap-0.5 text-6xl font-bold tabular-nums ${c.text}`}>
                <span>{stat.prefix}</span>
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(stat.value)}
                  locale="en-US"
                  className={`text-6xl font-bold ${c.text}`}
                  configs={(_, idx) => ({ mass: 1, friction: 100, tensions: 140 * (idx + 1) })}
                />
                <span>{stat.postfix}</span>
              </div>

              {/* Metric label */}
              <p className="text-[#ADB7BE] text-sm mt-3 font-medium">{stat.metric}</p>

              {/* Bottom accent bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${c.bar} to-transparent opacity-0 group-hover:opacity-60 transition-opacity`} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementSection;
