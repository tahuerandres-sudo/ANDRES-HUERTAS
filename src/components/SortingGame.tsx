import React, { useState, useEffect } from 'react';
import { NounItem, NounType } from '../types';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Flame, Trophy, CheckCircle2, XCircle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface SortingGameProps {
  nouns: NounItem[];
  onUpdateStreak: (streak: number) => void;
  onUpdateScore: (points: number) => void;
}

export const SortingGame: React.FC<SortingGameProps> = ({
  nouns,
  onUpdateStreak,
  onUpdateScore,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledNouns, setShuffledNouns] = useState<NounItem[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    message: string;
    chosenType: NounType;
  } | null>(null);

  // Start / Restart Game
  const startGame = () => {
    const shuffled = [...nouns].sort(() => Math.random() - 0.5);
    setShuffledNouns(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(45);
    setGameOver(false);
    setFeedback(null);
    setIsPlaying(true);
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            setIsPlaying(false);
            if (score > 100) {
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, gameOver, timeLeft, score]);

  const currentNoun = shuffledNouns[currentIndex];

  const handleGuess = (type: NounType) => {
    if (!currentNoun || feedback) return;

    const isCorrect = currentNoun.type === type;

    if (isCorrect) {
      const newStreak = streak + 1;
      const streakBonus = Math.floor(newStreak / 3) * 5;
      const points = 10 + streakBonus;

      setScore((prev) => prev + points);
      setStreak(newStreak);
      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
        onUpdateStreak(newStreak);
      }
      onUpdateScore(points);

      setFeedback({
        isCorrect: true,
        chosenType: type,
        message: `Correct! "${currentNoun.word}" is ${type}. ${currentNoun.example}`,
      });

      if (newStreak % 5 === 0) {
        confetti({ particleCount: 50, spread: 60 });
      }
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        chosenType: type,
        message: `Oops! "${currentNoun.word}" is actually ${currentNoun.type.toUpperCase()}. ${
          currentNoun.type === 'uncountable'
            ? 'It cannot be pluralized with -s.'
            : currentNoun.type === 'countable'
            ? 'It can be individually counted (e.g. 1 invoice, 2 invoices).'
            : 'It varies depending on accounting context.'
        }`,
      });
    }

    // Auto advance after short delay
    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < shuffledNouns.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // reshuffle if reached end
        setShuffledNouns([...nouns].sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
      }
    }, 1800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#0a0a0a] p-6 rounded-sm border border-white/10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h2 className="text-2xl font-serif-italic text-white flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="text-emerald-400" size={22} />
            Accounting Noun Sorting Arena
          </h2>
          <p className="text-xs font-light text-slate-400 mt-1 max-w-lg">
            Test your speed! Classify accounting terms into Countable, Uncountable, or Dual context before time runs out.
          </p>
        </div>

        {!isPlaying && !gameOver && (
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono-code font-semibold uppercase tracking-wider text-xs rounded-sm transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Play size={16} fill="currentColor" />
            Start Arena
          </button>
        )}
      </div>

      {/* Game Stats Bar */}
      {isPlaying && (
        <div className="grid grid-cols-3 gap-4 text-center font-mono-code">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-3">
            <span className="text-[10px] text-slate-400 block uppercase tracking-widest">Score</span>
            <span className="text-2xl font-bold text-emerald-400">{score}</span>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-3">
            <span className="text-[10px] text-slate-400 block uppercase tracking-widest">Streak</span>
            <span className="text-2xl font-bold text-amber-400 flex items-center justify-center gap-1">
              <Flame size={18} className="fill-amber-400" />
              {streak}
            </span>
          </div>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-3">
            <span className="text-[10px] text-slate-400 block uppercase tracking-widest">Time</span>
            <span
              className={`text-2xl font-bold ${
                timeLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-emerald-400'
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
      )}

      {/* Game Card / Play Area */}
      {isPlaying && currentNoun && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-8 relative overflow-hidden text-center space-y-6">
          {/* Progress bar */}
          <div className="w-full bg-white/5 h-1.5 absolute top-0 left-0 right-0">
            <div
              className="bg-emerald-400 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 45) * 100}%` }}
            ></div>
          </div>

          <div className="pt-2">
            <span className="text-[10px] font-mono-code uppercase tracking-widest px-3 py-1 bg-white/5 text-slate-400 rounded-sm border border-white/10">
              Vocabulary Item #{currentIndex + 1}
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif-italic text-white mt-4 tracking-tight">
              {currentNoun.word}
            </h1>
            <p className="text-xs text-slate-300 italic mt-2 max-w-md mx-auto font-serif-italic">
              "{currentNoun.definition}"
            </p>
          </div>

          {/* Feedback Overlay Message */}
          {feedback ? (
            <div
              className={`p-4 rounded-sm border text-xs font-mono-code animate-fadeIn ${
                feedback.isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-300'
              }`}
            >
              <div className="flex items-center justify-center gap-2 font-bold mb-1 uppercase tracking-wider">
                {feedback.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                {feedback.isCorrect ? 'Well Done!' : 'Grammar Note'}
              </div>
              {feedback.message}
            </div>
          ) : (
            <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">Select the classification:</div>
          )}

          {/* Classification Option Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <button
              onClick={() => handleGuess('countable')}
              disabled={!!feedback}
              className="p-4 bg-white/5 hover:bg-sky-500/10 border border-white/10 hover:border-sky-500/40 text-sky-300 rounded-sm font-mono-code transition-all disabled:opacity-50 flex flex-col items-center gap-1 cursor-pointer"
            >
              <span className="text-sm font-semibold uppercase tracking-wider">Countable</span>
              <span className="text-[11px] font-light text-slate-400">Has singular & plural (-s)</span>
            </button>

            <button
              onClick={() => handleGuess('uncountable')}
              disabled={!!feedback}
              className="p-4 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/40 text-emerald-400 rounded-sm font-mono-code transition-all disabled:opacity-50 flex flex-col items-center gap-1 cursor-pointer"
            >
              <span className="text-sm font-semibold uppercase tracking-wider">Uncountable</span>
              <span className="text-[11px] font-light text-slate-400">No plural (-s), uses partitives</span>
            </button>

            <button
              onClick={() => handleGuess('dual')}
              disabled={!!feedback}
              className="p-4 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 text-amber-300 rounded-sm font-mono-code transition-all disabled:opacity-50 flex flex-col items-center gap-1 cursor-pointer"
            >
              <span className="text-sm font-semibold uppercase tracking-wider">Dual / Context</span>
              <span className="text-[11px] font-light text-slate-400">Both (depends on usage)</span>
            </button>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-8 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-amber-500/10 text-amber-400 rounded-sm flex items-center justify-center mx-auto border border-amber-500/30">
            <Trophy size={30} />
          </div>

          <div>
            <h2 className="text-3xl font-serif-italic text-white">Time's Up!</h2>
            <p className="text-slate-400 mt-1 text-xs font-mono-code uppercase tracking-wider">Performance Summary</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto font-mono-code">
            <div className="bg-white/5 p-4 rounded-sm border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Final Score</span>
              <span className="text-2xl font-bold text-emerald-400">{score}</span>
            </div>
            <div className="bg-white/5 p-4 rounded-sm border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Best Streak</span>
              <span className="text-2xl font-bold text-amber-400">{bestStreak}</span>
            </div>
          </div>

          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono-code font-semibold rounded-sm text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw size={16} />
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};
