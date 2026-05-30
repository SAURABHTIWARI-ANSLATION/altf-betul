import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { completedCount, nextTier, currentTier } from "../utils/progress.js";

export default function Header({ onHome, onOpenRewards, onBrowse }) {
  const [scrolled, setScrolled] = useState(false);
  const [count, setCount] = useState(completedCount());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onProg = () => setCount(completedCount());
    window.addEventListener("scroll", onScroll);
    window.addEventListener("quizverse:progress", onProg);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("quizverse:progress", onProg);
    };
  }, []);

  const tier = currentTier(count);
  const next = nextTier(count);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 backdrop-blur-xl bg-[#0b0912]/70 border-b border-white/10"
          : "py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
        {/* logo */}
        <button
          onClick={onHome}
          className="flex items-center gap-2.5 group"
          aria-label="QuizVerse home"
        >
          <span className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#e7b08a] via-[#c9a8e9] to-[#7fd4c9] shadow-lg group-hover:scale-105 transition">
            <span className="text-lg font-bold text-[#0b0912]">Q</span>
          </span>
          <span className="font-fun text-lg font-semibold tracking-tightest">
            QuizVerse
          </span>
        </button>

        {/* center nav (desktop) */}
        <nav className="hidden md:flex items-center gap-7 text-sm text-white/60">
          <button onClick={onBrowse} className="hover:text-white transition">
            Quizzes
          </button>
          <button onClick={onOpenRewards} className="hover:text-white transition">
            Rewards
          </button>
          <a href="#how" className="hover:text-white transition">
            How it works
          </a>
        </nav>

        {/* rewards pill */}
        <button
          onClick={onOpenRewards}
          className="relative flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-full glass border border-white/15 hover:bg-white/10 transition group"
        >
          <span className="text-base">🎁</span>
          <span className="text-sm font-medium">
            {tier ? (
              <span className="text-emerald-300">{tier.percent}% off</span>
            ) : (
              "Rewards"
            )}
          </span>
          {next && (
            <span className="hidden sm:inline text-[11px] text-white/45">
              · {next.count - count} to {next.percent}%
            </span>
          )}
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-400 text-[#0b0912] text-[11px] font-bold flex items-center justify-center">
              {count}
            </span>
          )}
        </button>
      </div>
    </motion.header>
  );
}
