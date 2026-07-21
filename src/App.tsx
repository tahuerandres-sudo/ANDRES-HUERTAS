import React, { useState, useEffect } from 'react';
import { FloatingBackground } from './components/FloatingBackground';
import { VocabularyExplorer } from './components/VocabularyExplorer';
import { SortingGame } from './components/SortingGame';
import { QuizSection } from './components/QuizSection';
import { GrammarGuide } from './components/GrammarGuide';
import { FlashcardsView } from './components/FlashcardsView';
import { NOUNS_DATABASE, QUIZ_QUESTIONS } from './data/nounsData';
import { UserStats } from './types';
import { BookOpen, Zap, HelpCircle, BookMarked, Pause, Play, Sparkles, Award, Trophy, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explorer' | 'flashcards' | 'sorting' | 'quiz' | 'guide'>('explorer');
  const [isBackgroundPaused, setIsBackgroundPaused] = useState(false);

  // User Stats & LocalStorage state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('accounting_noun_bookmarks');
      return saved ? JSON.parse(saved) : ['invoice', 'equipment', 'revenue'];
    } catch {
      return ['invoice', 'equipment', 'revenue'];
    }
  });

  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('accounting_noun_stats');
      return saved ? JSON.parse(saved) : { score: 0, quizzesCompleted: 0, sortingHighStreak: 0, bookmarkedIds: [] };
    } catch {
      return { score: 0, quizzesCompleted: 0, sortingHighStreak: 0, bookmarkedIds: [] };
    }
  });

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('accounting_noun_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('accounting_noun_stats', JSON.stringify(stats));
    } catch (e) {
      console.error(e);
    }
  }, [stats]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateSortingStreak = (streak: number) => {
    setStats((prev) => ({
      ...prev,
      sortingHighStreak: Math.max(prev.sortingHighStreak, streak),
    }));
  };

  const handleUpdateSortingScore = (points: number) => {
    setStats((prev) => ({
      ...prev,
      score: prev.score + points,
    }));
  };

  const handleQuizComplete = (quizScore: number) => {
    setStats((prev) => ({
      ...prev,
      score: prev.score + quizScore * 25,
      quizzesCompleted: prev.quizzesCompleted + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] selection:bg-emerald-500 selection:text-slate-950 relative font-sans">
      {/* Floating Animated Emojis Background */}
      <FloatingBackground isPaused={isBackgroundPaused} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-10">
        {/* Header Section */}
        <header className="space-y-6 pt-2 border-b border-white/10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-mono-code uppercase tracking-[0.3em] text-[#94a3b8] mb-2 font-semibold">
                <Sparkles size={14} className="text-emerald-400" />
                Module 04 // Grammar for Finance
              </div>

              <h1 className="text-4xl sm:text-6xl font-serif-italic text-white tracking-tight leading-none">
                The Accountant's Lexicon
              </h1>
              <p className="text-sm sm:text-base text-slate-400 font-light mt-2 max-w-xl">
                Master Countable & Uncountable Nouns in Financial Communication
              </p>
            </div>

            {/* Quick Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('explorer');
                  const element = document.getElementById('main-content');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2"
              >
                <BookOpen size={16} />
                Start Learning
              </button>

              <button
                onClick={() => setIsBackgroundPaused(!isBackgroundPaused)}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 font-mono-code text-xs tracking-wider rounded-sm transition-all cursor-pointer flex items-center gap-2"
              >
                {isBackgroundPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} />}
                {isBackgroundPaused ? 'Resume' : 'Pause BG'}
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
              <span className="text-[10px] font-mono-code text-[#64748b] uppercase tracking-widest block">Lexicon Scope</span>
              <span className="text-lg font-mono-code text-emerald-400 font-semibold">{NOUNS_DATABASE.length} Nouns</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
              <span className="text-[10px] font-mono-code text-[#64748b] uppercase tracking-widest block">Mastery Score</span>
              <span className="text-lg font-mono-code text-emerald-400 font-semibold">{stats.score} PTS</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
              <span className="text-[10px] font-mono-code text-[#64748b] uppercase tracking-widest block">High Streak</span>
              <span className="text-lg font-mono-code text-amber-400 font-semibold">{stats.sortingHighStreak} 🔥</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-sm">
              <span className="text-[10px] font-mono-code text-[#64748b] uppercase tracking-widest block">Bookmarked</span>
              <span className="text-lg font-mono-code text-sky-400 font-semibold">{bookmarkedIds.length} Terms</span>
            </div>
          </div>
        </header>

        {/* Navigation Tabs Bar */}
        <div id="main-content" className="bg-[#0a0a0a] p-1.5 rounded-sm border border-white/10 flex items-center justify-start gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-4 py-2 rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeTab === 'explorer'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <BookOpen size={14} />
            <span>01 // Lexicon</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeTab === 'flashcards'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Layers size={14} />
            <span>02 // Flashcards</span>
          </button>

          <button
            onClick={() => setActiveTab('sorting')}
            className={`px-4 py-2 rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeTab === 'sorting'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Zap size={14} />
            <span>03 // Arena</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeTab === 'quiz'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <HelpCircle size={14} />
            <span>04 // Quiz</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded-sm text-xs font-mono-code uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap border ${
              activeTab === 'guide'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <BookMarked size={14} />
            <span>05 // Handbook</span>
          </button>
        </div>

        {/* Tab Content Rendering */}
        <main className="transition-all duration-300">
          {activeTab === 'explorer' && (
            <VocabularyExplorer
              nouns={NOUNS_DATABASE}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsView nouns={NOUNS_DATABASE} />
          )}

          {activeTab === 'sorting' && (
            <SortingGame
              nouns={NOUNS_DATABASE}
              onUpdateStreak={handleUpdateSortingStreak}
              onUpdateScore={handleUpdateSortingScore}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizSection
              questions={QUIZ_QUESTIONS}
              onQuizComplete={handleQuizComplete}
            />
          )}

          {activeTab === 'guide' && <GrammarGuide />}
        </main>

        {/* Footer */}
        <footer className="pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-code text-[#64748b] border-t border-white/10 gap-4">
          <p className="uppercase tracking-widest">
            Module 04 // Accounting Lexicon Guide
          </p>
          <p className="tracking-wider text-[#475569]">
            FINANCIAL GRAMMAR SYSTEM • VER 1.0
          </p>
        </footer>
      </div>
    </div>
  );
}
