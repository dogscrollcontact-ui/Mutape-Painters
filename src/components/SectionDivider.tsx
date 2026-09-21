import React from 'react';

interface SectionDividerProps {
  variant?: 'orange-sky' | 'subtle' | 'band';
  label?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'orange-sky',
  label,
}) => {
  if (variant === 'band') {
    return (
      <div className="w-full bg-[#120f2b] border-y border-[#262157] py-3 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Mutape Painters Zim • Official Service Standards</span>
          </span>
          <span className="hidden sm:inline text-sky-400">
            Harare • Chitungwiza • All Zimbabwe
          </span>
          <span className="text-orange-400 font-bold">
            From $35 / Room
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative py-4 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center">
          <div className="flex-grow border-t border-[#231e4e]" />
          {label ? (
            <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-slate-400 bg-[#090914] px-3 py-1 rounded-full border border-[#2b255e]">
              {label}
            </span>
          ) : (
            <div className="flex-shrink mx-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span className="w-2 h-2 rounded-full bg-pink-500" />
            </div>
          )}
          <div className="flex-grow border-t border-[#231e4e]" />
        </div>
      </div>
    </div>
  );
};
