import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function AnimatedRings() {
  const innerTilt = useRef(null);

  useEffect(() => {
    // Stronger tilt motion for inner ring
    gsap.to(innerTilt.current, {
      y: -12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* SOFT BLUE–GREEN BACKGLOW */}
      <motion.div
        className="absolute inset-0 bg-blue-600/10 rounded-full blur-[80px]"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SVG RINGS */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          {/* Softer Blue-Green Gradient */}
          <linearGradient
            id="softBlueGreen"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2C7FFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#1EC6A7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0FA3B1" stopOpacity="0.6" />
          </linearGradient>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* OUTER RING — Soft pulse, very subtle glow */}
        <motion.path
          d="
            M40,100 C40,60 80,40 100,40 
            C140,40 160,80 160,100 
            C160,140 120,160 100,160 
            C60,160 40,120 40,100"
          fill="none"
          stroke="url(#softBlueGreen)"
          strokeWidth="11"
          strokeLinecap="round"
          filter="url(#softGlow)"
          animate={{
            opacity: [0.9, 1, 0.9],
            strokeWidth: [9, 12, 9],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* INNER RING — bigger tilt, better spacing */}
        <g ref={innerTilt}>
          <path
            d="
              M58,100 C58,78 82,63 100,63
              C126,63 142,92 142,100 
              C142,122 120,137 100,137
              C74,137 58,112 58,100"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      </motion.svg>

      {/* STATIC ICONS ON RING WITH FLOAT ANIMATION */}
      {/* Parent wrapper to position icons in ring coordinates */}
      <div className="absolute inset-0 pointer-events-none">
        {/* ICON 1 — </> */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[16%] left-[30%] -translate-x-1/2 
                     w-14 h-14 bg-white/10 backdrop-blur-md rounded-xl
                     flex items-center justify-center border border-white/15"
        >
          <svg
            width="26"
            height="26"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-cyan-300 dark:text-white/80"
          >
            <path d="m16 18 6-6-6-6"></path>
            <path d="m8 6-6 6 6 6"></path>
          </svg>
        </motion.div>

        {/* ICON 2 — Original Internet Globe Icon (matching your screenshot) */}
        <motion.div
          animate={{ y: [-8, 4, -8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[65%] right-[15%] -translate-y-1/2
                     w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl
                     flex items-center justify-center border border-white/15"
        >
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
            className="lucide lucide-globe text-cyan-300 dark:text-white/70"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
        </motion.div>

        {/* ICON 3 — React Icon */}
        <motion.div
          animate={{ y: [-5, 7, -5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[18%] left-[30%] -translate-x-1/2
                     w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl
                     flex items-center justify-center border border-white/15"
        >
          <svg
            className="w-8 h-8 text-cyan-300 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M21.718 12c0-1.429-1.339-2.681-3.467-3.5.029-.18.077-.37.1-.545.217-2.058-.273-3.543-1.379-4.182-1.235-.714-2.983-.186-4.751 1.239C10.45 3.589 8.7 3.061 7.468 3.773c-1.107.639-1.6 2.124-1.379 4.182.018.175.067.365.095.545-2.127.819-3.466 2.071-3.466 3.5 0 1.429 1.339 2.681 3.466 3.5-.028.18-.077.37-.095.545-.218 2.058.272 3.543 1.379 4.182.376.213.803.322 1.235.316a5.987 5.987 0 0 0 3.514-1.56 5.992 5.992 0 0 0 3.515 1.56 2.44 2.44 0 0 0 1.236-.316c1.106-.639 1.6-2.124 1.379-4.182-.019-.175-.067-.365-.1-.545 2.132-.819 3.471-2.071 3.471-3.5Zm-6.01-7.548a1.5 1.5 0 0 1 .76.187c.733.424 1.055 1.593.884 3.212-.012.106-.043.222-.058.33-.841-.243-1.7-.418-2.57-.523a16.165 16.165 0 0 0-1.747-1.972 4.9 4.9 0 0 1 2.731-1.234Zm-7.917 8.781c.172.34.335.68.529 1.017.194.337.395.656.6.969a14.09 14.09 0 0 1-1.607-.376 14.38 14.38 0 0 1 .478-1.61Zm-.479-4.076a14.085 14.085 0 0 1 1.607-.376c-.205.313-.405.634-.6.969-.195.335-.357.677-.529 1.017-.19-.527-.35-1.064-.478-1.61ZM8.3 12a19.32 19.32 0 0 1 .888-1.75c.33-.568.69-1.118 1.076-1.65.619-.061 1.27-.1 1.954-.1.684 0 1.333.035 1.952.1a19.63 19.63 0 0 1 1.079 1.654c.325.567.621 1.15.887 1.746a18.869 18.869 0 0 1-1.953 3.403 19.218 19.218 0 0 1-3.931 0 20.169 20.169 0 0 1-1.066-1.653A19.324 19.324 0 0 1 8.3 12Zm7.816 2.25c.2-.337.358-.677.53-1.017.191.527.35 1.065.478 1.611a14.48 14.48 0 0 1-1.607.376c.202-.314.404-.635.597-.97h.002Zm.53-3.483c-.172-.34-.335-.68-.53-1.017a20.214 20.214 0 0 0-.6-.97c.542.095 1.078.22 1.606.376a14.111 14.111 0 0 1-.478 1.611h.002ZM12.217 6.34c.4.375.777.773 1.13 1.193-.37-.02-.746-.033-1.129-.033s-.76.013-1.131.033c.353-.42.73-.817 1.13-1.193Zm-4.249-1.7a1.5 1.5 0 0 1 .76-.187 4.9 4.9 0 0 1 2.729 1.233A16.253 16.253 0 0 0 9.71 7.658c-.87.105-1.728.28-2.569.524-.015-.109-.047-.225-.058-.331-.171-1.619.151-2.787.885-3.211ZM3.718 12c0-.9.974-1.83 2.645-2.506.218.857.504 1.695.856 2.506-.352.811-.638 1.65-.856 2.506C4.692 13.83 3.718 12.9 3.718 12Zm4.25 7.361c-.734-.423-1.056-1.593-.885-3.212.011-.106.043-.222.058-.331.84.243 1.697.418 2.564.524a16.37 16.37 0 0 0 1.757 1.982c-1.421 1.109-2.714 1.488-3.494 1.037Zm3.11-2.895c.374.021.753.034 1.14.034.387 0 .765-.013 1.139-.034a14.4 14.4 0 0 1-1.14 1.215 14.248 14.248 0 0 1-1.139-1.215Zm5.39 2.895c-.782.451-2.075.072-3.5-1.038a16.248 16.248 0 0 0 1.757-1.981 16.41 16.41 0 0 0 2.565-.523c.015.108.046.224.058.33.175 1.619-.148 2.789-.88 3.212Zm1.6-4.854A16.563 16.563 0 0 0 17.216 12c.352-.812.638-1.65.856-2.507 1.671.677 2.646 1.607 2.646 2.507 0 .9-.975 1.83-2.646 2.507h-.004Z" />
            <path d="M12.215 13.773a1.792 1.792 0 1 0-1.786-1.8v.006a1.787 1.787 0 0 0 1.786 1.794Z" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
