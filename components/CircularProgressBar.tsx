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
  size = 300
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const progressArcRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<number | null>(null);

  // Clamp value between 0 and 10
  const clampedValue = Math.max(0, Math.min(10, value));
  const targetPercent = (clampedValue / 10) * 100;

  useEffect(() => {
    const progressArc = progressArcRef.current;
    if (!progressArc) return;

    // Initial state - no progress
    const circumference = 314.16;
    progressArc.style.strokeDashoffset = '314.16';
    setDisplayValue(0);

    // Animate to target value
    const timeout = setTimeout(() => {
      progressArc.style.transition = `stroke-dashoffset ${animationDuration}ms ease-in-out`;
      const targetOffset = circumference - (targetPercent / 100) * circumference;
      progressArc.style.strokeDashoffset = targetOffset.toString();

      // Animate the value counter
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
        <div 
          className="relative mx-auto"
          style={{ width: svgSize, height: svgHeight + 50 }}
        >
          {title && (
            <h2 className="text-white font-light text-xl mb-4">{title}</h2>
          )}
          
          <svg 
            className="absolute top-8 left-0"
            width={svgSize} 
            height={svgHeight} 
            viewBox={`0 0 ${svgSize} ${svgHeight}`}
          >
            <defs>
              <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#1a1a2e00', stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: '#1a1a2e00', stopOpacity: 0 }} />
              </linearGradient>
            
              {/* Progress track Gradient - 45 degree angle */}
              <linearGradient id="progressGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="7%" style={{ stopColor: '#007bff00', stopOpacity: 0.4 }} />
                <stop offset="40%" style={{ stopColor: '#007bff7a', stopOpacity: 0.8 }} />
                <stop offset="70%" style={{ stopColor: '#007bff', stopOpacity: 1 }} />
              </linearGradient>
            
              {/* Background track Gradient - 45 degree angle */}
              <linearGradient id="backgroundGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="7%" style={{ stopColor: '#2a2a3e00', stopOpacity: 0.3 }} />
                <stop offset="50%" style={{ stopColor: '#3e4d74', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: '#2a2a3e', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            
            {/* Background track */}
            <path 
              d="M 50 150 A 100 100 0 0 1 250 150"
              stroke="url(#backgroundGradient)" 
              strokeWidth="8" 
              fill="none" 
              strokeLinecap="round"
            />
            
            {/* Progress arc */}
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
          
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/4 z-10">
            <div className="text-white text-6xl font-extralight leading-none tracking-tight">
              {displayValue.toFixed(1)}
            </div>
            <div className="text-gray-400 text-sm mt-1 font-light tracking-wide">
              {label}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between w-72 mx-auto mt-5 px-5">
          <span className="text-gray-500 text-sm font-normal">0</span>
          <span className="text-gray-500 text-sm font-normal">10</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
