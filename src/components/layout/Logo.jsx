import React from 'react';

export default function Logo({ className = '', size = 'md' }) {
  const isLarge = size === 'lg';
  return (
    <div className={`flex items-center space-x-2.5 space-x-reverse select-none ${className}`}>
      {/* Emblem Icon */}
      <div className="relative flex items-center justify-center">
        <svg
          width={isLarge ? "46" : "38"}
          height={isLarge ? "46" : "38"}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Outer nest / home curve */}
          <path
            d="M24 4C13.5 4 5 12.5 5 23C5 33.5 13.5 42 24 42C34.5 42 43 33.5 43 23C43 12.5 34.5 4 24 4Z"
            fill="#E6F4F5"
          />
          {/* Main teal swoop */}
          <path
            d="M14 26C16 19 23 12 32 12C35 12 37 13.5 36.5 15.5C36 17.5 33 18.5 29 19C24 19.5 20 22 18 26C16.5 29 18 32 21 34C24 36 29 36 33 33C34 32.2 35 33.5 34 34.5C29 39 21 39 16.5 35C13.5 32.5 12.5 29.5 14 26Z"
            fill="#00828A"
          />
          {/* Dot of letter nun / bird head */}
          <circle cx="28" cy="10" r="3.2" fill="#00828A" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col">
        <span className={`font-black tracking-tight text-[#00828A] leading-none ${isLarge ? 'text-2xl' : 'text-xl'}`}>
          آشیـــانه
        </span>
        <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-0.5">
          Ashyaneh • Booking
        </span>
      </div>
    </div>
  );
}
