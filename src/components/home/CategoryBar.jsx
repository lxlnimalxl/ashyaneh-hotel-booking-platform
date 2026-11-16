import React from 'react';
import {
  Heart,
  TrendingUp,
  Home,
  Building2,
  Palmtree,
  Trees,
  Waves,
  ShoppingCart,
  Dumbbell,
  Landmark,
  Castle,
  Flame,
  SlidersHorizontal
} from 'lucide-react';

const ICON_MAP = {
  Heart,
  TrendingUp,
  Home,
  Building2,
  Palmtree,
  Trees,
  Waves,
  ShoppingCart,
  Dumbbell,
  Landmark,
  Castle,
  Flame
};

export default function CategoryBar({
  categories = [],
  activeCategory = 'popular',
  onSelectCategory,
  onOpenFilters,
  activeFiltersCount = 0
}) {
  return (
    <div className="w-full border-b border-slate-200/80 bg-white/70 backdrop-blur-xs py-3 my-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Filters Button */}
        <button
          onClick={onOpenFilters}
          className="relative flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-2xl border border-slate-200 text-slate-700 hover:border-[#00828A] hover:text-[#00828A] transition cursor-pointer shrink-0 font-bold text-xs bg-white shadow-2xs"
        >
          <SlidersHorizontal size={15} />
          <span>فیلترها</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#00828A] text-white text-[10px] flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Categories Horizontal Carousel */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center space-x-2 space-x-reverse py-1">
          {categories.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Home;
            const isActive = activeCategory === cat.slug;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`flex items-center space-x-1.5 space-x-reverse px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#00828A] text-white shadow-sm'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <Icon size={14} className={isActive ? 'stroke-[2.5]' : 'stroke-[2]'} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
