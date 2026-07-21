import React, { useMemo } from 'react';

interface FloatingBackgroundProps {
  isPaused: boolean;
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ isPaused }) => {
  const icons = ['💰', '📈', '📊', '🧾', '💵', '🏦', '📑', '🪙', '💳', '📋', '💼', '🏷️'];

  const particleList = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      left: Math.random() * 96 + '%',
      duration: 12 + Math.random() * 14 + 's',
      delay: Math.random() * 10 + 's',
      fontSize: 20 + Math.random() * 26 + 'px',
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {particleList.map((p) => (
        <span
          key={p.id}
          className="absolute select-none opacity-20 transition-opacity duration-300"
          style={{
            left: p.left,
            fontSize: p.fontSize,
            animationName: 'floatAnimation',
            animationDuration: p.duration,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDelay: p.delay,
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        >
          {p.icon}
        </span>
      ))}
      <style>{`
        @keyframes floatAnimation {
          0% {
            transform: translateY(105vh) rotate(0deg);
          }
          100% {
            transform: translateY(-15vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
