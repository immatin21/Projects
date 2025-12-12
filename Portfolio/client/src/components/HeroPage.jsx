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
    <div className="relative bg-black overflow-hidden min-h-screen">
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
                  text="I create digital products that pair clean design with solid code. Specializing in the MERN stack and modern tools like React and Node.js, I build fast, scalable applications that are a pleasure to use. Beyond code, I delight in solving tricky problems and turning ideas into reality."
                  shiny={false}
                  showCursor={false}
                  reverseMode={false}
                  initialDelay={2500}
                  typingSpeed={30}
                  mode="continuous"
                  className="w-full font-normal"
                />
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
