import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, X, ChevronDown, Check } from 'lucide-react';

const POPULAR_CITIES = ['تهران', 'رامسر', 'کردان', 'قشم', 'کلاردشت', 'شیرگاه', 'ماسال', 'رشت', 'سوادکوه', 'کیش'];

export default function HeroSearch({ onSearch, initialFilters = {} }) {
  const [city, setCity] = useState(initialFilters.city || '');
  const [dateRange, setDateRange] = useState('انتخاب کنید');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(1);
  
  const [activeDropdown, setActiveDropdown] = useState(null); // 'city' | 'date' | 'guests' | null

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setActiveDropdown(null);
  };

  const handleDateSelect = (label) => {
    setDateRange(label);
    setActiveDropdown(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveDropdown(null);
    if (onSearch) {
      onSearch({
        city: city.trim(),
        dateRange,
        guestsCount: adults + children + infants
      });
    }
  };

  const totalGuestsText = `${adults} نفر بزرگسال${children > 0 ? `، ${children} کودک` : ''}${infants > 0 ? `، ${infants} نوزاد` : ''}`;

  return (
    <div className="relative w-full max-w-4xl mx-auto z-30">
      {/* Outer Floating Search Bar Pill */}
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-full p-2.5 sm:p-3 figma-search-shadow border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0"
      >
        {/* 1. Destination Segment */}
        <div
          onClick={() => setActiveDropdown(activeDropdown === 'city' ? null : 'city')}
          className="relative flex-1 w-full px-5 py-2 cursor-pointer rounded-full hover:bg-slate-50 transition"
        >
          <div className="flex items-center space-x-2.5 space-x-reverse">
            <MapPin size={18} className="text-[#00828A] shrink-0" />
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-slate-700">
                جستجو شهر، استان یا اقامتگاه
              </span>
              <span className="text-xs text-slate-500 font-medium truncate max-w-[180px]">
                {city || 'همه شهرها و مناطق'}
              </span>
            </div>
          </div>
          {city && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCity('');
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-9 bg-slate-200" />

        {/* 2. Date Segment */}
        <div
          onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
          className="flex-1 w-full px-5 py-2 cursor-pointer rounded-full hover:bg-slate-50 transition"
        >
          <div className="flex items-center space-x-2.5 space-x-reverse">
            <Calendar size={18} className="text-[#00828A] shrink-0" />
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-slate-700">تاریخ ورود و خروج</span>
              <span className="text-xs text-slate-500 font-medium">{dateRange}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-[1px] h-9 bg-slate-200" />

        {/* 3. Guests Segment */}
        <div
          onClick={() => setActiveDropdown(activeDropdown === 'guests' ? null : 'guests')}
          className="flex-1 w-full px-5 py-2 cursor-pointer rounded-full hover:bg-slate-50 transition"
        >
          <div className="flex items-center space-x-2.5 space-x-reverse">
            <Users size={18} className="text-[#00828A] shrink-0" />
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-slate-700">تعداد نفرات</span>
              <span className="text-xs text-slate-500 font-medium truncate max-w-[160px]">
                {totalGuestsText}
              </span>
            </div>
          </div>
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="w-full md:w-12 md:h-12 py-3 md:py-0 rounded-full bg-gradient-to-tr from-[#00828A] to-[#0E7490] text-white flex items-center justify-center shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
          title="جستجو"
        >
          <Search size={20} className="stroke-[2.5]" />
          <span className="md:hidden font-bold text-xs mr-2">جستجو اقامتگاه</span>
        </button>
      </form>

      {/* Interactive Dropdowns */}
      {/* 1. Destination Dropdown */}
      {activeDropdown === 'city' && (
        <div className="absolute top-full mt-3 right-0 w-full sm:w-80 bg-white rounded-3xl p-4 figma-card-shadow border border-slate-100 z-50 animate-fade-in">
          <p className="text-xs font-bold text-slate-800 mb-2.5">محبوب‌ترین مقاصد سفر در ایران:</p>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_CITIES.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => handleCitySelect(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  city === c
                    ? 'bg-[#00828A] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Date Dropdown */}
      {activeDropdown === 'date' && (
        <div className="absolute top-full mt-3 right-0 sm:right-1/4 w-full sm:w-72 bg-white rounded-3xl p-4 figma-card-shadow border border-slate-100 z-50 animate-fade-in space-y-2">
          <p className="text-xs font-bold text-slate-800 mb-2">انتخاب بازه زمانی سفر:</p>
          {[
            'آخر این هفته (پنج‌شنبه تا جمعه)',
            'هفته آینده (۳ روزه)',
            '۲۷ بهمن تا ۲۹ بهمن (مطابق دیزاین فیگما)',
            'تعطیلات نوروز ۱۴۰۴'
          ].map((d) => (
            <button
              type="button"
              key={d}
              onClick={() => handleDateSelect(d)}
              className="w-full text-right p-2.5 rounded-xl text-xs font-medium hover:bg-[#E6F4F5] hover:text-[#00828A] transition flex items-center justify-between"
            >
              <span>{d}</span>
              {dateRange === d && <Check size={14} className="text-[#00828A]" />}
            </button>
          ))}
        </div>
      )}

      {/* 3. Guests Dropdown */}
      {activeDropdown === 'guests' && (
        <div className="absolute top-full mt-3 left-0 sm:left-12 w-full sm:w-72 bg-white rounded-3xl p-4 figma-card-shadow border border-slate-100 z-50 animate-fade-in space-y-3">
          {/* Adults */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">بزرگسال</p>
              <p className="text-[10px] text-slate-400">سن ۱۲ سال به بالا</p>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                type="button"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
              >
                -
              </button>
              <span className="w-5 text-center font-bold text-xs">{adults}</span>
              <button
                type="button"
                onClick={() => setAdults(adults + 1)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">کودک</p>
              <p className="text-[10px] text-slate-400">سن ۲ تا ۱۲ سال</p>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                type="button"
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
              >
                -
              </button>
              <span className="w-5 text-center font-bold text-xs">{children}</span>
              <button
                type="button"
                onClick={() => setChildren(children + 1)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Infants */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-800">نوزاد</p>
              <p className="text-[10px] text-slate-400">زیر ۲ سال</p>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                type="button"
                onClick={() => setInfants(Math.max(0, infants - 1))}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
              >
                -
              </button>
              <span className="w-5 text-center font-bold text-xs">{infants}</span>
              <button
                type="button"
                onClick={() => setInfants(infants + 1)}
                className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveDropdown(null)}
            className="w-full mt-2 py-2 rounded-xl bg-[#00828A] text-white font-bold text-xs hover:bg-[#006e75] transition"
          >
            تایید نفرات
          </button>
        </div>
      )}
    </div>
  );
}
