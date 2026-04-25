'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import AchievementSection from "./components/AchievementSection";
import CursorGlow from "./components/CursorGlow";
import NeuralBackground from "./components/NeuralBackground";
import ScrollProgress from "./components/ScrollProgress";
import NoiseOverlay from "./components/NoiseOverlay";
import LoadingScreen from "./components/LoadingScreen";
import BackToTop from "./components/BackToTop";

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  // Safety net: force-show content after 4s if LoadingScreen never fires
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 4000)
    return () => clearTimeout(t)
  }, [])

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

        {/* Subtle top radial accent */}
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
          <ProjectsSection />
          <EmailSection />
        </div>
        <Footer />
      </motion.main>
    </>
  );
}
