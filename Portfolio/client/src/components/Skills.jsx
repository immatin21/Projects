import GradientText from "../Animations/GradientText";
import React from "react";

const frontendSkills = [
  {
    text: "ReactJS",
    src: "/Icons/React.svg",
  },
  {
    text: "NextJS",
    src: "/Icons/nextjs.png",
  },
  {
    text: "Node JS",
    src: "/Icons/nodejs.svg",
  },
  {
    text: "Express JS",
    src: "/Icons/express.png",
  },
  {
    text: "Redux",
    src: "/Icons/Redux.svg",
  },
  {
    text: "React Dom",
    src: "/Icons/reactdom.png",
  },
  {
    text: "REST APIs",
    src: "/Icons/restapi.jpg",
  },
  {
    text: "Tailwind CSS",
    src: "/Icons/Tailwind.webp",
  },
  {
    text: "Bootstrap",
    src: "/Icons/bootstrap.png",
  },
  {
    text: "HTML",
    src: "/Icons/HTML.png",
  },
  {
    text: "CSS",
    src: "/Icons/CSS.png",
  },
  {
    text: "Javascript",
    src: "/Icons/JS.png",
  },
];

const databaseTools = [
  {
    text: "Mongo DB",
    src: "/Icons/mongodb.svg",
  },
  {
    text: "MySQL",
    src: "/Icons/mysql.png",
  },
  {
    text: "Postman",
    src: "/Icons/postman.svg",
  },
  {
    text: "Git",
    src: "/Icons/git.svg",
  },
  {
    text: "Git Hub",
    src: "/Icons/github.svg",
  },
  {
    text: "Vercel",
    src: "/Icons/vercel.svg",
  },
  {
    text: "VS Code",
    src: "/Icons/vs.svg",
  },
];

const softSkills = [
  {
    text: "Communication",
  },
  {
    text: "Team Working",
  },
  {
    text: "Adaptability",
  },
  {
    text: "Time Mangement",
  },
  {
    text: "Problem Solving",
  },
  {
    text: "Willingness to Learn",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="flex justify-center w-full relative py-15">
      <div className="font-bold text-white flex flex-col gap-6 justify-center items-center text-4xl md:text-6xl">
        {/* Heading */}
        <div className="inline-flex gap-2">
          <h1>My</h1>
          <GradientText
            colors={["#0FA3B1", "#2C7FFF", "#1EC6A7", "#2C7FFF", "#0FA3B1"]}
            animationSpeed={3}
            showBorder={false}
          >
            Skills
          </GradientText>
        </div>

        <p className="text-base md:text-lg text-gray-400 font-normal text-center px-5 md:px-0">
          Skills I’m developing through hands-on projects and everyday practice.
        </p>

        {/* Main Container */}
        <div className="container flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-10 my-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
            {/* Card 1 */}
            <div className="bg-[#121213] flex flex-col items-center justify-start text-white rounded-2xl border border-white/10 py-6">
              <div className="inline-flex text-xl sm:text-2xl font-medium gap-2 items-center pb-8 p-2 w-fit">
                <div className="p-2.5 rounded-xl bg-white/5 transition-colors">
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
                    className="lucide lucide-code w-6 h-6 text-blue-400"
                  >
                    {" "}
                    <path d="m16 18 6-6-6-6"></path>{" "}
                    <path d="m8 6-6 6 6 6"></path>{" "}
                  </svg>
                </div>
                <h1 className="text-white/80">Technical Skills</h1>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 w-full px-6">
                {frontendSkills.map((skill) => (
                  <div
                    key={skill.text}
                    className="bg-white/5 px-4 py-2 font-medium text-[#D1D5DB]
                       flex items-center gap-2 justify-center rounded-md"
                  >
                    <img
                      className="w-5 h-5 shrink-0"
                      src={skill.src}
                      alt={skill.text}
                    />
                    <span className="text-sm">{skill.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side cards */}
            <div className="flex flex-col gap-10">
              {/* Card 2 */}
              <div className="bg-[#121213] flex flex-col items-center justify-start text-white rounded-2xl border border-white/10 px-6 py-6">
                <div className="inline-flex text-lg sm:text-xl font-medium gap-2 items-center pb-5 p-2 w-fit">
                  <div className="p-2.5 rounded-xl bg-white/5 transition-colors">
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
                      className="lucide lucide-database w-6 h-6 text-green-400"
                    >
                      {" "}
                      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>{" "}
                      <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>{" "}
                      <path d="M3 12A9 3 0 0 0 21 12"></path>{" "}
                    </svg>
                  </div>
                  <h1 className="text-white/80">Database & Tools</h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                  {databaseTools.map((skill) => (
                    <div
                      key={skill.text}
                      className="bg-white/5 px-4 py-2 font-medium text-[#D1D5DB]
                         flex items-center gap-2 justify-center rounded-md"
                    >
                      <img
                        className="w-5 h-5 shrink-0"
                        src={skill.src}
                        alt={skill.text}
                      />
                      <span className="text-sm">{skill.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#121213] flex flex-col items-center justify-start text-white rounded-2xl border border-white/10 px-6 py-6">
                <div className="inline-flex text-lg sm:text-xl font-medium gap-2 items-center pb-5 p-2 w-fit">
                  <div className="p-2.5 rounded-xl bg-white/5 transition-colors">
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
                      className="lucide lucide-users w-6 h-6 text-pink-400"
                      aria-hidden="true"
                    >
                      {" "}
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>{" "}
                      <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>{" "}
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>{" "}
                      <circle cx="9" cy="7" r="4"></circle>{" "}
                    </svg>
                  </div>
                  <h1 className="text-white/80">Soft Skills</h1>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                  {softSkills.map((skill) => (
                    <div
                      key={skill.text}
                      className="bg-white/5 px-4 py-2 font-medium text-[#D1D5DB]
                         flex items-center justify-center rounded-md"
                    >
                      <span className="text-sm">{skill.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
