import GradientText from "../Animations/GradientText";
import React from "react";

const projects = [
  {
    imageSrc: "/src/Icons/Sign-In Page.png",
    name: "Ping-up Social Media App",
    description:
      "A modern social networking app that lets users connect with people, share posts and 24-hour stories, and chat in real time using Server-Sent Events, all wrapped in a clean, responsive UI.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Clerk",
      "Inngest",
    ],
    liveUrl: "https://ping-up-phi-liard.vercel.app",
  },
  {
    imageSrc: "/src/Icons/getmeachai.png",
    name: "GetMeAChai – Creator Support Platform",
    description:
      "A Patreon-style web platform that lets creators showcase their work and receive one-time or recurring support from their audience, with secure authentication and seamless payment integration.",
    techStack: [
      "NextJs",
      "NextAuth",
      "MongoDB",
      "Tailwind CSS",
      "Razorpay"
    ],
    liveUrl: "https://getmeachaiproject.vercel.app",
  },
  {
    imageSrc: "/src/Icons/passop.png",
    name: "PassOP – Password Manager",
    description:
      "A full-stack password manager that lets users store and manage credentials after signing in with GitHub. Built with React, MongoDB, and Auth0, featuring a serverless backend, user-specific data handling, and a clean, responsive UI.",
    techStack: [
      "React",
      "Auth0",
      "MongoDB",
      "Tailwind CSS",
      "Vercel"
    ],
    liveUrl: "https://passop-olive.vercel.app",
  }
];

const Card = () => {
  return (
    <div id="projects" className="max-w-6xl mx-auto py-20">
      <div className="flex gap-4 flex-col pb-10">
        <div className="flex gap-2 text-4xl md:text-6xl font-bold text-white justify-center leading-normal">
          <h1>Featured</h1>
          <GradientText
          className=""
            colors={["#0FA3B1", "#2C7FFF", "#1EC6A7", "#2C7FFF", "#0FA3B1"]}
            animationSpeed={3}
            showBorder={false}
          >
            Projects
          </GradientText>
        </div>
        <p className="text-base md:text-lg text-gray-400 font-normal text-center">
          A collection of recent projects highlighting my journey in full-stack
          development and modern UI design.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-10 text-white">
        {/* Project Cards */}

        {projects.map((item, i) => (
          <div
            key={i}
            className="group relative rounded-3xl m-5 bg-gray-500/10 border border-white/5 overflow-hidden hover:border-purple-500/30 duration-500 transition-transform ease-out hover:-translate-y-2 hover:shadow-xl"
          >
            <div className="relative h-52 sm:h-64 overflow-hidden">
              <div className="absolute inset-0 z-10 opacity-60"></div>
              <img
                src={item.imageSrc}
                alt=""
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8 relative z-20 -mt-12">
              <div className="rounded-2xl p-6 backdrop-blur-xl border border-white/20 bg-black/40">
                <h3 className=" text-xl sm:text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                  {item.name}
                </h3>
                <div className="mb-6">
                  <p className="text-gray-400 text-sm ">{item.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={item.liveUrl}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-purple-400 transition-colors"
                >
                  <span>View Project</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-external-link w-4 h-4"
                    aria-hidden="true"
                  >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
