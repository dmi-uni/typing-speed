import { motion } from "framer-motion";
import { State } from "../hooks/useApp";
import { calculateAccuracy, calculateWPM } from "../utils";

function Results({
  state,
  total,
  errors,
  className = "",
}: {
  state: State;
  total: number;
  errors: number;
  className?: string;
}) {
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  if (state !== "finish") {
    return null;
  }

  return (
    <motion.ul className={`${className}`}>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className="title accent"
      >
        Results
      </motion.li>

      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        WPM: {calculateWPM(total, errors).toFixed(1)}
      </motion.li>

      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0.75 }}
      >
        Accuracy: {calculateAccuracy(total, errors).toFixed(2) + "%"}
      </motion.li>

      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className="errors error"
      >
        Errors: {errors}
      </motion.li>
    </motion.ul>
  );
}

export default Results;
