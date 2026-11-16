import React, { useState } from 'react';
import { X, SlidersHorizontal, Check } from 'lucide-react';

export default function FilterModal({
  isOpen,
  onClose,
  onApplyFilters,
  initialFilters = {}
}) {
  const [selectedType, setSelectedType] = useState(initialFilters.type || '');
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice || 6000000);
  const [instantOnly, setInstantOnly] = useState(initialFilters.instant || false);
  const [rooms, setRooms] = useState(initialFilters.rooms || '');

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters({
      type: selectedType,
      maxPrice,
      instant: instantOnly,
      rooms
    });
    onClose();
  };

  const handleReset = () => {
    setSelectedType('');
    setMaxPrice(10000000);
    setInstantOnly(false);
    setRooms('');
    onApplyFilters({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in text-slate-800">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center space-x-2 space-x-reverse font-bold text-slate-900 text-sm">
            <SlidersHorizontal size={17} className="text-[#00828A]" />
            <span>فیلترهای پیشرفته اقامتگاه</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto no-scrollbar text-xs">
          {/* 1. Property Type */}
          <div className="space-y-2.5">
            <label className="font-bold text-slate-900 block text-xs">نوع اقامتگاه:</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'همه اقامتگاه‌ها', value: '' },
                { label: 'ویلا', value: 'villa' },
                { label: 'کلبه جنگلی', value: 'cottage' },
                { label: 'بوم‌گردی', value: 'eco' },
                { label: 'آپارتمان', value: 'apartment' },
              ].map((t) => (
                <button
                  type="button"
                  key={t.value}
                  onClick={() => setSelectedType(t.value)}
                  className={`p-2.5 rounded-xl font-bold text-xs border text-right transition cursor-pointer flex items-center justify-between ${
                    selectedType === t.value
                      ? 'border-[#00828A] bg-[#E6F4F5] text-[#00828A]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{t.label}</span>
                  {selectedType === t.value && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-bold text-slate-900 text-xs">حداکثر قیمت هر شب:</label>
              <span className="font-bold text-[#00828A] font-mono text-sm">
                تا {Number(maxPrice).toLocaleString('fa-IR')} تومان
              </span>
            </div>
            <input
              type="range"
              min="500000"
              max="10000000"
              step="250000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#00828A] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>۵۰۰,۰۰۰ تومان</span>
              <span>۱۰,۰۰۰,۰۰۰ تومان</span>
            </div>
          </div>

          {/* 3. Number of Bedrooms */}
          <div className="space-y-2.5">
            <label className="font-bold text-slate-900 block text-xs">تعداد اتاق خواب:</label>
            <div className="flex items-center space-x-2 space-x-reverse">
              {['', '1', '2', '3', '7'].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => setRooms(num)}
                  className={`flex-1 py-2 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                    rooms === num
                      ? 'bg-[#00828A] text-white border-[#00828A]'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {num ? `${num} خواب` : 'مهم نیست'}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Instant Booking Toggle */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-amber-900 text-xs">فقط اقامتگاه‌های رزرو آنی</p>
              <p className="text-[11px] text-amber-800">بدون نیاز به معطلی برای پاسخ و تایید میزبان</p>
            </div>
            <input
              type="checkbox"
              checked={instantOnly}
              onChange={(e) => setInstantOnly(e.target.checked)}
              className="w-5 h-5 accent-[#00828A] rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-slate-500 hover:text-rose-600 font-bold text-xs cursor-pointer px-3 py-2"
          >
            پاک کردن همه
          </button>

          <button
            onClick={handleApply}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00828A] to-[#0E7490] text-white font-bold text-xs shadow-md hover:shadow-lg transition cursor-pointer"
          >
            اعمال فیلترها
          </button>
        </div>
      </div>
    </div>
  );
}
