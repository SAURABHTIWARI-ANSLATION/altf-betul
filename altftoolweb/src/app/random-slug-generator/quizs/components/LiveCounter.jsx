import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// A live, fluctuating "X people online now" pill.
export default function LiveCounter({ base = 4200, swing = 90 }) {
  const [count, setCount] = useState(base);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => {
        const delta = Math.floor((Math.random() - 0.45) * swing);
        const next = c + delta;
        // keep it near the base range
        return Math.max(base - 400, Math.min(base + 600, next));
      });
    }, 1800);
    return () => clearInterval(id);
  }, [base, swing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
      </span>
      <span className="tabular-nums text-green-300">
        {count.toLocaleString()}
      </span>
      <span className="text-white/70">playing right now</span>
    </motion.div>
  );
}
