import React from 'react';

const PenIcon = () => (
  <svg
    width="128"
    height="128"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="h-[12rem] w-[12rem]"
  >
    <defs>
      <linearGradient id="penGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="25%" style={{ stopColor: '#b6c6fb', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1e83ff', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#penGradient)"
      d="M85.35 14.65a5.86 5.86 0 0 0-8.28 0L33.64 58.08l-5.2 15.6 15.6-5.2L87.47 22.93a5.86 5.86 0 0 0 0-8.28zM25 85h50v-5H25v5z"
    />
     <path
      fill="url(#penGradient)"
      d="M75.83 32.42l-8.28-8.28-35.36 35.35 8.28 8.28L75.83 32.42z"
    />
  </svg>
);

export default PenIcon;
