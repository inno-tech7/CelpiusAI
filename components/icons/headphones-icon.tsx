import React from 'react';

const HeadphonesIcon = () => (
  <svg
    width="128"
    height="128"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="h-[12rem] w-[12rem]"
  >
    <defs>
      <linearGradient id="headphonesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="25%" style={{ stopColor: '#b6c6fb', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1e83ff', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#headphonesGradient)"
      d="M20 50v-5a30 30 0 0 1 60 0v5a10 10 0 0 1-10 10h-5a5 5 0 0 1-5-5v-10a5 5 0 0 1 5-5h5a20 20 0 0 0-40 0h5a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5h-5a10 10 0 0 1-10-10z"
    />
  </svg>
);

export default HeadphonesIcon;
