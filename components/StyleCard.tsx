import React from 'react';
import { StyleOption } from '../types';
import * as LucideIcons from 'lucide-react';

interface StyleCardProps {
  style: StyleOption;
  isSelected: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const StyleCard: React.FC<StyleCardProps> = ({ style, isSelected, onClick, disabled }) => {
  // Dynamically get the icon component
  const IconComponent = (LucideIcons as any)[style.icon] || LucideIcons.Sparkles;
  
  // Special text color handling for light backgrounds like 'Coloring Book'
  const isLightBg = style.id === 'coloring-book';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden group rounded-xl transition-all duration-300 w-full text-left aspect-[4/3] flex flex-col p-4
        ${isSelected ? 'ring-4 ring-indigo-500 scale-105 z-10' : 'hover:scale-[1.02]'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${style.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className={`p-2 rounded-lg w-fit ${isLightBg ? 'bg-black/10' : 'bg-white/20'} backdrop-blur-md`}>
          <IconComponent className={`w-6 h-6 ${isLightBg ? 'text-gray-800' : 'text-white'}`} />
        </div>
        
        <div>
          <h3 className={`font-bold text-lg leading-tight mb-1 ${isLightBg ? 'text-gray-900' : 'text-white'}`}>
            {style.name}
          </h3>
          <p className={`text-xs ${isLightBg ? 'text-gray-700' : 'text-white/80'} line-clamp-2`}>
            {style.description}
          </p>
        </div>
      </div>
    </button>
  );
};