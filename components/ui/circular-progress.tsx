'use client';

import type React from 'react';
import { cn } from '@/lib/utils';

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: React.ReactNode;
}

const getProgressColor = (value: number) => {
  if (value >= 90) return { stroke: '#10b981', glow: '0 0 20px rgba(16, 185, 129, 0.5)' }; // Green for excellent
  if (value >= 80) return { stroke: '#3b82f6', glow: '0 0 20px rgba(59, 130, 246, 0.5)' }; // Blue for good
  if (value >= 70) return { stroke: '#f59e0b', glow: '0 0 20px rgba(245, 158, 11, 0.5)' }; // Orange for average
  return { stroke: '#ef4444', glow: '0 0 20px rgba(239, 68, 68, 0.5)' }; // Red for needs improvement
};

const getGradientId = (value: number) => {
  if (value >= 90) return 'excellent-gradient';
  if (value >= 80) return 'good-gradient';
  if (value >= 70) return 'average-gradient';
  return 'poor-gradient';
};

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  className,
  children,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  const colors = getProgressColor(value);
  const gradientId = getGradientId(value);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90 transform">
        <defs>
          <linearGradient id="excellent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="good-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="average-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="poor-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-700/30"
        />

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(${colors.glow})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
