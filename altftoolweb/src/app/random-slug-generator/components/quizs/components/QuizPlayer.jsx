import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "./Confetti.jsx";
import EmailGate from "./EmailGate.jsx";
import { formatCount } from "../utils/format.js";
import { quizzes } from "../data/quizzes.js";
import {
  recordCompletion,
  currentTier,
  completedCount,
} from "../utils/progress.js";

const CATEGORY_IMAGE = {
  Personality: "/random-slug-generator/quizs/images/personality.jpg",
  Trivia: "/random-slug-generator/quizs/images/trivia.jpg",
  Love: "/random-slug-generator/quizs/images/love.jpg",
};

const quizImage = (quiz) => quiz.image || CATEGORY_IMAGE[quiz.category] || CATEGORY_IMAGE.Personality;

// has the user already given us their email in a previous session/quiz?
function getSavedLead() {
  try {
    const raw = localStorage.getItem("quizverse_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function QuizPlayer({ quiz, onExit, onPick }) {
  const [saved, setSaved] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState(0);
  const [unlocked, setUnlocked] = useState(true);
  const [lead, setLead] = useState(null); // captured {name, email}

  useEffect(() => {
    const savedLead = getSavedLead();
    const completed = completedCount();
    const gateRequired = !savedLead && completed >= 1;
    setSaved(savedLead);
    setLead(savedLead);
    setCompletedQuizzes(completed);
    setUnlocked(!gateRequired);
    setHydrated(true);
  }, []);

  const gateRequired = hydrated && !saved && completedQuizzes >= 1;

  const [step, setStep] = useState(0); // current question index
  const [answers, setAnswers] = useState([]); // selected per question
  const [selected, setSelected] = useState(null); // current selection (trivia feedback)
  const [finished, setFinished] = useState(false); // all questions answered

  // live "people on this quiz right now" — fluctuates for FOMO
  const [livePlayers, setLivePlayers] = useState(quiz.playing || 120);
  useEffect(() => {
    const id = setInterval(() => {
      setLivePlayers((p) => {
        const d = Math.floor((Math.random() - 0.45) * 14);
        return Math.max(40, p + d);
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const total = quiz.questions.length;
  const progress = ((finished ? total : step) / total) * 100;

  const choose = (optIndex, optObj) => {
    if (quiz.type === "trivia" && selected !== null) return; // lock after answer
    setSelected(optIndex);

    const record =
      quiz.type === "personality"
        ? optObj.key
        : { picked: optIndex, correct: quiz.questions[step].answer };

    const newAnswers = [...answers];
    newAnswers[step] = record;
    setAnswers(newAnswers);

    const delay = quiz.type === "trivia" ? 850 : 280;
    setTimeout(() => {
      if (step + 1 < total) {
        setStep(step + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, delay);
  };

  const result = useMemo(() => {
    if (!finished) return null;
    if (quiz.type === "personality") {
      const tally = {};
      answers.forEach((k) => {
        tally[k] = (tally[k] || 0) + 1;
      });
      const winner = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0];
      return { kind: "personality", data: quiz.results[winner] };
    } else {
      const score = answers.filter((a) => a.picked === a.correct).length;
      return { kind: "trivia", score, total };
    }
  }, [finished, answers, quiz, total]);

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setSelected(null);
    setFinished(false);
    const stillSaved = getSavedLead();
    const completed = completedCount();
    setUnlocked(!!stillSaved || completed < 1);
    setLead(stillSaved);
  };

  const scoreMsg = (score) => {
    const pct = score / total;
    if (pct === 1) return "Perfect score! You're a genius!";
    if (pct >= 0.7) return "Awesome work! So close to perfect!";
    if (pct >= 0.4) return "Not bad at all — keep going!";
    return "Room to grow — try again!";
  };

  const showResult = finished && unlocked && hydrated;
  const showGate = finished && !unlocked && hydrated;

  // record completion + detect a freshly-unlocked reward tier
  const [rewardJustUnlocked, setRewardJustUnlocked] = useState(null);
  useEffect(() => {
    if (showResult) {
      const before = currentTier();
      const newCount = recordCompletion(quiz.id);
      const after = currentTier(newCount);
      if (after && (!before || after.count > before.count)) {
        setRewardJustUnlocked(after);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showResult]);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8">
      <Confetti trigger={showResult ? quiz.id : null} />

      {/* top bar */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <button
          onClick={onExit}
          className="text-white/70 hover:text-white text-sm font-semibold flex items-center gap-2 transition"
        >
          ← All Quizzes
        </button>
        <span className="font-fun font-semibold flex items-center gap-2">
          <span>{quiz.title}</span>
        </span>
      </div>

      {/* FOMO live bar */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-3 text-xs">
        <span className="glass px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-green-300 tabular-nums">{livePlayers}</span>
          <span className="text-white/60">taking this now</span>
        </span>
        <span className="text-white/40">
          {formatCount(quiz.taken || 0)} completed
        </span>
      </div>

      {/* progress bar */}
      <div className="w-full max-w-2xl h-3 rounded-full bg-white/10 overflow-hidden mb-8">
        <motion.div
          className={`h-full bg-gradient-to-r ${quiz.color}`}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      <div className="w-full max-w-2xl perspective">
        <AnimatePresence mode="wait">
          {/* ---------- QUESTIONS ---------- */}
          {!finished && (
            <motion.div
              key={step}
              initial={{ opacity: 0, rotateY: 35, x: 80 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: -35, x: -80 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-3xl p-7 md:p-10 preserve-3d"
            >
              <span className="text-sm font-semibold text-white/50">
                Question {step + 1} of {total}
              </span>
              <h2 className="font-fun text-2xl md:text-3xl font-bold mt-2 mb-7">
                {quiz.questions[step].q}
              </h2>

              <div className="grid gap-3">
                {quiz.questions[step].options.map((opt, i) => {
                  const label = quiz.type === "personality" ? opt.text : opt;
                  const isPicked = selected === i;
                  const isCorrect =
                    quiz.type === "trivia" &&
                    selected !== null &&
                    i === quiz.questions[step].answer;
                  const isWrong =
                    quiz.type === "trivia" && isPicked && !isCorrect;

                  let style =
                    "glass hover:bg-white/15 border-white/15 hover:border-white/40";
                  if (isCorrect) style = "bg-green-500/80 border-green-300";
                  else if (isWrong) style = "bg-red-500/80 border-red-300";
                  else if (isPicked && quiz.type === "personality")
                    style = `bg-gradient-to-r ${quiz.color} border-white/40`;

                  return (
                    <motion.button
                      key={i}
                      onClick={() => choose(i, opt)}
                      whileHover={{ scale: 1.02, x: 6 }}
                      whileTap={{ scale: 0.98 }}
                      className={`text-left px-5 py-4 rounded-2xl border font-medium text-base md:text-lg transition-colors flex items-center justify-between ${style}`}
                    >
                      <span>{label}</span>
                      {isCorrect && <span>✓</span>}
                      {isWrong && <span>✗</span>}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ---------- EMAIL GATE ---------- */}
          {showGate && (
            <motion.div key="gate">
              <EmailGate
                quiz={quiz}
                onUnlock={(data) => {
                  setLead(data);
                  setUnlocked(true);
                }}
              />
            </motion.div>
          )}

          {/* ---------- RESULT ---------- */}
          {showResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8, rotateX: -30 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="glass rounded-3xl p-8 md:p-12 text-center preserve-3d"
            >
              {lead?.name && (
                <p className="text-white/60 mb-2">
                  Hey <span className="font-bold text-white">{lead.name}</span>
                </p>
              )}

              {result.kind === "personality" ? (
                <>
                  <motion.div
                    className="text-4xl mb-4 font-semibold text-white/80"
                  >
                    Result
                  </motion.div>
                  <p className="text-white/60 font-semibold mb-1">
                    Your result is...
                  </p>
                  <h2
                    className={`font-fun text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r ${result.data.color} bg-clip-text text-transparent`}
                  >
                    {result.data.title.replace(/\p{Emoji}/gu, "").trim()}
                  </h2>
                  <p className="text-white/80 text-lg max-w-md mx-auto">
                    {result.data.text}
                  </p>
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                    className="text-2xl mb-4 font-semibold text-white/80"
                  >
                    Score
                  </motion.div>
                  <p className="text-white/60 font-semibold mb-1">You scored</p>
                  <h2 className="font-fun text-5xl md:text-6xl font-bold mb-3">
                    <span className="gradient-text">{result.score}</span>
                    <span className="text-white/40"> / {result.total}</span>
                  </h2>
                  <p className="text-white/80 text-lg">
                    {scoreMsg(result.score)}
                  </p>
                </>
              )}

              {lead?.email ? (
                <div className="mt-6 glass rounded-2xl py-3 px-4 text-sm text-white/70">
                  A copy of your result was sent to
                  <span className="text-cyan-300 font-semibold">
                    {lead.email}
                  </span>
                </div>
              ) : (
                !quiz.free && (
                  <div className="mt-6 glass rounded-2xl py-3 px-4 text-sm text-white/70">
                    Result unlocked
                  </div>
                )
              )}

              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <button
                  onClick={restart}
                  className={`px-6 py-3 rounded-full font-semibold bg-gradient-to-r ${quiz.color} shadow-lg hover:scale-105 transition`}
                >
                  ↺ Play Again
                </button>
                <button
                  onClick={onExit}
                  className="px-6 py-3 rounded-full font-semibold glass hover:bg-white/15 transition"
                >
                  Try Another Quiz
                </button>
              </div>

              {/* reward unlocked celebration */}
              {rewardJustUnlocked && (
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 160 }}
                  className="mt-7 rounded-2xl p-5 bg-gradient-to-br from-emerald-400/15 to-teal-500/10 border border-emerald-300/30"
                >
                  <p className="text-2xl mb-1">Reward Unlocked</p>
                  <p className="font-fun font-semibold text-lg">
                    Reward unlocked: {rewardJustUnlocked.percent}% OFF
                  </p>
                  <p className="text-white/60 text-sm mb-3">
                    You have completed enough quizzes to earn the{" "}
                    <span className="text-emerald-300">
                      {rewardJustUnlocked.label}
                    </span>{" "}
                    discount!
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-dashed border-white/30">
                    <span className="text-xs text-white/50">CODE</span>
                    <span className="font-mono font-bold tracking-wider">
                      {rewardJustUnlocked.code}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* keep them on site: recommended next quizzes */}
              {onPick && (
                <div className="mt-10 pt-8 border-t border-white/10 text-left">
                  <p className="eyebrow text-white/40 mb-4 text-center">
                    People who took this also loved
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {quizzes
                      .filter((q) => q.id !== quiz.id)
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 3)
                      .map((q) => (
                        <button
                          key={q.id}
                          onClick={() => onPick(q)}
                          className="relative rounded-2xl p-4 text-left overflow-hidden border border-white/10 hover:border-white/25 transition group/rec min-h-[130px] flex flex-col justify-end"
                        >
                          {/* topic image bg */}
                          <div
                            className="absolute inset-0 bg-cover bg-center scale-105 group-hover/rec:scale-110 transition-transform duration-700"
                            style={{ backgroundImage: `url(${quizImage(q)})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0912] via-[#0b0912]/80 to-[#0b0912]/30" />

                          <div className="relative z-10">
                            <p className="font-fun text-sm font-semibold leading-snug mb-1 drop-shadow">
                              {q.title}
                            </p>
                            <p className="text-[11px] text-green-300 flex items-center gap-1">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                              </span>
                              {q.playing} playing now
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
