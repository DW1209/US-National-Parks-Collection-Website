import React from "react";
import { Star } from "lucide-react";

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function StarWithPartialFill({ percent, size }) {
  const w = `${clamp(percent, 0, 100)}%`;
  return (
    <span
      className="relative inline-block align-middle"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Base outline (empty) */}
      <Star
        size={size}
        className="text-[#D6D2C4]"
        fill="none"
      />

      {/* Filled part (clipped) */}
      <span
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: w }}
      >
        <Star
          size={size}
          fill="#E67E22"
          stroke="none"
        />
      </span>
    </span>
  );
}

export default function RatingStars({ value = 0, size = 18 }) {
  const v = clamp(Number(value) || 0, 0, 5);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const frac = clamp(v - (i - 1), 0, 1);
        const percent = frac * 100;
        return <StarWithPartialFill key={i} percent={percent} size={size} />;
      })}
    </div>
  );
}
