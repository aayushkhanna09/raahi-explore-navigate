
import React from 'react';

interface CategoryPillProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
}) => {
  return (
    <button
      className={`flex items-center px-4 py-2 rounded-full transition-colors ${
        isActive
          ? 'bg-primary text-white'
          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default CategoryPill;
