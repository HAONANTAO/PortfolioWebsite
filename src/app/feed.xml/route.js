import { getAllWritings } from "@/lib/writings";

const SITE_URL = "https://www.taohaonan.com";
const TITLE = "Aaron Tao — Writings";
const DESCRIPTION =
  "Notes from the build floor. Project retros and engineering write-ups on shipping AI products — RAG pipelines, full-stack systems, and the boring engineering behind the hype.";
const AUTHOR_EMAIL = "taoaaron5@gmail.com";
const AUTHOR_NAME = "Aaron Tao";

function escapeXml(str = "") {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(date) {
  return new Date(date).toUTCString();
}

export async function GET() {
  const posts = getAllWritings();
  const lastBuild = posts[0]?.date ? rfc822(posts[0].date) : rfc822(new Date());

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/writings/${p.slug}`;
      const tags = (p.tags || []).map((t) => `<category>${escapeXml(t)}</category>`).join("");
      return `
    <item>
      <title>${escapeXml(p.title || "")}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${p.date ? rfc822(p.date) : lastBuild}</pubDate>
      <description>${escapeXml(p.summary || "")}</description>
      ${tags}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(TITLE)}</title>
    <link>${SITE_URL}/writings</link>
    <description>${escapeXml(DESCRIPTION)}</description>
    <language>en-au</language>
    <managingEditor>${AUTHOR_EMAIL} (${AUTHOR_NAME})</managingEditor>
    <webMaster>${AUTHOR_EMAIL} (${AUTHOR_NAME})</webMaster>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
