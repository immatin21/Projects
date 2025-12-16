import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HeroPage from "./components/HeroPage";
import Loading from "./components/Loading";
import Menu from "./components/Menu";
import About from "./components/About";
import Skills from "./components/Skills";
import HelpTerminal from "./components/HelpTerminal";
import Card from "./components/Card";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Education from "./components/Education";

function App() {
  return (
    <div className="main-page h-[2000px]">
      <HeroPage />
      <About/>
      <Skills/>
      <HelpTerminal/>
      <Card/>
      <Education/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default App;
