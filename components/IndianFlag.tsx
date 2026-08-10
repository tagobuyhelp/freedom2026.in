import React from "react";

interface IndianFlagProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function IndianFlag({ className = "w-5 h-3.5", width = 20, height = 14 }: IndianFlagProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 20"
      className={`inline-block rounded-xs overflow-hidden shadow-2xs shrink-0 ${className}`}
      aria-label="Indian Flag"
    >
      {/* Saffron Top Band */}
      <rect width="30" height="6.67" fill="#FF9933" />
      {/* White Middle Band */}
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
      {/* Green Bottom Band */}
      <rect y="13.34" width="30" height="6.66" fill="#138808" />
      
      {/* Ashoka Chakra in Middle Band */}
      <g transform="translate(15, 10)">
        <circle r="2.8" stroke="#000080" strokeWidth="0.5" fill="none" />
        <circle r="0.6" fill="#000080" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={2.6 * Math.cos((i * 15 * Math.PI) / 180)}
            y2={2.6 * Math.sin((i * 15 * Math.PI) / 180)}
            stroke="#000080"
            strokeWidth="0.25"
          />
        ))}
      </g>
    </svg>
  );
}
