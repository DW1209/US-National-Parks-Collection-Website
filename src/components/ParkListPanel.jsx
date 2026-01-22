import React, { useMemo, useState } from "react";
import { List, Search, X, CheckCircle2, Circle } from "lucide-react";
import RatingStars from "./RatingStars";
import { formatEstablished } from "../utils/formatEstablished";

// function establishedValue(raw) {
//   if (!raw) return Number.POSITIVE_INFINITY;
//   const s = String(raw).trim();

//   // "Mar 01, 1872"
//   if (s.includes(",")) {
//     const t = Date.parse(s);
//     return Number.isNaN(t) ? Number.POSITIVE_INFINITY : t;
//   }

//   // "YYYY-MM-DD" or "YYYY-Mon-DD"
//   const parts = s.split("-");
//   if (parts.length === 3) {
//     const [yyyy, monRaw, ddRaw] = parts;

//     const monthMap = {
//       Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
//       Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
//       "01": 1, "02": 2, "03": 3, "04": 4, "05": 5, "06": 6,
//       "07": 7, "08": 8, "09": 9, "10": 10, "11": 11, "12": 12,
//     };

//     const m = monthMap[monRaw] ?? null;
//     const d = Number(ddRaw);
//     const y = Number(yyyy);
//     if (!m || !d || !y) return Number.POSITIVE_INFINITY;
//     return new Date(y, m - 1, d).getTime();
//   }

//   return Number.POSITIVE_INFINITY;
// }

export default function ParkListPanel({ parks, activePark, onSelectPark }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all | visited | wishlist
//   const [sortKey, setSortKey] = useState("order"); // order | established | rating

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    let arr = parks.filter((p) => {
      if (filter === "visited" && !p.visited) return false;
      if (filter === "wishlist" && p.visited) return false;

      if (!q) return true;
      const hay = `${p.name} ${p.fullName ?? ""} ${p.state ?? ""}`.toLowerCase();
      return hay.includes(q);
    });

    // arr.sort((a, b) => {
    //   if (sortKey === "order") return (a.id ?? 0) - (b.id ?? 0);
    //   if (sortKey === "established") return establishedValue(a.established) - establishedValue(b.established);
    //   if (sortKey === "rating") return (b.rating ?? -1) - (a.rating ?? -1);
    //   return 0;
    // });

    return arr;
}, [parks, query, filter]);
// }, [parks, query, filter, sortKey]);

  const selectAndMaybeClose = (park) => {
    onSelectPark?.(park);
    if (typeof window !== "undefined" && window.innerWidth < 1024) setOpen(false);
  };

  return (
      <div className="absolute z-30 left-6 top-6 [@media(max-height:500px)_and_(orientation:landscape)]:top-auto [@media(max-height:500px)_and_(orientation:landscape)]:bottom-6 [@media(max-height:500px)_and_(orientation:landscape)]:z-50">
      {/* closed button */}
      {!open && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className="group bg-white/90 backdrop-blur-sm shadow-lg border border-white/60 rounded-full px-4 py-2 flex items-center gap-2"
          aria-label="Open parks list"
        >
          <List size={18} className="text-[#2D5A27]" />
          <span className="text-xs font-bold tracking-widest uppercase text-[#2D5A27] hidden sm:inline">
            Parks
          </span>
          <span className="text-[11px] font-semibold text-[#8B5A2B]/80 hidden sm:inline tabular-nums">
            {parks.length}
          </span>
        </button>
      )}

      {/* panel */}
      {open && (
        <div
          className="w-[340px] max-w-[86vw] rounded-2xl bg-white/92 backdrop-blur-md shadow-2xl border border-white/60 overflow-hidden flex flex-col [@media(max-height:500px)_and_(orientation:landscape)]:max-h-[calc(100vh-96px-16px)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* top bar */}
          <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-black/5">
            <div className="flex items-center gap-2">
              <List size={18} className="text-[#2D5A27]" />
              <div className="text-xs font-extrabold tracking-widest uppercase text-[#2D5A27]">
                Parks List
              </div>
              <div className="text-[11px] font-semibold text-[#8B5A2B]/80 tabular-nums">
                {results.length}/{parks.length}
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full bg-black/5 hover:bg-black/10 transition"
              aria-label="Close parks list"
            >
              <X size={16} className="text-[#2D5A27]" />
            </button>
          </div>

          {/* controls */}
                  <div className="shrink-0 px-4 py-3 space-y-3">
            {/* search */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B5A2B]/70" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by park or state…"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/30 text-sm"
              />
            </div>

            {/* filter */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#F5F5DC] rounded-xl p-1 border border-black/5 max-w-full overflow-x-auto">
                {[
                  { key: "all", label: "All" },
                  { key: "visited", label: "Visited" },
                  { key: "wishlist", label: "Wishlist" },
                ].map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setFilter(t.key)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-widest uppercase transition ${
                      filter === t.key ? "bg-white shadow-sm text-[#2D5A27]" : "text-[#8B5A2B]/80 hover:text-[#2D5A27]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {/* <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="ml-auto w-full sm:w-auto text-[11px] font-bold tracking-widest uppercase bg-white rounded-xl px-3 py-2 border border-black/10 focus:outline-none focus:ring-2 focus:ring-[#E67E22]/30"
              >
                <option value="order">Sort: Order</option>
                <option value="established">Sort: Established</option>
                <option value="rating">Sort: Rating</option>
              </select> */}
            </div>
          </div>

          {/* list */}
          <div className="max-h-[50vh] overflow-y-auto px-2 pt-3 pb-3">
            {results.map((p) => {
              const isActive = activePark?.id === p.id;

              return (
                <button
                  key={p.id}
                  onClick={() => selectAndMaybeClose(p)}
                  className={`w-full text-left px-3 py-3 rounded-xl transition mb-1 ${
                    isActive
                      ? "bg-[#F5F5DC] ring-2 ring-[#E67E22]/25"
                      : "hover:bg-[#F5F5DC]/70"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {p.visited ? (
                        <CheckCircle2 size={16} className="text-[#2D5A27]" />
                      ) : (
                        <Circle size={16} className="text-[#8B5A2B]/50" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-extrabold text-sm text-[#2D5A27] truncate">
                          {p.name}
                        </div>
                        <div className="text-[11px] font-bold text-[#8B5A2B]/80 tabular-nums shrink-0">
                          #{String(p.id).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 mt-1">
                        <div className="text-[11px] text-gray-500 truncate">
                          {p.state}
                        </div>

                        {p.rating != null ? (
                          <div className="flex items-center gap-1 shrink-0">
                            <RatingStars value={p.rating} size={14} />
                            <span className="text-[11px] font-semibold text-[#8B5A2B] tabular-nums">
                              {Number(p.rating).toFixed(1).replace(/\.0$/, "")}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#8B5A2B]/50 font-semibold shrink-0">
                            —
                          </span>
                        )}
                      </div>

                      {p.established && (
                        <div className="mt-1 text-[11px] text-[#8B5A2B]/70 font-semibold">
                          Established: <span className="tabular-nums">{formatEstablished(p.established)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            {results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-gray-500">
                No parks match your search.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
