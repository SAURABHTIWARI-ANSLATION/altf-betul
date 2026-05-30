import { motion } from 'framer-motion';
import { MessageSquare, Users, Eye, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const initialThreads = [
  {
    id: 1,
    user: 'anon_7f3k',
    time: '23m ago',
    topic: '3:33 AM SIGNAL',
    content: 'I ran the audio through a spectrogram. Pattern at 18.9kHz spells coordinates in hex. Check archive #047. Not joking.',
    replies: 127,
    live: true,
    avatar: '▢',
    viewing: 43,
  },
  {
    id: 2,
    user: 'researcher_mute',
    time: '1h ago',
    topic: 'ABANDONED CITY',
    content: 'Thermal satellite from last night: 47 heat signatures moving in grid patterns. Officially zero population since 1986.',
    replies: 342,
    live: false,
    avatar: '◈',
    viewing: 89,
  },
  {
    id: 3,
    user: 'void_listener',
    time: '3h ago',
    topic: 'PHOTO 404',
    content: 'Printed it. Physical copy. EXIF shows 2047. Camera model doesn\'t exist yet. I checked every database.',
    replies: 589,
    live: true,
    avatar: '⬙',
    viewing: 156,
  },
];

export default function CommunityDiscussion() {
  const [threads, setThreads] = useState(initialThreads);
  const [activeInvestigators, setActiveInvestigators] = useState(12847);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInvestigators(prev => prev + Math.floor(Math.random() * 20) - 5);
      setThreads(prev => prev.map(t => ({
        ...t,
        replies: t.replies + Math.floor(Math.random() * 2),
        viewing: Math.max(10, t.viewing + Math.floor(Math.random() * 8) - 3),
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#f9fafb] relative">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-6">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs tracking-widest text-emerald-700 uppercase font-bold">UNDERGROUND • NO FACES</span>
              </div>
              
              <h2 className="font-serif text-5xl md:text-6xl tracking-[-0.03em] text-zinc-900 mb-6" style={{ lineHeight: 1.2 }}>
                THE COMMENT
                <br />
                <span className="text-zinc-300">SECTION IS</span>
                <br />
                THE STORY.
              </h2>
              
              <p className="text-zinc-600 leading-relaxed font-medium mb-8">
                No usernames. No profiles. Just anonymous investigators sharing findings at 3AM. 
                <span className="text-zinc-900"> This is where the mystery unfolds.</span>
              </p>
 
              <div className="space-y-3 p-5 rounded-2xl bg-white border border-zinc-200 shadow-sm">
                {[
                  { label: 'Investigators online', value: activeInvestigators.toLocaleString(), live: true },
                  { label: 'Threads tonight', value: '423', live: false },
                  { label: 'Faces shown', value: '0', live: false },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-100 last:border-0">
                    <span className="text-sm text-zinc-600 font-medium">{stat.label}</span>
                    <div className="flex items-center gap-2">
                       <span className="font-mono text-zinc-900 font-semibold">{stat.value}</span>
                      {stat.live && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
                    </div>
                  </div>
                ))}
              </div>
 
              <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex gap-3">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-amber-800 font-medium leading-relaxed">
                      3 people typing now. Most threads hit 50+ replies in 2 hours.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
 
          <div className="lg:col-span-3 space-y-4">
            {threads.map((thread, index) => (
              <motion.div
                key={thread.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ x: 4 }}
                className="group relative bg-white rounded-2xl border border-zinc-200 p-5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-lg text-zinc-600 font-mono group-hover:border-emerald-300 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-all">
                    {thread.avatar}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 flex-wrap mb-2">
                      <span className="font-mono text-xs text-zinc-900 font-semibold">{thread.user}</span>
                      <span className="text-xs text-zinc-400">•</span>
                      <span className="text-xs text-zinc-500 font-medium">{thread.time}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide bg-violet-50 text-violet-700 border border-violet-200">
                        {thread.topic}
                      </span>
                      {thread.live && (
                        <span className="inline-flex items-center gap-1 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md text-[10px] text-red-600 font-bold tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-zinc-700 leading-relaxed font-medium mb-3">
                      {thread.content}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-zinc-500 font-medium">
                      <span className="flex items-center gap-1.5 text-zinc-700">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {thread.replies} replies
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        {thread.viewing} viewing
                      </span>
                      <span className="ml-auto text-emerald-600 font-semibold group-hover:gap-1 flex items-center gap-0.5 transition-all">
                        open →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="text-center py-6 px-6 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <p className="text-xs text-zinc-600 font-medium">
                <span className="text-zinc-900 font-semibold">89 people</span> reading now • No moderation • No faces • Refresh for new replies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}