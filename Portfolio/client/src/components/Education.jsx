import { Calendar } from "lucide-react";
import GradientText from "../Animations/GradientText";
import React from "react";

const eduDetails = [
  {
    institution: "Maharaja Sayajirao University, Vadodara",
    course: "BCA (Hons.) | Bachelor of Computer Applications (Honours)",
    src: "/Icons/msu.webp",
    alt: "MSU logo",
    marks: {
      type: "CGPA",
      score: 8.06,
    },
    invert: "invert-80",
    duration: "2023 - 2027",
    status: "Pursuing",
  },
  {
    institution: "Aman Day School, Godhra",
    course: "HSC Commerce  - GSHSEB",
    src: "/Icons/ads logo.jpg",
    alt: "ads logo",
    marks: {
      type: "Percentage(%)",
      score: 74.8,
    },

    duration: "2023",
  },
  {
    institution: "Kendriya Vidyalaya, Godhra",
    course: "SSC - CBSE",
    src: "/Icons/kv logo.png",
    alt: "kv logo",
    marks: {
      type: "Percentage(%)",
      score: 86.5,
    },
    duration: "2021",
  },
];

const Education = () => {
  return (
    <section id="education" className="mx-auto max-w-6xl pt-25 pb-10">
      <div className="flex justify-center items-center flex-col gap-4">
        <h1 className="font-bold text-4xl md:text-6xl">
          <GradientText
            colors={["#49FC86", "#54C7C7", "#EAFF70", "#54C7C7", "#49FC86"]}
            animationSpeed={3}
            showBorder={false}
          >
            Education
          </GradientText>
        </h1>
        <p className="text-base md:text-lg text-gray-400 font-normal text-center">
          My education has been a journey of self-discovery and growth. My
          educational details are as follows.
        </p>
      </div>
      {/* Education Details */}
      <div className="space-y-12">
        {eduDetails.map((item, i) => (
          <div
            key={i}
            className="relative border-l-2 border-purple-500/30
                 max-w-4xl pl-6 sm:pl-10 md:mx-auto mx-8"
          >
            {/* Timeline dot */}
            <div
              className="w-3 h-3 bg-purple-500 rounded-full absolute
                      -left-1.5 top-6"
            ></div>

            {/* Glow behind card */}
            <div
              className="absolute inset-0 bg-cyan-300/10 blur-2xl
                      pointer-events-none slow-glow -z-10"
            ></div>

            {/* Education card */}
            <div
              className="bg-white/5 px-5 sm:px-6 py-4 rounded-xl
                      text-[#D1D5DB] my-10 group
                      transition duration-300 hover:scale-105"
            >
              <div
                className="flex flex-col sm:flex-row
                        sm:items-start sm:justify-between
                        gap-4 sm:gap-6"
              >
                {/* Logo + details */}
                <div className="flex items-center gap-4">
                  <img
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${item.invert}`}
                    src={item.src}
                    alt={item.alt}
                  />

                  <div>
                    <h2 className="font-bold text-base sm:text-lg text-white/90">
                      {item.institution}
                    </h2>

                    <p
                      className="text-xs sm:text-sm font-semibold
                            group-hover:text-purple-300"
                    >
                      {item.course}
                    </p>

                    <p className="text-xs font-semibold mt-1">
                      {item.marks.type}:{" "}
                      <span className="font-medium text-white">
                        {item.marks.score}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Duration & status */}
                <div
                  className="flex sm:flex-col justify-between gap-2
                          text-xs sm:text-sm sm:text-right"
                >
                  <p
                    className="px-2 py-1 flex gap-2 items-center
                          bg-white/5 rounded-full w-fit"
                  >
                    <Calendar className="w-4 h-4" />
                    {item.duration}
                  </p>

                  {item.status && (
                    <p
                      className="group-hover:text-purple-400
                            text-center font-medium"
                    >
                      Status: {item.status}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
