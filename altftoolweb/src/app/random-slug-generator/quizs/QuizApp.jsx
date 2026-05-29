import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Background from "./components/Background.jsx";
import Home from "./components/Home.jsx";
import QuizPlayer from "./components/QuizPlayer.jsx";
import LiveActivity from "./components/LiveActivity.jsx";
import Header from "./components/Header.jsx";
import RewardsModal from "./components/RewardsModal.jsx";
import Footer from "@/platform/navigation/Footer";

export default function App() {
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [rewardsOpen, setRewardsOpen] = useState(false);

  // scroll to top whenever a quiz starts or exits
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeQuiz]);

  const goHome = () => setActiveQuiz(null);

  const browse = () => {
    setActiveQuiz(null);
    setTimeout(() => {
      document.getElementById("quizzes")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <div className="qv-shell min-h-screen">
      <Background />
      <LiveActivity />

      <Header
        onHome={goHome}
        onBrowse={browse}
        onOpenRewards={() => setRewardsOpen(true)}
      />

      <RewardsModal
        open={rewardsOpen}
        onClose={() => setRewardsOpen(false)}
        onBrowse={browse}
      />

      <div className="relative z-10 pt-16">
        <AnimatePresence mode="wait">
          {activeQuiz ? (
            <motion.div
              key={"player-" + activeQuiz.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <QuizPlayer
                quiz={activeQuiz}
                onExit={() => setActiveQuiz(null)}
                onPick={setActiveQuiz}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Home onStart={setActiveQuiz} onOpenRewards={() => setRewardsOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}
