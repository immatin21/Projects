import React from "react";
import { motion } from "framer-motion";

const menuItems = [
  { index: "01", label: "About", link: "#about" },
  { index: "02", label: "Skills", link: "#skills" },
  { index: "03", label: "Projects", link: "#projects" },
  { index: "04", label: "Education", link: "#education" },
  { index: "05", label: "Contact", link: "#contact" },
];

const listContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const Menu = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.8 }}
      className=" z-[9999] flex justify-center items-center w-full "
    >
      <motion.ul
        variants={listContainer}
        initial="hidden"
        animate="visible"
        className="text-white flex justify-center items-start flex-col gap-6"   
      >
        {menuItems.map((item) => (
          <motion.li
            variants={listContainer}
            initial="hidden"
            animate="visible"
            key={item.index}
          >
            <a
              onClick={onClose}
              href={item.link}
              className="flex items-center justify-center gap-4 group"
            >
              <span className="text-gray-700 group-hover:text-purple-950 text-[20px]">
                {item.index}
              </span>
              <span className="text-[60px] text-gray-500 font-bold group-hover:text-white">
                {item.label}
              </span>
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default Menu;
