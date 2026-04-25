"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import GithubIcon from "../../../public/images/icons/github-icon.svg";
import LinkedinIcon from "../../../public/images/icons/linkedin-icon.svg";

const EMAIL = "taoaaron5@gmail.com";

const EmailSection = () => {
  return (
    <section id="contact" className="relative py-24 my-8">
      {/* Glows */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12">
        <p className="text-xs font-mono text-cyan-500/50 tracking-[0.3em] uppercase mb-2">
          // 04 &nbsp; INIT_CONNECTION
        </p>
        <h2 className="text-4xl font-bold gradient-text-animated mb-1">Let's Build Together</h2>
        <div className="h-px w-20 bg-gradient-to-r from-cyan-500/60 to-transparent" />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 relative z-10">

        {/* ── Left: context ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full
            border border-cyan-500/20 bg-cyan-500/5">
            <span className="relative flex h-2 w-2">
              <span className="ping-slow absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />
            </span>
            <span className="text-xs font-mono text-cyan-400/80">OPEN_TO_AI_ROLES</span>
          </div>

          <p className="text-[#ADB7BE] mb-4 max-w-sm leading-relaxed text-sm">
            Looking for full-stack or AI engineering roles. Whether it's
            building LLM pipelines, shipping React apps, or architecting
            cloud systems — let's create something great.
          </p>

          <div className="flex flex-col gap-3 mb-6 text-xs font-mono text-[#666]">
            <div className="flex items-center gap-2">
              <span className="text-cyan-500">→</span> Full Stack Development
            </div>
            <div className="flex items-center gap-2">
              <span className="text-violet-500">→</span> AI / LLM Application Engineering
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">→</span> Cloud Architecture (AWS)
            </div>
          </div>

          <div className="flex flex-row gap-3">
            <Link
              href="https://github.com/HAONANTAO"
              target="_blank"
              className="p-2.5 rounded-xl border border-[#1a1a2e]
                hover:border-cyan-500/35 hover:bg-cyan-500/5
                hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]
                transition-all duration-200">
              <Image src={GithubIcon} alt="GitHub" width={22} height={22} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/haonan-tao-4a9855270/"
              target="_blank"
              className="p-2.5 rounded-xl border border-[#1a1a2e]
                hover:border-violet-500/35 hover:bg-violet-500/5
                hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
                transition-all duration-200">
              <Image src={LinkedinIcon} alt="LinkedIn" width={22} height={22} />
            </Link>
          </div>
        </motion.div>

        {/* ── Right: email CTA ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}>

          <div className="rounded-2xl border border-[#1a1a2e] bg-[#060608]/80
            backdrop-blur-md p-8 relative overflow-hidden
            flex flex-col items-center justify-center text-center gap-6"
            style={{ minHeight: 280 }}>

            {/* Glow accent */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48
              rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />

            {/* Decorative top bar */}
            <div className="absolute top-0 left-0 right-0 h-px
              bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

            <div>
              <p className="text-[9px] font-mono text-cyan-500/50 tracking-[0.3em] uppercase mb-3">
                REACH OUT
              </p>
              <p className="text-lg lg:text-xl font-mono font-semibold text-white/90 tracking-wide">
                {EMAIL}
              </p>
            </div>

            <Link href={`mailto:${EMAIL}?subject=Opportunity — Let's connect`}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3.5 rounded-xl font-mono font-medium text-white
                  bg-gradient-to-r from-cyan-500 to-violet-600
                  hover:shadow-[0_0_30px_rgba(6,182,212,0.45)]
                  transition-shadow duration-300">
                Say Hello →
              </motion.button>
            </Link>

            <p className="text-[10px] font-mono text-[#444]">
              Typically responds within 24 h · Australian PR · Full work rights
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSection;
