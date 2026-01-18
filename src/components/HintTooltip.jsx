import React from 'react';
import { Compass } from 'lucide-react';

export default function HintTooltip() {
  return (
    <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border-l-4 border-[#E67E22] max-w-xs animate-fade-in-up z-20">
      <div className="flex items-start gap-3">
        <Compass className="text-[#E67E22] mt-1 shrink-0" size={18} />
        <div>
          <h3 className="font-bold text-[#2D5A27] text-sm">Explore the Map</h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            Hover over a state to highlight it. Click a <b>national park marker</b> to open details.
          </p>
        </div>
      </div>
    </div>
  );
}
