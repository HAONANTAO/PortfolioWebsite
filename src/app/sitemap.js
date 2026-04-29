import { getAllWritings } from "@/lib/writings";

const SITE = "https://www.taohaonan.com";

export default function sitemap() {
  const posts = getAllWritings();
  const now = new Date();

  const writings = posts.map((p) => ({
    url: `${SITE}/writings/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: SITE,                  lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE}/writings`,    lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    ...writings,
  ];
}
