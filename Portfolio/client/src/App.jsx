import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HeroPage from "./components/HeroPage";
import Loading from "./components/Loading";
import Menu from "./components/Menu";

function App() {
  // const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false)
  //   }, 6000);

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [])

  return (
    <div className="main-page h-[2000px]">
      <HeroPage />
    </div>
  );
}

export default App;
