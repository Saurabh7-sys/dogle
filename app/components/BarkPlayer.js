"use client";

import { useEffect, useRef } from "react";

export default function BarkPlayer() {
  const hasBarked = useRef(false);

  useEffect(() => {
    // Only bark once ever (localStorage) so we don't annoy returning users
    if (localStorage.getItem("hasBarked")) return;

    const playBark = () => {
      if (!hasBarked.current && !localStorage.getItem("hasBarked")) {
        hasBarked.current = true;
        localStorage.setItem("hasBarked", "true");
        
        console.log("🐶 Attempting to play cute puppy bark...");
        const audio = new Audio("/bark.mp3");
        audio.volume = 0.5;
        
        audio.play().then(() => {
          
          // Stop the bark after 5 seconds
          setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
          }, 5000);
          
          // Only remove listeners if playback actually succeeded
          window.removeEventListener("click", playBark);
          window.removeEventListener("touchstart", playBark);
          window.removeEventListener("keydown", playBark);
        }).catch((err) => {
          // If browser blocked it (e.g., scroll wasn't a valid gesture), keep listening!
          console.log("Bark suppressed by browser, waiting for better interaction:", err);
        });
      }
    };

    // Listeners without 'once: true' so they can retry if blocked
    window.addEventListener("click", playBark);
    window.addEventListener("touchstart", playBark);
    window.addEventListener("keydown", playBark);

    return () => {
      window.removeEventListener("click", playBark);
      window.removeEventListener("touchstart", playBark);
      window.removeEventListener("keydown", playBark);
    };
  }, []);

  return null;
}
