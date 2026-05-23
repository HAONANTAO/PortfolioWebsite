"use client";
import React from "react";
import CurrentlyCard from "./CurrentlyCard";
import { motion } from "framer-motion";

const SKILL_GROUPS = [
  { group: "AI / LLM",   skills: ["OpenAI API", "LangChain", "Claude API", "Prompt Eng.", "RAG", "AI Agents*"] },
  { group: "Frontend",   skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Framer Motion"] },
  { group: "Mobile",     skills: ["React Native", "Expo"] },
  { group: "Backend",    skills: ["Node.js", "Express", "Python", "Prisma", "REST API"] },
  { group: "Cloud & DB", skills: ["AWS", "MongoDB", "Vercel", "Supabase", "Clerk", "Stripe"] },
];

const EDUCATION = [
  {
    href: "/PDFs/UniMel.pdf",
    school: "University of Melbourne",
    degree: "MSc Information Technology",
    year: "2021 – 2023",
  },
  {
    href: "/PDFs/Monash.pdf",
    school: "Monash University",
    degree: "BSc Computer Science · Data Science",
    year: "2019 – 2021",
  },
];

const CERTS = [
  { href: "/PDFs/AWS.pdf",  label: "AWS Cloud Practitioner" },
  { href: "/PDFs/PMP.pdf",  label: "PMP®" },
  { href: "/PDFs/ITIL.pdf", label: "ITIL® Foundation" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 border-t border-zinc-900/10 dark:border-zinc-100/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}>
        <h2 className="serif text-4xl sm:text-5xl font-normal text-zinc-900 dark:text-zinc-100 mb-12">About</h2>
      </motion.div>

      <div className="gap-12 items-start md:grid md:grid-cols-2">
        <CurrentlyCard />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col mt-8 md:mt-0">

          {/* Why narrative — complements the Hero, doesn't repeat it */}
          <div className="mb-10 space-y-4">
            <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
              I started in CRUD apps — the kind of work where the hard part is naming things and the easy part
              is the framework. The pattern got familiar fast. When LLMs started actually working in production,
              I went chasing what <em>wasn&apos;t</em> familiar yet, and I haven&apos;t stopped — retrieval,
              streaming, agents, vibe-coding workflows, the messy second half of an AI feature where the demo
              ends and the user shows up.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
              RAG was the first thing I picked to go deep on, because it&apos;s the part that decides whether an
              LLM product feels smart or stupid, and almost no one writes about it honestly. DocuMind is my
              running notebook on the topic — I rebuild the same pieces (chunking, eval sets, hybrid search)
              until I can say why each one is the size and shape it is. Agents and vibe-coding are next.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
              Mostly I care about shipping. A demo I can&apos;t put in front of a real user is a research project
              with better lighting. The work I&apos;m proud of is on the App Store, on Vercel, and now in
              production as the <strong className="font-semibold text-zinc-900 dark:text-zinc-100">internal payroll system for Shangxue Tutoring</strong>{' '}
              (Mar – Jun 2026) — getting hit by traffic from people who don&apos;t know me.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
              I keep picking up new ways of working — the stack moves, you move with it. Right now I&apos;m{' '}
              <em>vibe-coding AI Chrome extensions</em> with Claude Code.{' '}
              <a
                href="https://chromewebstore.google.com/detail/leibhmkahdofhfallekeoljmiajcjjlk"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-zinc-900 dark:text-zinc-100 border-b border-zinc-900/20 dark:border-zinc-100/20 hover:border-[color:var(--accent)] transition-colors">
                EchoReply
              </a>{' '}
              is the first one out the door — an AI sidebar for Gmail that decodes what the sender actually wants
              and drafts replies in three tones, now live on the Chrome Web Store. Proof I&apos;m not just reading
              about this stuff, I&apos;m shipping with it.
            </p>
          </div>

          {/* Stack — inline, always visible */}
          <div className="mb-10">
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
              Stack
            </h3>
            <div className="flex flex-col gap-3">
              {SKILL_GROUPS.map(({ group, skills }) => (
                <div key={group} className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest shrink-0 w-20">
                    {group}
                  </span>
                  {skills.map((skill) => {
                    const isLearning = skill.endsWith("*");
                    const label = isLearning ? skill.slice(0, -1) : skill;
                    return (
                      <span
                        key={skill}
                        title={isLearning ? "Currently learning" : undefined}
                        className={`px-2 py-0.5 text-[11px] rounded border border-zinc-900/10 dark:border-zinc-100/10
                          text-zinc-700 dark:text-zinc-300 cursor-default select-none transition-colors
                          hover:border-zinc-900/30 dark:hover:border-zinc-100/30
                          hover:text-zinc-900 dark:hover:text-zinc-100
                          ${isLearning ? "border-dashed opacity-60" : ""}`}>
                        {label}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Education & credentials — compact, no tabs */}
          <div>
            <h3 className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4">
              Education &amp; credentials
            </h3>

            <div className="space-y-1 mb-4">
              {EDUCATION.map((edu) => (
                <a
                  key={edu.school}
                  href={edu.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-3 py-2
                    border-b border-zinc-900/5 dark:border-zinc-100/5
                    hover:border-zinc-900/30 dark:hover:border-zinc-100/30 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {edu.school}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {edu.degree}
                    </p>
                  </div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 tabular-nums shrink-0">
                    {edu.year}
                  </p>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              {CERTS.map((cert) => (
                <a
                  key={cert.label}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-0.5 text-[11px] text-zinc-700 dark:text-zinc-300
                    border border-zinc-900/10 dark:border-zinc-100/10 rounded
                    hover:border-zinc-900/30 dark:hover:border-zinc-100/30
                    hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  {cert.label} ↗
                </a>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
