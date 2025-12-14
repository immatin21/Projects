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

function App() {
  return (
    <div className="main-page h-[2000px]">
      <HeroPage />
      <About/>
      <Skills/>
      <HelpTerminal/>
      <Card/>
      <Contact/>
    </div>
  );
}

export default App;
