import React from "react";
// bg-[#9977f3]
const Navbar = () => {
  return (
    <nav className="bg-slate-900 opacity-70 sticky top-0" >
      <div className="container mx-auto px-5  text-white flex justify-between items-center py-4 h-15 ">
        <div className="logo font-bold text-white text-2xl ">
        <span className="text-green-500">&lt;</span>
            Pass
        <span className="text-green-500">OP&gt;</span>
        </div>
        {/* <ul>
          <li className="flex gap-4 text-md">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="/about">
              About
            </a>
            <a className="hover:font-bold" href="/contact">
              Contact
            </a>
          </li>
        </ul> */}
        <div className="git flex gap-2 bg-gray-700 hover:bg-gray-950 p-1 px-2 justify-between items-center rounded-lg ring-white ring-1 ">
          <img className="invert py-1 " width={20} md:width={30} src="icons/github.svg" alt="" />
          <span>GitHub</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
