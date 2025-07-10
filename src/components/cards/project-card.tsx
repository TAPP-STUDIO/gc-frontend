
import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  color: 'pink' | 'blue' | 'green' | 'yellow';
  onPortfolioClick?: () => void;
  onBuyClick?: () => void;
  className?: string;
}

const colorClasses = {
  pink: {
    logo: 'text-pink-400',
    card: 'from-pink-500/20 to-pink-600/10',
    border: 'border-pink-500/30',
    accent: 'text-pink-400',
  },
  blue: {
    logo: 'text-blue-400',
    card: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    accent: 'text-blue-400',
  },
  green: {
    logo: 'text-green-400',
    card: 'from-green-500/20 to-green-600/10',
    border: 'border-green-500/30',
    accent: 'text-green-400',
  },
  yellow: {
    logo: 'text-yellow-400',
    card: 'from-yellow-500/20 to-yellow-600/10',
    border: 'border-yellow-500/30',
    accent: 'text-yellow-400',
  },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  color,
  onPortfolioClick,
  onBuyClick,
  className = ""
}) => {
  const colors = colorClasses[color];

  return (
    <div className={`bg-[#151515] rounded-2xl p-6 sm:p-8 hover:bg-[#1a1a1a] transition-all duration-300 group ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
        {/* Levá strana - Text content */}
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-[#F9D523] transition-colors">
            {title}
          </h3>
          
          <p className="text-sm sm:text-base text-[#888888] leading-relaxed">
            {description}
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={onPortfolioClick}
              className="px-6 py-2 border border-[#F9D523] text-[#F9D523] rounded-full hover:bg-[#F9D523] hover:text-[#151515] transition-all duration-200 text-sm font-medium"
            >
              Portfolio
            </button>
            <button
              onClick={onBuyClick}
              className="px-6 py-2 border border-[#F9D523] text-[#F9D523] rounded-full hover:bg-[#F9D523] hover:text-[#151515] transition-all duration-200 text-sm font-medium"
            >
              Nakoupit
            </button>
          </div>
        </div>

        {/* Pravá strana - Card visualization */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            {/* Main card */}
            <div className={`w-48 h-72 sm:w-56 sm:h-80 bg-gradient-to-br ${colors.card} ${colors.border} border-2 rounded-2xl shadow-2xl transform rotate-12 group-hover:rotate-6 transition-transform duration-300`}>
              {/* Card content */}
              <div className="flex flex-col justify-between h-full p-4 sm:p-6">
                {/* Top icons */}
                <div className="flex justify-between items-start">
                  <div className={`w-6 h-6 rounded-full border-2 ${colors.border} flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full ${colors.accent}`} />
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${colors.border} flex items-center justify-center`}>
                    <div className={`w-2 h-2 rounded-full ${colors.accent}`} />
                  </div>
                </div>

                {/* Center logo */}
                <div className="flex justify-center">
                  <div className={`text-6xl sm:text-7xl font-bold ${colors.logo}`}>
                    G
                  </div>
                </div>

                {/* Bottom section */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div className={`w-6 h-6 rounded-full border-2 ${colors.border} flex items-center justify-center`}>
                      <div className={`w-2 h-2 rounded-full ${colors.accent}`} />
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${colors.border} flex items-center justify-center`}>
                      <div className={`w-2 h-2 rounded-full ${colors.accent}`} />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-medium ${colors.accent} uppercase tracking-wider`}>
                      LIFETIME CARD
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shadow/background cards */}
            <div className={`absolute inset-0 w-48 h-72 sm:w-56 sm:h-80 bg-gradient-to-br ${colors.card} ${colors.border} border-2 rounded-2xl -z-10 transform rotate-6 opacity-50`} />
            <div className={`absolute inset-0 w-48 h-72 sm:w-56 sm:h-80 bg-gradient-to-br ${colors.card} ${colors.border} border-2 rounded-2xl -z-20 transform rotate-3 opacity-25`} />
          </div>
        </div>
      </div>
    </div>
  );
};