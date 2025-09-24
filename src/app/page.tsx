"use client";

import { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import AboutSection from "../../components/AboutSection";
import WorkSection from "../../components/WorkSection";
import ContactSection from "../../components/ContactSection";
import Navigation from "../../components/Navigation";
import CustomCursor from "../../components/CustomCursor";
import GridBackground from "../../components/GridBackground";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-x-hidden">
      <GridBackground />
      <CustomCursor />
      <Navigation />

      <main
        className={`transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <HeroSection />
        <div id="about">
          <AboutSection />
        </div>
        <div id="work">
          <WorkSection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
