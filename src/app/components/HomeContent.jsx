"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import NavBar from "./NavBar";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import EmailSection from "./EmailSection";
import Footer from "./Footer";
import RecentlyShipped from "./RecentlyShipped";
import ScrollProgress from "./ScrollProgress";
import LoadingScreen, { LOADER_SESSION_KEY } from "./LoadingScreen";
import BackToTop from "./BackToTop";
import LatestWritingsSection from "./LatestWritingsSection";
import ScrollCompanion from "./ScrollCompanion";

export default function HomeContent({ writings = [] }) {
  // Returning visitors in this session (loader already shown) start visible
  // immediately — no fade penalty when navigating /writings → /. First-time
  // visitors stay hidden until LoadingScreen fires onComplete.
  const [loaded, setLoaded] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!sessionStorage.getItem(LOADER_SESSION_KEY);
  });

  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => setLoaded(true), 1100);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <motion.main
        initial={{ opacity: loaded ? 1 : 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex min-h-screen flex-col relative overflow-x-hidden"
        style={{ background: 'var(--bg)' }}
      >
        <ScrollProgress />
        <NavBar />
        <BackToTop />
        <ScrollCompanion />

        <div className="container max-w-5xl px-6 sm:px-10 py-4 mx-auto mt-24 relative z-10">
          <HeroSection latestWriting={writings[0]} />
          <AboutSection />
          <RecentlyShipped />
          <ProjectsSection writings={writings} />
          <LatestWritingsSection posts={writings} />
          <EmailSection />
        </div>
        <Footer />
      </motion.main>
    </>
  );
}
