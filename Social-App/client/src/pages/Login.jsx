import React from "react";
import { assets } from "../assets/assets";
import { Star } from "lucide-react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* {Backgroud Image} */}
      <img
        src={assets.bgImage}
        alt="backgroudImg"
        className="absolute top-0 object-cover left-0 w-full z-0 h-full "
      />

      {/* {left side : branding} */}
      <div className="flex-1 flex flex-col justify-between items-start p-6 md:p-10 lg:p-40">
        <img src={assets.logo} alt="" className="object-contain h-12" />
        <div>
          <div className="flex items-center gap-3 mb-4 max-md:mt-10">
            <img src={assets.group_users} alt="" className="h-8 md:h-10" />
            <div className="">
              <div className="flex">
                {Array(5)
                  .fill()
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 md:size-4.5 text-transparent fill-amber-500"
                    />
                  ))}
              </div>
              <p>Used by 12k+ developers</p>
            </div>
          </div>
          <h1 className="text-3xl md:text-6xl bg-gradient-to-r from-indigo-950 to-indigo-800 bg-clip-text text-transparent">More Than just friends truly connect</h1>
          <p className="text-xl md:text-3xl text-indigo-900 md:max-w-md max-w-72  ">connect with global community on pingup.</p>
        </div>
        <span className="md:h-10"></span>
      </div>
      {/* {right side : Login form} */}
      
      <div className="flex-1 flex justify-center items-center p-6 sm:p-10 ">
            <SignIn/>
      </div>

    </div>
  );
};

export default Login;
