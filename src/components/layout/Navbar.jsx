import React from 'react';
import Logo from './Logo';
import { User, Heart, Compass, Smartphone, Monitor, PhoneCall, HelpCircle, Info, Sparkles } from 'lucide-react';

export default function Navbar({
  currentView,
  onViewChange,
  activeTab,
  onTabChange,
  favoritesCount = 0,
  bookingsCount = 1,
  onOpenAuth,
  isLoggedIn = false
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 figma-header-shadow">
      {/* Top Utility Bar */}
      <div className="hidden lg:block bg-slate-50/80 border-b border-slate-100/80 text-xs text-slate-500 py-1.5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 space-x-reverse">
            <span className="flex items-center space-x-1.5 space-x-reverse text-slate-600">
              <PhoneCall size={13} className="text-[#00828A]" />
              <span>پشتیبانی ۲۴ ساعته: ۰۲۱-۲۳۴۵۶۷۸۹</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full text-[11px]">
              تضمین کمترین قیمت و رزرو آنی بدون معطلی
            </span>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <a href="#faq" className="hover:text-[#00828A] transition flex items-center space-x-1 space-x-reverse">
              <HelpCircle size={13} />
              <span>سوالات متداول</span>
            </a>
            <a href="#about" className="hover:text-[#00828A] transition flex items-center space-x-1 space-x-reverse">
              <Info size={13} />
              <span>درباره آشیانه</span>
            </a>
            <a href="#contact" className="hover:text-[#00828A] transition">
              تماس با ما
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Logo & Brand */}
        <div
          onClick={() => onTabChange('home')}
          className="cursor-pointer"
        >
          <Logo />
        </div>

        {/* View Mode Switcher (Desktop Web vs Mobile App Simulator) */}
        <div className="hidden md:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200/80">
          <button
            onClick={() => onViewChange('desktop')}
            className={`flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentView === 'desktop'
                ? 'bg-white text-[#00828A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Monitor size={15} />
            <span>نمای وب دسکتاپ</span>
          </button>

          <button
            onClick={() => onViewChange('mobile')}
            className={`flex items-center space-x-2 space-x-reverse px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              currentView === 'mobile'
                ? 'bg-white text-[#00828A] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone size={15} />
            <span>شبیه‌ساز موبایل (iOS)</span>
          </button>
        </div>

        {/* Left Side Actions (User, Trips, Favorites) */}
        <div className="flex items-center space-x-3 space-x-reverse">
          {/* Favorites */}
          <button
            onClick={() => onTabChange('favorites')}
            className={`relative p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-center ${
              activeTab === 'favorites'
                ? 'bg-[#E6F4F5] border-[#00828A] text-[#00828A]'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#00828A]'
            }`}
            title="اقامتگاه‌های مورد علاقه"
          >
            <Heart size={18} className={favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : ''} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* My Trips */}
          <button
            onClick={() => onTabChange('trips')}
            className={`relative flex items-center space-x-1.5 space-x-reverse px-3.5 py-2 rounded-xl border text-xs font-semibold transition cursor-pointer ${
              activeTab === 'trips'
                ? 'bg-[#E6F4F5] border-[#00828A] text-[#00828A]'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Compass size={17} className="text-[#00828A]" />
            <span className="hidden sm:inline">سفرهای من</span>
            {bookingsCount > 0 && (
              <span className="bg-[#00828A] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {bookingsCount}
              </span>
            )}
          </button>

          {/* Login / Profile Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-xl bg-gradient-to-r from-[#00828A] to-[#0E7490] text-white text-xs font-bold shadow-sm hover:shadow hover:brightness-105 active:scale-98 transition cursor-pointer"
          >
            <User size={16} />
            <span>{isLoggedIn ? 'محمدرضا مرادی' : 'ورود / ثبت‌نام'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
