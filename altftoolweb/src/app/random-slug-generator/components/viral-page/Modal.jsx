import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Play, Pause, Share2, Heart, MessageSquare, Eye, Clock, AlertCircle, Zap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const shortComments = {
  1: [
    { user: 'anon_7f3k', time: 'now', text: 'PAUSE AT 0:13. The reflection in the window. That wasn\'t there in the first upload. Check the metadata.', likes: 47, viewing: true },
    { user: 'signal_hunter', time: '12s ago', text: '18.9kHz tone throughout. I ran it through Audacity. It\'s spelling coordinates in morse. Not joking.', likes: 128, viewing: true },
    { user: 'void_observer', time: '24s ago', text: 'Third frame from the end. Zoom 400%. There\'s text on the glass. "THEY KNOW YOU\'RE WATCHING"', likes: 203, viewing: true },
    { user: 'archive_047', time: '41s ago', text: 'This matches case #047 exactly. Same timestamp. Same window. Different city. How?', likes: 89, viewing: false },
  ],
  2: [
    { user: 'audio_ghost', time: 'now', text: 'The banned frequency is 18.9kHz because 2% of people can hear it under 30. They didn\'t want kids hearing the message.', likes: 342, viewing: true },
    { user: 'researcher_mute', time: '8s ago', text: 'I confirmed it. Played it for my nephew (14). He heard whispering. I heard nothing. Then he wrote down what it said.', likes: 156, viewing: true },
    { user: 'freq_analyzer', time: '19s ago', text: 'Spectrogram shows a face at 0:19. I\'m not crazy. Screenshot attached in thread #2834.', likes: 94, viewing: false },
  ],
  4: [
    { user: 'dare_acceptor', time: 'now', text: 'I SERACHED IT. Don\'t do it. My wifi cut out at exactly 3:33. Came back with all my searches deleted. What the hell.', likes: 523, viewing: true },
    { user: 'anon_x9k2', time: '15s ago', text: 'UPDATE: He\'s offline now. Last seen 4 minutes ago. This is exactly what happened to the other 12.', likes: 401, viewing: true },
    { user: 'mute_investigator', time: '33s ago', text: 'The term is in the archive. Page 47. Redacted in all digital copies. Physical only.', likes: 267, viewing: true },
  ],
};

const factComments = {
  1: [
    { user: 'satellite_guy', time: '2m ago', text: 'Those 47 heat signatures are moving in grid patterns. Like they\'re searching for something. Or someone.', likes: 234, replies: 12 },
    { user: 'pripyat_reader', time: '4m ago', text: 'I have the declassified logs. Page 23 mentions "unexplained thermal anomalies" but the next 8 pages are blacked out.', likes: 189, replies: 8 },
    { user: 'thermal_anon', time: '7m ago', text: 'Just checked Sentinel-2. New pass from 3 hours ago. 51 signatures now. They\'re multiplying or we\'re being shown more.', likes: 445, replies: 23 },
  ],
  3: [
    { user: 'wayback_hunter', time: '1m ago', text: 'I found 3 copies that weren\'t deleted. All have different EXIF data. One says 2024, one 2047, one has no date at all.', likes: 567, replies: 34 },
    { user: 'exif_reader', time: '3m ago', text: 'The camera model in the 2047 copy doesn\'t exist. I checked every manufacturer database. It\'s not a typo. It\'s listed as "CLASSIFIED"', likes: 398, replies: 19 },
    { user: 'photo_404', time: '5m ago', text: 'Printed it. The paper is warm. Not metaphorically. Actual temperature 3 degrees above room. Been 2 hours.', likes: 723, replies: 41 },
  ],
  4: [
    { user: 'time_watcher', time: 'now', text: 'It\'s 3:31 AM for me right now. Reading this thread. Should I close the tab? Serious question.', likes: 1293, replies: 87 },
    { user: 'survivor_03', time: '2m ago', text: 'I searched it 6 months ago. Nothing happened to me. Unless... wait, why can\'t I remember last Tuesday?', likes: 892, replies: 56 },
    { user: 'archivist', time: '4m ago', text: 'The 12 cases are documented in archive #011 through #022. All have the same final search term. We don\'t publish it here.', likes: 1204, replies: 93 },
  ],
};

export default function Modal({ isOpen, onClose, type, data }) {
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likes, setLikes] = useState(data?.likes || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [viewers, setViewers] = useState(data?.watching || 847);
  const videoRef = useRef(null);
  const duration = type === 'short' ? 31 : 0;

  useEffect(() => {
    if (!isOpen || !data) return;
    
    // Load real comments based on ID
    if (type === 'short') {
      setComments(shortComments[data.id] || shortComments[1]);
      setLikes(data.likes);
    } else if (type === 'fact') {
      setComments(factComments[data.id] || factComments[1]);
    }
    
    setViewers(data.watching || 847);
    setCurrentTime(0);
    setIsPlaying(true);
  }, [isOpen, data, type]);

  // Video playback simulation
  useEffect(() => {
    if (!isOpen || type !== 'short' || !isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return prev + 0.1;
      });
      
      // Random viewer fluctuation
      if (Math.random() > 0.7) {
        setViewers(v => Math.max(50, v + Math.floor(Math.random() * 10) - 4));
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isOpen, type, isPlaying, duration]);

  // Auto-add comments to simulate live discussion
  useEffect(() => {
    if (!isOpen || type === 'mystery') return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.6 && comments.length < 8) {
        const newUsers = ['ghost_user', 'anon_watcher', 'freq_reader', 'night_owl_33'];
        const newTexts = [
          'Wait. Rewatch 0:19. Did anyone else see that?',
          'My audio just cut out at that exact moment. Coincidence?',
          'Checking archive now. This matches #047 doesn\'t it?',
          'I\'m saving this. They delete these fast.',
        ];
        setComments(prev => [...prev.slice(-3), {
          user: newUsers[Math.floor(Math.random() * newUsers.length)],
          time: 'now',
          text: newTexts[Math.floor(Math.random() * newTexts.length)],
          likes: Math.floor(Math.random() * 50),
          viewing: true,
        }]);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isOpen, type, comments.length]);

  if (!isOpen || !data) return null;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    if (liked) {
      setLikes(l => l - 1);
      setLiked(false);
    } else {
      setLikes(l => l + 1);
      setLiked(true);
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [{
      user: 'you_anon',
      time: 'now',
      text: newComment,
      likes: 0,
      viewing: true,
    }, ...prev.slice(0, 5)]);
    setNewComment('');
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50"
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 pointer-events-none overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-7xl my-8 bg-zinc-950 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden flex flex-col xl:flex-row max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Left - Media Player or Image */}
              <div className="xl:w-[460px] bg-black relative flex-shrink-0 flex flex-col">
                {type === 'short' && (
                  <>
                    {/* Video player area */}
                    <div className="relative aspect-[9/16] bg-zinc-950 overflow-hidden">
                      <img 
                        src={data.thumb} 
                        alt={data.title} 
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Video overlay with play state */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      
                      {/* Top bar */}
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-20">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 backdrop-blur-md text-xs font-bold text-white shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                          LIVE • {viewers.toLocaleString()}
                        </div>
                        <button 
                          onClick={onClose} 
                          className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>

                      {/* Center play/pause */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <motion.button
                          whileTap={{ scale: 0.92 }}
                          onClick={togglePlay}
                          className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-2xl border border-white/30 flex items-center justify-center hover:bg-white/20 transition-all shadow-2xl"
                        >
                          {isPlaying ? (
                            <Pause className="w-8 h-8 text-white fill-white" />
                          ) : (
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                          )}
                        </motion.button>
                      </div>

                      {/* Video info overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <div className="mb-4">
                          <h3 className="text-2xl font-serif text-white leading-tight mb-1">{data.title}</h3>
                          <p className="text-xs text-zinc-400">FACELess • No faces • 3:33 AM investigation</p>
                        </div>

                        {/* Progress bar - ACTUALLY ANIMATES */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2 text-xs font-mono text-zinc-300">
                            <span>{formatTime(currentTime)}</span>
                            <span className="text-zinc-500">LIVE</span>
                            <span>{data.duration}</span>
                          </div>
                          <div className="h-1.5 bg-white/15 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-violet-400 relative"
                              style={{ width: `${(currentTime / duration) * 100}%` }}
                            >
                              <div className="absolute right-0 top-0 bottom-0 w-12 bg-white/40 blur-md" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={togglePlay}
                            className="px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors"
                          >
                            {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                          </button>
                          <button 
                            onClick={() => setIsMuted(!isMuted)}
                            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20"
                          >
                            {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
                          </button>
                          <div className="ml-auto flex items-center gap-3 text-xs text-zinc-400">
                            <span className="flex items-center gap-1.5">
                              <Eye className="w-3.5 h-3.5" />
                              {(data.views / 1000000).toFixed(1)}M
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Playing indicator */}
                      {isPlaying && (
                        <div className="absolute top-20 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/30 text-xs text-emerald-300 font-medium flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          PLAYING • HEADPHONES RECOMMENDED
                        </div>
                      )}
                    </div>

                    {/* Action buttons below video */}
                    <div className="p-4 bg-zinc-950 border-t border-white/5 flex items-center justify-around">
                      {[
                        { icon: Heart, label: (likes / 1000).toFixed(1) + 'K', action: handleLike, active: liked, color: 'red' },
                        { icon: MessageSquare, label: comments.length + '', action: () => {}, active: false, color: 'emerald' },
                        { icon: Share2, label: 'Share', action: () => {}, active: false, color: 'violet' },
                      ].map((btn, i) => (
                        <button
                          key={i}
                          onClick={btn.action}
                          className="flex flex-col items-center gap-1.5 group min-w-[80px]"
                        >
                          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                            btn.active && btn.color === 'red'
                              ? 'bg-red-500 border-red-400 shadow-lg shadow-red-500/25' 
                              : 'bg-zinc-900 border-white/10 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10'
                          }`}>
                            <btn.icon className={`w-5 h-5 ${btn.active ? 'fill-white text-white' : 'text-zinc-300 group-hover:text-emerald-300'}`} />
                          </div>
                          <span className="text-xs text-zinc-400 font-medium">{btn.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {(type === 'mystery' || type === 'fact') && (
                  <div className="relative flex-1 min-h-[400px] xl:min-h-0">
                    <img src={data.image || data.thumb} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />
                    
                    <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors z-20">
                      <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      {data.badge && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600 text-xs font-bold text-white mb-4 shadow-lg">
                          <Zap className="w-3 h-3 fill-white" />
                          {data.badge}
                        </div>
                      )}
                      <h2 className="text-3xl lg:text-4xl font-serif text-white leading-[0.9] mb-3">
                        {data.title}
                      </h2>
                      <p className="text-zinc-300 text-sm leading-relaxed max-w-md">
                        {data.subtitle || data.body?.slice(0, 120) + '...'}
                      </p>
                      
                      {type === 'fact' && data.tags && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {data.tags.map(tag => (
                            <span key={tag} className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-medium text-emerald-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Live viewing pill */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-emerald-500/30 text-xs font-medium text-emerald-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {viewers} INVESTIGATING NOW
                    </div>
                  </div>
                )}
              </div>

              {/* Right - Content & Live Comments */}
              <div className="flex-1 flex flex-col min-w-0 bg-zinc-950">
                {/* Header stats */}
                <div className="p-6 lg:p-8 border-b border-white/5">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-300 mb-3">
                        <AlertCircle className="w-3 h-3" />
                        LIVE INVESTIGATION • REAL TIME
                      </div>
                      <h3 className="text-xl lg:text-2xl font-serif text-white mb-2">
                        {type === 'short' ? 'Frame-by-Frame Analysis' : 'Case File • Declassified Pages'}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
                        {type === 'short' && 'Investigators are analyzing this short in real-time. Comments update live. No moderation.'}
                        {type === 'mystery' && 'Declassified 2023 • 47 pages released • Viewer discretion advised for pages 11-23.'}
                        {type === 'fact' && 'Physical archive only • Never digitized • Page numbers reference original print edition.'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Watching', value: viewers.toLocaleString(), sub: '+12 now', live: true },
                      { label: 'Comments', value: comments.length + '', sub: 'live', live: true },
                      { label: 'Completion', value: '73%', sub: 'avg watch', live: false },
                    ].map((stat, i) => (
                      <div key={i} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
                        <div className="flex items-baseline gap-2 mb-0.5">
                          <span className="text-xl lg:text-2xl font-mono text-white font-light">{stat.value}</span>
                          {stat.live && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                        </div>
                        <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-medium">{stat.label}</div>
                        <div className="text-xs text-emerald-400 mt-0.5">{stat.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Comments - ACTUALLY WORKS */}
                <div className="flex-1 overflow-y-auto p-6 lg:p-8" style={{ maxHeight: '400px' }}>
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-xs tracking-widest text-zinc-400 uppercase font-bold flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      LIVE THREAD • {comments.filter(c => c.viewing).length} TYPING
                    </h4>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium">
                      NO MODERATION
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {comments.map((comment, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group p-4 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-emerald-500/20 hover:bg-zinc-900 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center flex-shrink-0 font-mono text-sm text-zinc-400 group-hover:border-emerald-500/30 group-hover:text-emerald-300 transition-colors">
                            {comment.user.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 flex-wrap mb-1.5">
                              <span className="font-mono text-xs text-white font-medium">{comment.user}</span>
                              <span className="text-xs text-zinc-600">•</span>
                              <span className="text-xs text-zinc-500">{comment.time}</span>
                              {comment.viewing && (
                                <span className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-[10px] text-emerald-400 font-medium">
                                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                  viewing
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-zinc-200 leading-relaxed font-light">{comment.text}</p>
                            <div className="flex items-center gap-4 mt-2.5">
                              <button className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-400 transition-colors">
                                <Heart className="w-3 h-3" />
                                {comment.likes}
                              </button>
                              <button className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Reply</button>
                              <span className="text-xs text-zinc-700 ml-auto">faceless • encrypted</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {comments.length === 0 && (
                    <div className="text-center py-12 text-zinc-600 text-sm">
                      No comments yet. Be the first investigator.
                    </div>
                  )}
                </div>

                {/* Comment input - ACTUALLY WORKS */}
                <div className="p-4 lg:p-6 border-t border-white/5 bg-zinc-900/80 backdrop-blur-xl">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 font-mono text-xs text-emerald-400">
                      YOU
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                        placeholder="Add to investigation... (anonymous • no login)"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-white/10 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/40 focus:bg-zinc-800/80 transition-all"
                      />
                      <div className="flex items-center justify-between mt-2 px-1">
                        <span className="text-[10px] text-zinc-600">Faceless • Encrypted • Posts appear instantly</span>
                        <button
                          onClick={handleAddComment}
                          disabled={!newComment.trim()}
                          className="px-3 py-1 rounded-lg bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          POST ANON
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}