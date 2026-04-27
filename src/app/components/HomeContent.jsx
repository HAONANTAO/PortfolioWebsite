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
import CursorGlow from "./CursorGlow";
import NeuralBackground from "./NeuralBackground";
import ScrollProgress from "./ScrollProgress";
import NoiseOverlay from "./NoiseOverlay";
import LoadingScreen from "./LoadingScreen";
import BackToTop from "./BackToTop";
import LatestWritingsSection from "./LatestWritingsSection";

export default function HomeContent({ writings = [] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen flex-col bg-[#060608] relative overflow-x-hidden"
      >
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

        <div className="container px-4 sm:px-8 lg:px-12 py-4 mx-auto mt-24 relative z-10">
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
