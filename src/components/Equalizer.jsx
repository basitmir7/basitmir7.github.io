import { easeInOut } from "motion-utils";
import { useState } from "react";
import { BiEqualizer } from "react-icons/bi";
import { useSound } from "../context/SoundContext";

function EqualizerToggle(props) {
  const { size = 20, onClick, style } = props || {};

  const { isSoundEnabled, setIsSoundEnabled } = useSound();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setIsSoundEnabled((prev) => !prev);

    if (onClick) {
      onClick();
    }
  };

  return (
    <div
  style={{
    position: "relative",
    display: "inline-flex",
  }}
  onMouseEnter={() => setShowTooltip(true)}
  onMouseLeave={() => setShowTooltip(false)}
>
  <BiEqualizer
    size={size}
    onClick={handleClick}
    style={{
      cursor: "pointer",
      opacity: isSoundEnabled ? 1 : 0.5,
      ...style,
    }}
  />

  <span
    style={{
      position: "absolute",
      fontSize:"10px",
      bottom: "-25px",
      left: "50%",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      fontFamily:"var(--f-mono)",

      opacity: showTooltip ? 1 : 0,
      transform: showTooltip
        ? "translateX(-50%) translateY(0)"
        : "translateX(-50%) translateY(-8px)",

      transition: "opacity 0.3s ease, transform 0.3s ease",
    }}
  >
    {isSoundEnabled ? "Disable sound" : "Enable sound"}
  </span>
</div>
  );
}

export default EqualizerToggle;