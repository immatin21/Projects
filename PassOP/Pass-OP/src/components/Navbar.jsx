import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null;

  return (
    <nav className="bg-slate-900 opacity-80">
      <div className="container mx-auto px-5 text-white flex justify-between items-center py-4">
        <div className="logo font-bold text-2xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP&gt;</span>
        </div>

        {!isAuthenticated ? (
          <button
            onClick={() => loginWithRedirect({ connection: "github" })}
            className="flex gap-2 cursor-pointer hover:scale-105 items-center bg-gray-700 hover:bg-gray-900 px-3 py-1 rounded-lg ring-1 ring-white/20"
          >
            <img className="invert" width={20} src="/icons/github.svg" alt="GitHub" />
            <span>Login</span>
          </button>
        ) : (
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
