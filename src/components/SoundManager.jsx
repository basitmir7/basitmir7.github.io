import { useEffect } from "react";
import hoverMp3 from "../sounds/hover.mp3";

export default function SoundManager() {
  useEffect(() => {
    const hoverSound = new Audio(hoverMp3);
    hoverSound.volume = 0.15;

    const playSound = () => {
        console.log("Sound Played ==>")
      hoverSound.currentTime = 0;
      hoverSound.play().catch(() => {});
    };

    const elements = document.querySelectorAll(
      "button, a, .clickable"
    );

    elements.forEach((el) => {
      el.addEventListener("mouseenter", playSound);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", playSound);
      });
    };
  }, []);

  return null;
}