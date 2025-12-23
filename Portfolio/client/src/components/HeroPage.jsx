import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import LightRays from "../Animations/LightRays";
import AnimatedRings from "../Animations/AnimatedRings";
import AnimatedName from "../Animations/AnimatedLetters";
import MagicText from "../Animations/TextType";
import { ArrowDown, ArrowUpRight, Code, Cpu, Database, FileText, Globe, Layers, PanelsTopLeft, Paperclip, Sparkles, Terminal } from "lucide-react";
const HeroPage = () => {
  const [buffer, setBuffer] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      setBuffer(true);
    }, 2800);

    return () => {
      clearTimeout(delay);
    };
  }, []);

  return (
    <div id="home" className="relative bg-black overflow-hidden min-h-screen md:pt-0 pt-25 ">
      {/* Light Rays Background */}
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* Glow blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-400/30 rounded-full blur-[120px] -translate-x-[20%] -translate-y-[20%]"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-400/30 rounded-full blur-[120px] translate-x-[20%] translate-y-[20%]"></div>

      <div className="relative z-50 flex flex-col md:flex-row items-center md:justify-between px-6 md:px-16 md:min-h-screen">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 text-white ">
        <div className="leading-15">
          <h1 className="text-[52px] md:text-[72px] font-medium font-serif">
            Meet
          </h1>

          <AnimatedName
            text="Matin Mondal"
            gradients={[
              { from: "from-blue-400", to: "to-blue-800" },
              { from: "from-cyan-500", to: "to-cyan-800" },
            ]}
          />
        </div>

          <div className="space-y-4 text-gray-400 flex flex-col">
            <MagicText
              text={[
                "Fullstack Web Developer",
                "A Programmer",
                "Tech Explorer!",
              ]}
              className="text-xl md:text-2xl font-medium"
              typingSpeed={90}
              pauseDuration={1800}
              shiny
              shinySpeed={3}
              loop
            />

            <MagicText
              text="I build modern web applications that focus on clean design, solid functionality, and a smooth user experience. Most of my learning comes from hands-on projects."
              shiny={false}
              showCursor={false}
              typingSpeed={30}
              mode="continuous"
            />

            <div
              className="flex flex-wrap items-center gap-3 px-4 py-2 rounded-full
                        border border-white/10 bg-[#FFFFFF0D] backdrop-blur-sm
                        w-fit max-w-md md:mt-5 "
            >
              <span className="text-gray-500 text-xs font-bold uppercase shrink-0">
                Skills:
              </span>

              <div className="flex flex-wrap gap-3">
                <Code className="w-4 h-4 text-purple-400" />
                <Database className="w-4 h-4 text-pink-400" />
                <PanelsTopLeft className="w-4 h-4 text-blue-400" />
                <Globe className="w-4 h-4 text-purple-400" />
                <Cpu className="w-4 h-4 text-pink-400" />
                <Layers className="w-4 h-4 text-blue-400" />
                <Terminal className="w-4 h-4 text-purple-400" />
              </div>
            </div>

            {/* STATUS */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full
                        border border-white/10 bg-[#FFFFFF0D] backdrop-blur-sm
                        w-fit max-w-md"
            >
              <span className="text-gray-500 text-xs font-bold uppercase">
                Current Position:
              </span>

              <span className="flex items-center gap-1 text-gray-300 text-sm">
                Open for Opportunities
                <Sparkles className="w-3 h-3 text-pink-400" />
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
          <div className="w-full md:w-1/2 flex flex-col items-center mt-12 md:mt-0">
            <div className="relative w-[320px] h-80 md:w-[650px] md:h-[650px]">
              <div className="absolute inset-0 bg-linear-to-r from-[#0FA3B1]/20 to-[#1EC6A7]/20 rounded-full blur-[120px]" />
              <AnimatedRings />
            </div>

            {/* CTA BUTTONS */}
            <div className="text-white flex md:flex-row flex-col gap-4 w-full max-w-xl md:mt-6 mb-5">
              <a
                href="#projects"
                className="flex-1 inline-flex justify-center items-center gap-2
                      px-6 py-3 rounded-full text-sm font-semibold
                      bg-linear-to-r from-blue-500/50 to-cyan-600
                      transition hover:scale-105"
              >
                View my work
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="flex-1 inline-flex justify-center items-center gap-2
                      px-6 py-3 rounded-full text-sm font-semibold
                      border border-purple-700 hover:bg-purple-950/10
                      transition hover:scale-105"
              >
                Get in Touch  
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="https://drive.google.com/file/d/1aho6aqtxtWcoXGU2FtHWvHTaNTFJ29zk/view"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2
                      px-6 py-3 rounded-full text-sm font-semibold
                      bg-black/40 border border-white/10
                      transition hover:scale-105"
              >
                Resume
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>
      </div>

      <Navbar />
    </div>
  );
};

export default HeroPage;
