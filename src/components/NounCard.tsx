import React, { useState } from 'react';
import { NounItem } from '../types';
import * as Icons from 'lucide-react';
import { Volume2, Bookmark, Check, X, AlertTriangle, HelpCircle } from 'lucide-react';

interface NounCardProps {
  noun: NounItem;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenDetail?: (noun: NounItem) => void;
}

export const NounCard: React.FC<NounCardProps> = ({
  noun,
  isBookmarked,
  onToggleBookmark,
  onOpenDetail,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamic Icon
  const IconComponent = (Icons as Record<string, React.ElementType>)[noun.iconName] || Icons.FileText;

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(noun.word);
      utterance.rate = 0.9;
      utterance.lang = 'en-US';
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const getTypeBadge = () => {
    switch (noun.type) {
      case 'countable':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[10px] font-mono-code uppercase tracking-wider bg-sky-500/10 text-sky-300 border border-sky-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Countable
          </span>
        );
      case 'uncountable':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[10px] font-mono-code uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Uncountable
          </span>
        );
      case 'dual':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[10px] font-mono-code uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Dual / Context
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className="group relative bg-[#0a0a0a] border border-white/10 rounded-sm p-5 hover:border-white/30 transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Optional Image Banner */}
        {noun.imageUrl && (
          <div className="mb-4 h-36 w-full overflow-hidden rounded-sm border border-white/10 relative bg-white/5">
            <img
              src={noun.imageUrl}
              alt={noun.word}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-70" />
          </div>
        )}

        {/* Top bar with Icon, Badge & Bookmark */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-sm bg-white/5 border border-white/10 text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
            <IconComponent size={24} />
          </div>

          <div className="flex items-center gap-2">
            {getTypeBadge()}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(noun.id);
              }}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark noun'}
              className={`p-1.5 rounded-sm border transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark size={15} className={isBookmarked ? 'fill-amber-400' : ''} />
            </button>
          </div>
        </div>

        {/* Word Title & Pronunciation */}
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-2xl font-serif-italic text-white tracking-tight group-hover:text-emerald-300 transition-colors">
            {noun.word}
          </h3>
          <button
            onClick={handleSpeak}
            className={`p-1.5 rounded-sm transition-colors ${
              isPlayingAudio ? 'bg-emerald-500 text-slate-950 animate-pulse' : 'text-slate-400 hover:text-emerald-400 hover:bg-white/5'
            }`}
            title="Listen to pronunciation"
          >
            <Volume2 size={16} />
          </button>
        </div>

        {/* Singular vs Plural Quick Info */}
        <div className="text-[11px] font-mono-code text-slate-400 mb-3 flex items-center gap-2">
          {noun.pluralForm ? (
            <span>Plural: <strong className="text-slate-200">{noun.pluralForm}</strong></span>
          ) : (
            <span className="text-emerald-400">No plural (-s)</span>
          )}
        </div>

        {/* Definition */}
        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed font-light">
          {noun.definition}
        </p>

        {/* Example Sentence Box */}
        <div className="bg-white/5 rounded-sm p-3 border border-white/10 text-xs text-slate-300 italic mb-3 font-serif-italic">
          "{noun.example}"
        </div>
      </div>

      {/* Expanded details or trigger */}
      <div className="mt-2 pt-3 border-t border-white/10">
        {isExpanded ? (
          <div className="space-y-3 pt-1 text-xs animate-fadeIn">
            {/* Quantifiers */}
            <div>
              <span className="font-mono-code text-[11px] uppercase tracking-wider text-slate-400 block mb-1">Common Quantifiers:</span>
              <div className="flex flex-wrap gap-1.5">
                {noun.quantifiers.map((q, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-sm bg-white/5 text-emerald-400 border border-white/10 font-mono-code text-[11px]"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>

            {/* Partitive */}
            {noun.partitive && (
              <div className="bg-emerald-950/20 border border-emerald-500/30 p-2.5 rounded-sm">
                <span className="font-mono-code text-[10px] uppercase tracking-wider text-emerald-400 block mb-0.5">Partitive Phrase:</span>
                <span className="text-emerald-300 font-mono-code text-xs">{noun.partitive}</span>
              </div>
            )}

            {/* Common Mistake Callout */}
            {noun.commonMistake && (
              <div className="bg-rose-950/20 border border-rose-500/30 p-2.5 rounded-sm space-y-1">
                <div className="flex items-center gap-1.5 text-rose-400 font-mono-code text-[11px] uppercase tracking-wider">
                  <AlertTriangle size={14} />
                  <span>Accounting Mistake:</span>
                </div>
                <div className="flex items-center gap-1 text-rose-300 font-mono-code text-xs">
                  <X size={12} className="text-rose-400 shrink-0" />
                  <span className="line-through">{noun.commonMistake.incorrect}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-mono-code text-xs">
                  <Check size={12} className="text-emerald-400 shrink-0" />
                  <span>{noun.commonMistake.correct}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 italic">
                  {noun.commonMistake.explanation}
                </p>
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="w-full text-center text-slate-400 hover:text-white py-1 text-xs font-mono-code uppercase tracking-wider underline cursor-pointer"
            >
              Show less
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs font-mono-code text-emerald-400 tracking-wider group-hover:translate-x-1 transition-transform">
            <span>EXPLORE GRAMMAR RULES</span>
            <span>&rarr;</span>
          </div>
        )}
      </div>
    </div>
  );
};
