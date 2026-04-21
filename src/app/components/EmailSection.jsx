"use client";
import React, { useState } from "react";
import GithubIcon from "../../../public/images/icons/github-icon.svg";
import LinkedinIcon from "../../../public/images/icons/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const response = await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSending(false);
    if (response.status === 200) setEmailSubmitted(true);
  };

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
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5">
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
              className="p-2.5 rounded-xl border border-[#1a1a2e]
                hover:border-cyan-500/35 hover:bg-cyan-500/5
                hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]
                transition-all duration-200">
              <Image src={GithubIcon} alt="GitHub" width={22} height={22} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/haonan-tao-aaron"
              className="p-2.5 rounded-xl border border-[#1a1a2e]
                hover:border-violet-500/35 hover:bg-violet-500/5
                hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]
                transition-all duration-200">
              <Image src={LinkedinIcon} alt="LinkedIn" width={22} height={22} />
            </Link>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="rounded-2xl border border-[#1a1a2e] bg-[#060608]/80 backdrop-blur-md p-6 relative overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#1a1a2e]">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-[10px] font-mono text-[#444]">send_message.sh</span>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {[
                { name: "email",   type: "email", label: "email_address", placeholder: "your@email.com" },
                { name: "subject", type: "text",  label: "subject",       placeholder: "Opportunity / Collaboration" },
              ].map(({ name, type, label, placeholder }) => (
                <div key={name}>
                  <label className="block mb-1.5 text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase" htmlFor={name}>
                    $ {label}
                  </label>
                  <input
                    name={name}
                    type={type}
                    id={name}
                    required
                    placeholder={placeholder}
                    className="input-glow w-full bg-[#0a0a10] border border-[#1a1a2e]
                      text-gray-100 text-sm rounded-lg p-2.5 font-mono
                      placeholder-[#444] transition-all duration-200"
                  />
                </div>
              ))}

              <div>
                <label className="block mb-1.5 text-[10px] font-mono text-cyan-400/60 tracking-widest uppercase" htmlFor="message">
                  $ message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  placeholder="Let's build something with AI..."
                  className="input-glow w-full bg-[#0a0a10] border border-[#1a1a2e]
                    text-gray-100 text-sm rounded-lg p-2.5 font-mono
                    placeholder-[#444] transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-violet-600
                  text-white font-mono font-medium py-3 px-5 rounded-xl w-full
                  hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]
                  hover:scale-[1.02] active:scale-[0.98]
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-all duration-300">
                {sending ? "> sending..." : "> execute send_message()"}
              </button>

              {emailSubmitted && (
                <div className="flex items-center gap-2 text-sm font-mono text-emerald-400 bg-emerald-500/8 border border-emerald-500/25 rounded-lg px-3 py-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  [200 OK] Message transmitted successfully.
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailSection;
