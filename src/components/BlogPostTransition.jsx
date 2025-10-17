"use client";

import { motion } from "framer-motion";

export default function BlogPostTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 120,
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
}
