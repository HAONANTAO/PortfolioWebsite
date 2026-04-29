import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Aaron Tao — AI Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f5f0",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* subtle radial glow top right */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(232,130,92,0.18) 0%, rgba(232,130,92,0.04) 45%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* top: status pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#10b981",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 18,
              color: "rgba(13,13,14,0.42)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
              display: "flex",
            }}
          >
            Available for full-time roles
          </div>
        </div>

        {/* middle: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontSize: 28,
              color: "rgba(13,13,14,0.5)",
              fontFamily: "system-ui, sans-serif",
              display: "flex",
            }}
          >
            Hi, I'm
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 600,
              color: "#0d0d0e",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontFamily: "system-ui, sans-serif",
              display: "flex",
            }}
          >
            Aaron Tao.
          </div>
          <div
            style={{
              fontSize: 56,
              fontStyle: "italic",
              color: "rgba(13,13,14,0.62)",
              letterSpacing: "-0.02em",
              marginTop: 8,
              display: "flex",
            }}
          >
            I build AI products that ship.
          </div>
        </div>

        {/* bottom row: tags + url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["RAG", "LangChain", "Next.js", "React Native"].map((t) => (
              <div
                key={t}
                style={{
                  padding: "8px 16px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(13,13,14,0.10)",
                  fontSize: 22,
                  color: "rgba(13,13,14,0.7)",
                  fontFamily: "system-ui, sans-serif",
                  display: "flex",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(13,13,14,0.42)",
              fontFamily: "system-ui, sans-serif",
              display: "flex",
            }}
          >
            taohaonan.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
