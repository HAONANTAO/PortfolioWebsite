import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWritingBySlug, getAllSlugs } from "@/lib/writings";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import NeuralBackground from "../../components/NeuralBackground";
import NoiseOverlay from "../../components/NoiseOverlay";
import CursorGlow from "../../components/CursorGlow";
import ScrollProgress from "../../components/ScrollProgress";
import BackToTop from "../../components/BackToTop";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = getWritingBySlug(params.slug);
  if (!post) return {};
  const { frontmatter } = post;
  return {
    title: `${frontmatter.title} — Aaron TAO`,
    description: frontmatter.summary,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.summary,
      type: "article",
      images: frontmatter.cover ? [frontmatter.cover] : undefined,
    },
  };
}

const mdxComponents = {
  a: (props) => (
    <a
      {...props}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 hover:decoration-cyan-400 transition-colors"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-mono text-[0.9em]"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="rounded-lg border border-[#33353F]/60 bg-[#0a0a0f] p-4 overflow-x-auto text-sm font-mono text-[#ADB7BE]"
    />
  ),
};

export default function WritingPage({ params }) {
  const post = getWritingBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <main className="flex min-h-screen flex-col bg-[#060608] relative overflow-x-hidden">
      <NeuralBackground />

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(6,182,212,0.07) 0%, transparent 70%)",
        }}
      />

      <NoiseOverlay />
      <ScrollProgress />
      <CursorGlow />
      <NavBar />
      <BackToTop />

      <div className="container px-4 sm:px-8 lg:px-12 py-4 mx-auto mt-24 relative z-10 max-w-3xl">
        {/* Back link */}
        <Link
          href="/writings"
          className="inline-flex items-center gap-2 text-cyan-400/70 hover:text-cyan-300 font-mono text-xs tracking-widest mt-4 mb-8 transition-colors"
        >
          <span>←</span> BACK TO WRITINGS
        </Link>

        {/* Header */}
        <header className="pb-8 border-b border-[#33353F]/40">
          {frontmatter.project && (
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 text-[11px] font-mono
                text-violet-300 border border-violet-500/30 bg-violet-500/5 rounded-full
                hover:border-violet-400/60 hover:bg-violet-500/10 transition-colors"
            >
              <span className="opacity-70">Related project:</span>
              <span className="font-semibold">{frontmatter.project}</span>
              <span>→</span>
            </Link>
          )}

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-mono border border-cyan-500/20
                    bg-cyan-500/5 text-cyan-400/80 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            {frontmatter.title}
          </h1>
          <div className="flex items-center gap-3 text-xs font-mono text-[#666]">
            <time className="text-cyan-400/60">{formatDate(frontmatter.date)}</time>
            {frontmatter.readingTime && (
              <>
                <span>·</span>
                <span>{frontmatter.readingTime}</span>
              </>
            )}
          </div>
        </header>

        {/* Article body */}
        <article
          className="prose prose-invert prose-cyan max-w-none py-10
            prose-headings:text-white prose-headings:font-semibold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-l-2 prose-h2:border-cyan-500/40 prose-h2:pl-3
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[#C5CDD5] prose-p:leading-relaxed
            prose-strong:text-white prose-strong:font-semibold
            prose-li:text-[#C5CDD5] prose-li:marker:text-cyan-500/50
            prose-blockquote:border-l-cyan-500/40 prose-blockquote:text-[#ADB7BE]
            prose-hr:border-[#33353F]/40"
        >
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        {/* Footer of article */}
        <div className="border-t border-[#33353F]/40 pt-8 pb-16">
          <Link
            href="/writings"
            className="inline-flex items-center gap-2 text-cyan-400/70 hover:text-cyan-300 font-mono text-xs tracking-widest transition-colors"
          >
            <span>←</span> ALL WRITINGS
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
