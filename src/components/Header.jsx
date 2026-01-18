import React from 'react';
import { TreePine } from 'lucide-react';

export default function Header({ visitedCount, totalCount, progress }) {
  return (
    <header className="flex justify-between items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 bg-white shadow-sm z-20 border-b border-[#e0dfd5]">
      <div className="flex items-center gap-3 min-w-0">
        <div className="bg-[#2D5A27] text-white p-2 rounded-lg shrink-0">
          <TreePine size={20} className="sm:hidden" />
          <TreePine size={24} className="hidden sm:block" />
        </div>
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-extrabold tracking-wider text-[#2D5A27] uppercase truncate max-w-[62vw] sm:max-w-none">
            US National Parks
          </h1>
          <p className="hidden sm:block text-xs font-semibold text-[#8B5A2B] tracking-[0.2em] uppercase">Collector's Map</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        <div className="text-right hidden sm:block">
          <div className="text-xs font-bold text-[#888] uppercase tracking-wider mb-1">Collection Progress</div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#2D5A27]">{visitedCount}</span>
            <span className="text-sm text-[#999] font-medium">/ {totalCount}</span>
          </div>
        </div>

        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 48 48" className="w-full h-full transform -rotate-90">
            <circle cx="24" cy="24" r="20" stroke="#eee" strokeWidth="4" fill="none" />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#E67E22"
              strokeWidth="4"
              fill="none"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 - (125.6 * progress) / 100}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-[#E67E22]">{progress}%</span>
        </div>
      </div>
    </header>
  );
}
