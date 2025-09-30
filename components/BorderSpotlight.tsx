'use client';

import React, { useRef, useEffect } from 'react';

interface BorderSpotlightProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // HEX color
  brightness?: number; // 0-1 scale
  feather?: number; // 0-100 scale for smoothness
  borderWidth?: number; // Border thickness in pixels
  borderRadius?: string; // CSS border-radius value
  disabled?: boolean; // Option to disable the effect
  width?: string; // CSS width value (e.g., "40%", "300px", "100vw")
  height?: string; // CSS height value (e.g., "200px", "50vh", "auto")
}

const BorderSpotlight: React.FC<BorderSpotlightProps> = ({
  children,
  className = '',
  color = '#8400FF',
  brightness = 0.8,
  feather = 70,
  borderWidth = 2,
  borderRadius = '1rem',
  disabled = false,
  width = 'auto',
  height = 'auto',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 132, g: 0, b: 255 }; // fallback
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    const rgb = hexToRgb(color);
    const rgbString = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const baseRadius = Math.min(rect.width, rect.height) * 0.4;
      const spotlightRadius = baseRadius + feather * 2;

      container.style.setProperty('--spotlight-x', `${x}px`);
      container.style.setProperty('--spotlight-y', `${y}px`);
      container.style.setProperty('--spotlight-radius', `${spotlightRadius}px`);
      container.style.setProperty('--spotlight-color', rgbString);
      container.style.setProperty('--spotlight-brightness', brightness.toString());
      container.style.setProperty('--spotlight-feather', `${feather}%`);
    };

    const handleMouseLeave = () => {
      container.style.setProperty('--spotlight-visible', '0');
    };

    const handleMouseEnter = () => {
      container.style.setProperty('--spotlight-visible', '1');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    // Init vars
    container.style.setProperty('--border-width', `${borderWidth}px`);
    container.style.setProperty('--border-radius', borderRadius);
    container.style.setProperty('--spotlight-color', rgbString);
    container.style.setProperty('--spotlight-brightness', brightness.toString());
    container.style.setProperty('--spotlight-feather', `${feather}%`);
    container.style.setProperty('--spotlight-intensity', '1');
    container.style.setProperty('--spotlight-visible', '0');

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [color, brightness, feather, borderWidth, borderRadius, disabled]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`border-spotlight-container ${className}`}
      style={{
        width,
        height,
      }}
    >
      {children}
    </div>
  );
};

export default BorderSpotlight;
