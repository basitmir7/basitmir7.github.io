import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaAws,
  FaDocker,
  FaPython,
} from "react-icons/fa";

import {
  SiMysql,
  SiGooglecloud,
} from "react-icons/si";

export default function TechOrbit() {
  const { scrollYProgress } = useScroll();

  const rotateClockwise = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 360]
  );

  const rotateCounterClockwise = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -360]
  );

  const orbit1Icons = [
    <FaReact />,
    <FaNodeJs />,
    <FaPython />,
    <SiMysql />,
  ];

  const orbit2Icons = [
    <FaAws />,
    <FaDocker />,
    <FaGitAlt />,
    <SiGooglecloud />,
  ];

  return (
    <div className="tech-orbit">
      {/* INNER ORBIT */}
      <motion.div
        className="orbit orbit-1"
        style={{ rotate: rotateClockwise }}
        
      >
        {orbit1Icons.map((icon, index) => {
          const angle = (360 / orbit1Icons.length) * index;

          return (
            <div
              key={index}
              className="icon"
              style={{
                transform: `rotate(${angle}deg) translateY(-300px) rotate(-${angle}deg)`,
              }}
            >
              {icon}
            </div>
          );
        })}
      </motion.div>

      {/* OUTER ORBIT */}
      <motion.div
        className="orbit orbit-2"
        style={{ rotate: rotateCounterClockwise }}
      >
        {orbit2Icons.map((icon, index) => {
          const angle = (360 / orbit2Icons.length) * index;

          return (
            <div
              key={index}
              className="icon"
              style={{
                transform: `rotate(${angle}deg) translateY(-450px) rotate(-${angle}deg)`,
              }}
            >
              {icon}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}