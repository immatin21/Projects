import { MenuIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Navbar = () => {

  const [isScroll, setIsScroll] = useState(false)

  useEffect(() => {
    
    const handleScroll = () => {
      if(window.scrollY > 10){
        setIsScroll(true)
      }else{
        setIsScroll(false)
      }
    }
    window.addEventListener('scroll',handleScroll)

    return () => {
      window.removeEventListener('scroll',handleScroll)
    }
  }, [])
  

  return (
    <>
      <div className="text-white">
        <nav className={`flex justify-between items-center py-5 px-24 transition-all duration-300 z-50 w-full fixed top-0 ${isScroll ? "bg-black/30 to-transparent backdrop-blur-md" : "bg-transparent"}`}>
          <div className="text-2xl md:text-3xl font-bold uppercase">
            <h1>Portfolio</h1>
          </div>
            <button className="border border-white/20 flex items-center justify-center uppercase text-xs rounded-full px-4 py-2 gap-2 hover:border-white/50 hover:bg-white/5">
            <span>Menu</span>
            <MenuIcon className="w-6 h-6" />
            </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;

  