import { useState } from "react";
import { motion } from "framer-motion";

// Shown right before the result is revealed.
// Collects name + email (and we can extend with more fields).
// On submit, stores lead in localStorage and unlocks the result.
export default function EmailGate({ quiz, onUnlock }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const valid = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter your name");
    if (!valid(email)) return setError("Please enter a valid email address");
    if (!agree) return setError("Please accept to see your results.");
    setError("");
    setLoading(true);

    // store the captured lead locally (this is where you'd POST to your CRM/API)
    try {
      const leads = JSON.parse(localStorage.getItem("quizverse_leads") || "[]");
      leads.push({
        name: name.trim(),
        email: email.trim(),
        quiz: quiz.id,
        quizTitle: quiz.title,
        at: new Date().toISOString(),
      });
      localStorage.setItem("quizverse_leads", JSON.stringify(leads));
      // remember the user so every future quiz unlocks instantly (the hook)
      localStorage.setItem(
        "quizverse_user",
        JSON.stringify({ name: name.trim(), email: email.trim() })
      );
    } catch (_) {}

    // small fake "analyzing" delay for perceived value
    setTimeout(() => {
      setLoading(false);
      onUnlock({ name: name.trim(), email: email.trim() });
    }, 1300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ type: "spring", stiffness: 130, damping: 16 }}
      className="glass rounded-3xl p-8 md:p-10 text-center preserve-3d max-w-lg mx-auto relative overflow-hidden"
    >
      <div
        className={`absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-br ${quiz.color} opacity-30 blur-3xl`}
      />

      <div className="relative">
        {loading ? (
          <div className="py-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-14 h-14 mx-auto rounded-full border-4 border-white/20 border-t-cyan-400 mb-5"
            />
            <p className="font-fun text-xl">Analyzing your answers…</p>
            <p className="text-white/55 text-sm mt-1">
              Calculating your unique result
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-fun text-3xl font-bold mb-2">
              Your result is <span className="gradient-text">ready!</span>
            </h2>
            <p className="text-white/70 mb-1">
              Enter your email to unlock this result — plus{" "}
              <span className="text-white font-semibold">unlimited quizzes</span>{" "}
              forever.
            </p>
            <p className="text-xs text-amber-300/90 mb-6 font-semibold">
              Your free quiz is done — unlock everything now!
            </p>

            <form onSubmit={submit} className="space-y-3 text-left">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your first name"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 focus:border-cyan-400 focus:bg-white/15 outline-none transition placeholder-white/40"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@email.com"
                className="w-full px-4 py-3.5 rounded-2xl bg-white/10 border border-white/15 focus:border-cyan-400 focus:bg-white/15 outline-none transition placeholder-white/40"
              />

              <label className="flex items-start gap-2 text-xs text-white/55 cursor-pointer py-1">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 accent-cyan-400"
                />
                <span>
                  Email me my result + new viral quizzes. No spam, unsubscribe
                  anytime.
                </span>
              </label>

              {error && (
                <p className="text-red-300 text-sm font-medium">{error}</p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-4 rounded-2xl font-fun font-bold text-lg bg-gradient-to-r ${quiz.color} shadow-xl`}
              >
                Reveal My Result
              </motion.button>
            </form>

            <div className="flex items-center justify-center gap-4 mt-5 text-[11px] text-white/40">
              <span>Private & secure</span>
              <span>•</span>
              <span>2.4M+ results unlocked</span>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
