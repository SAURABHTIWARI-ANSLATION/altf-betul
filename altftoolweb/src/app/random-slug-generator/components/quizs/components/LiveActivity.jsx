import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { quizzes, liveNames, liveCities } from "../data/quizzes.js";

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const timeAgo = () => {
  const opts = ["just now", "1 min ago", "2 min ago", "just now", "seconds ago"];
  return rand(opts);
};

// Pops up "Sophia from London just finished ..." toasts to create FOMO.
export default function LiveActivity() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timer;
    const push = () => {
      const quiz = rand(quizzes);
      setToast({
        id: Date.now(),
        name: rand(liveNames),
        city: rand(liveCities),
        quiz,
        when: timeAgo(),
        verb: Math.random() > 0.5 ? "just finished" : "started",
      });
      // hide after a bit, then schedule next
      timer = setTimeout(() => {
        setToast(null);
        timer = setTimeout(push, 2500 + Math.random() * 3500);
      }, 4200);
    };
    timer = setTimeout(push, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-[90vw]">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="glass rounded-2xl pl-3 pr-4 py-3 flex items-center gap-3 shadow-2xl border border-white/15"
          >
            <div
              className={`w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br ${toast.quiz.color} flex items-center justify-center text-xl`}
            >
              {toast.quiz.emoji}
            </div>
            <div className="text-sm leading-tight">
              <p className="text-white">
                <span className="font-bold">{toast.name}</span>
                <span className="text-white/50"> from {toast.city}</span>
              </p>
              <p className="text-white/70">
                {toast.verb}{" "}
                <span className="font-semibold text-cyan-300">
                  {toast.quiz.title}
                </span>
              </p>
              <p className="text-[11px] text-white/40">{toast.when}</p>
            </div>
            <span className="ml-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
