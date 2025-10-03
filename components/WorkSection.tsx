"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import ScribeSpace from "../public/scribespace.png";
import SmartIllegal from "../public/horus.png";
import Storegg from "../public/storegg.png";
import TrafficSign from "../public/trafficsign.png";
import TwitterDash from "../public/twitterdash.png";
import MyAssets from "../public/myassets.png";
import AbleCareers from "../public/ablecareers.png";
import { StaticImageData } from "next/image";

// --- Type Definitions for TypeScript ---
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  status: "Live" | "Beta" | "Development" | "Prototype";
  color: string;
  year: string;
  url: string;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "My Assets Financial Dashboard",
    category: "Web Application",
    description:
      "A powerful financial dashboard that simplifies personal finance management. It allows users to track transactions, manage wallet, and gain insights through detailed analytics.",
    tech: ["Next.js", "Tailwind", "Supabase"],
    status: "Live",
    color: "from-cyan-400 to-blue-500",
    year: "2024",
    url: "https://myassets-gamma.vercel.app/",
  },
  {
    id: 2,
    title: "Traffic Sign Recognition",
    category: "AI Application",
    description:
      "An interactive web application that uses a device's camera and a client-side deep learning model to detect and identify traffic signs in real-time.",
    tech: ["React", "CSS", "CNN", "Python", "Express.js"],
    status: "Live",
    color: "from-cyan-400 to-blue-500",
    year: "2025",
    url: "https://traffic-sign-scanner.vercel.app/",
  },
  {
    id: 3,
    title: "Smart Illegal Parking Detection",
    category: "AI Application",
    description:
      "An intelligent real-time system designed to detect illegal parking behavior from CCTV video feeds. Unlike traditional systems that only detect parked vehicles, our solution analyzes driver behavior and intent to determine true violations in restricted zones.",
    tech: [
      "Next.js",
      "Tailwind",
      "CNN",
      "LSTM",
      "Model Context Protocol (MCP)",
      "YOLO",
      "DeepSort",
      "Mlflow",
      "Flask",
      "Google Cloud Platform (GCP)",
    ],
    status: "Live",
    color: "from-cyan-400 to-blue-500",
    year: "2025",
    url: "https://horusintelligence.vercel.app/",
  },
  {
    id: 4,
    title: "TwitterDash",
    category: "Web Application",
    description:
      "A simple dummy chatting app clone where people can see other user's information, and their posts. Posts could be about any stories or topics.",
    tech: ["HTML", "CSS", "Javascript"],
    status: "Live",
    color: "from-cyan-400 to-blue-500",
    year: "2023",
    url: "https://twitterdash.netlify.app/twitterdash.html",
  },
  {
    id: 5,
    title: "ScribeSpace",
    category: "Web Application",
    description:
      "Blogging Web Application where people can share their experience, share knowledges, or else.",
    tech: ["React", "CSS", "Supabase"],
    status: "Live",
    color: "from-cyan-400 to-blue-500",
    year: "2024",
    url: "https://scribe-space-frotend.vercel.app",
  },
  {
    id: 6,
    title: "Daegu Apartment Price Prediction",
    category: "Machine Learning",
    description:
      "Conducted an in-depth analysis of apartment sale prices in Daegu, South Korea, utilizing exploratory data analysis, feature engineering, and advanced data preprocessing techniques. Developed a robust predictive model to accurately forecast sale prices, enabling informed decision-making for real estate stakeholders.",
    tech: ["Python", "Pandas", "Numpy"],
    status: "Live",
    color: "from-cyan-400 to-blue-500",
    year: "2025",
    url: "https://github.com/VincentiusJacob/Daegu-Apartment-Price-Prediction",
  },
  {
    id: 7,
    title:
      "Multi-Modal Machine Learning Approach for PCB Defect Detection in Manufacturing Efficiency",
    category: "Machine Learning",
    description:
      "Built multi-modal ML system for PCB defect detection in Industry 4.0. Model 1: Hierarchical classification with tabular data (PHME/Bitron Spa) for SPI-based prediction, defect assessment, and repair categories (proceedable, minor repairable, irreparable). Model 2: Image classification of 6 defect types (missing hole, mouse bite, open circuit, short, spur, spurious copper) or normal using Kaggle dataset. Handled class imbalance and high cardinality via EDA and feature engineering. Integrates tabular/visual data for streamlined workflows and quick decisions",
    tech: ["Python", "Pandas", "Numpy"],
    status: "Live",
    color: "from-cyan-400 to-blue-500",
    year: "2025",
    url: "https://github.com/VincentiusJacob/Datathon2025-LG01",
  },
  {
    id: 8,
    title:
      "AbleCareers: Inclusive Platform for Career and Education Opportunities",
    category: "Web Application",
    description:
      "Developed AbleCareers, a platform empowering individuals with diverse abilities to advance in careers and education. By providing tailored, inclusive opportunities aligned with users' talents, it promotes personal growth, skill development, and independence while recognizing each person's unique societal contributions",
    tech: ["React", "CSS", "Express.js", "Supabase"],
    status: "Prototype",
    color: "from-cyan-400 to-blue-500",
    year: "2024",
    url: "https://github.com/VincentiusJacob/ablecareers",
  },
  {
    id: 9,
    title: "StoreEgg",
    category: "Mobile Application",
    description:
      "Mobile Application about e-commerce store with a mini game to get coins",
    tech: ["React Native"],
    status: "Prototype",
    color: "from-cyan-400 to-blue-500",
    year: "2024",
    url: "https://github.com/VincentiusJacob/Storegg",
  },
];

// Project Image Mapping
const projectImages: { [key: number]: StaticImageData } = {
  1: MyAssets,
  2: TrafficSign,
  3: SmartIllegal,
  4: TwitterDash,
  5: Storegg,
  6: ScribeSpace,
  9: AbleCareers,
};

// --- Reusable Project Card Component ---
const ProjectCard = ({
  project,
  isVisible,
  delay,
}: {
  project: Project;
  isVisible: boolean;
  delay: number;
}) => {
  const imageSrc = projectImages[project.id];

  return (
    <div
      className={`group relative p-8 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-500 backdrop-blur-sm ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="absolute top-4 right-4">
        <span
          className={`px-3 py-1 text-xs font-mono ${
            project.status === "Live"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : project.status === "Beta"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : project.status === "Development"
              ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
              : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
          }`}
        >
          {project.status}
        </span>
      </div>
      <div className="mb-6">
        <h3 className="text-2xl font-light text-white mb-3">{project.title}</h3>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-400 text-sm font-mono">
            {project.category}
          </span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-400 text-sm font-mono">
            {project.year}
          </span>
        </div>
      </div>
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={project.title}
          width={800}
          height={450}
          className="w-full h-auto mb-6 rounded-lg object-cover"
        />
      )}
      <p className="text-gray-300 mb-6 leading-relaxed">
        {project.description}
      </p>
      <div className="mb-6">
        <h4 className="text-sm font-mono text-gray-400 mb-3">
          Technology Stack:
        </h4>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 text-xs bg-gray-800 text-gray-300 rounded-lg border border-gray-700 font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-4">
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-6 py-3 bg-gradient-to-r ${project.color} text-white rounded-lg font-mono text-sm hover:shadow-lg transition-all duration-300 opacity-90 hover:opacity-100`}
        >
          View Project
        </Link>
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500 pointer-events-none`}
      />
    </div>
  );
};

// --- Main Component ---
export default function WorkSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const handleToggleProjects = () => {
    setShowAllProjects(!showAllProjects);
    if (showAllProjects) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-black text-white py-20 px-6 overflow-hidden"
      >
        {/* Animated Grid Background */}
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
            <h2 className="text-5xl md:text-6xl font-light mb-6">
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
                Featured
              </span>
              <span className="text-white ml-4">Projects</span>
            </h2>
            <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
              <span className="text-purple-400">&gt;</span> A selection of my
              recent work in AI and software development.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projectsData.slice(0, 4).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                isVisible={isVisible}
                delay={index * 200}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={handleToggleProjects}
              className="px-8 py-4 border border-purple-400/30 text-purple-300 rounded-lg font-mono text-sm hover:border-purple-400/50 hover:text-white hover:bg-purple-500/10 transition-all duration-300"
            >
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* All Projects Page Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 backdrop-blur-lg z-50 transition-opacity duration-500 ${
          showAllProjects ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full h-full overflow-y-auto p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-white">
                All Projects
              </h2>
              <button
                onClick={handleToggleProjects}
                className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg font-mono text-sm hover:border-gray-600 hover:text-white transition-all duration-300"
              >
                &lt; Back
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isVisible={showAllProjects}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
