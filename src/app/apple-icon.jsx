import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f7f5f0",
          borderRadius: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 700,
            color: "#0d0d0e",
            lineHeight: 1,
            letterSpacing: "-0.04em",
            display: "flex",
          }}
        >
          A
        </div>
        {/* Orange accent dot, mirrors favicon */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            right: 32,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: "#e8825c",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
