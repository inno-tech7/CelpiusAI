'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SemiCircularProgressProps {
  value: number; // 0.0-12.0 CLB scale
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
  color?: 'green' | 'blue' | 'orange' | 'red' | 'auto';
}

const SemiCircularProgress: React.FC<SemiCircularProgressProps> = ({
  value = 0,
  size = 100,
  strokeWidth = 17,
  className = '',
  children,
  color = 'auto',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const progressArcRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<number | null>(null);

  const clampedValue = Math.max(0, Math.min(12, value));
  const displayScale = clampedValue; // Direct CLB value for display
  const targetPercent = (clampedValue / 12) * 100; // Convert to percentage for arc animation

  const getProgressColor = () => {
    if (color !== 'auto') return color;

    const clbLevel = clampedValue;
    if (clbLevel >= 10) return 'green'; // CLB 10-12: Excellent
    if (clbLevel >= 8) return 'blue'; // CLB 8-9: Good
    if (clbLevel >= 6) return 'orange'; // CLB 6-7: Average
    return 'red'; // CLB 1-5: Needs Improvement
  };

  const progressColor = getProgressColor();

  const colorMap = {
    green: { primary: '#22c55e', secondary: '#16a34a', shadow: 'rgba(34, 197, 94, 0.3)' },
    blue: { primary: '#007bff', secondary: '#0056b3', shadow: 'rgba(0, 123, 255, 0.3)' },
    orange: { primary: '#f97316', secondary: '#ea580c', shadow: 'rgba(249, 115, 22, 0.3)' },
    red: { primary: '#ef4444', secondary: '#dc2626', shadow: 'rgba(239, 68, 68, 0.3)' },
  };

  const colors = colorMap[progressColor];

  useEffect(() => {
    const progressArc = progressArcRef.current;
    if (!progressArc) return;

    const circumference = 314.16;
    progressArc.style.strokeDashoffset = '314.16';
    setDisplayValue(0);

    const timeout = setTimeout(() => {
      progressArc.style.transition = `stroke-dashoffset 2000ms ease-in-out`;
      const targetOffset = circumference - (targetPercent / 100) * circumference;
      progressArc.style.strokeDashoffset = targetOffset.toString();

      let currentValue = 0;
      const increment = clampedValue / 60; // 60 frames for smooth animation
      let frameCount = 0;
      const totalFrames = Math.floor(2000 / 33); // ~30fps

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
  }, [clampedValue, targetPercent]);

  const svgWidth = (size / 100) * 300;
  const svgHeight = (size / 100) * 180;
  const scaleFactor = size / 100;

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center ${className}`}
      style={{
        width: svgWidth,
        height: svgHeight + 60 * scaleFactor,
      }}
    >
      <svg
        className="absolute left-0 top-0"
        width={svgWidth}
        height={svgHeight}
        viewBox="0 0 300 180"
        style={{
          backgroundColor: 'transparent',
          overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id={`fadeGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#1a1a2e00', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#1a1a2e00', stopOpacity: 0 }} />
          </linearGradient>

          <linearGradient
            id={`progressGradient-${size}-${progressColor}`}
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="7%" style={{ stopColor: `${colors.primary}00`, stopOpacity: 0.4 }} />
            <stop offset="40%" style={{ stopColor: `${colors.primary}7a`, stopOpacity: 0.8 }} />
            <stop offset="70%" style={{ stopColor: colors.primary, stopOpacity: 1 }} />
          </linearGradient>

          <linearGradient id={`backgroundGradient-${size}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="7%" style={{ stopColor: '#2a2a3e00', stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: '#3e4d74', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#2a2a3e', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        <path
          d="M 50 150 A 100 100 0 0 1 250 150"
          stroke={`url(#backgroundGradient-${size})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />

        <path
          ref={progressArcRef}
          d="M 50 150 A 100 100 0 0 1 250 150"
          stroke={`url(#progressGradient-${size}-${progressColor})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray="314.16"
          strokeDashoffset="314.16"
          style={{
            filter: `drop-shadow(0 0 8px ${colors.shadow})`,
          }}
        />
      </svg>

      <div
        className="absolute z-10 text-center"
        style={{
          top: `${115 * scaleFactor}px`,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {children ? (
          children
        ) : (
          <>
            <div
              className="font-[200] leading-none text-white"
              style={{
                fontSize: `${3.5 * scaleFactor}rem`,
                letterSpacing: '-0.5px',
                margin: 0,
              }}
            >
              {displayValue.toFixed(1)}
            </div>
            <div
              className="font-light text-white"
              style={{
                fontSize: `${1.5 * scaleFactor}rem`,
                marginTop: `${5 * scaleFactor}px`,
                letterSpacing: '0.7px',
              }}
            >
              CLB
            </div>
          </>
        )}
      </div>

      {!children && (
        <div
          className="absolute flex justify-between"
          style={{
            width: `${280 * scaleFactor}px`,
            top: `${(150 + 20) * scaleFactor}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            padding: `0 ${20 * scaleFactor}px`,
            boxSizing: 'border-box',
          }}
        >
          <span
            className="font-normal text-gray-500"
            style={{ fontSize: `${1.5 * scaleFactor}rem` }}
          >
            0
          </span>
          <span
            className="font-normal text-gray-500"
            style={{ fontSize: `${1.5 * scaleFactor}rem` }}
          >
            12
          </span>
        </div>
      )}
    </div>
  );
};

export default SemiCircularProgress;
