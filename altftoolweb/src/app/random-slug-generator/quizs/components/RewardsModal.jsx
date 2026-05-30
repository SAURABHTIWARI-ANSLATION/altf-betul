import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  REWARD_TIERS,
  completedCount,
  nextTier,
} from "../utils/progress.js";

export default function RewardsModal({ open, onClose, onBrowse }) {
  const count = completedCount();
  const next = nextTier(count);
  const [copied, setCopied] = useState("");

  const copy = (code) => {
    try {
      navigator.clipboard.writeText(code);
    } catch {}
    setCopied(code);
    setTimeout(() => setCopied(""), 1600);
  };

  const maxCount = REWARD_TIERS[REWARD_TIERS.length - 1].count;
  const pct = Math.min(100, (count / maxCount) * 100);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="relative w-full max-w-lg glass rounded-3xl border border-white/15 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/30 backdrop-blur hover:bg-black/50 flex items-center justify-center text-white/80"
            >
              ✕
            </button>

            {/* image header */}
            <div className="relative h-32 rounded-t-3xl overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(/random-slug-generator/quizs/images/rewards.jpg)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0912] via-[#0b0912]/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 text-center">
                <div className="text-3xl mb-1">🎁</div>
                <h2 className="font-fun text-2xl font-semibold tracking-tightest">
                  Your Rewards
                </h2>
              </div>
            </div>

            <div className="p-7 md:p-8 pt-5">
            <p className="text-white/55 text-sm text-center mb-6">
              Complete more quizzes to unlock bigger discounts.
            </p>

            {/* progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-white/50 mb-2">
                <span>{count} quizzes completed</span>
                {next ? (
                  <span className="text-emerald-300 font-medium">
                    {next.count - count} more → {next.percent}% off
                  </span>
                ) : (
                  <span className="text-emerald-300 font-medium">
                    Max tier reached! 🏆
                  </span>
                )}
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#e7b08a] via-[#c9a8e9] to-[#7fd4c9]"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </div>

            {/* tiers */}
            <div className="space-y-3">
              {REWARD_TIERS.map((t) => {
                const unlocked = count >= t.count;
                return (
                  <div
                    key={t.code}
                    className={`rounded-2xl p-4 border flex items-center gap-4 transition ${
                      unlocked
                        ? "bg-emerald-400/10 border-emerald-300/30"
                        : "glass border-white/10 opacity-70"
                    }`}
                  >
                    <div
                      className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-fun font-bold text-sm ${
                        unlocked
                          ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-[#0b0912]"
                          : "bg-white/10 text-white/50"
                      }`}
                    >
                      {t.percent}%
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{t.label}</p>
                      <p className="text-xs text-white/50">
                        Complete {t.count} quiz{t.count > 1 ? "zes" : ""}
                      </p>
                    </div>

                    {unlocked ? (
                      <button
                        onClick={() => copy(t.code)}
                        className="shrink-0 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-dashed border-white/30 text-xs font-mono font-semibold transition"
                      >
                        {copied === t.code ? "Copied!" : t.code}
                      </button>
                    ) : (
                      <span className="shrink-0 text-white/40 text-lg">🔒</span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                onClose();
                onBrowse?.();
              }}
              className="w-full mt-6 py-3.5 rounded-2xl font-medium bg-white text-[#0b0912] hover:bg-white/90 transition"
            >
              {count >= REWARD_TIERS[REWARD_TIERS.length - 1].count
                ? "Browse quizzes"
                : "Complete a quiz to unlock more →"}
            </button>

            <p className="text-[11px] text-white/35 text-center mt-3">
              Codes apply to our partner store at checkout. One use per code.
            </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
