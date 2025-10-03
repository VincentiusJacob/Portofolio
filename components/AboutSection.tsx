"use client";

import { useState, useEffect, useRef } from "react";

interface Experience {
  role: string;
  company: string;
  description: string;
}

interface Achievement {
  title: string;
  description: string;
}

interface ExperienceData {
  [year: string]: Experience[];
}

interface AchievementData {
  [year: string]: Achievement[];
}

const aboutData = {
  title: "About Me",
  description: [
    "I am a developer specializing in Artificial Intelligence, Fullstack Development, and Data Science. I focus on building applications that leverage AI technologies to deliver smarter and more efficient solutions.",
    "My expertise covers developing fullstack applications, as well as processing and analyzing data to generate meaningful insights.",
    "Based in Jakarta, I enjoy working on projects that connect AI with real-world use cases, creating solutions that are both intelligent and practical.",
  ],
};

const skillsData: string[] = [
  "Full-Stack Development",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Data Science",
  "Large Language Models (LLMs)",
  "Retrieval-Augmented Generation (RAG)",
  "LangChain",
  "Vector Databases",
  "Cloud Computing",
];

const experienceData: ExperienceData = {
  "2025": [
    {
      role: "Software Developer (March-Present)",
      company: "IT Division Bina Nusantara University",
      description:
        "Led AI transformation initiatives, architected intelligent systems, and developed scalable AI-powered applications.",
    },
  ],
  "2024": [
    {
      role: "Business Development & Public Relations (August - December)",
      company: "Medika Health Companion",
      description:
        "Advised startups on implementing ML models and data-driven features.",
    },
  ],
};

const achievementData: AchievementData = {
  "June 2025": [
    {
      title: "Semifinalist – Hackathon ElevAIte Indonesia",
      description:
        "Ranked among the top 20 teams nationwide for developing innovative AI solutions, selected from hundreds of participants.",
    },
  ],
  "September 2025": [
    {
      title:
        "🥇 1st Place – Dataquest 4.0 (Objective Quest), part of Airnology 4.0",
      description:
        "Achieved 1st Place in the Objective Quest category of Dataquest 4.0, part of Airnology 4.0, competing against 100+ teams nationwide. The challenge focused on applying NLP techniques to legal documents for predicting sentencing duration, demonstrating strengths in data science, problem-solving, and collaboration.",
    },
    {
      title: "🥉 3rd Place - AI Innovation Challenge COMPFEST 17",
      description:
        "Secured 3rd place out of 240+ teams in the AI Innovation Challenge, a prestigious national competition hosted by COMPFEST, Universitas Indonesia's Faculty of Computer Science. Our team developed Horus AI, an intelligent surveillance system using computer vision to tackle illegal parking, aligning with the competition's theme of 'Smart City and Urban Living'. The project involved creating an end-to-end solution to capture incidents and provide context-aware insights for smarter city management",
    },
  ],
};

export default function AboutAndExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {/* About Section */}
      <section className="relative bg-black text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e78ad33,transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-4 text-white">
              {aboutData.title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-16 items-start">
            {/* Left Column - About Text */}
            <div
              className={`lg:col-span-3 space-y-8 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                {aboutData.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Right Column - Skills */}
            <div
              className={`lg:col-span-2 space-y-8 transition-all duration-1000 delay-500 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div>
                <h3 className="text-3xl font-light text-white mb-6">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillsData.map((skill, index) => (
                    <div
                      key={index}
                      className={`bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-300 font-mono transition-all duration-500 ${
                        isVisible
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-90"
                      }`}
                      style={{ transitionDelay: `${800 + index * 75}ms` }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative bg-black text-white pt-12 pb-24 px-6 overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_80%,#3e78ad33,transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-4 text-white">
              Experience
            </h2>
            <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
              <span className="text-green-400">&gt;</span> A summary of my
              professional roles and contributions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {Object.entries(experienceData)
              .reverse()
              .map(([year, experiences], yearIndex) => (
                <div
                  key={year}
                  className={`transition-all duration-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${500 + yearIndex * 200}ms` }}
                >
                  <div className="flex items-center gap-6">
                    <h3 className="text-2xl font-mono text-cyan-400">{year}</h3>
                    <div className="flex-grow h-px bg-gray-700/50"></div>
                  </div>
                  <div className="mt-6 grid gap-8 pl-4 border-l-2 border-gray-800">
                    {experiences.map((exp, expIndex) => (
                      <div
                        key={expIndex}
                        className={`relative p-6 bg-gray-900/50 border border-gray-700/80 rounded-lg transition-all duration-500 ${
                          isVisible
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95"
                        }`}
                        style={{
                          transitionDelay: `${
                            700 + yearIndex * 200 + expIndex * 100
                          }ms`,
                        }}
                      >
                        <div className="absolute -left-5 top-8 w-4 h-4 bg-gray-800 border-2 border-cyan-400 rounded-full z-10">
                          <div className="w-full h-full bg-cyan-400 rounded-full animate-pulse"></div>
                        </div>
                        <h4 className="text-xl font-medium text-white mb-1">
                          {exp.role}
                        </h4>
                        <p className="text-gray-400 font-light mb-3">
                          {exp.company}
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="relative bg-black text-white pt-12 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_80%,#3e78ad33,transparent)]"></div>
        </div>

        {/* Achievement Part */}
        <div className="relative max-w-7xl mx-auto mt-30 z-10">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-light mb-4 text-white">
              Achievements
            </h2>
            <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
              <span className="text-green-400">&gt;</span> A collection of my
              notable accomplishments
            </p>
          </div>

          {/* Achievement Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(achievementData)
              .reverse()
              .flatMap(([year, achievement]) =>
                achievement.map((exp, index) => ({
                  ...exp,
                  year,
                  id: `${year}-${index}`,
                }))
              )
              .map((achievement, index) => {
                const isFirstPlace = achievement.title.includes("🥇 1st Place");

                return (
                  <div
                    key={achievement.id}
                    className={`group relative transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    {/* Glow Effect */}
                    <div
                      className={`absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${
                        isFirstPlace
                          ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                          : "bg-gradient-to-r from-cyan-500 to-purple-500"
                      }`}
                    ></div>

                    {/* Achievement Card */}
                    <div
                      className={`relative bg-gray-900/80 backdrop-blur-sm border rounded-xl p-6 h-full transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl ${
                        isFirstPlace
                          ? "border-yellow-500/60 hover:border-yellow-400 group-hover:shadow-yellow-500/10"
                          : "border-gray-700/60 hover:border-cyan-400/50 group-hover:shadow-cyan-500/10"
                      }`}
                    >
                      {/* Year Badge */}
                      <div
                        className={`absolute -top-3 -right-3 text-white text-sm font-mono px-3 py-1 rounded-full shadow-lg ${
                          isFirstPlace
                            ? "bg-gradient-to-r from-yellow-500 to-amber-600"
                            : "bg-gradient-to-r from-cyan-500 to-blue-600"
                        }`}
                      >
                        {achievement.year}
                      </div>

                      {/* Achievement Icon/Category */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center border ${
                            isFirstPlace
                              ? "bg-gradient-to-br from-yellow-400/20 to-amber-500/20 border-yellow-400/30"
                              : "bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border-cyan-400/30"
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full animate-pulse ${
                              isFirstPlace
                                ? "bg-gradient-to-r from-yellow-400 to-amber-400"
                                : "bg-gradient-to-r from-cyan-400 to-purple-400"
                            }`}
                          ></div>
                        </div>
                        <div
                          className={`text-xs uppercase tracking-wider font-semibold ${
                            isFirstPlace ? "text-yellow-400" : "text-cyan-400"
                          }`}
                        >
                          Achievement
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3">
                        <h3
                          className={`text-xl font-semibold text-white transition-colors duration-300 leading-tight ${
                            isFirstPlace
                              ? "group-hover:text-yellow-300"
                              : "group-hover:text-cyan-300"
                          }`}
                        >
                          {achievement.title}
                        </h3>

                        <p className="text-gray-400 text-sm leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>

                      {/* Hover Effect Bottom Bar */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl ${
                          isFirstPlace
                            ? "bg-gradient-to-r from-yellow-500 to-amber-500"
                            : "bg-gradient-to-r from-cyan-500 to-purple-500"
                        }`}
                      ></div>

                      {/* Corner Decorations */}
                      <div
                        className={`absolute top-4 left-4 w-3 h-3 border-l-2 border-t-2 transition-colors duration-300 ${
                          isFirstPlace
                            ? "border-yellow-400/30 group-hover:border-yellow-400"
                            : "border-cyan-400/30 group-hover:border-cyan-400"
                        }`}
                      ></div>
                      <div
                        className={`absolute bottom-4 right-4 w-3 h-3 border-r-2 border-b-2 transition-colors duration-300 ${
                          isFirstPlace
                            ? "border-yellow-400/30 group-hover:border-yellow-400"
                            : "border-cyan-400/30 group-hover:border-cyan-400"
                        }`}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
}
