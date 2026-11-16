import React from 'react';
import { Heart, Star, Zap, Tag, Users, BedDouble } from 'lucide-react';

export default function AccommodationCard({
  accommodation,
  onSelect,
  onToggleFavorite
}) {
  const {
    id,
    title,
    city,
    province,
    rating,
    reviews_count,
    base_guests,
    extra_guests,
    rooms_count,
    price_per_night,
    discount_percent,
    is_instant_booking,
    is_competitive_price,
    image_url,
    is_favorite
  } = accommodation;

  const formattedPrice = Number(price_per_night).toLocaleString('fa-IR');

  return (
    <div
      onClick={() => onSelect(accommodation)}
      className="group bg-white rounded-[24px] p-3 border border-slate-100 figma-card-shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer select-none"
    >
      {/* Media Box */}
      <div className="relative w-full aspect-[280/230] rounded-[20px] overflow-hidden bg-slate-100 mb-3">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-xs flex items-center justify-center text-slate-700 hover:text-rose-500 hover:bg-white transition cursor-pointer"
          title="افزودن به علاقه‌مندی‌ها"
        >
          <Heart
            size={16}
            className={`transition-colors ${
              is_favorite ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
            }`}
          />
        </button>

        {/* Discount Badge */}
        {discount_percent > 0 && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-rose-500/90 backdrop-blur-xs text-white text-[11px] font-bold shadow-xs">
            تا {discount_percent}٪ تخفیف
          </div>
        )}
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center justify-between px-1 mb-1.5 text-xs">
        <div className="flex items-center space-x-1 space-x-reverse font-bold text-slate-800">
          <Star size={14} className="fill-amber-400 text-amber-400 stroke-none" />
          <span className="font-mono text-sm">{rating}</span>
          <span className="text-[11px] text-slate-400 font-normal">({reviews_count} نظر ثبت شده)</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-slate-900 text-sm mb-1 px-1 line-clamp-1 group-hover:text-[#00828A] transition-colors leading-snug">
        {title}
      </h3>

      {/* Subtitle / Location & Capacity */}
      <p className="text-[11px] text-slate-500 mb-3 px-1 leading-relaxed line-clamp-1">
        استان {province}، {city}، {rooms_count} اتاق، {base_guests} نفر پایه {extra_guests > 0 ? `+ ${extra_guests} نفر اضافه` : ''}
      </p>

      {/* Price row */}
      <div className="mt-auto pt-2 border-t border-slate-100/90 flex items-center justify-between px-1">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-medium">شروع قیمت هر شب:</span>
          <div className="flex items-center space-x-1 space-x-reverse">
            <span className="text-base font-extrabold text-[#00828A] tracking-tight">
              {formattedPrice}
            </span>
            <span className="text-[11px] text-slate-600 font-medium">تومان</span>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="flex items-center space-x-1 space-x-reverse">
          {is_instant_booking && (
            <span className="flex items-center space-x-0.5 space-x-reverse px-2 py-0.5 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200/50">
              <Zap size={11} className="fill-amber-500 text-amber-500" />
              <span>رزرو آنی</span>
            </span>
          )}
          {is_competitive_price && (
            <span className="flex items-center space-x-0.5 space-x-reverse px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/50">
              <Tag size={10} />
              <span>رقابتی</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
