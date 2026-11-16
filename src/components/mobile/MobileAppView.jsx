import React from 'react';
import {
  Search,
  Heart,
  TrendingUp,
  Dumbbell,
  ShoppingCart,
  Star,
  Zap,
  Tag,
  Home,
  Compass,
  User,
  Signal,
  Wifi,
  BatteryMedium
} from 'lucide-react';

export default function MobileAppView({
  accommodations = [],
  activeCategory = 'popular',
  onSelectCategory,
  onSelectAccommodation,
  onToggleFavorite,
  activeMobileTab = 'home',
  onMobileTabChange
}) {
  return (
    <div className="relative mx-auto w-[390px] h-[844px] bg-white rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,130,138,0.25),0_0_0_10px_#FFFFFF,0_0_0_12px_rgba(0,130,138,0.1)] overflow-hidden flex flex-col select-none border-4 border-slate-900/10 text-slate-800">
      {/* iOS Status Bar */}
      <div className="relative z-30 flex items-center justify-between px-7 pt-3.5 pb-1 text-slate-800 flex-shrink-0">
        <span className="text-[14px] font-semibold tracking-tight font-mono">9:41</span>
        
        {/* Dynamic Island pill */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[112px] h-[26px] bg-black rounded-full flex items-center justify-end pr-2.5 space-x-1 shadow-inner">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1C1C1E] border border-slate-700/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>

        <div className="flex items-center space-x-1.5 space-x-reverse">
          <div className="flex items-center">
            <BatteryMedium size={18} className="stroke-[2]" />
          </div>
          <Wifi size={13} className="stroke-[2.5]" />
          <Signal size={13} className="stroke-[2.5]" />
        </div>
      </div>

      {/* Screen Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        {/* Mobile Search Header Bar (Figma 4037:83336) */}
        <div className="p-4 pb-2">
          <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center space-x-2.5 space-x-reverse shadow-2xs">
            <Search size={18} className="text-[#00828A]" />
            <span className="text-xs text-slate-500 font-medium">
              شروع جستجو در <strong className="text-[#00828A]">آشیانه</strong>
            </span>
          </div>
        </div>

        {/* Mobile Categories Row */}
        <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
          {[
            { label: 'محبوب‌ترین‌ها', icon: Heart, slug: 'popular' },
            { label: 'بیشترین رزرو', icon: TrendingUp, slug: 'most-booked' },
            { label: 'ورزشی', icon: Dumbbell, slug: 'sports' },
            { label: 'مرکز خرید', icon: ShoppingCart, slug: 'shopping' },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => onSelectCategory(cat.slug)}
                className={`flex flex-col items-center space-y-1 pb-1 transition cursor-pointer ${
                  isActive ? 'text-[#00828A] border-b-2 border-[#00828A]' : 'hover:text-slate-800'
                }`}
              >
                <Icon size={16} className={isActive ? 'stroke-[2.5]' : ''} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Cards Stack */}
        <div className="p-4 space-y-5">
          {accommodations.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectAccommodation(item)}
              className="flex flex-col space-y-2 cursor-pointer group"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[358/240] rounded-[24px] overflow-hidden bg-slate-100 shadow-sm">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(item.id);
                  }}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-xs flex items-center justify-center text-slate-700 hover:text-rose-500 transition"
                >
                  <Heart size={16} className={item.is_favorite ? 'fill-rose-500 text-rose-500' : ''} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 space-x-reverse text-xs font-bold text-slate-800">
                <Star size={13} className="fill-amber-400 text-amber-400 stroke-none" />
                <span className="font-mono">{item.rating}</span>
                <span className="text-[11px] text-slate-400 font-normal">({item.reviews_count} نظر ثبت شده)</span>
              </div>

              {/* Title & Badges */}
              <h4 className="font-extrabold text-slate-900 text-sm leading-tight line-clamp-1">
                {item.title}
              </h4>

              {item.discount_percent > 0 && (
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full border border-rose-300 text-rose-600 text-[10px] font-bold">
                    تا {item.discount_percent} درصد تخفیف
                  </span>
                </div>
              )}

              {/* Subtitle */}
              <p className="text-[11px] text-slate-500 line-clamp-1">
                استان {item.province}، {item.city}، {item.rooms_count} اتاق، {item.base_guests} نفر پایه + ۲ نفر اضافه
              </p>

              {/* Price */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-1 space-x-reverse text-xs">
                  <span className="text-slate-400">شروع قیمت:</span>
                  <span className="font-black text-sm text-[#00828A]">
                    {Number(item.price_per_night).toLocaleString('fa-IR')}
                  </span>
                  <span className="text-slate-600 font-bold">تومان /هرشب</span>
                </div>

                <div className="flex items-center space-x-1 space-x-reverse text-[9px] font-bold">
                  <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/60">
                    رزرو آنی و قطعی
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                    قیمت رقابتی
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Nav (Figma 4037:83336) */}
      <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 py-2.5 px-6 flex items-center justify-between text-[11px] font-bold z-30">
        <button
          onClick={() => onMobileTabChange('home')}
          className={`flex flex-col items-center space-y-1 cursor-pointer ${
            activeMobileTab === 'home' ? 'text-[#00828A]' : 'text-slate-400'
          }`}
        >
          <Home size={19} className={activeMobileTab === 'home' ? 'stroke-[2.5]' : ''} />
          <span>خانه</span>
        </button>

        <button
          onClick={() => onMobileTabChange('favorites')}
          className={`flex flex-col items-center space-y-1 cursor-pointer ${
            activeMobileTab === 'favorites' ? 'text-[#00828A]' : 'text-slate-400'
          }`}
        >
          <Heart size={19} className={activeMobileTab === 'favorites' ? 'stroke-[2.5]' : ''} />
          <span>مورد علاقه‌ها</span>
        </button>

        <button
          onClick={() => onMobileTabChange('trips')}
          className={`flex flex-col items-center space-y-1 cursor-pointer ${
            activeMobileTab === 'trips' ? 'text-[#00828A]' : 'text-slate-400'
          }`}
        >
          <Compass size={19} className={activeMobileTab === 'trips' ? 'stroke-[2.5]' : ''} />
          <span>سفرهای من</span>
        </button>

        <button
          onClick={() => onMobileTabChange('profile')}
          className={`flex flex-col items-center space-y-1 cursor-pointer ${
            activeMobileTab === 'profile' ? 'text-[#00828A]' : 'text-slate-400'
          }`}
        >
          <User size={19} className={activeMobileTab === 'profile' ? 'stroke-[2.5]' : ''} />
          <span>ورود/ثبت‌نام</span>
        </button>
      </div>

      {/* iOS Home Indicator */}
      <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none z-40">
        <div className="w-32 h-[4px] bg-slate-900/30 rounded-full" />
      </div>
    </div>
  );
}
