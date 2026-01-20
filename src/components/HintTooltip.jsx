import React, { useEffect, useState } from 'react';
import { Compass, X } from 'lucide-react';

export default function HintTooltip() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-height: 500px) and (orientation: landscape)");
    const update = () => {
      const match = mq.matches;
      if (match) setOpen(true);
    };

    update();

    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return (
    <>
      {/* When closed: show a small button to reopen */}
      {!open && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="fixed bottom-6 left-6 z-30 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-white/60 flex items-center justify-center"
          aria-label="Open hint"
        >
          <Compass className="text-[#E67E22]" size={18} />
        </button>
      )}

      {/* When open: show the original card + a close (X) button */}
      {open && (
        <div
          className="fixed bottom-6 left-6 z-30 w-80 max-w-[85vw]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-white/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border-l-4 border-[#E67E22] animate-fade-in-up">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="absolute right-2 top-2 p-1 rounded-full bg-black/5 hover:bg-black/10 transition"
              aria-label="Close hint"
            >
              <X size={14} className="text-[#2D5A27]" />
            </button>

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
        </div>
      )}
    </>
  );
}
