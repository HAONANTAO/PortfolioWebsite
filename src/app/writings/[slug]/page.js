import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getWritingBySlug, getAllSlugs } from "@/lib/writings";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
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
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
    },
  };
}

const mdxComponents = {
  a: (props) => (
    <a
      {...props}
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-zinc-900 dark:text-zinc-100 underline decoration-zinc-900/25 dark:decoration-zinc-100/25 underline-offset-4 hover:decoration-[color:var(--accent)] hover:text-[color:var(--accent)] transition-colors"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="px-1.5 py-0.5 rounded bg-zinc-900/[0.06] text-zinc-800 dark:bg-zinc-100/[0.10] dark:text-zinc-200 font-mono text-[0.9em]"
    />
  ),
  pre: (props) => (
    <pre
      {...props}
      className="rounded-lg border border-zinc-900/10 bg-zinc-900/[0.03] p-4 overflow-x-auto text-sm font-mono text-zinc-800
        dark:border-zinc-100/10 dark:bg-zinc-100/[0.04] dark:text-zinc-200"
    />
  ),
};

export default function WritingPage({ params }) {
  const post = getWritingBySlug(params.slug);
  if (!post) notFound();

  const { frontmatter, content } = post;

  return (
    <main className="flex min-h-screen flex-col relative overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      <ScrollProgress selector="article" />
      <NavBar />
      <BackToTop />

      <div className="container max-w-3xl px-6 sm:px-10 py-4 mx-auto mt-24 relative z-10">
        <Link
          href="/writings"
          className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm mt-4 mb-10 transition-colors"
        >
          <span>←</span> Back to writings
        </Link>

        <header className="pb-8 border-b border-zinc-900/10 dark:border-zinc-100/10">
          {frontmatter.project && (
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 mb-4 px-2.5 py-1 text-xs
                text-zinc-700 border border-zinc-900/10 bg-white/60 rounded
                hover:border-zinc-900/30
                dark:text-zinc-300 dark:border-zinc-100/10 dark:bg-zinc-100/[0.04]
                dark:hover:border-zinc-100/30
                transition-colors"
            >
              <span className="text-zinc-500 dark:text-zinc-400">Related project:</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{frontmatter.project}</span>
              <span className="text-zinc-400 dark:text-zinc-500">→</span>
            </Link>
          )}

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400 border border-zinc-900/10 dark:border-zinc-100/10 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="serif text-4xl sm:text-5xl font-normal text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-4">
            {frontmatter.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
            <time className="tabular-nums">{formatDate(frontmatter.date)}</time>
            {frontmatter.readingTime && (
              <>
                <span>·</span>
                <span>{frontmatter.readingTime}</span>
              </>
            )}
          </div>
        </header>

        <article
          className="prose prose-zinc dark:prose-invert max-w-none py-10
            prose-headings:font-semibold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed
            prose-strong:font-semibold
            prose-blockquote:not-italic
            prose-img:rounded-lg"
        >
          <MDXRemote source={content} components={mdxComponents} />
        </article>

        <div className="border-t border-zinc-900/10 dark:border-zinc-100/10 pt-8 pb-16">
          <Link
            href="/writings"
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 text-sm transition-colors"
          >
            <span>←</span> All writings
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
