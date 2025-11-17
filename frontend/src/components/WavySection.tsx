// src/components/WavySection.tsx
"use client";
import React, { useState, useEffect } from "react";
import { WavyBackground } from "@/components/ui/wavy-background";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export const WavySection = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const lightModeColors = [
    "#000000",
    "#1a1a1a",
    "#2c2c2c",
    "#3b1d0e",
    "#4a1f00",
    "#ff6600",
    "#ff7b00",
    "#ff8c1a",
    "#ff9f40",
    "#ffae42",
    "#ffd8a8"
  ];

  const darkModeColors = [
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a78bfa",
    "#c4b5fd",
    "#ddd6fe",
    "#ede9fe",
    "#faf5ff",
    "#d946ef"
  ];

  return (
    <section id="wavy-section" className="bg-white dark:bg-background relative overflow-hidden">
      <WavyBackground
        containerClassName="min-h-screen"
        className="max-w-4xl mx-auto px-4"
        colors={isDark ? darkModeColors : lightModeColors}
        waveWidth={50}
        backgroundFill={isDark ? "#0D0D0D" : "#ffffff"}
        blur={10}
        speed="fast"
        waveOpacity={0.5}
      >
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white">
            Experience the Wave of Revolution
          </h2>
          <p className="text-lg md:text-xl text-black dark:text-gray-300 max-w-2xl mx-auto">
            Powering innovation through intelligent IT — where technology meets design to deliver remarkable digital experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-black/90 dark:hover:bg-gray-200 font-medium px-8 py-3 text-lg"
              duration={0.8}
              clockwise={true}
            >
              Get Started
            </HoverBorderGradient>
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="bg-white/90 dark:bg-gray-800 text-black dark:text-white hover:bg-white dark:hover:bg-gray-700 font-medium px-8 py-3 text-lg border border-black/10 dark:border-white/10"
              duration={0.8}
              clockwise={false}
            >
              Learn More
            </HoverBorderGradient>
          </div>
        </div>
      </WavyBackground>
    </section>
  );
};