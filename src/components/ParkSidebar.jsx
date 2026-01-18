import React from 'react';
import RatingStars from './RatingStars';
import { Calendar, ExternalLink, MapPin, X } from 'lucide-react';

function SidebarContent({ activePark, onClose, dense }) {
  if (!activePark) return null;

  const pad = dense ? 'px-6 py-6' : 'p-8';
  const imageH = dense ? 'h-52 sm:h-60' : 'h-64 md:h-72';

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Top Image */}
      <div className={`relative ${imageH} shrink-0`}>
        <img src={activePark.image} alt={activePark.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-md transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="absolute bottom-5 left-5 right-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border ${activePark.visited ? 'bg-[#2D5A27] border-[#2D5A27]' : 'bg-transparent border-white'
                }`}
            >
              {activePark.visited ? 'Visited' : 'Wishlist'}
            </span>
            <span className="text-[10px] font-medium opacity-80 uppercase tracking-widest">{activePark.state}</span>
          </div>
          <h2 className={dense ? 'text-2xl font-extrabold tracking-tight' : 'text-3xl font-extrabold tracking-tight'}>
            {activePark.name}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className={`${pad} flex-1 overflow-y-auto`}>
        <h3 className="text-sm font-bold text-[#8B5A2B] uppercase tracking-widest mb-4">About the Park</h3>
        <p className="text-gray-600 leading-7 text-sm mb-7 font-medium">{activePark.desc}</p>

        {activePark.visited && activePark.rating != null && (
          <div className="mt-6 mb-5 sm:mb-6">
            {/* Title: Your Rating */}
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B5A2B]">
              Your Rating
            </div>

            {/* Stars under the title */}
            <div className="mt-2 flex items-center gap-2">
              <RatingStars value={activePark.rating} size={18} />
              <span className="text-xs font-semibold text-[#8B5A2B] tabular-nums">
                {Number(activePark.rating).toFixed(1).replace(/\.0$/, "")}
              </span>
            </div>
          </div>
        )}
        
        {activePark.visited ? (
          <div className="bg-[#F5F5DC] rounded-xl p-6 mb-7 border border-[#E8E6D9]">
            <div className="flex items-center gap-2 mb-3 text-[#2D5A27]">
              <MapPin size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">Travel Date</h4>
            </div>

            {/* Support multiple dates */}
            {(() => {
              const dates = Array.isArray(activePark.dates)
                ? activePark.dates
                : activePark.date
                  ? [activePark.date]
                  : [];

              if (dates.length === 0) return null;

              return (
                <div className="flex flex-wrap items-start gap-3">
                  {dates.map((d, idx) => {
                    const clean = String(d).trim().replace(/,.*$/, "");
                    const [yyyy, mon, dd] = clean.split("-");
                    return (
                      <div key={`${clean}-${idx}`} className="bg-white p-2 rounded text-center min-w-[60px] shadow-sm">
                        <span className="block text-[10px] text-gray-400 font-bold uppercase">{mon}</span>
                        <span className="block text-xl font-extrabold text-[#333]">{dd}</span>
                        <span className="block text-[10px] text-gray-400">{yyyy}</span>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 mb-7 text-center">
            <Calendar className="mx-auto text-gray-300 mb-2" size={32} />
            <p className="text-sm text-gray-400 font-medium">Not visited yet. Planning your next trip?</p>
          </div>
        )}

        {/* <button className="w-full py-4 border-2 border-[#333] text-[#333] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#333] hover:text-white transition-colors flex items-center justify-center gap-2">
          View Gallery <ExternalLink size={14} />
        </button> */}
      </div>
    </div>
  );
}

export default function ParkSidebar({ activePark, onClose }) {
  const isOpen = !!activePark;
  return (
    <>
      {/* Desktop sidebar (lg+) - collapsible */}
      <aside
        className={`hidden lg:block bg-white transition-all duration-500 ease-in-out ${isOpen ? 'w-[450px] border-l border-[#eee]' : 'w-0 overflow-hidden border-l-0'
          }`}
      >
        <div className="h-full w-[450px]">
          <SidebarContent activePark={activePark} onClose={onClose} dense={false} />
        </div>
      </aside>

      {/* Backdrop (mobile/tablet) */}
      <div
        className={`lg:hidden fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Bottom sheet (mobile/tablet) */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <div className="mx-auto w-full max-w-2xl">
          <div className="bg-white rounded-t-3xl shadow-2xl border border-black/5 overflow-hidden">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1.5 w-12 rounded-full bg-black/10" />
            </div>

            <div className="max-h-[78vh] overflow-y-auto">
              <SidebarContent activePark={activePark} onClose={onClose} dense={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
