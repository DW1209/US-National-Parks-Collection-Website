import React from 'react';

export default function BackgroundPattern() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(#2D5A27 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.05,
      }}
    />
  );
}
