const skillGroups = [
  { group: "AI / LLM",   skills: ["OpenAI API", "LangChain", "Claude API", "Prompt Eng.", "RAG", "AI Agents*"] },
  { group: "Frontend",   skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Framer Motion"] },
  { group: "Mobile",     skills: ["React Native", "Expo"] },
  { group: "Backend",    skills: ["Node.js", "Express", "Python", "Prisma", "REST API"] },
  { group: "Cloud & DB", skills: ["AWS", "MongoDB", "Vercel", "Supabase", "Clerk", "Stripe"] },
];

const TAB_DATA = [
  {
    title: "Skills",
    id: "Skills",
    content: (
      <div className="flex flex-col gap-3">
        {skillGroups.map(({ group, skills }) => (
          <div key={group} className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest shrink-0 w-20">
              {group}
            </span>
            {skills.map((skill) => {
              const isLearning = skill.endsWith('*')
              const label = isLearning ? skill.slice(0, -1) : skill
              return (
                <span
                  key={skill}
                  title={isLearning ? 'Currently learning' : undefined}
                  className={`px-2 py-0.5 text-[11px] rounded border border-zinc-900/10 text-zinc-700
                    cursor-default select-none transition-colors hover:border-zinc-900/30 hover:text-zinc-900
                    ${isLearning ? 'border-dashed opacity-60' : ''}`}>
                  {label}
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
      <div className="flex flex-col">
        {[
          {
            href: "/PDFs/UniMel.pdf",
            school: "University of Melbourne",
            degree: "Master of Information Technology",
            year: "2023 – 2024",
          },
          {
            href: "/PDFs/Monash.pdf",
            school: "Monash University",
            degree: "Bachelor of Computer Science · Data Science",
            year: "2019 – 2022",
          },
        ].map((edu) => (
          <a key={edu.school} href={edu.href} className="group block">
            <div className="flex items-baseline justify-between gap-3 py-3 border-b border-zinc-900/10
              hover:border-zinc-900/30 transition-colors">
              <div>
                <p className="text-sm font-medium text-zinc-900 group-hover:text-zinc-900 transition-colors">
                  {edu.school}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">{edu.degree}</p>
              </div>
              <p className="text-xs text-zinc-400 tabular-nums shrink-0">{edu.year}</p>
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
      <div className="flex flex-col">
        {[
          { href: "/PDFs/AWS.pdf",  label: "AWS Cloud Practitioner", org: "Amazon" },
          { href: "/PDFs/PMP.pdf",  label: "PMP® Certified",         org: "PMI"    },
          { href: "/PDFs/ITIL.pdf", label: "ITIL® Foundation",       org: "Axelos" },
        ].map((cert) => (
          <a key={cert.label} href={cert.href} className="group block">
            <div className="flex items-baseline justify-between py-3 border-b border-zinc-900/10
              hover:border-zinc-900/30 transition-colors">
              <span className="text-sm text-zinc-800 group-hover:text-zinc-900 transition-colors">{cert.label}</span>
              <span className="text-xs text-zinc-400 group-hover:text-zinc-600 transition-colors">
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
