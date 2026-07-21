import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';

interface QuizSectionProps {
  questions: QuizQuestion[];
  onQuizComplete: (score: number) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ questions, onQuizComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    setIsSubmitted(true);

    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsComplete(true);
      onQuizComplete(score + (selectedOption === currentQ.correctAnswer ? 1 : 0));
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-sm p-8 text-center space-y-6 shadow-2xl animate-fadeIn">
        <div className="w-16 h-16 bg-white/5 text-emerald-400 rounded-sm flex items-center justify-center mx-auto border border-white/10">
          <Award size={32} />
        </div>

        <div>
          <h2 className="text-3xl font-serif-italic text-white">Quiz Completed!</h2>
          <p className="text-xs font-mono-code text-slate-400 mt-1 uppercase tracking-wider">Accounting Grammar Performance</p>
        </div>

        <div className="bg-white/5 p-6 rounded-sm border border-white/10 space-y-2 font-mono-code">
          <span className="text-4xl font-bold text-emerald-400">{percentage}%</span>
          <p className="text-xs text-slate-300">
            You scored <strong>{score}</strong> out of <strong>{questions.length}</strong> questions correctly.
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono-code font-semibold rounded-sm text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw size={16} />
          Retake Grammar Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Quiz Progress Header */}
      <div className="bg-[#0a0a0a] p-5 rounded-sm border border-white/10 shadow-xl flex items-center justify-between font-mono-code">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-emerald-400" />
          <span className="text-xs uppercase tracking-wider text-white">
            Accounting Quantifier Quiz
          </span>
        </div>
        <span className="text-xs text-slate-400 border border-white/10 bg-white/5 px-3 py-1 rounded-sm">
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Main Question Card */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 sm:p-8 shadow-xl space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-mono-code uppercase tracking-widest text-slate-400">Fill in the blank</span>
          <h3 className="text-xl sm:text-2xl font-serif-italic text-white leading-snug">
            {currentQ.sentence}
          </h3>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 gap-3 font-mono-code">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === currentQ.correctAnswer;

            let btnStyle = 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/10';

            if (isSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300 font-semibold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-rose-950/30 border-rose-500/50 text-rose-300';
              }
            } else if (isSelected) {
              btnStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-semibold';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                disabled={isSubmitted}
                className={`w-full text-left p-4 rounded-sm border text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <span>{opt}</span>
                {isSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                {isSubmitted && isSelected && !isCorrect && <XCircle size={16} className="text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Action button */}
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-mono-code font-semibold uppercase tracking-wider text-xs rounded-sm transition-all cursor-pointer"
          >
            Check Answer
          </button>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Explanation box */}
            <div className="bg-white/5 p-4 rounded-sm border border-white/10 text-xs text-slate-300 space-y-1">
              <strong className="text-emerald-400 block font-mono-code uppercase tracking-wider text-[11px]">Accounting Grammar Explanation:</strong>
              <p className="font-light">{currentQ.explanation}</p>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono-code font-semibold uppercase tracking-wider text-xs rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Final Score'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
