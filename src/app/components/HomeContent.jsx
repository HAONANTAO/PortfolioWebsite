"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection";
import NavBar from "./NavBar";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import EmailSection from "./EmailSection";
import Footer from "./Footer";
import AchievementSection from "./AchievementSection";
import ScrollProgress from "./ScrollProgress";
import LoadingScreen from "./LoadingScreen";
import BackToTop from "./BackToTop";
import LatestWritingsSection from "./LatestWritingsSection";
import ScrollCompanion from "./ScrollCompanion";

export default function HomeContent({ writings = [] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen flex-col relative overflow-x-hidden"
        style={{ background: 'var(--bg)' }}
      >
        <ScrollProgress />
        <NavBar />
        <BackToTop />
        <ScrollCompanion />

        <div className="container max-w-5xl px-6 sm:px-10 py-4 mx-auto mt-24 relative z-10">
          <HeroSection />
          <AchievementSection />
          <AboutSection />
          <ProjectsSection writings={writings} />
          <LatestWritingsSection posts={writings} />
          <EmailSection />
        </div>
        <Footer />
      </motion.main>
    </>
  );
}
