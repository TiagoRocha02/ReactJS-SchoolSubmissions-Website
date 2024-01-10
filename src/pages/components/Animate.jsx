import { motion } from "framer-motion";

function AnimatePage({ children }) {
  // eslint-disable-next-line
  const aniamtionConfig = {
    initial: { opacity: 0, x:100},
    animate: { opacity: 1 , x:0},
    exit: { opacity: 0, x: -100 },
  };

  const variants = {
    initial: {
      opacity: 0,
      y: 15,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.3,
        ease: [0.31, 1, 0.88, 1],
      },
    },
  }

  return (
    <motion.div variants={variants} initial="initial" animate="enter" exit="exit" transition={{duration: 1.2}}>
      {children}
    </motion.div>
  );
}

export default AnimatePage;
