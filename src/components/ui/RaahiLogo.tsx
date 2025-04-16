
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  colorTheme?: 'light' | 'dark';
}

const RaahiLogo: React.FC<LogoProps> = ({ 
  className = "", 
  size = "md", 
  colorTheme = "light" 
}) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const colorClasses = {
    light: "text-white",
    dark: "text-primary",
  };

  return (
    <div className={`font-heading font-bold ${sizeClasses[size]} ${colorClasses[colorTheme]} ${className}`}>
      RA<span className="font-hindi">ही</span>
    </div>
  );
};

export default RaahiLogo;
