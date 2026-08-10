import React from "react";

export default function FlyingBirds() {
  return (
    <div className="absolute -top-4 left-6 sm:left-12 z-20 flex items-center gap-1.5 pointer-events-none">
      {/* Saffron Flying Bird */}
      <div className="animate-bird-1">
        <svg
          className="w-7 h-7 text-[#ff671f] drop-shadow-sm"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 8C26 10 21 10 16 7C12 4.5 8 4 2 7C5 10 9 12 13 12C9 15 5 18 1 21C7 20 12 18 16 15C20 18 25 20 31 18C27 15 25 12 24 9C26 9 28 8.5 30 8Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Green Flying Bird */}
      <div className="animate-bird-2">
        <svg
          className="w-6 h-6 text-[#046a38] drop-shadow-sm"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 8C26 10 21 10 16 7C12 4.5 8 4 2 7C5 10 9 12 13 12C9 15 5 18 1 21C7 20 12 18 16 15C20 18 25 20 31 18C27 15 25 12 24 9C26 9 28 8.5 30 8Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Small Amber Flying Bird */}
      <div className="animate-bird-3">
        <svg
          className="w-4.5 h-4.5 text-[#ff9933] drop-shadow-xs"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 8C26 10 21 10 16 7C12 4.5 8 4 2 7C5 10 9 12 13 12C9 15 5 18 1 21C7 20 12 18 16 15C20 18 25 20 31 18C27 15 25 12 24 9C26 9 28 8.5 30 8Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
