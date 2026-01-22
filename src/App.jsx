import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import USMap from './components/USMap';
import ParkSidebar from './components/ParkSidebar';
import BackgroundPattern from './components/BackgroundPattern';
import HintTooltip from './components/HintTooltip';
import ParkListPanel from './components/ParkListPanel';
import { parksData as baseParksData } from './data/parks';
import { slugify } from "./utils/slug";

export default function App() {
  const parksData = useMemo(
    () => baseParksData.map((p) => ({ ...p, slug: p.slug ?? slugify(p.name) })),
    []
  );
  
  const [activePark, setActivePark] = useState(null);
  const visitedCount = parksData.filter((p) => p.visited).length;
  const progress = Math.round((visitedCount / parksData.length) * 100);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("park");
    if (!key) return;
    const found = parksData.find(
      (p) => p.slug === key || String(p.id) === key
    );
    if (found) setActivePark(found);
  }, [parksData]);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const key = params.get("park");
      if (!key) {
        setActivePark(null);
        return;
      }
      const found = parksData.find(
        (p) => p.slug === key || String(p.id) === key
      );
      setActivePark(found ?? null);
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [parksData]);

  const handleParkClick = (park) => {
    if (!park) return;
    setActivePark(park);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("park", park.slug ?? slugify(park.name));
    window.history.pushState({}, "", url.pathname + url.search + url.hash);
  };
  const handleClose = () => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("park");
      window.history.pushState({}, "", url.pathname + url.search + url.hash);
    }
    setActivePark(null);
  };

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
          <ParkListPanel parks={parksData} activePark={activePark} onSelectPark={handleParkClick} />
          <USMap parks={parksData} activePark={activePark} onParkClick={handleParkClick} />
          {!activePark && <HintTooltip />}
        </div>
        {/* Right: Sidebar */}
        <ParkSidebar activePark={activePark} onClose={handleClose} />
      </main>
    </div>
  );
}
