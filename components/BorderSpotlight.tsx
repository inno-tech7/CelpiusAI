"use client"

import React, { useRef, useEffect } from 'react';

interface BorderSpotlightProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // HEX color
  brightness?: number; // 0-1 scale
  feather?: number; // 0-100 scale for smoothness
  borderWidth?: number; // Border thickness in pixels
  borderRadius?: string; // CSS border-radius value
  scale?: number; // Scale factor for the component
  disabled?: boolean; // Option to disable the effect
}

const BorderSpotlight: React.FC<BorderSpotlightProps> = ({
  children,
  className = '',
  color = '#8400FF', // Default purple
  brightness = 0.8,
  feather = 70,
  borderWidth = 2,
  borderRadius = '1rem',
  scale = 1,
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Convert HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 132, g: 0, b: 255 }; // Default purple fallback
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

      // Calculate spotlight radius based on feather setting
      const baseRadius = Math.min(rect.width, rect.height) * 0.4;
      const spotlightRadius = baseRadius + (feather * 2);

      container.style.setProperty('--spotlight-x', `${x}px`);
      container.style.setProperty('--spotlight-y', `${y}px`);
      container.style.setProperty('--spotlight-radius', `${spotlightRadius}px`);
      container.style.setProperty('--spotlight-color', rgbString);
      container.style.setProperty('--spotlight-brightness', brightness.toString());
      container.style.setProperty('--spotlight-feather', `${feather}%`);
    };

    const handleMouseLeave = () => {
      // fade out via CSS (do NOT kill the gradient)
      container.style.setProperty('--spotlight-visible', '0');
    };

    const handleMouseEnter = () => {
      // fade in via CSS
      container.style.setProperty('--spotlight-visible', '1');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    // Set CSS custom properties
    container.style.setProperty('--border-width', `${borderWidth}px`);
    container.style.setProperty('--border-radius', borderRadius);
    container.style.setProperty('--spotlight-color', rgbString);
    container.style.setProperty('--spotlight-brightness', brightness.toString());
    container.style.setProperty('--spotlight-feather', `${feather}%`);
    container.style.setProperty('--scale', scale.toString());

    // Keep gradient “on” so opacity can animate smoothly
    container.style.setProperty('--spotlight-intensity', '1');
    // Start hidden
    container.style.setProperty('--spotlight-visible', '0');

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [color, brightness, feather, borderWidth, borderRadius, scale, disabled]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      ref={containerRef} 
      className={`border-spotlight-container ${className}`}
      style={{ transform: `scale(${scale})` }}
    >
      {children}
    </div>
  );
};

export default BorderSpotlight;
