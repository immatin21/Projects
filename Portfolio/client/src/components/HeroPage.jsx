import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import LightRays from "../Animations/LightRays";
import AnimatedRings from "../Animations/AnimatedRings";
import AnimatedName from "../Animations/AnimatedLetters";
import MagicText from "../Animations/TextType";
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
    <div id="about" className="relative bg-black overflow-hidden min-h-screen">
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

      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-400/30  rounded-full blur-[120px] -translate-x-[20%] -translate-y-[20%]"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-400/30  blur-[120px] translate-x-[20%] translate-y-[20%]"></div>

      <div className="relative z-50 flex items-center justify-between px-16 min-h-screen">
        {/* LEFT SIDE */}
        <div className="w-1/2 text-white -space-y-6 mb-15">
          <h1 className="text-[72px] font-medium font-serif">Meet</h1>
          <AnimatedName
            text="Matin Mondal"
            gradients={[
              { from: "from-blue-400", to: "to-blue-800" },
              { from: "from-cyan-500", to: "to-cyan-800" },
            ]}
          />

          {!buffer ? (
            " "
          ) : (
            <div className="w-[36vw] h-10 pt-6 flex gap-2 flex-col text-gray-400">
              <MagicText
                text={[
                  "Fullstack Web Developer",
                  "A Programmer",
                  "Tech Explorer!",
                ]}
                className="text-2xl w-full font-medium  "
                typingSpeed={90}
                pauseDuration={1800}
                shiny={true}
                shinySpeed={3}
                showCursor={true}
                loop={true}
                cursorCharacter="|"
              />
              <div>
                <MagicText
                  text="I build modern web applications that focus on clean design, solid functionality, and a smooth user experience. Most of my learning comes from hands-on projects, where I enjoy solving problems through code and continuously improving my skills by building and experimenting."
                  shiny={false}
                  showCursor={false}
                  reverseMode={false}
                  initialDelay={2500}
                  typingSpeed={30}
                  mode="continuous"
                  className="w-full font-normal"
                />
              </div>
              <div className="flex gap-4 items-center px-6 py-2 my-5 rounded-3xl w-80 border border-white/10 bg-[#FFFFFF0D] backdrop-blur-sm">
                <span className="text-gray-500 text-xs font-bold uppercase">
                  Skills:{" "}
                </span>
                {/* icons */}
                <div className="inline-flex gap-3">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-code text-purple-400"
                      aria-hidden="true"
                    >
                      <path d="m16 18 6-6-6-6"></path>
                      <path d="m8 6-6 6 6 6"></path>
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-database text-pink-400"
                      aria-hidden="true"
                    >
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                      <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
                      <path d="M3 12A9 3 0 0 0 21 12"></path>
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-panels-top-left text-blue-400"
                      aria-hidden="true"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                      <path d="M3 9h18"></path>
                      <path d="M9 21V9"></path>
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-globe text-purple-400"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-cpu text-pink-400"
                      aria-hidden="true"
                    >
                      <path d="M12 20v2"></path>
                      <path d="M12 2v2"></path>
                      <path d="M17 20v2"></path>
                      <path d="M17 2v2"></path>
                      <path d="M2 12h2"></path>
                      <path d="M2 17h2"></path>
                      <path d="M2 7h2"></path>
                      <path d="M20 12h2"></path>
                      <path d="M20 17h2"></path>
                      <path d="M20 7h2"></path>
                      <path d="M7 20v2"></path>
                      <path d="M7 2v2"></path>
                      <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                      <rect x="8" y="8" width="8" height="8" rx="1"></rect>
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-layers text-blue-400"
                      aria-hidden="true"
                    >
                      <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                      <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                      <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-terminal text-purple-400"
                      aria-hidden="true"
                    >
                      <path d="M12 19h8"></path>
                      <path d="m4 17 6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center px-6 py-2 mb-5 rounded-3xl w-90 border border-white/10 bg-[#FFFFFF0D] backdrop-blur-sm">
                <span className="text-gray-500 text-xs font-bold uppercase">
                  Current Position:
                </span>
                <span className="flex items-center justify-center text-gray-300 text-sm gap-1">
                  Open for Opportunities
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-sparkles inline w-3 h-3 text-pink-400 ml-1"
                    aria-hidden="true"
                  >
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                    <path d="M20 2v4"></path>
                    <path d="M22 4h-4"></path>
                    <circle cx="4" cy="20" r="2"></circle>
                  </svg>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE — GIVE HEIGHT TO RING */}
        <div className="w-1/2 flex justify-center items-center ">
          <div className="w-[650px] h-[650px] relative ">
            <div
              className="bg-linear-to-r from-[#0FA3B1]/20 to-[#1EC6A7]/20 rounded-full blur-[120px]
 absolute inset-0 pointer-events-none "
            ></div>
            <AnimatedRings />
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default HeroPage;
