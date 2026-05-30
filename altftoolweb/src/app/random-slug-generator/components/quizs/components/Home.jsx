import { useState } from "react";
import { motion } from "framer-motion";
import { quizzes, categories } from "../data/quizzes.js";
import QuizCard from "./QuizCard.jsx";
import LiveCounter from "./LiveCounter.jsx";

export default function Home({ onStart, onOpenRewards }) {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? quizzes : quizzes.filter((q) => q.category === filter);

  const scrollToQuizzes = () => {
    document.getElementById("quizzes")?.scrollIntoView({ behavior: "smooth" });
  };

  const pickRandom = () =>
    onStart(quizzes[Math.floor(Math.random() * quizzes.length)]);

  return (
    <div className="relative">
      {/* ---------- HERO ---------- */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <LiveCounter base={4380} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="eyebrow text-white/50 mb-5"
        >
          Self-discovery · reimagined
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-fun font-semibold text-5xl md:text-7xl leading-[1.05] tracking-tightest mb-6 max-w-4xl"
        >
          Understand yourself
          <br className="hidden sm:block" /> through{" "}
          <span className="gradient-text">beautiful</span> quizzes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-base md:text-xl text-white/60 max-w-xl mb-10 font-light leading-relaxed"
        >
          Thoughtfully crafted personality profiles and knowledge tests —
          designed to feel as good as the insights they reveal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <button
            onClick={scrollToQuizzes}
            className="px-8 py-3.5 rounded-full font-medium text-base bg-white text-[#100a1e] hover:bg-white/90 transition hover:-translate-y-0.5 shadow-lg"
          >
            Browse quizzes
          </button>
          <button
            onClick={pickRandom}
            className="px-8 py-3.5 rounded-full font-medium text-base glass hover:bg-white/10 transition hover:-translate-y-0.5 border border-white/15"
          >
            Take a random one →
          </button>
        </motion.div>

        {/* social proof stats — refined */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-center justify-center divide-x divide-white/10 mt-14"
        >
          {[
            { n: "27M+", l: "results unlocked" },
            { n: "15", l: "curated quizzes" },
            { n: "4.9", l: "average rating" },
          ].map((s) => (
            <div key={s.l} className="px-6 md:px-9 text-center">
              <p className="font-fun text-2xl md:text-3xl font-semibold tracking-tightest">
                {s.n}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-white/40 mt-1">
                {s.l}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="absolute bottom-8 text-white/30 text-sm tracking-widest"
        >
          SCROLL
        </motion.div>
      </section>

      {/* ---------- QUIZZES ---------- */}
      <section id="quizzes" className="max-w-6xl mx-auto px-4 py-24">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="eyebrow text-white/40 block text-center mb-4"
        >
          The collection
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-fun text-4xl md:text-5xl font-semibold tracking-tightest text-center mb-4"
        >
          Find the one that <span className="gradient-text">speaks to you</span>
        </motion.h2>
        <p className="text-center text-white/50 max-w-lg mx-auto mb-10 font-light">
          Every quiz is hand-crafted and instantly scored — explored by millions
          around the world.
        </p>

        {/* filter tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                filter === cat
                  ? "bg-white text-[#100a1e]"
                  : "glass text-white/70 hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((quiz, i) => (
            <QuizCard key={quiz.id} quiz={quiz} index={i} onStart={onStart} />
          ))}
        </div>
      </section>

      {/* ---------- REWARDS PROMO ---------- */}
      <section id="how" className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-12 border border-white/12 relative overflow-hidden text-center"
        >
          {/* rewards background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url(/random-slug-generator/quizs/images/rewards.jpg)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0912] via-[#0b0912]/85 to-[#0b0912]/55" />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-20 blur-3xl" />
          <div className="relative z-10">
            <span className="eyebrow text-emerald-300/80 block mb-3">
              Play & earn
            </span>
            <h2 className="font-fun text-3xl md:text-4xl font-semibold tracking-tightest mb-3">
              Complete quizzes,{" "}
              <span className="gradient-text">unlock real discounts</span>
            </h2>
            <p className="text-white/55 max-w-xl mx-auto mb-8 font-light">
              The more quizzes you finish, the bigger your reward. Hit 5 quizzes
              for <span className="text-emerald-300 font-medium">25% off</span> —
              keep going to reach <span className="text-emerald-300 font-medium">50% off</span>.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              {[
                { c: 1, p: "10%" },
                { c: 3, p: "15%" },
                { c: 5, p: "25%" },
                { c: 8, p: "35%" },
                { c: 12, p: "50%" },
              ].map((t, i) => (
                <div key={t.c} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-2xl glass border border-white/12 flex items-center justify-center font-fun font-semibold">
                      {t.p}
                    </div>
                    <p className="text-[11px] text-white/40 mt-1.5">
                      {t.c} quiz{t.c > 1 ? "zes" : ""}
                    </p>
                  </div>
                  {i < 4 && <span className="text-white/25 -mt-5">→</span>}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={scrollToQuizzes}
                className="px-7 py-3.5 rounded-full font-medium bg-white text-[#0b0912] hover:bg-white/90 transition hover:-translate-y-0.5"
              >
                Start earning
              </button>
              <button
                onClick={onOpenRewards}
                className="px-7 py-3.5 rounded-full font-medium glass border border-white/15 hover:bg-white/10 transition"
              >
                View my rewards
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
