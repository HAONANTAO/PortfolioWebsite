const skillGroups = [
  {
    group: "AI / LLM",
    color: "border-violet-500/45 text-violet-300 bg-violet-500/8",
    skills: ["OpenAI API", "LangChain", "Claude API", "Prompt Eng.", "RAG", "AI Agents*"],
  },
  {
    group: "Frontend",
    color: "border-cyan-500/45 text-cyan-300 bg-cyan-500/8",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Framer Motion"],
  },
  {
    group: "Mobile",
    color: "border-sky-500/45 text-sky-300 bg-sky-500/8",
    skills: ["React Native", "Expo"],
  },
  {
    group: "Backend",
    color: "border-emerald-500/45 text-emerald-300 bg-emerald-500/8",
    skills: ["Node.js", "Express", "Python", "Prisma", "REST API"],
  },
  {
    group: "Cloud & DB",
    color: "border-amber-500/45 text-amber-300 bg-amber-500/8",
    skills: ["AWS", "MongoDB", "Vercel", "Supabase", "Clerk", "Stripe"],
  },
];

const TAB_DATA = [
  {
    title: "Skills",
    id: "Skills",
    content: (
      <div className="flex flex-col gap-3.5">
        {skillGroups.map(({ group, color, skills }) => (
          <div key={group} className="flex flex-wrap items-center gap-2">
            <span className="text-[9px] font-mono text-[#555] uppercase tracking-widest shrink-0 w-16">
              {group}
            </span>
            {skills.map((skill) => {
              const isLearning = skill.endsWith('*')
              const label = isLearning ? skill.slice(0, -1) : skill
              return (
                <span
                  key={skill}
                  title={isLearning ? 'Currently learning' : undefined}
                  className={`px-2.5 py-0.5 text-[11px] font-mono rounded-full border cursor-default select-none
                    transition-all duration-200 hover:scale-105 hover:brightness-125
                    hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]
                    ${isLearning ? 'border-dashed opacity-70 hover:opacity-100' : ''} ${color}`}>
                  {label}{isLearning && <span className="ml-1 text-[8px] opacity-60">learning</span>}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Educations",
    id: "Educations",
    content: (
      <div className="flex flex-col gap-3">
        {[
          {
            href: "/PDFs/UniMel.pdf",
            school: "University of Melbourne",
            degree: "Master of Information Technology",
            year: "2023 – 2024",
            dot: "bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]",
          },
          {
            href: "/PDFs/Monash.pdf",
            school: "Monash University",
            degree: "Bachelor of Computer Science · Data Science",
            year: "2019 – 2022",
            dot: "bg-violet-400 shadow-[0_0_6px_rgba(139,92,246,0.8)]",
          },
        ].map((edu) => (
          <a key={edu.school} href={edu.href} className="group block">
            <div className="flex items-start gap-3 p-3.5 rounded-xl border border-[#1a1a2e]
              bg-[#060608]/60 hover:border-cyan-500/30 hover:bg-cyan-500/3
              transition-all duration-200">
              <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${edu.dot}`} />
              <div>
                <p className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {edu.school}
                </p>
                <p className="text-xs text-[#ADB7BE] mt-0.5">{edu.degree}</p>
                <p className="text-[10px] text-[#555] font-mono mt-1">{edu.year}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    ),
  },
  {
    title: "Certifications",
    id: "Certifications",
    content: (
      <div className="flex flex-col gap-2.5">
        {[
          { href: "/PDFs/ITIL.pdf",     label: "ITIL® Foundation",         org: "Axelos",    color: "border-violet-500/35 text-violet-300", bg: "bg-violet-500/5" },
          { href: "/PDFs/PMP.pdf",       label: "PMP® Certified",           org: "PMI",       color: "border-cyan-500/35 text-cyan-300",     bg: "bg-cyan-500/5" },
          { href: "/PDFs/AWS.pdf",       label: "AWS Cloud Practitioner",   org: "Amazon",    color: "border-amber-500/35 text-amber-300",   bg: "bg-amber-500/5" },
          { href: "/PDFs/Microsoft.pdf", label: "Microsoft Office Expert",  org: "Microsoft", color: "border-emerald-500/35 text-emerald-300",bg: "bg-emerald-500/5" },
        ].map((cert) => (
          <a key={cert.label} href={cert.href} className="group block">
            <div className={`flex items-center justify-between px-4 py-2.5 rounded-xl border
              ${cert.color} ${cert.bg}
              hover:brightness-110 hover:shadow-[0_0_15px_rgba(6,182,212,0.08)]
              transition-all duration-200`}>
              <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                <span className="text-sm font-medium">{cert.label}</span>
              </div>
              <span className="text-[10px] font-mono text-[#555] group-hover:text-[#888] transition-colors">
                {cert.org} ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    ),
  },
];

export default TAB_DATA;
