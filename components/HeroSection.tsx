"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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

    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0099ff,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const innerSphereGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    const innerSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff99,
      transparent: true,
      opacity: 0.1,
    });
    const innerSphere = new THREE.Mesh(
      innerSphereGeometry,
      innerSphereMaterial
    );
    scene.add(innerSphere);

    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

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
      size: 0.1,
      transparent: true,
      opacity: 0.6,
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

        if (distance < 5) {
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
      opacity: 0.2,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00ff99, 1, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0099ff, 0.5, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    camera.position.z = 8;

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      sphere.rotation.x = Math.sin(time * 0.3) * 0.2;
      sphere.rotation.y = time * 0.1;
      sphere.rotation.z = Math.sin(time * 0.2) * 0.1;
      sphere.position.y = Math.sin(time * 0.5) * 0.3;

      innerSphere.rotation.x = -time * 0.1;
      innerSphere.rotation.y = Math.sin(time * 0.4) * 0.2;

      particles.rotation.y = time * 0.02;
      particles.rotation.x = Math.sin(time * 0.01) * 0.1;

      lines.rotation.y = time * 0.015;

      pointLight1.position.x = Math.sin(time * 0.5) * 15;
      pointLight1.position.z = Math.cos(time * 0.5) * 15;

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
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div
        ref={mountRef}
        className="absolute inset-0 z-0"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 2s ease-in-out",
        }}
      />

      {/* AI Status Indicators */}
      <div className="absolute top-24 right-8 z-10 space-y-3">
        <div
          className="flex items-center gap-3 bg-black/30 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 animate-fadeInRight"
          style={{
            animationDelay: "2s",
            opacity: 1,
            animationFillMode: "forwards",
          }}
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-glow" />
          <span className="text-sm text-green-300 font-mono">
            Status: Open to Opportunities
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl">
        <div
          className="mb-12 animate-fadeInUp"
          style={{
            animationDelay: "0.5s",
            opacity: 1,
            animationFillMode: "forwards",
          }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight leading-none tracking-tight text-white mb-6">
            <span className="block bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Vincentius Jacob
            </span>
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-none tracking-tight">
            <span className="block bg-gradient-to-r from-gray-300 via-gray-100 to-white bg-clip-text text-transparent">
              Gunawan
            </span>
          </h2>

          <div
            className="flex items-center justify-center mt-8 gap-4 animate-fadeInScale"
            style={{
              animationDelay: "1.5s",
              opacity: 1,
              animationFillMode: "forwards",
            }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent w-24" />
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <div
                className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent w-24" />
          </div>
        </div>

        {/* Description */}
        <div
          className="space-y-8 mb-16 animate-fadeIn"
          style={{
            animationDelay: "1.2s",
            opacity: 1,
            animationFillMode: "forwards",
          }}
        >
          <p className="text-2xl md:text-3xl text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-light tracking-wide">
            Artificial Intelligence | Fullstack Development | Data Science
          </p>
          <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed font-mono">
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
          className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp"
          style={{
            animationDelay: "1.8s",
            opacity: 1,
            animationFillMode: "forwards",
          }}
        >
          <button
            className="group px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-cyan-400/30 rounded-xl text-white hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/50 transition-all duration-500 shadow-lg hover:shadow-cyan-400/20 font-mono text-sm animate-float"
            data-hover
          >
            <span className="flex items-center gap-2">
              <span>View My Work</span>
              <div className="w-2 h-2 bg-cyan-400 rounded-full group-hover:animate-pulse" />
            </span>
          </button>

          <button
            className="group px-8 py-4 text-gray-300 hover:text-white transition-colors duration-500 border border-gray-700 hover:border-gray-500 rounded-xl font-mono text-sm backdrop-blur-md bg-black/20"
            data-hover
          >
            <span className="flex items-center gap-2">
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
        className="absolute bottom-8 left-8 text-sm text-gray-500 font-mono animate-fadeIn"
        style={{
          animationDelay: "2.5s",
          opacity: 1,
          animationFillMode: "forwards",
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Location: Jakarta, Indonesia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span>Status: Available for projects</span>
        </div>
      </div>

      <div
        className="absolute bottom-8 right-8 text-sm text-gray-500 text-right font-mono animate-fadeIn"
        style={{
          animationDelay: "2.5s",
          opacity: 1,
          animationFillMode: "forwards",
        }}
      >
        <div className="mb-2">Scroll to explore more</div>
        <div className="text-2xl animate-bounce">↓</div>
      </div>
    </section>
  );
}
