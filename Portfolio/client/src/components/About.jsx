import GradientText from "../Animations/GradientText";
import AnimatedName from "../Animations/AnimatedLetters";
import { Dot, User } from "lucide-react";
import React from "react";

const About = () => {
  return (
    <section className="flex justify-center w-full relative py-20">
      <div className="container bg-[#121212D9] flex items-center justify-center max-w-6xl mx-auto border border-white/5 rounded-2xl py-4 px-2">
        {/* Left Part */}
        <div className="w-1/2 p-10 grid gap-6">
          <div className="inline-flex text-[#8B5CF6] text-sm font-medium gap-2 items-center border border-purple-500/20 rounded-full p-2 px-4 bg-purple-500/10 w-fit">
            <User className="w-4 h-4" />
            <h1>About Me</h1>
          </div>

          <div>
            <div className="text-white leading-snug space-y-7">
              <div className="font-bold text-4xl">
                <GradientText
                  colors={[
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                    "#4079ff",
                    "#40ffaa",
                  ]}
                  animationSpeed={3}
                  showBorder={false}
                >
                  Focused on
                </GradientText>

                <h2 className="">building modern web experiences</h2>
              </div>
              <p className="text-gray-400 text-lg">
                I’m a full stack developer focused on building modern web
                applications through hands-on, project-based learning. I work
                with React, Node.js, MongoDB, and Tailwind CSS, and enjoy
                turning ideas into real, usable products.
              </p>
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div className="relative w-1/2 pr-5">
          <div className="absolute inset-0 bg-cyan-300/10 blur-2xl "></div>

          <div className=" bg-[#18181B] flex items-center justify-center max-w-lg mx-auto text-white rounded-2xl border border-white/5">
            <ul className="p-4 w-full text-md font-medium space-y-2">
              <li className="">
                <div className="flex justify-between items-center border-white/5 border-b pr-2 pl-2 pt-2 pb-4">
                  <span className="text-gray-400">Location</span>
                  <span className="">Remote / Hybrid / On-site</span>
                </div>
              </li>

              <li className="">
                <div className="flex justify-between items-center border-white/5 border-b pr-2 pl-2 pb-4">
                  <span className="text-gray-400">Experience</span>
                  <span className="">Fresher</span>
                </div>
              </li>
              <li>
                <div className="flex justify-between items-center border-white/5 border-b pr-2 pl-2 pb-4">
                  <span className="text-gray-400">Availability</span>
                  <span className="inline-flex text-green-500 items-center justify-center ">
                    <Dot className="h-10 w-10 blink" /> Open to work
                  </span>
                </div>
              </li>
              <li className="">
                <div className="flex justify-between items-center border-white/5 pr-2 pl-2 pb-2">
                  <span className="text-gray-400">Focus</span>
                  <span className="">Full Stack Dev</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
