import { motion } from 'framer-motion';
import { Eye, TrendingUp, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

const mysteriesData = [
  {
    id: 1,
    title: 'THE SIGNAL FROM DEEP SPACE',
    subtitle: 'Arecibo • 1977 • Still unexplained',
    views: 4200000,
    badge: 'MOST WATCHED',
    image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?w=800&auto=format&fit=crop&q=60',
    time: '11:47',
    watchingNow: 1843,
  },
  {
    id: 2,
    title: 'ABANDONED CITY NOBODY CAN ENTER',
    subtitle: 'Pripyat logs • Declassified 2023',
    views: 3800000,
    badge: 'VIRAL • 18H',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=60',
    time: '09:23',
    watchingNow: 2156,
  },
  {
    id: 3,
    title: 'THE PHOTO THAT DISAPPEARED',
    subtitle: 'Internet Archive • 404 • Recovered',
    views: 5100000,
    badge: 'TRENDING',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format&fit=crop&q=60',
    time: '14:02',
    watchingNow: 3291,
  },
  {
    id: 4,
    title: 'PEOPLE WHO VANISHED AT 3:33 AM',
    subtitle: 'Global reports • Same timestamp',
    views: 6700000,
    badge: '#1 THIS WEEK',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&auto=format&fit=crop&q=60',
    time: '12:15',
    watchingNow: 4829,
  },
];

export default function TrendingMysteries({ onItemClick }) {
  const [mysteries, setMysteries] = useState(mysteriesData);
  const [totalWatching, setTotalWatching] = useState(12119);
  const [selectedMystery, setSelectedMystery] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMysteries(prev => prev.map(m => ({
        ...m,
        watchingNow: Math.max(100, m.watchingNow + Math.floor(Math.random() * 15) - 5),
        views: m.views + Math.floor(Math.random() * 50),
      })));
      setTotalWatching(prev => prev + Math.floor(Math.random() * 40) - 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handlePending = (e) => {
      if (e.detail?.type === 'mystery') setSelectedMystery(e.detail.data);
    };
    window.addEventListener('faceless-open-pending', handlePending);
    return () => window.removeEventListener('faceless-open-pending', handlePending);
  }, []);

  const formatViews = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const handleClick = (item) => {
    const result = onItemClick ? onItemClick(item, 'mystery') : { allowed: true };
    if (result.allowed) setSelectedMystery(item);
  };

  return (
    <>
<<<<<<< HEAD
      <section className="relative py-24 bg-zinc-50 border-y border-zinc-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.04),transparent_60%)]" />
        
=======
      <section className="relative py-24 bg-[#f9fafb]">
>>>>>>> b0b77b4 (improvement ui of viral pages)
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6"
              >
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">TRENDING NOW</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </motion.div>
              
<<<<<<< HEAD
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] text-zinc-900" style={{ lineHeight: 1.2 }}>
=======
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] text-zinc-900 leading-[0.88]">
>>>>>>> b0b77b4 (improvement ui of viral pages)
                WHAT THEY'RE
                <br />
                <span className="text-zinc-400">WATCHING AT 3AM</span>
              </h2>
            </div>
            
            <div className="lg:text-right max-w-md">
              <p className="text-zinc-600 leading-relaxed font-medium">
                No algorithm. No faces. Just raw investigations that spread because people can't look away.
              </p>
              <div className="flex items-center gap-5 mt-4 text-xs text-zinc-500 font-medium justify-start lg:justify-end">
                <span className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {formatViews(totalWatching)} VIEWING
                </span>
                <span>Updated 2 min ago</span>
              </div>
            </div>
          </div>
<<<<<<< HEAD
 
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
=======

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
>>>>>>> b0b77b4 (improvement ui of viral pages)
            {mysteries.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                whileHover={{ y: -2 }}
                onClick={() => handleClick(item)}
                className="group relative bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-zinc-300 transition-all duration-200 cursor-pointer"
              >
                <div className="relative">
                  <div className="aspect-[4/5] overflow-hidden bg-zinc-50">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Very minimal fade - only 20% at very bottom for badges, image 100% visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between z-10">
                      <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-[10px] font-bold tracking-wide">
                        {item.badge}
                      </span>
<<<<<<< HEAD
                      <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-zinc-200 text-xs text-zinc-800 font-mono flex items-center gap-1.5 shadow-sm">
=======
                      <span className="px-2 py-1 rounded-md bg-white border border-zinc-200 text-[10px] text-zinc-700 font-mono font-semibold flex items-center gap-1">
>>>>>>> b0b77b4 (improvement ui of viral pages)
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {formatViews(item.watchingNow)}
                      </span>
                    </div>
<<<<<<< HEAD
 
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 rounded-full bg-white shadow-xl border border-zinc-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-l-[14px] border-l-zinc-900 border-y-[9px] border-y-transparent ml-1" />
                      </div>
                    </div>
 
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-zinc-200 text-[10px] text-zinc-700 font-mono shadow-sm">
                        {item.time}
                      </span>
                      <span className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-800 font-semibold">
                        <Users className="w-3 h-3" />
=======

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                      <div className="w-12 h-12 rounded-full bg-white border border-zinc-300 flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[10px] border-l-zinc-900 border-y-[6px] border-y-transparent ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-2 py-1 rounded-md bg-white border border-zinc-200 text-[10px] text-zinc-700 font-mono font-medium">
                        {item.time}
                      </span>
                      <span className="px-2 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
>>>>>>> b0b77b4 (improvement ui of viral pages)
                        LIVE
                      </span>
                    </div>
                  </div>
<<<<<<< HEAD
 
                  <div className="p-5 bg-white">
                    <h3 className="font-serif text-[19px] leading-tight text-zinc-950 mb-2 group-hover:text-emerald-700 transition-colors font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4 font-semibold">
                      {item.subtitle}
                    </p>
 
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                      <span className="flex items-center gap-1.5 text-xs text-zinc-700 font-semibold">
                        <Eye className="w-3.5 h-3.5" />
                        {formatViews(item.views)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-emerald-700 font-bold">
                        <Zap className="w-3 h-3 fill-current" />
                        OPEN →
=======

                  <div className="p-4 bg-white">
                    <h3 className="font-serif text-[17px] leading-[1.2] text-zinc-900 mb-2 font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-zinc-600 leading-relaxed font-medium mb-3">
                      {item.subtitle}
                    </p>

                    <div className="flex items-center justify-between pt-2.5 border-t border-zinc-100">
                      <span className="flex items-center gap-1.5 text-xs text-zinc-700 font-medium">
                        <Eye className="w-3.5 h-3.5 text-zinc-500" />
                        {formatViews(item.views)}
                      </span>
                      <span className="text-xs text-zinc-900 font-semibold flex items-center gap-1">
                        Open
                        <Zap className="w-3 h-3 fill-zinc-900 text-zinc-900" />
>>>>>>> b0b77b4 (improvement ui of viral pages)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white border border-zinc-200 text-xs text-zinc-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-zinc-700 font-semibold">12 opened in last minute</span>
              <span className="text-zinc-300">•</span>
              <span>Click to investigate</span>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={!!selectedMystery} onClose={() => setSelectedMystery(null)} type="mystery" data={selectedMystery} />
    </>
  );
}