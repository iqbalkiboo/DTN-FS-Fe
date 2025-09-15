import { motion } from "framer-motion";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-6 max-w-xl w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
