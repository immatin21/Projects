import { motion } from "framer-motion";

const AnimatedName = ({ text, gradients}) => {
  // Split words first, then split letters inside them
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // slow typewriting pace
        delayChildren: 0.3,
      },
    },
  };

  const child = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.15 },
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="visible"
      className="text-[72px] font-medium leading-tight flex flex-wrap font-serif italic"
    >
      {words.map((word, wIndex) => (
        <span key={wIndex} className="flex">
          {word.split("").map((char, cIndex) => (
            <motion.span
              key={cIndex}
              variants={child}
              className={`
                inline-block 
                bg-linear-to-r 
                ${gradients[wIndex].from} 
                ${gradients[wIndex].to} 
                bg-clip-text 
                text-transparent
              `}
            >
              {char}
            </motion.span>
          ))}
          {/* Space between words */}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </motion.h1>
  );
};

export default AnimatedName;
