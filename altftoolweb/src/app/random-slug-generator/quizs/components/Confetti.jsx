import { useEffect, useState } from "react";

const colors = ["#f472b6", "#a78bfa", "#38bdf8", "#fbbf24", "#34d399", "#fb7185"];

export default function Confetti({ trigger }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const start = setTimeout(() => {
      setPieces(
        Array.from({ length: 80 }).map((_, i) => ({
          id: `${trigger}-${i}`,
          left: Math.random() * 100,
          bg: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 0.6,
          duration: 2.2 + Math.random() * 1.8,
          size: 6 + Math.random() * 10,
          round: Math.random() > 0.5,
        }))
      );
    }, 0);
    const end = setTimeout(() => setPieces([]), 4500);
    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [trigger]);

  return (
    <>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti"
          style={{
            left: `${p.left}%`,
            background: p.bg,
            width: p.size,
            height: p.size,
            borderRadius: p.round ? "50%" : "2px",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </>
  );
}
