import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

export default function BackgroundAnimation() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll();

  const scrollY1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const scrollY3 = useTransform(scrollYProgress, [0, 1], [0, -700]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.08;
      const y = (e.clientY - window.innerHeight / 2) * 0.08;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="background-animation">
      <motion.div
        className="orb orb1"
        style={{
          x: mouseX,
          y: scrollY1,
        }}
      />

      <motion.div
        className="orb orb2"
        style={{
          x: useTransform(mouseX, (v) => v * -0.6),
          y: scrollY2,
        }}
      />

      <motion.div
        className="orb orb3"
        style={{
          x: useTransform(mouseX, (v) => v * 0.4),
          y: scrollY3,
        }}
      />
    </div>
  );
}