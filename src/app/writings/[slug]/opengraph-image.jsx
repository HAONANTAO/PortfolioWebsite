import { ImageResponse } from "next/og";
import { getWritingBySlug, getAllSlugs } from "@/lib/writings";

export const alt = "Aaron Tao — Writings";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

function formatDate(d) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function OG({ params }) {
  const post = getWritingBySlug(params.slug);
  const fm = post?.frontmatter || {};
  const title = fm.title || "Notes from the build floor";
  const summary = fm.summary || "";
  const tags = (fm.tags || []).slice(0, 4);
  const dateLabel = formatDate(fm.date);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 80px 56px",
          background: "#f7f5f0",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* radial accent — top right */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,130,92,0.20) 0%, rgba(232,130,92,0.05) 45%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* category eyebrow */}
        <div
          style={{
            fontSize: 18,
            color: "rgba(13,13,14,0.45)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span>Writings</span>
          {dateLabel && (
            <>
              <span style={{ display: "flex", color: "rgba(13,13,14,0.25)" }}>·</span>
              <span style={{ display: "flex", textTransform: "none", letterSpacing: "0.05em", fontVariantNumeric: "tabular-nums" }}>
                {dateLabel}
              </span>
            </>
          )}
        </div>

        {/* title — fills the middle */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 24,
            paddingBottom: 24,
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? 64 : title.length > 36 ? 80 : 96,
              fontWeight: 600,
              color: "#0d0d0e",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              display: "flex",
            }}
          >
            {title}
          </div>

          {summary && (
            <div
              style={{
                fontSize: 28,
                color: "rgba(13,13,14,0.58)",
                lineHeight: 1.35,
                letterSpacing: "-0.005em",
                display: "flex",
                fontStyle: "italic",
                fontFamily: "Georgia, serif",
              }}
            >
              {summary.length > 140 ? summary.slice(0, 137) + "…" : summary}
            </div>
          )}
        </div>

        {/* footer: tags · signature · url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(13,13,14,0.10)",
            paddingTop: 24,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {tags.length > 0 ? (
              tags.map((t) => (
                <div
                  key={t}
                  style={{
                    padding: "6px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(13,13,14,0.10)",
                    fontSize: 18,
                    color: "rgba(13,13,14,0.7)",
                    display: "flex",
                  }}
                >
                  {t}
                </div>
              ))
            ) : (
              <div style={{ fontSize: 20, color: "rgba(13,13,14,0.5)", display: "flex" }}>
                Aaron Tao
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 20,
              color: "rgba(13,13,14,0.55)",
            }}
          >
            <span style={{ display: "flex" }}>Aaron Tao</span>
            <span style={{ display: "flex", color: "rgba(13,13,14,0.25)" }}>·</span>
            <span style={{ display: "flex" }}>taohaonan.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
