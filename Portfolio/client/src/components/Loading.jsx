import { useEffect, useState } from "react";
import { LifeLine } from "react-loading-indicators";

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const MIN_TIME = 800; 

    const handleLoad = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(MIN_TIME - elapsed, 0);

      setTimeout(() => {
        setLoading(false);
      }, remaining);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-black flex items-center justify-center">
      <LifeLine color="#00ffdd" size="large" text="Just a moment..." textColor="#9b9b9b" />
    </div>
  );
};

export default Loading;
