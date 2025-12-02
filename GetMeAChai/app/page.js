"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
const { data: session , status} = useSession();
const isLoggedIn = status === "authenticated";
  return (
    <div className="">
      <div className="h-[25vh] md:h-[40vh] flex justify-center items-center text-white flex-col gap-4 my-7 md:px-0 px-5">
        <div className="font-bold flex justify-center items-center gap-2 text-4xl">
          Buy Me a Chai
          <span className="invetImg">
            <img width={90} src="./tea.gif" alt="logo" />
          </span>
        </div>
        <p> A crowdfunding platform for creators to fund their projects.</p>
        <div className="buttons justify-center items-center flex gap-2">
          <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex gap-2">
            <Link href={"/login"}>
              <button className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Start Now
                </span>
              </button>
            </Link>
            <Link href={"/about"}>
              <button className="cursor-pointer relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  Read More..
                </span>
              </button>
            </Link>
          </div>
          {!isLoggedIn && (
            <Link href="/login">
          <button className="px-6 py-3 md:mb-0 mb-10 text-md font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition duration-300">
            Create Your Account
          </button>
        </Link>)  
          }
          </div>
        </div>
      </div>
      <div className="bg-white opacity-10 h-1"></div>

      <div className="container mx-auto text-white py-8 md:px-0 px-5">
        <h2 className="text-2xl md:text-3xl text-center font-bold my-8">
          Your Fans can buy you a Chai
        </h2>

        <div className="flex justify-around items-center gap-10 flex-wrap my-8">
          <div className="flex flex-col justify-center items-center space-y-2 px-5 md:py-10 rounded-2xl hover:border-1 border-gray-600 hover:ring-3 ring-gray-900 cursor-pointer">
            <span className="">
              <img
                className="bg-slate-500 rounded-full p-2 "
                width={85}
                src="./man.gif"
                alt="man"
              />
            </span>
            <p className="font-bold ">Fans want to help</p>
            <p>Your fans eager and exited to help you</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2 px-5 py-3 md:py-10 rounded-2xl hover:border-1 border-gray-600 hover:ring-3 ring-gray-900 cursor-pointer">
            <span className="">
              <img
                className="bg-slate-500 rounded-full p-2 "
                width={85}
                src="./coin.gif"
                alt="man"
              />
            </span>
            <p className="font-bold ">Fans want to contribute</p>
            <p>Your fans are willing to contribute financially</p>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2 px-5 md:py-10 rounded-2xl hover:border-1 border-gray-600 hover:ring-3 ring-gray-900 cursor-pointer">
            <span className="">
              <img
                className="bg-slate-500 rounded-full p-2 "
                width={85}
                src="./group.gif"
                alt="man"
              />
            </span>
            <p className="font-bold ">Fans want to collaborate</p>
            <p>Your fans are ready to collaborate with you</p>
          </div>
        </div>
      </div>

      <div className="bg-white opacity-10 h-1"></div>

      <div className="w-full mx-auto text-white flex flex-col justify-center items-center md:px-0 px-5 pb-20">
        <h2 className="text-3xl text-center font-bold my-7 md:my-15">
          Learn more about us
        </h2>

        <div className="w-full flex justify-center items-center">
          <iframe
            className="w-full max-w-[560px] aspect-video"
            src="https://www.youtube.com/embed/aeqbJ7aumdg?si=8G76GlV220bHPRN5"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}

