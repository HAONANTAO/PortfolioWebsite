import { getAllWritings } from "@/lib/writings";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
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
    <main className="flex min-h-screen flex-col relative overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      <ScrollProgress />
      <NavBar />
      <BackToTop />

      <div className="container max-w-5xl px-6 sm:px-10 py-4 mx-auto mt-24 relative z-10">
        <section className="pt-8 pb-12">
          <h1 className="serif text-5xl sm:text-6xl font-normal text-zinc-900 dark:text-zinc-100 tracking-tight mb-4">
            Notes from the build floor
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl text-base leading-relaxed">
            Project retros and engineering notes — what I learned shipping AI
            products, what broke, and what I&apos;d do differently. No tutorials,
            no hot takes. Just honest write-ups.
          </p>
        </section>

        <section className="pb-24">
          <WritingsList posts={posts} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
