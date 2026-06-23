export const fadeUp = {
    initial: {
      opacity: 0,
      y: 100,
      filter: "blur(8px)",
    },
    whileInView: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
    viewport: {
      once: false,
      amount: 0.2,
    },
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  };