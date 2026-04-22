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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#060608] relative overflow-x-hidden">
      {/* Neural network canvas */}
      <NeuralBackground />

      {/* Subtle top radial accent */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(6,182,212,0.07) 0%, transparent 70%)",
        }}
      />

      <ScrollProgress />
      <CursorGlow />
      <NavBar />

      <div className="container px-4 sm:px-8 lg:px-12 py-4 mx-auto mt-24 relative z-10">
        <HeroSection />
        <AchievementSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
