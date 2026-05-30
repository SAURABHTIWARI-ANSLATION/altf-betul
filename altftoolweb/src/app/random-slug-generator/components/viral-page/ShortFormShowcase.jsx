import { motion } from 'framer-motion';
import { Play, Heart, Share2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

const shortsData = [
  { id: 1, title: '3:33 AM • The Window', views: 2400000, likes: 412000, duration: '0:23', thumb: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&auto=format&fit=crop&q=60', watching: 847 },
  { id: 2, title: 'Why this frequency was banned', views: 5100000, likes: 893000, duration: '0:31', thumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&auto=format&fit=crop&q=60', watching: 1203 },
  { id: 3, title: 'The library that doesn\'t exist', views: 3700000, likes: 621000, duration: '0:19', thumb: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&auto=format&fit=crop&q=60', watching: 956 },
  { id: 4, title: 'Search this. I dare you.', views: 8200000, likes: 1400000, duration: '0:27', thumb: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=60', watching: 2341 },
  { id: 5, title: 'The photo • frame by frame', views: 4900000, likes: 756000, duration: '0:35', thumb: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&auto=format&fit=crop&q=60', watching: 1584 },
];

export default function ShortFormShowcase({ onItemClick }) {
  const [shorts, setShorts] = useState(shortsData);
  const [selectedShort, setSelectedShort] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShorts(prev => prev.map(s => ({
        ...s,
        watching: Math.max(50, s.watching + Math.floor(Math.random() * 20) - 8),
        views: s.views + Math.floor(Math.random() * 100),
        likes: s.likes + Math.floor(Math.random() * 20),
      })));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handlePending = (e) => {
      if (e.detail?.type === 'short') setSelectedShort(e.detail.data);
    };
    window.addEventListener('faceless-open-pending', handlePending);
    return () => window.removeEventListener('faceless-open-pending', handlePending);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const handleClick = (short) => {
    const result = onItemClick ? onItemClick(short, 'short') : { allowed: true };
    if (result.allowed) setSelectedShort(short);
  };

  return (
    <>
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(16,185,129,0.03),transparent)]" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs tracking-widest text-red-700 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  LIVE • 6.9K VIEWING
                </span>
                <span className="text-xs text-zinc-500 tracking-wide font-medium">VERTICAL • NO FACES</span>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl tracking-[-0.03em] text-zinc-900" style={{ lineHeight: 1.2 }}>
                SCROLL. WATCH.
                <br />
                <span className="text-zinc-300">CAN'T LOOK AWAY.</span>
              </h2>
            </div>
            
            <p className="lg:text-right text-zinc-600 max-w-md leading-relaxed font-medium">
              TikTok-style verticals, editorial design. 
              <span className="text-zinc-900"> Click any short to play.</span>
            </p>
          </div>

          <div className="relative">
            <div className="flex gap-4 overflow-x-auto pb-6 -mx-6 px-6 lg:mx-0 lg:px-0" style={{ scrollbarWidth: 'none' }}>
              {shorts.map((short, index) => (
                <motion.div
                  key={short.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex-shrink-0 w-[280px] group cursor-pointer"
                  onClick={() => handleClick(short)}
                >
                  <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden bg-zinc-100 border border-zinc-200 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:shadow-emerald-200/30 hover:border-emerald-300 transition-all">
                    <img src={short.thumb} alt={short.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-white/95 border border-zinc-200 text-xs font-mono text-zinc-700 shadow-sm">
                        {short.duration}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-red-600 text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {short.watching}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white shadow-xl border border-zinc-200 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-all">
                        <Play className="w-5 h-5 text-zinc-900 fill-zinc-900 ml-0.5 group-hover:text-white group-hover:fill-white" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent pt-12">
                      <h3 className="text-zinc-900 font-semibold leading-tight mb-2 text-sm">{short.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-zinc-600 font-medium mb-3">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                          {formatNumber(short.likes)}
                        </span>
                        <span>•</span>
                        <span>{formatNumber(short.views)}</span>
                      </div>
                      <div className="h-1 bg-zinc-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: '0%' }}
                          whileInView={{ width: `${60 + index * 8}%` }}
                          viewport={{ once: true }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="absolute right-3 bottom-24 flex flex-col gap-2.5">
                      {[
                        { icon: Heart, count: formatNumber(short.likes), active: true },
                        { icon: Eye, count: formatNumber(short.watching) },
                      ].map((action, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div className="w-10 h-10 rounded-xl bg-white/95 border border-zinc-200 shadow-md flex items-center justify-center">
                            <action.icon className={`w-3.5 h-3.5 ${action.active ? 'fill-red-500 text-red-500' : 'text-zinc-700'}`} />
                          </div>
                          <span className="text-[10px] text-zinc-700 font-bold">{action.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 font-medium">
              <span className="flex items-center gap-2 text-zinc-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                6,931 watching now • 73% completion
              </span>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={!!selectedShort} onClose={() => setSelectedShort(null)} type="short" data={selectedShort} />
    </>
  );
}