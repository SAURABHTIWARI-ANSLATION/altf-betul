import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatCount } from "../utils/format.js";
import { completedCount } from "../utils/progress.js";

// fallback background image per category
const CATEGORY_IMAGE = {
  Personality: "/random-slug-generator/quizs/images/personality.jpg",
  Trivia: "/random-slug-generator/quizs/images/trivia.jpg",
  Love: "/random-slug-generator/quizs/images/love.jpg",
};

function hasEmail() {
  try {
    return !!localStorage.getItem("quizverse_user");
  } catch {
    return false;
  }
}

export default function QuizCard({ quiz, index, onStart }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [isFreePlay, setIsFreePlay] = useState(false);
  const [requiresEmail, setRequiresEmail] = useState(false);

  // prefer the quiz's own topic image, fall back to category image
  const bgImage = quiz.image || CATEGORY_IMAGE[quiz.category] || CATEGORY_IMAGE.Personality;

  useEffect(() => {
    const emailKnown = hasEmail();
    const completed = completedCount();
    setIsFreePlay(!emailKnown && completed < 1);
    setRequiresEmail(!emailKnown && completed >= 1);
    setHydrated(true);
  }, []);

  // fluctuating live player count for FOMO
  const [playing, setPlaying] = useState(quiz.playing || 80);
  useEffect(() => {
    const id = setInterval(() => {
      setPlaying((p) => Math.max(20, p + Math.floor((Math.random() - 0.45) * 12)));
    }, 2400 + index * 200);
    return () => clearInterval(id);
  }, [index]);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(12px) scale(1.02)`
    );
  };

  const reset = () => setTransform("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="perspective"
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={() => onStart(quiz)}
        className="card-3d preserve-3d cursor-pointer rounded-3xl p-6 h-full relative overflow-hidden group border border-white/10"
        style={{ transform }}
      >
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-125 transition-transform duration-[1200ms] ease-out"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        {/* readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0912] via-[#0b0912]/85 to-[#0b0912]/40" />
        <div className="absolute inset-0 bg-[#0b0912]/30 group-hover:bg-[#0b0912]/10 transition-colors" />

        {/* free / locked / badge ribbon */}
        <div className="absolute top-5 right-5 z-10 flex items-center gap-2">
          {hydrated && isFreePlay && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-400/15 border border-emerald-300/30 text-emerald-200">
              Free
            </span>
          )}
          {hydrated && requiresEmail && (
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/80 flex items-center gap-1">
              🔒 Unlock
            </span>
          )}
          {quiz.badge && (
            <span className="text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/8 backdrop-blur border border-white/12 text-white/75">
              {quiz.badge.replace(/[^\w\s]/g, "").trim()}
            </span>
          )}
        </div>

        {/* glow gradient corner */}
        <div
          className={`absolute -top-20 -left-20 w-44 h-44 rounded-full bg-gradient-to-br ${quiz.color} opacity-20 blur-3xl group-hover:opacity-40 transition`}
        />

        <div className="relative z-10" style={{ transform: "translateZ(36px)" }}>
          <div
            className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${quiz.color} text-2xl shadow-lg mb-5 opacity-95`}
          >
            {quiz.emoji}
          </div>

          <span className="block text-[11px] font-medium uppercase tracking-wider text-white/55 mb-2">
            {quiz.category} · {quiz.questions.length} questions
          </span>

          <h3 className="font-fun text-xl font-semibold tracking-tight mb-2 leading-snug drop-shadow">
            {quiz.title}
          </h3>
          <p className="text-white/70 text-sm mb-5 font-light leading-relaxed">
            {quiz.desc}
          </p>

          {/* live social proof */}
          <div className="flex items-center gap-3 mb-4 text-xs">
            <span className="flex items-center gap-1.5 text-green-300 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {playing} now
            </span>
            <span className="text-white/40">
              {formatCount(quiz.taken || 0)} played
            </span>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-white/90 group-hover:gap-3 transition-all border-b border-white/20 group-hover:border-white/60 pb-0.5">
            {isFreePlay ? "Play free" : "Take this quiz"} <span>→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
