import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Navbar = () => {
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  
  return (
    <nav className="bg-slate-900 opacity-70" >
      <div className="container mx-auto px-5  text-white flex justify-between items-center py-4 h-15 cursor-pointer">
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
        <div className="git flex gap-2 bg-gray-700 hover:bg-gray-950 p-1 px-2 justify-between items-center rounded-lg ring-white ring-1 " onClick={() => loginWithRedirect({  connection: "github"})}>
          
          <img className="invert py-1 " width={20} md:width={30} src="icons/github.svg" alt="" />
          <span>GitHub</span>
        </div>
      </div>
    </nav>
//      <nav className="navbar">
//       <div className="nav-left">
//         <h1>My App</h1>
//       </div>
//       <div className="nav-right">
//         {isLoading && <p>Loading...</p>}

//         {!isAuthenticated && !isLoading && (
//           <button onClick={() => loginWithRedirect({  connection: "github"
// })}>Login with GitHub</button>
//         )}

//         {isAuthenticated && (
//           <>
//             <span>Hello, {user.name}</span>
//             <img
//               src={user.picture}
//               alt={user.name}
//               style={{ width: "30px", borderRadius: "50%", marginLeft: "10px" }}
//             />
//             <button
//               onClick={() => logout({ returnTo: window.location.origin })}
//               style={{ marginLeft: "10px" }}
//             >
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
  );
};

export default Navbar;
