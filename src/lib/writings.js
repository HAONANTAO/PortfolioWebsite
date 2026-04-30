import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const WRITINGS_DIR = path.join(process.cwd(), "src/content/writings");

export function getAllWritings() {
  const files = fs.readdirSync(WRITINGS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(WRITINGS_DIR, file), "utf8");
    const { data } = matter(raw);
    return { slug, ...data };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getWritingBySlug(slug) {
  const fullPath = path.join(WRITINGS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data, content };
}

export function getAllSlugs() {
  return fs
    .readdirSync(WRITINGS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// Extract h2/h3 headings from MDX content for the table of contents.
// Slugs match what `rehype-slug` will inject into the rendered output,
// because both sides use the same `github-slugger` library.
export function extractHeadings(content) {
  const slugger = new GithubSlugger();
  const headings = [];
  let inCodeBlock = false;

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trimEnd();
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;
    const level = match[1].length;
    const text = match[2].replace(/[*_`]/g, "").trim();
    headings.push({ level, text, slug: slugger.slug(text) });
  }
  return headings;
}
