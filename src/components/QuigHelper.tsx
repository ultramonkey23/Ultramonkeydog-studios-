import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X } from "lucide-react";

const QUIG_MESSAGES = [
  "Hey! You looking at the slate? Good taste.",
  "I'm Quig! The Lab built me to heckle—I mean, help you out.",
  "Check out Bone League. The math is brutal, and I love it.",
  "Need a tutorial on how to scroll? Just kidding.",
  "Notice the glow? We don't use generic UI around here.",
  "If Cody asks, tell him I've been organizing the Vault.",
  "Systems-heavy games first. Everything else is just noise."
];

export default function QuigHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    // Pop up slightly after load to greet the user
    const timer = setTimeout(() => {
      if (!hasVisited) {
        setIsOpen(true);
        setHasVisited(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [hasVisited]);

  const cycleMessage = () => {
    setMessageIndex((prev) => (prev + 1) % QUIG_MESSAGES.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="pointer-events-auto bg-zinc-950 border border-amber-500/40 rounded-xl p-4 shadow-[0_0_20px_rgba(245,158,11,0.15)] max-w-xs relative group"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 bg-zinc-900 border border-zinc-700 rounded-full p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X size={12} />
            </button>
            <div className="flex gap-3">
              <div className="mt-0.5 shrink-0">
                {/* Quig Mascot Icon */}
                <div className="w-10 h-10 rounded-full bg-amber-950/40 border border-amber-500/50 flex items-center justify-center animate-pulse">
                  <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" strokeDasharray="3 2" />
                    <circle cx="9" cy="10" r="1.5" fill="currentColor" />
                    <circle cx="15" cy="10" r="1.5" fill="currentColor" />
                    <path d="M 9,15 Q 12,17 15,15" stroke="currentColor" />
                    <path d="M 4,8 L 2,4 L 6,6" stroke="currentColor" />
                    <path d="M 20,8 L 22,4 L 18,6" stroke="currentColor" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="font-mono text-[9px] font-bold text-amber-500 uppercase tracking-widest mb-1">
                  Quig (Tutorial Gremlin)
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {QUIG_MESSAGES[messageIndex]}
                </p>
                <button 
                  onClick={cycleMessage}
                  className="mt-3 text-[10px] font-mono text-zinc-500 hover:text-amber-400 transition-colors uppercase"
                >
                  [Poke Quig]
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) cycleMessage();
        }}
        className="pointer-events-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center group"
      >
        <MessageSquare size={20} className="group-hover:animate-bounce" />
      </button>
    </div>
  );
}
