"use client";
import { Command } from "cmdk";
import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  HomeIcon,
  UserIcon,
  Squares2X2Icon,
  PencilSquareIcon,
  EnvelopeIcon,
  DocumentArrowDownIcon,
  ArrowTopRightOnSquareIcon,
  CodeBracketIcon,
  BookOpenIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

export default function CommandPalette({ writings = [], projects = [] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onTrigger = () => setOpen(true);
    document.addEventListener("keydown", onKey);
    window.addEventListener("open-cmd-palette", onTrigger);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmd-palette", onTrigger);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  const goAnchor = useCallback((hash) => {
    close();
    if (pathname === "/") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/${hash}`);
    }
  }, [pathname, router]);

  const goRoute = useCallback((href) => {
    close();
    router.push(href);
  }, [router]);

  const goExternal = (href) => {
    close();
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[14vh] px-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-zinc-900/30 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[560px] rounded-xl overflow-hidden
              border border-zinc-900/10 dark:border-zinc-100/10 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            style={{ background: "var(--bg-elev)" }}
          >
            <Command label="Command palette" className="cmdk-root">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-900/10 dark:border-zinc-100/10">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Jump to</span>
                <Command.Input
                  autoFocus
                  placeholder="Type a page, project, or writing…"
                  className="flex-1 bg-transparent outline-none text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
                />
                <kbd className="text-[10px] px-1.5 py-0.5 rounded border border-zinc-900/15 text-zinc-500 dark:border-zinc-100/15 dark:text-zinc-400 font-mono">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
                  Nothing here. Try a different word.
                </Command.Empty>

                <Command.Group heading="Navigate" className="cmdk-group">
                  <PaletteItem icon={HomeIcon} label="Home" onSelect={() => goRoute("/")} />
                  <PaletteItem icon={UserIcon} label="About" hint="#about" onSelect={() => goAnchor("#about")} />
                  <PaletteItem icon={Squares2X2Icon} label="Projects" hint="#projects" onSelect={() => goAnchor("#projects")} />
                  <PaletteItem icon={PencilSquareIcon} label="Writing" hint="/writings" onSelect={() => goRoute("/writings")} />
                  <PaletteItem icon={EnvelopeIcon} label="Contact" hint="#contact" onSelect={() => goAnchor("#contact")} />
                </Command.Group>

                {projects.length > 0 && (
                  <Command.Group heading="Projects" className="cmdk-group">
                    {projects.map((p) => (
                      <PaletteItem
                        key={p.title}
                        icon={CodeBracketIcon}
                        label={p.title}
                        hint={(p.Tech || []).slice(0, 3).join(" · ")}
                        keywords={[...(p.tag || []), ...(p.Tech || [])]}
                        onSelect={() => goExternal(p.preview || p.gitUrl)}
                      />
                    ))}
                  </Command.Group>
                )}

                {writings.length > 0 && (
                  <Command.Group heading="Writing" className="cmdk-group">
                    {writings.map((w) => (
                      <PaletteItem
                        key={w.slug}
                        icon={BookOpenIcon}
                        label={w.title}
                        hint={w.category}
                        keywords={[w.category, w.project].filter(Boolean)}
                        onSelect={() => goRoute(`/writings/${w.slug}`)}
                      />
                    ))}
                  </Command.Group>
                )}

                <Command.Group heading="Actions" className="cmdk-group">
                  <PaletteItem
                    icon={resolvedTheme === "dark" ? SunIcon : MoonIcon}
                    label={resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                    hint="T"
                    keywords={["theme", "dark", "light", "mode"]}
                    onSelect={() => { close(); setTheme(resolvedTheme === "dark" ? "light" : "dark"); }}
                  />
                  <PaletteItem
                    icon={DocumentArrowDownIcon}
                    label="Download résumé"
                    onSelect={() => { close(); window.location.href = "/PDFs/resume0428.pdf"; }}
                  />
                  <PaletteItem
                    icon={EnvelopeIcon}
                    label="Email me"
                    hint="taoaaron5@gmail.com"
                    onSelect={() => { close(); window.location.href = "mailto:taoaaron5@gmail.com"; }}
                  />
                  <PaletteItem
                    icon={ArrowTopRightOnSquareIcon}
                    label="GitHub"
                    hint="@HAONANTAO"
                    onSelect={() => goExternal("https://github.com/HAONANTAO")}
                  />
                  <PaletteItem
                    icon={ArrowTopRightOnSquareIcon}
                    label="LinkedIn"
                    onSelect={() => goExternal("https://www.linkedin.com/in/haonan-tao-4a9855270/")}
                  />
                </Command.Group>
              </Command.List>

              <div className="flex items-center justify-between px-4 py-2.5 border-t border-zinc-900/10 dark:border-zinc-100/10 text-[10px] text-zinc-400 dark:text-zinc-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-zinc-900/15 dark:border-zinc-100/15 font-mono">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded border border-zinc-900/15 dark:border-zinc-100/15 font-mono">↵</kbd>
                    select
                  </span>
                </div>
                <span className="serif-italic">Aaron Tao</span>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PaletteItem({ icon: Icon, label, hint, onSelect, keywords }) {
  return (
    <Command.Item
      onSelect={onSelect}
      value={`${label} ${hint || ""} ${(keywords || []).join(" ")}`}
      className="cmdk-item flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer text-sm text-zinc-700 dark:text-zinc-300"
    >
      {Icon && <Icon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />}
      <span className="flex-1 truncate">{label}</span>
      {hint && <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate max-w-[40%]">{hint}</span>}
    </Command.Item>
  );
}
