import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Play, Pause, Share2, Heart, MessageSquare, Eye, Clock, AlertTriangle, FileText, MapPin, Radio, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

const shortComments = {
  1: [
    { user: 'anon_7f3k', time: 'now', text: 'PAUSE AT 0:13. Reflection in window wasn\'t there in first upload. Metadata changed.', likes: 47, viewing: true },
    { user: 'signal_hunter', time: '12s ago', text: '18.9kHz tone throughout. Spells coordinates in morse. I mapped it. Not joking.', likes: 128, viewing: true },
    { user: 'void_observer', time: '24s ago', text: 'Third frame from end. Zoom 400%. Text on glass: "THEY KNOW YOU\'RE WATCHING"', likes: 203, viewing: true },
  ],
  2: [
    { user: 'audio_ghost', time: 'now', text: 'Banned because 2% under 30 can hear it. They didn\'t want kids hearing the whisper.', likes: 342, viewing: true },
    { user: 'researcher_mute', time: '8s ago', text: 'Played for my nephew (14). He heard whispering. Wrote it down. I heard nothing.', likes: 156, viewing: true },
  ],
  4: [
    { user: 'dare_acceptor', time: 'now', text: 'I SEARCHED IT. Wifi cut at 3:33. Came back with all searches deleted. What the hell.', likes: 523, viewing: true },
    { user: 'anon_x9k2', time: '15s ago', text: 'UPDATE: He\'s offline. Last seen 4 min ago. Same as the 12 others.', likes: 401, viewing: true },
  ],
};

// Rich fact data with detailed investigation info
const factDetails = {
  1: {
    location: 'Pripyat, Ukraine • 30km Exclusion Zone',
    coordinates: '51.4045° N, 30.0542° E',
    discovered: 'March 2023 • Sentinel-2 thermal pass',
    evidence: [
      'Thermal satellite imagery shows 47 heat signatures moving in grid patterns between 02:00-04:00 UTC',
      'Official logs list zero population since 1986 evacuation',
      'Heat sources maintain 36.5°C - 37.2°C - human body temperature range',
      'Movement patterns avoid camera positions, suggest awareness of surveillance',
      'Last thermal pass (3 hours ago) shows 51 signatures - 4 new in 72 hours',
    ],
    documents: [
      'Declassified log page 23: "unexplained thermal anomalies - do not investigate"',
      'Pages 24-31 redacted in digital copies, physical archive shows radiation readings',
      '1991 KGB memo: "Project Lightkeeper - monitor but do not engage"',
    ],
    theories: 'Either unauthorized research team, or... something that learned to live there. Thermal signatures split into smaller groups at 3:33 AM, reconverge at dawn.',
    risk: 'HIGH • Location under active monitoring. Do not attempt entry. 3 investigators detained 2022 for drone flight over zone.',
  },
  2: {
    location: 'Arecibo Observatory, Puerto Rico',
    coordinates: '18.344°N, 66.752°W',
    discovered: 'August 15, 1977 • 23:16 EDT',
    evidence: [
      '72-second narrowband signal at 1420 MHz (hydrogen line frequency)',
      'Signal strength: 30 standard deviations above background noise',
      'Astronomer Jerry Ehman circled it in red pen, wrote "Wow!" in margin',
      'Never detected again despite 100+ hours of follow-up observation',
      'Original printout found 2023 with marginalia: "not terrestrial - check 011-023"',
    ],
    documents: [
      'Ehman\'s notebook page 47: coordinates scribbled but smudged - we enhanced it',
      'SETI log: signal originated from Sagittarius, no known stars at that position',
      '2023 analysis: signal contained pulsed pattern, not random noise',
    ],
    theories: 'Most likely natural phenomenon we don\'t understand. Least likely: intentional beacon. The marginalia coordinates point to... nowhere. Empty space. Unless we\'re using wrong epoch.',
    risk: 'LOW • But 12 radio telescopes pointed at those coordinates last month reported simultaneous interference. All 12. At 3:33 AM their local time.',
  },
  3: {
    location: 'Internet Archive • Wayback Machine',
    coordinates: 'Digital • Server logs • March 14 2024',
    discovered: '4,112 archive attempts • All failed after 03:33:00 UTC',
    evidence: [
      'Photo first archived 2019, accessible until March 14, 2024 at 03:33:00 UTC exactly',
      'After that timestamp: all 4,112 copies return 404 or 410 Gone',
      'We recovered one physical print from donor • EXIF: DateTimeOriginal 2047:03:14 03:33:00',
      'Camera model in EXIF: "CLASSIFIED" • not in any manufacturer database',
      'Physical photo shows warehouse with 47 crates • Each crate labeled with person\'s name',
    ],
    documents: [
      'Wayback server log: deletion request came from IP in Antarctica research station - station was unmanned',
      'Print donor: "Found in my grandfather\'s things. He died 1989. Photo is stamped 2047."',
      '47 names on crates cross-reference with 47 people who vanished searching archive #011',
    ],
    theories: 'Photo is from future or fake made to look like future. But the 47 names... all real people. All vanished. All searched for same thing. We have their search histories. Last query always same: 6 words we don\'t publish here.',
    risk: 'MEDIUM • Viewing the physical print causes mild headache in 23% of people. We don\'t know why. Don\'t print it.',
  },
  4: {
    location: 'Global • 12 countries • Same search term',
    coordinates: 'All timezones • Always 3:33 AM local',
    discovered: 'Pattern recognized 2023 • 12 cases 2021-2024',
    evidence: [
      '12 researchers • 12 countries • all searched identical 6-word phrase in native language',
      'All 12 last digital activity: 03:33:00 • plus or minus 2 seconds • their local timezone',
      'After 03:33: No emails, no logins, no credit card use, no phone pings - complete digital death',
      'Physical searches: 3 found safe but unable to remember 48 hours prior • 9 missing',
      'Common link: all accessed archive #011 through #022 in weeks before',
    ],
    documents: [
      'Police report (Berlin): laptop open to search results, cursor blinking at 03:33:07, user gone',
      'All 12 had downloaded same PDF from archive 3 days prior • we have it • won\'t share it here',
      'PDF page 47: single sentence, rest of page blacked out. Sentence: "They watch the watchers now."',
    ],
    theories: 'Not a coincidence. 3:33 isn\'t random - it\'s when human circadian rhythm hits lowest point. Easiest to... what? Extract? We don\'t publish the search term. You can find it. We advise against.',
    risk: 'EXTREME • We list this so you know. 23 people have searched it since we published this archive. 2 stopped posting 3 weeks ago. Their last post time? You guess.',
  },
  5: {
    location: '3 school basements • Ohio, Pennsylvania, Michigan',
    coordinates: 'Printed 1947 • Never digitized',
    discovered: '2022 • Renovation work • Basement storage',
    evidence: [
      'History textbook • "American Chronicles Vol. 3" • Publisher: closed 1948',
      'Chapter 12: "The 47 Days" • describes events October 1947 not in any other record',
      'Page 47 missing from 2 copies • third copy has page 47 but text is different language',
      'Language identified as constructed • not natural • deciphered: it\'s coordinates and dates',
      'Coordinates point to location in Nevada • dates are future dates • next one: 3 months from now',
    ],
    documents: [
      'Teachers manual found with book: "Skip chapter 12. Discuss if students ask. Do not photocopy."',
      '1947 newspaper archive: 3-day blackout October 12-14 • no papers published • reason: "technical difficulties"',
      'Nevada location is Area... well, you know. Satellite shows construction. New. Not on maps.',
    ],
    theories: 'Chapter describes 47 people who vanished for 47 days then returned changed. No memory. All drawn same symbol on whatever they could find. Symbol matches one we found in Pripyat. And in the Wow signal marginalia.',
    risk: 'MEDIUM • We scanned page 47. PDF corrupted 3 times during upload. Fourth time worked. File size changes every time you download it. Don\'t print page 47.',
  },
  6: {
    location: 'Audio • 18.9 kHz • Hearing test file',
    coordinates: 'Uploaded 2019 • 4.2M plays',
    discovered: 'Comments section • timestamps • 2% hear it',
    evidence: [
      'Tone at 18.9 kHz • most adults over 25 can\'t hear above 17 kHz • kids and some adults can',
      'Comments: 8,432 timestamps of "started hearing it at 0:23" • "stopped at 1:47" • "heard whisper at 2:11"',
      'We analyzed audio • whisper is real • says 6 words • we won\'t transcribe here',
      'People who hear it report hearing it later when no audio playing • especially at 3:33 AM',
      '23 people documented: heard tone, searched what it said, vanished • see archive #011',
    ],
    documents: [
      'Audiologist analysis: tone is not pure 18.9 • modulated • carries data in sidebands',
      'Decoded sidebands: GPS coordinates • They change daily • Always point to user\'s location + 47km',
      '47km away from each listener is... different place • But all places have same symbol carved somewhere',
    ],
    theories: 'It\'s a beacon. Or a test. 2% can hear it for a reason. The ones who vanished - all were in that 2%. We tested archive team. 3 of us can hear it. We don\'t listen anymore. Headphones off at 3:33.',
    risk: 'HIGH IF YOU CAN HEAR IT • If you\'re under 25 or have good hearing, you might hear whisper. Don\'t search what it says. Seriously. Use speakers not headphones. Lower volume.',
  },
};

const factComments = {
  1: [
    { user: 'satellite_guy', time: '2m ago', text: 'Grid patterns are deliberate. They\'re avoiding the old reactor 4 site specifically. Why avoid the most radioactive spot?', likes: 234, replies: 12 },
    { user: 'thermal_anon', time: '5m ago', text: 'New pass just in. 51 signatures. 4 new ones appeared between 3:31 and 3:35 AM. Exactly.', likes: 445, replies: 23 },
    { user: 'pripyat_reader', time: '8m ago', text: 'Page 23 of logs: "do not investigate" is handwritten over typed text. Different pen. Added later.', likes: 189, replies: 8 },
  ],
  3: [
    { user: 'wayback_hunter', time: '1m ago', text: 'Checked the 47 names against missing persons. All reported missing BETWEEN 2021-2024. Photo dated 2047.', likes: 567, replies: 34 },
    { user: 'exif_reader', time: '3m ago', text: 'Camera model "CLASSIFIED" - I FOIA requested it. Response: "No records. Do not follow up."', likes: 398, replies: 19 },
  ],
  4: [
    { user: 'time_watcher', time: 'now', text: 'It\'s 3:31 AM here. Reading this. Should I close tab? Serious.', likes: 1293, replies: 87 },
    { user: 'archivist', time: '4m ago', text: 'The 6 words are in archive #011. We don\'t publish them. You can find them. You shouldn\'t.', likes: 1204, replies: 93 },
  ],
};

export default function Modal({ isOpen, onClose, type, data }) {
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [viewers, setViewers] = useState(847);
  const [activeTab, setActiveTab] = useState('evidence');
  
  const duration = 31;
  const factDetail = data?.id ? factDetails[data.id] : null;

  useEffect(() => {
    if (!isOpen || !data) return;
    
    if (type === 'short') {
      setComments(shortComments[data.id] || shortComments[1]);
      setLikes(data.likes || 412000);
      setViewers(data.watching || 847);
      setCurrentTime(0);
      setIsPlaying(true);
    } else if (type === 'fact') {
      setComments(factComments[data.id] || factComments[1]);
      setViewers(data.watching || 342);
      setActiveTab('evidence');
    } else if (type === 'mystery') {
      setViewers(data.watchingNow || 1843);
    }
  }, [isOpen, data, type]);

  useEffect(() => {
    if (!isOpen || type !== 'short' || !isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime(prev => prev >= duration ? 0 : prev + 0.05);
      if (Math.random() > 0.85) setViewers(v => Math.max(50, v + Math.floor(Math.random() * 6) - 2));
    }, 50);
    return () => clearInterval(interval);
  }, [isOpen, type, isPlaying, duration]);

  if (!isOpen || !data) return null;

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleLike = () => { setLiked(!liked); setLikes(l => liked ? l - 1 : l + 1); };
  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments(prev => [{ user: 'you_anon', time: 'now', text: newComment, likes: 0, viewing: true }, ...prev.slice(0, 4)]);
    setNewComment('');
  };
  const formatTime = (sec) => { const s = Math.floor(sec % 60); const ms = Math.floor((sec % 1) * 10); return `0:${s.toString().padStart(2, '0')}.${ms}`; };
  const progress = (currentTime / duration) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-zinc-900/80 backdrop-blur-2xl z-[100]" />
          
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 lg:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="pointer-events-auto w-full max-w-7xl bg-white rounded-[28px] border border-zinc-200 shadow-2xl overflow-hidden flex flex-col xl:flex-row max-h-[92vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Left - Media */}
              <div className="xl:w-[460px] bg-zinc-950 relative flex-shrink-0">
                {type === 'short' ? (
                  <div className="relative aspect-[9/16] max-h-[78vh] mx-auto bg-black overflow-hidden">
                    <img src={data.thumb} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between z-20">
                      <div className="px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />LIVE • {viewers.toLocaleString()}
                      </div>
                      <button onClick={onClose} className="w-9 h-9 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-white/10">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <motion.button whileTap={{ scale: 0.9 }} onClick={togglePlay} className="w-20 h-20 rounded-full bg-white shadow-2xl flex items-center justify-center hover:scale-105 border-4 border-white/20">
                        {isPlaying ? <Pause className="w-8 h-8 text-zinc-900 fill-zinc-900" /> : <Play className="w-8 h-8 text-zinc-900 fill-zinc-900 ml-1" />}
                      </motion.button>
                    </div>
                    {isPlaying && (
                      <div className="absolute top-20 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center gap-2 z-20">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />PLAYING • 18.9KHZ
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                      <h3 className="text-white font-serif text-xl leading-tight mb-1 font-medium drop-shadow-lg">{data.title}</h3>
                      <p className="text-white/80 text-xs font-medium mb-4 drop-shadow">FACELess • No faces • 3:33 AM</p>
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2 text-xs font-mono text-white/90">
                          <span className="font-bold">{formatTime(currentTime)}</span>
                          <span className="text-white/60">/{data.duration}</span>
                          <span className="text-emerald-300 font-bold">● LIVE</span>
                        </div>
                        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={togglePlay} className="px-4 py-2 rounded-xl bg-white text-zinc-900 text-xs font-bold hover:bg-zinc-100 shadow-lg">
                          {isPlaying ? '⏸ PAUSE' : '▶ PLAY'}
                        </button>
                        <button onClick={() => setIsMuted(!isMuted)} className="w-9 h-9 rounded-xl bg-white/90 text-zinc-700 flex items-center justify-center hover:bg-white shadow-md border border-white/20">
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <div className="ml-auto text-right">
                          <div className="text-white text-xs font-bold">{(data.views / 1000000).toFixed(1)}M views</div>
                          <div className="text-white/60 text-[10px] font-medium">73% avg completion</div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute right-3 bottom-36 flex flex-col gap-2.5 z-20">
                      <button onClick={handleLike} className="flex flex-col items-center gap-1">
                        <div className={`w-11 h-11 rounded-2xl backdrop-blur-md border shadow-lg flex items-center justify-center ${liked ? 'bg-red-500 border-red-400' : 'bg-black/70 border-white/20'}`}>
                          <Heart className={`w-5 h-5 ${liked ? 'fill-white text-white' : 'text-white fill-white/80'}`} />
                        </div>
                        <span className="text-xs text-white font-bold drop-shadow">{(likes / 1000).toFixed(0)}K</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full min-h-[500px] bg-zinc-900">
                    <img src={data.image || data.thumb} alt={data.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/80 to-zinc-900/40" />
                    <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:bg-white/10 z-10">
                      <X className="w-4 h-4" />
                    </button>
                    
                    {/* Fact detail header */}
                    <div className="absolute top-4 left-4 right-20">
                      {factDetail && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-lg mb-3">
                          <MapPin className="w-3 h-3" />
                          {factDetail.location.split(' • ')[0]}
                        </div>
                      )}
                      {data.badge && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-lg ml-2">
                          <Zap className="w-3 h-3 fill-white" />
                          {data.badge}
                        </div>
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                      <h2 className="text-2xl lg:text-3xl font-serif text-white leading-tight mb-3 font-medium pr-4">{data.title}</h2>
                      <p className="text-zinc-200 text-sm font-medium leading-relaxed max-w-lg">{data.subtitle || data.body?.slice(0, 140)}</p>
                      
                      {factDetail && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-xs text-white font-mono">
                            {factDetail.coordinates}
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-amber-500/90 text-white text-xs font-bold">
                            RISK: {factDetail.risk.split(' • ')[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="absolute top-4 right-16 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur text-zinc-900 text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {viewers} VIEWING
                    </div>
                  </div>
                )}
              </div>

              {/* Right - Detailed info and comments */}
              <div className="flex-1 flex flex-col bg-white min-w-0">
                {type === 'fact' && factDetail ? (
                  <>
                    {/* Fact detail tabs */}
                    <div className="p-5 border-b border-zinc-200 bg-zinc-50">
                      <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                        {[
                          { id: 'evidence', label: 'EVIDENCE', icon: FileText },
                          { id: 'docs', label: 'DOCUMENTS', icon: Radio },
                          { id: 'theory', label: 'THEORY', icon: AlertTriangle },
                        ].map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                              activeTab === tab.id
                                ? 'bg-zinc-900 text-white shadow-sm'
                                : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50'
                            }`}
                          >
                            <tab.icon className="w-3 h-3" />
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      <div className="min-h-[140px]">
                        {activeTab === 'evidence' && (
                          <div className="space-y-2">
                            {factDetail.evidence.slice(0, 3).map((ev, i) => (
                              <div key={i} className="flex gap-2.5 text-xs">
                                <span className="text-emerald-600 font-bold mt-0.5">•</span>
                                <p className="text-zinc-700 font-medium leading-relaxed">{ev}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {activeTab === 'docs' && (
                          <div className="space-y-2">
                            {factDetail.documents.slice(0, 2).map((doc, i) => (
                              <div key={i} className="flex gap-2.5 text-xs">
                                <span className="text-violet-600 font-bold mt-0.5">📄</span>
                                <p className="text-zinc-700 font-medium leading-relaxed">{doc}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {activeTab === 'theory' && (
                          <div>
                            <p className="text-xs text-zinc-700 font-medium leading-relaxed mb-3">{factDetail.theories}</p>
                            <div className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs">
                              <AlertTriangle className="w-3 h-3 text-red-600" />
                              <span className="text-red-700 font-bold">{factDetail.risk}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Comments */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2.5" style={{ maxHeight: '280px' }}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wide flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          LIVE INVESTIGATION • {comments.length}
                        </h4>
                        <span className="text-[10px] px-2 py-1 rounded bg-emerald-100 text-emerald-700 font-bold">NO MODS</span>
                      </div>
                      {comments.map((c, i) => (
                        <div key={i} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:border-emerald-200 transition-colors">
                          <div className="flex gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-white border border-zinc-200 flex items-center justify-center font-mono text-[10px] text-zinc-600 font-bold shadow-sm">
                              {c.user[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-1.5 mb-1">
                                <span className="font-mono text-xs text-zinc-900 font-semibold">{c.user}</span>
                                <span className="text-xs text-zinc-400">•</span>
                                <span className="text-xs text-zinc-500 font-medium">{c.time}</span>
                                {c.viewing && <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">LIVE</span>}
                              </div>
                              <p className="text-xs text-zinc-700 leading-relaxed font-medium">{c.text}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Short/Mystery simple view */
                  <div className="p-5 border-b border-zinc-200 bg-zinc-50">
                    <h3 className="text-lg font-serif text-zinc-900 font-medium mb-3">
                      {type === 'short' ? 'Frame Analysis' : 'Case File'}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Watching', value: viewers.toLocaleString() },
                        { label: 'Comments', value: comments.length },
                        { label: 'Saved', value: '4.2K' },
                      ].map((s, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-white border border-zinc-200">
                          <div className="text-base font-mono text-zinc-900 font-semibold">{s.value}</div>
                          <div className="text-[10px] text-zinc-500 font-bold uppercase">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Comment input */}
                <div className="p-3 border-t border-zinc-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                      placeholder="Add finding... (anon)"
                      className="flex-1 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-2 focus:ring-emerald-100 font-medium"
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="px-3 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-zinc-800 disabled:opacity-30"
                    >
                      POST
                    </button>
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