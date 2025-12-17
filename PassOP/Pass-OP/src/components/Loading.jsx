import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/90">
      <div className="flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-green-400 text-sm tracking-wide">
          Loading PassOP...
        </p>
      </div>
    </div>
  );
};

export default Loading;
