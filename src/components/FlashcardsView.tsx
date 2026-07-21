import React, { useState } from 'react';
import { NounItem } from '../types';
import * as Icons from 'lucide-react';
import { Volume2, RotateCw, Shuffle, ChevronLeft, ChevronRight, CheckCircle, HelpCircle } from 'lucide-react';

interface FlashcardsViewProps {
  nouns: NounItem[];
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({ nouns }) => {
  const [deck, setDeck] = useState<NounItem[]>(nouns);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const currentNoun = deck[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSpeak = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.9;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!currentNoun) return null;

  const IconComponent = (Icons as Record<string, React.ElementType>)[currentNoun.iconName] || Icons.FileText;
  const isMastered = masteredIds.includes(currentNoun.id);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header controls */}
      <div className="bg-[#0a0a0a] p-4 rounded-sm border border-white/10 flex items-center justify-between text-xs font-mono-code text-slate-300">
        <div>
          Card <strong className="text-emerald-400">{currentIndex + 1}</strong> of <strong>{deck.length}</strong>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-emerald-400">Mastered: {masteredIds.length}</span>
          <button
            onClick={handleShuffle}
            className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 rounded-sm transition-colors flex items-center gap-1 uppercase tracking-wider text-[11px]"
            title="Shuffle deck"
          >
            <Shuffle size={13} />
            <span>Shuffle</span>
          </button>
        </div>
      </div>

      {/* 3D Flip Card Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 cursor-pointer perspective-1000 group"
      >
        <div
          className={`w-full h-full relative rounded-sm transition-all duration-300 border ${
            isFlipped ? '' : ''
          } ${
            isMastered
              ? 'bg-[#0a0a0a] border-emerald-500/50'
              : 'bg-[#0a0a0a] border-white/10 hover:border-white/30'
          } p-8 flex flex-col justify-between shadow-2xl`}
        >
          {/* Front Face */}
          {!isFlipped ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
              {currentNoun.imageUrl ? (
                <div className="w-24 h-24 rounded-sm overflow-hidden border border-white/10 relative shrink-0 shadow-lg bg-white/5">
                  <img
                    src={currentNoun.imageUrl}
                    alt={currentNoun.word}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="p-4 rounded-sm bg-white/5 text-emerald-400 border border-white/10">
                  <IconComponent size={32} />
                </div>
              )}

              <div>
                <h2 className="text-3xl font-serif-italic text-white tracking-tight flex items-center justify-center gap-2">
                  {currentNoun.word}
                  <button
                    onClick={(e) => handleSpeak(e, currentNoun.word)}
                    className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                  >
                    <Volume2 size={16} />
                  </button>
                </h2>
                <p className="text-[11px] font-mono-code text-slate-400 mt-1">Click card to reveal grammar details</p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-emerald-400 uppercase tracking-wider">
                <RotateCw size={13} />
                <span>Tap to Flip</span>
              </div>
            </div>
          ) : (
            /* Back Face */
            <div className="flex flex-col justify-between h-full text-center space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-mono-code uppercase tracking-widest px-2.5 py-1 rounded-sm border ${
                    currentNoun.type === 'countable'
                      ? 'bg-sky-500/10 text-sky-300 border-sky-500/30'
                      : currentNoun.type === 'uncountable'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {currentNoun.type}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMastered(currentNoun.id);
                  }}
                  className={`px-3 py-1 rounded-sm text-xs font-mono-code uppercase tracking-wider flex items-center gap-1 transition-colors border ${
                    isMastered
                      ? 'bg-emerald-500 text-slate-950 border-emerald-500 font-semibold'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <CheckCircle size={13} />
                  {isMastered ? 'Mastered' : 'Mark Mastered'}
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-serif-italic text-white mb-2">{currentNoun.word}</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto font-light">
                  {currentNoun.definition}
                </p>
              </div>

              {currentNoun.partitive && (
                <div className="bg-emerald-950/20 p-2.5 rounded-sm border border-emerald-500/30 text-xs text-emerald-300 font-mono-code">
                  Partitive: {currentNoun.partitive}
                </div>
              )}

              <div className="text-xs font-serif-italic text-slate-400 italic">
                "{currentNoun.example}"
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-sm font-mono-code text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <button
          onClick={handleNext}
          className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-sm font-mono-code font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
        >
          Next Card
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
