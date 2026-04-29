export { default, alt, size, contentType } from "./opengraph-image";

// Re-declared as a string literal because Next.js's static analyzer
// can't follow `runtime` through a re-export.
export const runtime = "edge";
