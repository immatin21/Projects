import { Info, MenuIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const scrollToID = (id) => {
    const element = document.getElementById(id)

    if(!element) return

    element.scrollIntoView({
      block : "start",
      behavior : "smooth"
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="text-white">
        <nav
          className={`flex justify-between items-center py-5 px-6 md:px-24 transition-all duration-300 w-full z-9999 fixed top-0 ${
            isScroll
              ? "bg-black/30 to-transparent backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          <div className="text-2xl md:text-3xl font-bold uppercase">
            <a href="#home">Portfolio</a>
          </div>

          <div className="flex gap-2 md:gap-5">
          <motion.button
            animate={isOpen ? { width: 48, paddingLeft: 0, paddingRight: 0, gap : 0 } : { width: 110, paddingLeft: 12, paddingRight: 12  }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(!isOpen)}
            className="border cursor-pointer border-white/20 flex items-center justify-center uppercase text-xs hover:scale-105 rounded-full px-4 py-2 gap-2 hover:border-white/50 hover:bg-white/5"
          >
            <motion.span
              animate={isOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: "auto"}}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap overflow-hidden uppercase text-xs"
            >
              Menu
            </motion.span>

            <motion.div
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.25 }}
              className="w-6 h-6 flex items-center justify-center "
            >
              
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              
            </motion.div>
          </motion.button>
          <button onClick={()=> scrollToID("terminal")} className="hover:text-gray-300 transition duration-100 cursor-pointer">
            <Info/>
          </button>
          </div>
        </nav>
      </div>
      {isOpen && (
        <>
          <div className="bg-black z-9998 fixed inset-0 backdrop-blur-xl transition-opacity">
            <div className="max-w-4xl p-24">
              <Menu onClose={() => setIsOpen(!isOpen)} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
