"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setShowdropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(`/api/users/search?query=${query}`, {
          cache: "no-store",
        });
        if (!res.ok) return setResults([]);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search by 300ms
    const timeout = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black p-2 h-20 shadow-md ">
      <div className="mx-4 text-white flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center font-bold text-lg">
          GetMeaChai
          <span className="ml-1">
            <img width={40} src="/tea.gif" alt="logo" />
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 mx-6 ">
          <form className="relative w-1/4">
            <input
              type="search"
              placeholder="Search creators, projects, topics"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 pl-10 text-sm rounded-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {loading && <p className="mt-2 text-gray-500">Searching...</p>}

            <ul className="absolute w-full bg-gray-800 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg z-50">
              {results.map((user) => (
                <li
                  key={user._id}
                  className="p-2 hover:bg-gray-700 rounded cursor-pointer"
                >
                  <Link
                    href={`/${user.username}`}
                    onClick={() => setQuery("")} // clear search after clicking
                    className="flex flex-col"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-10 ">
                        <img className="rounded-4xl" src={user.ProfilePic} alt="profile" />
                      </span>
                      <div className="flex flex-col">
                        <span className="font-semibold text-white">
                          {user.name}
                        </span>
                        <span className="text-gray-400 text-sm">
                          @{user.username}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
              {results.length === 0 && query && !loading && (
                <li className="p-2 text-gray-400">No users found</li>
              )}
            </ul>

            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </form>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {!session && (
            <Link href="/login">
              <button
                //  onClick={() => setMobileMenu(false)}
                className="px-3 py-1 text-sm font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                Log In
              </button>
            </Link>
          )}
          {session && (
            <>
              <button
                onClick={() => setShowdropdown(!showdropdown)}
                onBlur={() => setTimeout(() => setShowdropdown(false), 200)}
                className="px-3 py-1 text-sm items-center font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                Welcome, {session.user.email.split("@")[0]} ☰
              </button>
              {showdropdown && (
                <div className="absolute top-16 right-6 w-40 bg-gray-800 rounded-lg shadow-lg">
                  <ul className="py-2 text-sm">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/${session.user.email.split("@")[0]}`}
                        className="block px-4 py-2 hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="w-full text-left px-4 py-2 hover:bg-gray-700"
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        {session && (
          <button
            onClick={() => setShowdropdown(!showdropdown)}
            onBlur={() => setTimeout(() => setShowdropdown(false), 200)}
            className="block md:hidden px-3 py-1 text-[12px] font-medium rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
          >
            Welcome, {session.user.email.split("@")[0]}
          </button>
        )}
        <button
          className="md:hidden text-gray-200 focus:outline-none"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 px-4 py-3 space-y-3">
          {/* Mobile Search */}
          <form className="relative">
            <input
              type="search"
              placeholder="Search creators, projects, topics"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Mobile search results dropdown */}
            {query && results.length > 0 && (
              <ul className="absolute w-full bg-gray-800 mt-1 rounded-md max-h-60 overflow-y-auto shadow-lg z-50">
                {results.map((user) => (
                  <li
                    key={user._id}
                    className="p-2 hover:bg-gray-700 rounded cursor-pointer"
                  >
                    <Link
                      href={`/${user.username}`}
                      onClick={() => {
                        setQuery(""); // clear search
                        setMobileMenu(false); // close mobile menu
                      }}
                      className="flex flex-col"
                    >
                      <div className="flex items-center gap-1">
                      <span className="w-5 ">
                        <img className="rounded-4xl" src={user.ProfilePic} alt="profile" />
                      </span>
                      <div className="flex flex-col">
                      <span className="font-semibold text-white">
                        {user.name}
                      </span>
                      <span className="text-gray-400 text-sm">
                        @{user.username}
                      </span>
                      </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </form>

          {!session && (
            <Link href="/login">
              <button
                className="w-full px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-purple-600 to-blue-500"
                onClick={() => setMobileMenu(false)}
              >
                Log In
              </button>
            </Link>
          )}
          {session && (
            <>
              <Link
                href="/dashboard"
                className="block w-full px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                onClick={() => setMobileMenu(false)}
              >
                Dashboard
              </Link>
              <Link
                href={`/${session.user.email.split("@")[0]}`}
                className="block w-full px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
                onClick={() => setMobileMenu(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setMobileMenu(false);
                  signOut({ callbackUrl: "/login" });
                }}
                className="w-full px-3 py-2 rounded-lg bg-purple-800 hover:bg-purple-900"
              >
                Log out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
