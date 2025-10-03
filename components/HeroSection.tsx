"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import ProfilePicture from "../public/profilepicture.jpeg";

export default function HeroSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    currentMount.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    const sphereGeometry = new THREE.SphereGeometry(1.2, 24, 24); // Reduced size
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0099ff,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const innerSphereGeometry = new THREE.SphereGeometry(0.9, 12, 12); // Reduced size
    const innerSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff99,
      transparent: true,
      opacity: 0.08,
    });
    const innerSphere = new THREE.Mesh(
      innerSphereGeometry,
      innerSphereMaterial
    );
    scene.add(innerSphere);

    const particleCount = 80; // Reduced particle count
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15; // Reduced range
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 2] = 1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08, // Reduced size
      transparent: true,
      opacity: 0.5,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const distance = Math.sqrt(
          Math.pow(positions[i * 3] - positions[j * 3], 2) +
            Math.pow(positions[i * 3 + 1] - positions[j * 3 + 1], 2) +
            Math.pow(positions[i * 3 + 2] - positions[j * 3 + 2], 2)
        );

        if (distance < 4) {
          // Reduced distance threshold
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2],
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
        }
      }
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.15,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.3); // Reduced intensity
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ff99, 0.8, 80); // Reduced intensity and range
    pointLight1.position.set(8, 8, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0099ff, 0.4, 80);
    pointLight2.position.set(-8, -8, -8);
    scene.add(pointLight2);

    camera.position.z = 6; // Reduced distance

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      sphere.rotation.x = Math.sin(time * 0.3) * 0.15;
      sphere.rotation.y = time * 0.08;
      sphere.rotation.z = Math.sin(time * 0.2) * 0.08;
      sphere.position.y = Math.sin(time * 0.5) * 0.2;

      innerSphere.rotation.x = -time * 0.08;
      innerSphere.rotation.y = Math.sin(time * 0.4) * 0.15;

      particles.rotation.y = time * 0.015;
      particles.rotation.x = Math.sin(time * 0.01) * 0.08;

      lines.rotation.y = time * 0.012;

      pointLight1.position.x = Math.sin(time * 0.5) * 12;
      pointLight1.position.z = Math.cos(time * 0.5) * 12;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 2s ease-in-out",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-3xl sm:max-w-4xl">
        <div
          className="mb-6 sm:mb-8 animate-fadeInUp"
          style={{
            animationDelay: "0.5s",
            opacity: 1,
            animationFillMode: "forwards",
          }}
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extralight leading-tight tracking-tight text-white mb-3 sm:mb-4">
            <span className="block bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Vincentius Jacob
            </span>
          </h1>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extralight leading-tight tracking-tight">
            <span className="block bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent">
              Gunawan
            </span>
          </h2>

          <div
            className="flex items-center justify-center mt-4 sm:mt-6 gap-3 sm:gap-4 animate-fadeInScale"
            style={{
              animationDelay: "1.5s",
              opacity: 1,
              animationFillMode: "forwards",
            }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent w-12 sm:w-16" />
            <div className="flex gap-1">
              <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-cyan-400 rounded-full animate-pulse" />
              <div
                className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent w-12 sm:w-16" />
          </div>
        </div>

        {/* Profile Picture */}
        <div
          className="flex justify-center mb-4 sm:mb-6 animate-fadeIn"
          style={{
            animationDelay: "1s",
            opacity: 1,
            animationFillMode: "forwards",
          }}
        >
          <Image
            src={ProfilePicture}
            alt="Vincentius Jacob Gunawan"
            width={128} // Reduced to 128px base size
            height={128}
            className="w-32 h-32 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full border-2 border-cyan-400/50 object-cover shadow-lg shadow-cyan-400/20"
          />
        </div>

        {/* Description */}
        <div
          className="space-y-4 sm:space-y-6 mb-8 sm:mb-10 animate-fadeIn"
          style={{
            animationDelay: "1.2s",
            opacity: 1,
            animationFillMode: "forwards",
          }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-light tracking-wide">
            Artificial Intelligence | Fullstack Development | Data Science
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-xl sm:max-w-2xl mx-auto leading-relaxed font-mono">
            <span className="text-green-400">&gt;</span> Integrating AI models
            into reliable and production-ready applications
            <br />
            <span className="text-blue-400">&gt;</span> Developing fullstack
            applications
            <br />
            <span className="text-purple-400">&gt;</span> Transforming data into
            meaningful insights and practical analysis
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fadeInUp"
          style={{
            animationDelay: "1.8s",
            opacity: 1,
            animationFillMode: "forwards",
          }}
        >
          <button
            className="group px-5 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/30 rounded-xl text-white hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50 transition-all duration-500 shadow-lg hover:shadow-cyan-400/20 font-mono text-xs sm:text-sm animate-float"
            data-hover
          >
            <span className="flex items-center gap-1.5">
              <span>View My Work</span>
              <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-cyan-400 rounded-full group-hover:animate-pulse" />
            </span>
          </button>

          <button
            className="group px-5 sm:px-6 py-2 sm:py-3 text-gray-300 hover:text-white transition-colors duration-500 border border-gray-700 hover:border-gray-500 rounded-xl font-mono text-xs sm:text-sm backdrop-blur-md bg-black/20"
            data-hover
          >
            <span className="flex items-center gap-1.5">
              <span>Get In Touch</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Info */}
      <div
        className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-xs sm:text-sm text-gray-500 font-mono animate-fadeIn"
        style={{
          animationDelay: "2.5s",
          opacity: 1,
          animationFillMode: "forwards",
        }}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span>Location: Jakarta, Indonesia</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-blue-400 rounded-full animate-pulse" />
          <span>Status: Available for projects</span>
        </div>
      </div>

      <div
        className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-xs sm:text-sm text-gray-500 text-right font-mono animate-fadeIn"
        style={{
          animationDelay: "2.5s",
          opacity: 1,
          animationFillMode: "forwards",
        }}
      >
        <div className="mb-1">Scroll to explore more</div>
        <div className="text-lg sm:text-xl animate-bounce">↓</div>
      </div>
    </section>
  );
}
