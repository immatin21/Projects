import { MenuIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
          className={`flex justify-between items-center py-5 px-24 transition-all duration-300 w-full z-[9999] fixed top-0 ${
            isScroll
              ? "bg-black/30 to-transparent backdrop-blur-md"
              : "bg-transparent"
          }`}
        >
          <div className="text-2xl md:text-3xl font-bold uppercase">
            <h1>Portfolio</h1>
          </div>
          <motion.button
            animate={isOpen ? { width: "86px"  } : { width: "110px" }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(!isOpen)}
            className="border border-white/20 flex items-center justify-center uppercase text-xs hover:scale-105 rounded-full px-4 py-2 gap-2 hover:border-white/50 hover:bg-white/5"
          >
            <motion.span
              animate={isOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap"
            >
              Menu
            </motion.span>

            <motion.div
              animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.25 }}
              className="w-6 h-6 flex items-center justify-center"
            >
              
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <MenuIcon className="w-6 h-6" />
                )}
              
            </motion.div>
          </motion.button>
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
