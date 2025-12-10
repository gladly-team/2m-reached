import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, Share2, X, PartyPopper } from "lucide-react";
import { ModalProps } from "../types";
import { AnimatedCounter } from "./AnimatedCounter";
import { ConfettiEffect } from "./ConfettiEffect";

export const CelebrationModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Small delay for entrance animation, then trigger confetti
      setTimeout(() => setConfettiKey((prev) => prev + 1), 300);
    } else {
      setConfettiKey(0);
    }
  }, [isOpen]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Tab for a Cause - $2 Million Raised",
          text: "We just hit $2 Million raised for charity! Join the movement at tabforacause.org",
          url: "https://tab.gladly.io/2-million/",
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert("Thanks for sharing the news!");
    }
  };

  // Smoother, less "bouncy" entrance for a more professional feel
  const modalVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Apple-style easeOut
      },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <ConfettiEffect triggerKey={confettiKey} />

          {/* Backdrop - Darker and simpler */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0" onClick={onClose} />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Left Side: Visual/Community Focus - Flat Design */}
            <div className="relative w-full md:w-5/12 bg-[#5094fb] p-8 md:p-12 flex flex-col justify-between text-white overflow-hidden">
              {/* Decorative background pattern (CSS only, no heavy images) */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5094fb] opacity-40 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

              <div className="relative z-10">
                <Heart className="fill-white text-white w-12 h-12 mb-4" />
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                  Thank you,
                  <br />
                  Tabbers!
                </h2>
              </div>

              <div className="relative z-10 mt-8 md:mt-0 flex flex-col items-start">
                {/* Community Avatar Cluster */}
                <div className="w-full py-8 flex flex-wrap content-center px-2">
                  {[...Array(27)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#5094fb] bg-white overflow-hidden -ml-3 first:ml-0 -mt-2 relative shadow-sm hover:z-20 hover:scale-110 transition-transform duration-200"
                      style={{ zIndex: i + 1 }}
                    >
                      <img
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${i * 85 + 12}&backgroundColor=b6e3f4,c0aede,ffdfbf&mouth=smile`}
                        alt="Community member"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <p className="text-blue-50 text-xl font-medium leading-relaxed text-left w-full">
                  You joined a community of people dedicated to making the world better, one tab at a time.
                </p>
              </div>
            </div>

            {/* Right Side: The Stats & Action */}
            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <h3 className="text-slate-500 font-medium text-xl mb-2">Total raised for charity</h3>
                  <div className="font-display text-6xl md:text-7xl lg:text-8xl font-bold text-[#29be91] tracking-tight flex items-baseline gap-2 leading-none">
                    <AnimatedCounter from={1800000} to={2000000} prefix="$" duration={2.5} />
                  </div>
                </div>

                <p className="text-slate-600 text-xl leading-relaxed">
                  Every tab you opened helped! You fed children, expanded access to healthcare, protected animals, and supported communities in crisis. This is the power of
                  millions of tiny actions added together.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="https://tab.gladly.io/2-million/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#29be91] hover:bg-[#22a07a] text-white font-bold rounded-xl transition-colors group text-lg"
                  >
                    See Our Impact
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors text-lg"
                  >
                    <Share2 size={20} />
                    Share
                  </button>

                  <button
                    onClick={() => setConfettiKey((prev) => prev + 1)}
                    className="inline-flex items-center justify-center p-4 text-slate-400 hover:text-[#29be91] hover:bg-[#29be91]/10 font-bold rounded-xl transition-colors"
                    title="Throw Confetti Again"
                    aria-label="Throw Confetti Again"
                  >
                    <PartyPopper size={24} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
