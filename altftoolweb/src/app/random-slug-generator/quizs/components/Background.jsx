import { motion } from "framer-motion";
import LiveBackground from "./LiveBackground.jsx";

// a few subtle floating light motes for refinement (no emojis)
const motes = Array.from({ length: 14 });

export default function Background() {
  return (
    <>
      {/* abstract fluid liquid gradient canvas */}
      <LiveBackground />

      {/* fine noise/texture overlay for a premium matte finish */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* subtle drifting light motes (elegant, minimal) */}
      <div
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 1 }}
      >
        {motes.map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 13 + 6) % 96}%`,
              top: `${(i * 23 + 10) % 92}%`,
              width: 3 + (i % 3),
              height: 3 + (i % 3),
              background:
                "radial-gradient(circle, rgba(255,255,255,0.7), transparent 70%)",
            }}
            animate={{
              y: [0, -26, 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              duration: 8 + (i % 6),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </div>
    </>
  );
}
