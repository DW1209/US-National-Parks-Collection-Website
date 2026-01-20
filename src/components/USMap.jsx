import React, { useMemo, useState } from 'react';
import { US_STATES } from '../data/usStates';

export default function USMap({ parks, activePark, onParkClick }) {
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredParkId, setHoveredParkId] = useState(null);

  const renderedStates = useMemo(() => US_STATES, []);
  const orderedParks = useMemo(() => {
    const arr = [...parks];
    const activeId = activePark?.id ?? null;
    const hoverId = hoveredParkId ?? null;

    const priority = (p) => (p.id === activeId ? 2 : p.id === hoverId ? 1 : 0);
    arr.sort((a, b) => priority(a) - priority(b));

    return arr;
  }, [parks, activePark?.id, hoveredParkId]);

  return (
    <div className="relative w-full max-w-6xl px-2 sm:px-4 md:px-10 pt-16 md:pt-20 z-10 [@media(orientation:landscape)]:pt-4 [@media(orientation:landscape)]:pb-4">
      {/* Hovered state label */}
      {hoveredState && (
        <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-5 md:-translate-y-5 z-20 pointer-events-none [@media(orientation:landscape)_and_(max-height:500px)]:fixed [@media(orientation:landscape)_and_(max-height:500px)]:top-[96px] [@media(orientation:landscape)_and_(max-height:500px)]:translate-y-0">
          <div className="bg-white/85 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-white/60">
            <div className="text-[22px] sm:text-[28px] md:text-[40px] font-extrabold tracking-tight text-[#2D5A27] whitespace-nowrap [@media(orientation:landscape)_and_(max-height:500px)]:text-[18px]">
              {hoveredState.name}
            </div>
          </div>
        </div>
      )}
      <svg
        viewBox="0 0 1000 589"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-auto drop-shadow-xl filter cursor-default [@media(orientation:landscape)]:max-h-[calc(100vh-96px)] [@media(orientation:landscape)]:mx-auto"
      >
        {/* US States */}
        <g className="transition-opacity duration-500">
          {renderedStates.map((state, index) => {
            const isHover = hoveredState?.id === state.id;
            return (
              <path
                key={`${state.id}-${index}`}
                d={state.d}
                fill={isHover ? '#d6e6d5' : 'white'}
                stroke={isHover ? '#7aa072' : '#ccc'}
                strokeWidth={isHover ? 1.3 : 0.97}
                className="transition-colors duration-200"
                onMouseEnter={() => setHoveredState({ id: state.id, name: state.n })}
                onMouseLeave={() => setHoveredState(null)}
              >
              </path>
            );
          })}
        </g>

        {/* National Park Markers */}
        {orderedParks.map((park) => {
          const isActive = activePark?.id === park.id;

          const W = 1000;
          const H = 589;

          const pad = 12;
          const dyAbove = 12;
          const dxSide = 10;
          const approxLabelW = 140;

          const nearRight = park.x > W - (approxLabelW + pad);
          const nearLeft = park.x < (approxLabelW * 0.35 + pad);
          const nearBottom = park.y > H - (pad + 18);

          let x = park.x;
          let y = park.y - dyAbove;
          let anchor = "middle";

          if (nearRight) {
            x = park.x - dxSide;
            anchor = "end";
          } else if (nearLeft) {
            x = park.x + dxSide;
            anchor = "start";
          }
          if (nearBottom) {
            y = park.y - (dyAbove + 6);
          }
          return (
            <g
              key={park.id}
              onMouseEnter={() => setHoveredParkId(park.id)}
              onMouseLeave={() => setHoveredParkId(null)}
              onClick={(e) => {
                e.stopPropagation();
                onParkClick(park);
              }}
              className="group cursor-pointer transition-transform duration-200 hover:scale-110"
              style={{ transformOrigin: `${park.x}px ${park.y}px` }}
            >
              <circle
                cx={park.x}
                cy={park.y}
                r={isActive ? 8 : 5}
                fill={isActive ? '#E67E22' : park.visited ? '#2D5A27' : '#aaa'}
                stroke="white"
                strokeWidth="1.5"
                className="transition-all duration-300 shadow-md"
              />
              <g className={`transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <text
                  x={Math.max(pad, Math.min(W - pad, x))}
                  y={Math.max(pad, Math.min(H - pad, y))}
                  textAnchor={anchor}
                  className="text-[10px] font-bold fill-[#333] tracking-wide pointer-events-none"
                  style={{
                    fontFamily: 'Montserrat',
                    paintOrder: 'stroke',
                    stroke: 'rgba(255,255,255,0.95)',
                    strokeWidth: 3.5,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                  }}
                >
                  {park.name.toUpperCase()}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
