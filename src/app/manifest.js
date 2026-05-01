export default function manifest() {
  return {
    name: "Aaron Tao — AI Engineer & Full Stack Developer",
    short_name: "Aaron Tao",
    description:
      "Portfolio of Aaron Tao — AI Engineer & Full Stack Developer. Building LLM-powered apps with React, Next.js, LangChain, and AWS.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f0",
    theme_color: "#f7f5f0",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
