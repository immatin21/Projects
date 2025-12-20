import { Dot } from "lucide-react";
import GradientText from "../Animations/GradientText";
import React from "react";

const connectLinks = [
  {
    link: "https://github.com/immatin21",
    title: "Github",
    icon: "/src/Icons/GreyGithub.svg",
  },
  {
    link: "https://wa.me/916354085535",
    title: "WhatsApp",
    icon: "/src/Icons/GreyWhatsapp.svg",
  },
  {
    link: "https://www.linkedin.com/in/matin-mondal-631575286",
    title: "LinkedIn",
    icon: "/src/Icons/GreyLinkedin.svg",
  },
  {
    link: "mailto:mondalmatin04@gmail.com",
    title: "Email",
    icon: "/src/Icons/GreyGmail.svg",
  },
];

const Footer = () => {
  return (
    <section className="bg-black border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl ">
        {/* Details */}
        <div className="grid md:grid-cols-3 md:gap-0 gap-10 md:m-0 m-5 pb-5">
          {/* Col 1 */}

          <div className="font-bold text-2xl">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
              animationSpeed={3}
              showBorder={false}
              className="font-serif"
            >
              Matin Mondal
            </GradientText>
            <p className="text-gray-400 text-sm font-normal pt-3">
              Creating digital experiences where thoughtful design meets
              reliable code.
            </p>
          </div>

          {/* Col 2 */}
          <div className="text-white">
            <h4 className="font-semibold text-lg md:pl-3">Quick Links</h4>

            <ul className="pt-3">
              <li className="flex justify-start items-center text-gray-400 text-sm group">
                <Dot className="w-7 h-7 text-purple-900 group-hover:text-purple-600" />
                <a href="#about" className="group-hover:text-purple-400">About</a>
              </li>
              <li className="flex justify-start items-center text-gray-400 text-sm group">
                <Dot className="w-7 h-7 text-purple-900 group-hover:text-purple-600" />
                <a className="group-hover:text-purple-400" href="#skills">Skills</a>
              </li>
              <li className="flex justify-start items-center text-gray-400 text-sm group">
                <Dot className="w-7 h-7 text-purple-900 group-hover:text-purple-600" />
                <a className="group-hover:text-purple-400" href="#projects">Projects</a>
              </li>
              <li className="flex justify-start items-center text-gray-400 text-sm group">
                <Dot className="w-7 h-7 text-purple-900 group-hover:text-purple-600" />
                <a className="group-hover:text-purple-400" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          {/* Col 3 */}
          <div className="flex gap-4 flex-col">
            <h4 className="text-white font-semibold text-lg">Connect</h4>

            <div className="flex flex-wrap gap-3">
              {connectLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.title}
                  className="group p-2.5 rounded-xl bg-white/5 hover:bg-white/10
             border border-white/5 hover:border-purple-500/30
             transition-all duration-300"
                >
                  <span
                    className="block w-5 h-5 bg-gray-400 group-hover:bg-purple-400 transition-colors"
                    style={{
                      WebkitMask: `url(${item.icon}) no-repeat center`,
                      mask: `url(${item.icon}) no-repeat center`,
                      WebkitMaskSize: "contain",
                      maskSize: "contain",
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mx-auto max-w-6xl border-t border-white/10">
          <div className="flex justify-center items-center flex-col gap-2 pt-8">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Matin Mondal. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Built with React, Javascript and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
