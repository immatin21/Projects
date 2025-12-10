import React from "react";
import Navbar from "./Navbar";
import LightRays from "./LightRays";

const HeroPage = () => {
  return (
    <div className="relative bg-black overflow-hidden min-h-screen">
      <div className="absolute top-0 left-0 -translate-x-[20%] -translate-y-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
      <div style={{ width: "100%", height: "auto", position: "relative" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <div
        className="absolute bottom-0 right-0 translate-x-[20%] translate-y-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] "
      ></div>
      <Navbar />
    </div>
  );
};

export default HeroPage;
