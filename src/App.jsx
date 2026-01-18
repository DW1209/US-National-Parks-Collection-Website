import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import USMap from './components/USMap';
import ParkSidebar from './components/ParkSidebar';
import BackgroundPattern from './components/BackgroundPattern';
import HintTooltip from './components/HintTooltip';
import { parksData as baseParksData } from './data/parks';

export default function App() {
  const [activePark, setActivePark] = useState(null);
  const parksData = useMemo(() => baseParksData, []);
  const visitedCount = parksData.filter((p) => p.visited).length;
  const progress = Math.round((visitedCount / parksData.length) * 100);
  return (
    <div
      className="flex flex-col h-screen bg-[#F5F5DC] text-[#333] font-sans selection:bg-[#E67E22] selection:text-white"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Import Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap');
      `}</style>
      <Header visitedCount={visitedCount} totalCount={parksData.length} progress={progress} />
      {/*
        Responsive layout
        - Mobile / Tablet: map full width, sidebar opens as bottom sheet
        - Desktop: map and persistent right sidebar
      */}
      <main className="flex-1 relative overflow-hidden flex flex-col lg:flex-row min-h-0">
        {/* Left: Interactive Map */}
        <div className="relative flex-1 bg-[#E8F1F5] overflow-hidden flex items-center justify-center min-h-0">
          <BackgroundPattern />
          <USMap parks={parksData} activePark={activePark} onParkClick={setActivePark} />
          {!activePark && <HintTooltip />}
        </div>
        {/* Right: Sidebar */}
        <ParkSidebar activePark={activePark} onClose={() => setActivePark(null)} />
      </main>
    </div>
  );
}
