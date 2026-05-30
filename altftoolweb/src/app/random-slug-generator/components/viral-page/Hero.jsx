import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, Radio, Eye, ChevronDown, Volume2 } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [viewers, setViewers] = useState(2418473);
  const [isLive, setIsLive] = useState(true);
  const [recentJoin, setRecentJoin] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 200) - 80;
        return Math.max(2400000, prev + change);
      });
      
      if (Math.random() > 0.7) {
        const cities = ['Mumbai', 'London', 'São Paulo', 'Tokyo', 'Berlin', 'Lagos'];
        const times = ['now', '3s ago', '7s ago'];
        setRecentJoin({
          city: cities[Math.floor(Math.random() * cities.length)],
          time: times[Math.floor(Math.random() * times.length)],
          id: Date.now(),
        });
        setTimeout(() => setRecentJoin(null), 3000);
      }
    }, 2000);

    const liveInterval = setInterval(() => setIsLive(v => !v), 800);
    return () => { clearInterval(interval); clearInterval(liveInterval); };
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-white">
      {/* Light background with subtle green accents */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(245,158,11,0.03),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 4px)`
        }} />
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -120, 0], y: [0, 80, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-1/4 w-[500px] h-[500px] rounded-full bg-violet-200/20 blur-3xl"
        />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 mx-auto mb-10 px-5 py-2.5 rounded-full bg-white border border-zinc-200 shadow-sm backdrop-blur-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isLive ? 'bg-emerald-500' : 'bg-emerald-600'}`} />
          </span>
          <span className="text-xs font-bold tracking-[0.15em] text-emerald-700 uppercase">
            LIVE • {formatNumber(viewers)} VIEWING
          </span>
          <span className="h-3 w-px bg-zinc-200" />
          <span className="text-xs text-zinc-600 tracking-wide font-medium">FACELess • NO ALGORITHM</span>
        </motion.div>

        <AnimatePresence>
          {recentJoin && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 shadow-lg shadow-emerald-100/50 flex items-center gap-2"
            >
              <Eye className="w-3 h-3 text-emerald-600" />
              <span className="text-xs text-emerald-700 font-medium">
                {recentJoin.city} joined • {recentJoin.time}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[104px] leading-[1.05] tracking-[-0.03em] text-zinc-900 mb-8"
          >
            THE INTERNET'S
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-clip-text text-transparent">
                DARKEST SECRETS
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
              />
            </span>
            <br />
            ARE HIDDEN IN PLAIN SIGHT.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 leading-relaxed font-light tracking-wide mb-12"
          >
            A faceless archive of viral mysteries, forbidden history, and unexplained phenomena.
            <span className="text-zinc-900 font-medium"> No hosts. No faces. Just the truth they tried to erase.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16 flex-wrap px-4"
          >
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -12px rgba(16, 185, 129, 0.25)' }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-9 py-4 bg-zinc-900 text-white rounded-2xl font-semibold tracking-wide shadow-xl shadow-zinc-900/20 hover:bg-zinc-800 transition-all whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Play className="w-4 h-4 fill-current" />
                ENTER THE ARCHIVE
                <span className="ml-2 px-2.5 py-1 rounded-lg text-[10px] bg-emerald-500 text-white font-bold tracking-wide">347 LIVE</span>
              </span>
            </motion.button>
            <button className="px-9 py-4 bg-white border border-zinc-200 rounded-2xl font-semibold text-zinc-700 tracking-wide hover:border-zinc-300 hover:bg-zinc-50 transition-all flex items-center gap-3 shadow-sm whitespace-nowrap">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              LISTEN IN LIGHT MODE
              <span className="text-xs text-zinc-500">• 12K online</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="grid grid-cols-3 max-w-2xl mx-auto gap-8 pt-12 border-t border-zinc-200"
          >
            {[
              { value: '847', label: 'UNSOLVED CASES', sub: '+3 today', live: true },
              { value: formatNumber(viewers), label: 'MIDNIGHT VIEWS', sub: 'last 72h', live: true },
              { value: '0', label: 'FACES SHOWN', sub: 'always zero', live: false },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-serif text-zinc-900 tracking-tight flex items-center justify-center gap-2 font-light">
                  {stat.value}
                  {stat.live && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </div>
                <div className="text-xs tracking-[0.15em] text-zinc-500 uppercase mt-2 font-semibold">{stat.label}</div>
                <div className="text-xs text-emerald-600 mt-1 font-medium">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-zinc-400"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-medium">247 INVESTIGATING NOW</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}