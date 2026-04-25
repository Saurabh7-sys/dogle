"use client";

import { useEffect, useRef } from "react";

export default function BarkPlayer() {
  const hasBarked = useRef(false);

  useEffect(() => {
    // Only bark once per session so we don't annoy them on every page navigation
    if (sessionStorage.getItem("hasBarked")) return;

    const playBark = () => {
      if (!hasBarked.current) {
        console.log("🐶 Attempting to play bark sound...");
        // Using local sound file to prevent AdBlock/CORS issues
        const audio = new Audio("/bark.ogg");
        audio.volume = 0.4; // 40% volume so it's a pleasant surprise, not a jump scare
        
        audio.play().then(() => {
          hasBarked.current = true;
          sessionStorage.setItem("hasBarked", "true");
        }).catch((err) => {
          // If the browser still blocks it, we just ignore the error
          console.log("Bark suppressed by browser:", err);
        });
      }
      
      // Remove listeners after first interaction
      window.removeEventListener("click", playBark);
      window.removeEventListener("scroll", playBark);
      window.removeEventListener("keydown", playBark);
    };

    // Browsers block audio until the user interacts with the page (click, scroll, keypress)
    // We listen for the very first interaction to trigger the bark.
    window.addEventListener("click", playBark, { once: true });
    window.addEventListener("scroll", playBark, { once: true });
    window.addEventListener("keydown", playBark, { once: true });

    return () => {
      window.removeEventListener("click", playBark);
      window.removeEventListener("scroll", playBark);
      window.removeEventListener("keydown", playBark);
    };
  }, []);

  return null;
}
