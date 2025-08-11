import React from 'react';

const MicrophoneIcon = () => (
  <svg
    width="128"
    height="128"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className="h-[18rem] w-[18rem]"
  >
    <defs>
      <linearGradient id="micGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="25%" style={{ stopColor: '#b6c6fb', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#1e83ff', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      fill="url(#micGradient)"
      d="M50 62C56.0751 62 61 57.0751 61 51V29C61 22.9249 56.0751 18 50 18C43.9249 18 39 22.9249 39 29V51C39 57.0751 43.9249 62 50 62Z"
    />
    <path
      fill="url(#micGradient)"
      d="M69 51C69 61.4934 60.4934 70 50 70C39.5066 70 31 61.4934 31 51H26C26 64.2548 36.7452 75 50 75C63.2548 75 74 64.2548 74 51H69Z"
    />
    <path fill="url(#micGradient)" d="M50 75V82H60V87H40V82H50Z" />
  </svg>
);

export default MicrophoneIcon;
