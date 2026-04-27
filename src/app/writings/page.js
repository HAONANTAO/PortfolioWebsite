import { getAllWritings } from "@/lib/writings";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NeuralBackground from "../components/NeuralBackground";
import NoiseOverlay from "../components/NoiseOverlay";
import CursorGlow from "../components/CursorGlow";
import ScrollProgress from "../components/ScrollProgress";
import BackToTop from "../components/BackToTop";
import WritingsList from "./WritingsList";

export const metadata = {
  title: "Writings — Aaron TAO",
  description:
    "Notes on shipping AI products: RAG pipelines, prompt engineering, and the boring engineering behind the hype.",
};

export default function WritingsPage() {
  const posts = getAllWritings();

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

      <div className="container px-4 sm:px-8 lg:px-12 py-4 mx-auto mt-24 relative z-10 max-w-5xl">
        {/* Header */}
        <section className="pt-8 pb-12">
          <p className="text-cyan-400/70 font-mono text-xs tracking-widest mb-3">
            // 04. WRITINGS
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Notes from the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
              build floor
            </span>
          </h1>
          <p className="text-[#ADB7BE] max-w-2xl leading-relaxed">
            Project retros and engineering notes — what I learned shipping AI
            products, what broke, and what I&apos;d do differently. No tutorials,
            no hot takes. Just honest write-ups.
          </p>
        </section>

        {/* Posts */}
        <section className="pb-24">
          <WritingsList posts={posts} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
