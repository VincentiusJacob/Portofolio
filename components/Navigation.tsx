"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/20 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-light tracking-wider">
            <span className="text-white">VJG</span>
            <span className="text-blue-400 ml-1">_</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-400 hover:text-white transition-colors duration-300 text-lg font-mono"
              data-hover
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("work")}
              className="text-gray-400 hover:text-white transition-colors duration-300 text-lg font-mono"
              data-hover
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-400 hover:text-white transition-colors duration-300 text-lg font-mono"
              data-hover
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-md text-gray-500 font-mono hidden sm:block">
              Available
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
