import { motion } from 'framer-motion';
import { MapPin, Wifi, FileWarning, Eye, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Modal from './Modal.jsx';

const factsData = [
  { 
    id: 1, 
    title: 'THE ABANDONED CITY NOBODY CAN ENTER', 
    body: 'Satellite imagery shows 47 heat signatures moving inside the exclusion zone. Official logs say zero population since 1986.',
    tags: ['DECLASSIFIED', 'LIVE'], 
    icon: MapPin, 
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format&fit=crop&q=80',
    views: 2847293, 
    watching: 342 
  },
  { 
    id: 2, 
    title: 'A SIGNAL DETECTED FROM DEEP SPACE', 
    body: '72 seconds. Never repeated. The astronomer wrote "Wow!" in red pen. Marginalia found last month nobody photographed.',
    tags: ['1977', 'WOW!'], 
    icon: Wifi, 
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
    views: 1923847, 
    watching: 189 
  },
  { 
    id: 3, 
    title: 'THE PHOTO THAT DISAPPEARED FROM THE INTERNET', 
    body: 'Archived 4,112 times. All copies 404 after March 14, 3:33 AM UTC. Physical print EXIF shows 2047.',
    tags: ['404', 'EXIF'], 
    icon: FileWarning, 
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&auto=format&fit=crop&q=80',
    views: 3410293, 
    watching: 567 
  },
  { 
    id: 4, 
    title: 'PEOPLE WHO VANISHED AFTER SEARCHING THIS', 
    body: '12 researchers. Same query. No digital footprint after 3:33 AM local time. We don\'t list the term here.',
    tags: ['WARNING'], 
    icon: AlertCircle, 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    views: 4129834, 
    watching: 723 
  },
  { 
    id: 5, 
    title: 'FORBIDDEN HISTORY • PAGE 47 REMOVED', 
    body: 'Found in 3 school basements. Printed 1947. Never digitized. Page 47 missing from all copies except one.',
    tags: ['ARCHIVE', '1947'], 
    icon: FileWarning, 
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80',
    views: 2293847, 
    watching: 234 
  },
  { 
    id: 6, 
    title: 'THE FREQUENCY ONLY 2% CAN HEAR', 
    body: '18.9 kHz test tone. Comments full of timestamps. People hear it, then don\'t, then hear it again at 3:33 AM.',
    tags: ['18.9KHZ', 'AUDIO'], 
    icon: Wifi, 
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80',
    views: 1837482, 
    watching: 156 
  },
];

export default function FactsGrid({ onItemClick }) {
  const [selectedFact, setSelectedFact] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const handlePending = (e) => {
      if (e.detail?.type === 'fact') setSelectedFact(e.detail.data);
    };
    window.addEventListener('faceless-open-pending', handlePending);
    return () => window.removeEventListener('faceless-open-pending', handlePending);
  }, []);

  const formatViews = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K';
    return num.toString();
  };

  const handleClick = (fact) => {
    const result = onItemClick ? onItemClick(fact, 'fact') : { allowed: true };
    if (result.allowed) setSelectedFact(fact);
  };

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <>
      <section className="py-24 bg-[#fcfcfa] relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs tracking-[0.15em] text-zinc-600 uppercase font-bold">DISCOVERY FEED</span>
            </motion.div>
            
            <h2 className="font-serif text-5xl md:text-6xl tracking-[-0.03em] text-zinc-900 mb-6" style={{ lineHeight: 1.2 }}>
              FACTS THAT DON'T
              <br />
              <span className="text-zinc-300">FIT THE TIMELINE.</span>
            </h2>
            <p className="text-lg text-zinc-600 leading-relaxed font-medium">
              Pinterest-style mysteries. Click any card to investigate. 
              <span className="text-zinc-900"> No faces, just evidence.</span>
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {factsData.map((fact, index) => (
              <motion.div
                key={fact.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => handleClick(fact)}
              >
                <div className="relative bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-zinc-300 transition-all duration-200">
                  {/* Always show image container with fallback */}
                  <div className="relative h-44 overflow-hidden bg-zinc-100">
                    {!imageErrors[fact.id] ? (
                      <img
                        src={fact.image}
                        alt={fact.title}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(fact.id)}
                        loading="lazy"
                      />
                    ) : (
                      /* Fallback if image fails */
                      <div className="w-full h-full bg-gradient-to-br from-zinc-200 via-zinc-100 to-emerald-50 flex items-center justify-center">
                        <fact.icon className="w-12 h-12 text-zinc-400" />
                      </div>
                    )}
                    
                    {/* Light overlay so image is visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center">
                      <fact.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold shadow-sm flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                      {fact.watching}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {fact.tags.map(tag => (
                        <span key={tag} className="text-[10px] tracking-wide px-2 py-1 rounded-md bg-zinc-100 border border-zinc-300 text-zinc-800 font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-serif text-[18px] text-zinc-950 leading-tight mb-2.5 font-semibold group-hover:text-emerald-700 transition-colors">
                      {fact.title}
                    </h3>
                    
                    <p className="text-sm text-zinc-700 leading-relaxed font-medium line-clamp-3">
                      {fact.body}
                    </p>

                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
                      <span className="text-xs text-zinc-600 flex items-center gap-1.5 font-semibold">
                        <Eye className="w-3.5 h-3.5" />
                        {formatViews(fact.views)}
                      </span>
                      <span className="text-xs text-emerald-700 font-bold">
                        OPEN →

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-zinc-200 text-xs text-zinc-600 font-medium shadow-sm">
              <span className="text-zinc-700"><strong>2,211 people</strong> investigated facts this hour</span>
              <span className="text-zinc-300">•</span>
              <span>Avg: 4:37 per case</span>
            </div>
          </div>
        </div>
      </section>

      <Modal isOpen={!!selectedFact} onClose={() => setSelectedFact(null)} type="fact" data={selectedFact} />
    </>
  );
}