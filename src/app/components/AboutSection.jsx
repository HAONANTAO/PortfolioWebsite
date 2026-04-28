"use client";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";
import CurrentlyCard from "./CurrentlyCard";
import TAB_DATA from "../Data/TabData.js";
import { motion } from "framer-motion";

const AboutSection = () => {
  const [tab, setTab] = useState("Skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => setTab(id));
  };

  return (
    <section id="about" className="relative py-20 border-t border-zinc-900/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <h2 className="serif text-4xl sm:text-5xl font-normal text-zinc-900 mb-12">About</h2>
      </motion.div>

      <div className="gap-12 items-start md:grid md:grid-cols-2">
        <CurrentlyCard />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col mt-8 md:mt-0">

          <div className="mb-8 space-y-4">
            <p className="text-zinc-700 text-base leading-relaxed">
              I'm an engineer who ships end-to-end — sole-authored a finance app to the App Store,
              built a production RAG SaaS (DocuMind) with streaming responses and vector search,
              and I'm obsessed with closing the gap between LLM demos and real-world products.
            </p>
            <p className="text-zinc-700 text-base leading-relaxed">
              Day-to-day stack: React, Next.js, TypeScript, Node.js, React Native.
              Reach for LangChain &amp; OpenAI when the problem needs LLMs, AWS when it needs scale.
              AWS CCP · PMP® certified · Australian PR.
            </p>
          </div>

          <div className="flex flex-row gap-1 border-b border-zinc-900/10">
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
