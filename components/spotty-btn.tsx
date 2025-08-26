import React from 'react';

interface SpottyBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'lg' | 'icon' | 'default';
}

const SpottyBtn: React.FC<SpottyBtnProps> = ({ children, className, size, ...props }) => {
  return (
    <button className={`nav-btn spotty-cta mobile-nav-btn ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

export default SpottyBtn;
