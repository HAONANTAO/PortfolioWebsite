"use client";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";
import AIChatDemo from "./AIChatDemo";
import TAB_DATA from "../Data/TabData.js";
import { motion } from "framer-motion";

const AboutSection = () => {
  const [tab, setTab] = useState("Skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => setTab(id));
  };

  return (
    <section id="about" className="text-white relative py-12">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <p className="text-xs font-mono text-cyan-500/50 tracking-[0.3em] uppercase mb-2">
          // 02 &nbsp; ABOUT.SYS
        </p>
        <h2 className="text-4xl font-bold gradient-text-animated mb-1">About Me</h2>
        <div className="h-px w-20 bg-gradient-to-r from-cyan-500/60 to-transparent mb-10" />
      </motion.div>

      <div className="gap-10 items-start md:grid md:grid-cols-2 xl:gap-16">
        {/* AI Chat Demo */}
        <AIChatDemo />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col mt-6 md:mt-0">

          {/* Bio */}
          <div className="relative pl-4 border-l border-cyan-500/20 mb-6">
            <p className="text-[#ADB7BE] text-sm lg:text-base leading-7">
              I'm an engineer who ships end-to-end —
              <span className="text-sky-400 font-medium"> sole-authored a finance app to the App Store</span>,
              built a <span className="text-violet-400 font-medium">production RAG SaaS</span> (DocuMind)
              with streaming responses and vector search, and I'm obsessed with closing the gap between
              <span className="text-cyan-400 font-medium"> LLM demos and real-world products</span>.
            </p>
            <p className="text-[#ADB7BE] text-sm lg:text-base leading-7 mt-3">
              Stack: <span className="text-cyan-400 font-medium">React · Next.js · TypeScript · Node.js · React Native</span>.
              Reaches for <span className="text-violet-400 font-medium">LangChain &amp; OpenAI API</span> when
              the problem needs LLMs, and <span className="text-amber-400 font-medium">AWS</span> when it needs scale.
              <span className="text-emerald-400 font-medium"> AWS CCP · PMP®</span> certified · Australian PR · Full work rights.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-row gap-1 border-b border-[#1a1a2e]">
            {["Skills", "Educations", "Certifications"].map((t) => (
              <TabButton
                key={t}
                selectTab={() => handleTabChange(t)}
                active={tab === t}>
                {t}
              </TabButton>
            ))}
          </div>

          <div className="mt-6">
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
