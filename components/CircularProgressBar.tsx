'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CircularProgressBarProps {
  value: number; // 0-10 scale
  label?: string;
  title?: string;
  className?: string;
  animationDuration?: number;
  size?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value = 0,
  label = 'CLB',
  title = 'Listening',
  className = '',
  animationDuration = 2000,
  size = 300,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const progressArcRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<number | null>(null);

  const clampedValue = Math.max(0, Math.min(10, value));
  const targetPercent = (clampedValue / 10) * 100;

  useEffect(() => {
    const progressArc = progressArcRef.current;
    if (!progressArc) return;

    const circumference = 314.16;
    progressArc.style.strokeDashoffset = '314.16';
    setDisplayValue(0);

    const timeout = setTimeout(() => {
      progressArc.style.transition = `stroke-dashoffset ${animationDuration}ms ease-in-out`;
      const targetOffset = circumference - (targetPercent / 100) * circumference;
      progressArc.style.strokeDashoffset = targetOffset.toString();

      let currentValue = 0;
      const increment = clampedValue / 60; // 60 frames for smooth animation
      let frameCount = 0;
      const totalFrames = Math.floor(animationDuration / 33); // ~30fps

      const animate = () => {
        frameCount++;
        currentValue += increment;

        if (currentValue >= clampedValue || frameCount >= totalFrames) {
          currentValue = clampedValue;
          setDisplayValue(currentValue);
          return;
        }

        setDisplayValue(currentValue);
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [clampedValue, targetPercent, animationDuration]);

  const svgSize = size;
  const svgHeight = svgSize * 0.6; // 60% of width for semi-circle

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative text-center">
        <div className="relative mx-auto" style={{ width: svgSize, height: svgHeight + 50 }}>
          {title && <h2 className="mb-4 text-xl font-light text-white">{title}</h2>}

          <svg
            className="absolute left-0 top-8"
            width={svgSize}
            height={svgHeight}
            viewBox={`0 0 ${svgSize} ${svgHeight}`}
          >
            <defs>
              <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#1a1a2e00', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#1a1a2e00', stopOpacity: 0 }} />
              </linearGradient>

              <linearGradient id="progressGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="7%" style={{ stopColor: '#007bff00', stopOpacity: 0.4 }} />
                <stop offset="40%" style={{ stopColor: '#007bff7a', stopOpacity: 0.8 }} />
                <stop offset="70%" style={{ stopColor: '#007bff', stopOpacity: 1 }} />
              </linearGradient>

              <linearGradient id="backgroundGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="7%" style={{ stopColor: '#2a2a3e00', stopOpacity: 0.3 }} />
                <stop offset="50%" style={{ stopColor: '#3e4d74', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#2a2a3e', stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            <path
              d="M 50 150 A 100 100 0 0 1 250 150"
              stroke="url(#backgroundGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />

            <path
              ref={progressArcRef}
              d="M 50 150 A 100 100 0 0 1 250 150"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="314.16"
              strokeDashoffset="314.16"
              className="drop-shadow-[0_0_8px_rgba(0,123,255,0.3)]"
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 translate-y-1/4 transform">
            <div className="text-6xl font-extralight leading-none tracking-tight text-white">
              {displayValue.toFixed(1)}
            </div>
            <div className="mt-1 text-sm font-light tracking-wide text-gray-400">{label}</div>
          </div>
        </div>

        <div className="mx-auto mt-5 flex w-72 justify-between px-5">
          <span className="text-sm font-normal text-gray-500">0</span>
          <span className="text-sm font-normal text-gray-500">10</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
