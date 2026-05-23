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
    <section id="contact" className="relative py-28 border-t border-zinc-900/10 dark:border-zinc-100/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl">

        <h2 className="serif text-4xl sm:text-5xl font-normal text-zinc-900 dark:text-zinc-100 mb-4">
          Let's talk.
        </h2>

        <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed mb-8 max-w-lg">
          Open to full-stack and AI engineering roles. If you're building something
          where shipping matters, drop me a line.
        </p>

        <Link
          href={`mailto:${EMAIL}?subject=Opportunity — Let's connect`}
          className="inline-block text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100
            border-b border-zinc-900/30 dark:border-zinc-100/30
            pb-1 transition-colors hover:text-[color:var(--accent)] hover:border-[color:var(--accent)] dark:hover:text-[color:var(--accent)] dark:hover:border-[color:var(--accent)]">
          {EMAIL}
        </Link>

        <div className="flex items-center gap-5 mt-10">
          <Link
            href="https://github.com/HAONANTAO"
            target="_blank"
            aria-label="GitHub"
            className="opacity-50 hover:opacity-100 transition-opacity dark:invert">
            <Image src={GithubIcon} alt="GitHub" width={20} height={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/haonan-tao-aaron/"
            target="_blank"
            aria-label="LinkedIn"
            className="opacity-50 hover:opacity-100 transition-opacity dark:invert">
            <Image src={LinkedinIcon} alt="LinkedIn" width={20} height={20} />
          </Link>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-2">
            Replies within 24h · Australian PR
          </span>
        </div>

      </motion.div>
    </section>
  );
};

export default EmailSection;
