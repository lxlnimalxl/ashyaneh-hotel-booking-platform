import React, { useState } from 'react';
import {
  ArrowRight,
  Share2,
  Heart,
  Star,
  MapPin,
  ShieldCheck,
  Zap,
  Users,
  Bed,
  Bath,
  Maximize2,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import pdpMap from '../../assets/images/pdp-map.png';

export default function ProductDetailPage({
  accommodation,
  onBack,
  onProceedToBooking,
  onToggleFavorite
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [nights, setNights] = useState(2);
  const [guestCount, setGuestCount] = useState(accommodation.base_guests || 2);
  const [checkInDate, setCheckInDate] = useState('۲۷ بهمن ۱۴۰۳');
  const [checkOutDate, setCheckOutDate] = useState('۲۹ بهمن ۱۴۰۳');

  const {
    id,
    title,
    city,
    province,
    address,
    host_name,
    rating,
    reviews_count,
    base_guests,
    extra_guests,
    max_guests,
    rooms_count,
    bathrooms_count,
    area_sqm,
    price_per_night,
    discount_percent,
    is_instant_booking,
    image_url,
    gallery_urls = [],
    description,
    amenities = [],
    rules = [],
    cancellation_policy,
    is_favorite
  } = accommodation;

  const extraGuestsCount = Math.max(0, guestCount - base_guests);
  const extraGuestFeePerNight = 250000;
  const extraGuestsTotal = extraGuestsCount * extraGuestFeePerNight * nights;
  const totalNightsPrice = price_per_night * nights;
  const taxAmount = 28000;
  const grandTotal = totalNightsPrice + extraGuestsTotal + taxAmount;

  const images = gallery_urls && gallery_urls.length > 0 ? gallery_urls : [image_url];

  const handleBookingSubmit = () => {
    onProceedToBooking({
      accommodation_id: id,
      accommodation_title: title,
      accommodation_city: city,
      accommodation_image: image_url,
      price_per_night,
      nights_count: nights,
      check_in: checkInDate,
      check_out: checkOutDate,
      adults_count: guestCount,
      extra_guests_count: extraGuestsCount,
      total_nights_price: totalNightsPrice,
      extra_guests_price: extraGuestsTotal,
      tax_amount: taxAmount,
      final_price: grandTotal
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-800">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 space-x-reverse text-slate-600 hover:text-[#00828A] font-bold text-xs cursor-pointer group"
        >
          <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          <span>بازگشت به لیست اقامتگاه‌ها</span>
        </button>

        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('لینک این اقامتگاه در کلیپ‌بورد کپی شد!');
              }
            }}
            className="flex items-center space-x-1.5 space-x-reverse px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            <Share2 size={14} />
            <span>اشتراک‌گذاری</span>
          </button>

          <button
            onClick={() => onToggleFavorite(id)}
            className="flex items-center space-x-1.5 space-x-reverse px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition cursor-pointer"
          >
            <Heart size={14} className={is_favorite ? 'fill-rose-500 text-rose-500' : ''} />
            <span>{is_favorite ? 'ذخیره شده' : 'علاقه‌مندی'}</span>
          </button>
        </div>
      </div>

      {/* Title & Quick Info */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center space-x-1 space-x-reverse text-slate-800 font-bold">
            <Star size={15} className="fill-amber-400 text-amber-400 stroke-none" />
            <span className="font-mono text-sm">{rating}</span>
            <span className="text-slate-400 font-normal">({reviews_count} نظر ثبت شده)</span>
          </div>
          <span>•</span>
          <div className="flex items-center space-x-1 space-x-reverse">
            <MapPin size={14} className="text-[#00828A]" />
            <span>استان {province}، {city}</span>
          </div>
          <span>•</span>
          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full">
            تضمین تمیزی و تطابق با عکس‌ها
          </span>
        </div>
      </div>

      {/* Photo Gallery Grid (Figma 4037:88344) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-10 h-auto sm:h-[420px] rounded-3xl overflow-hidden figma-card-shadow">
        {/* Main Hero Photo (2/3 width) */}
        <div className="lg:col-span-2 relative h-72 sm:h-full bg-slate-200 overflow-hidden">
          <img
            src={images[selectedImage] || images[0]}
            alt={title}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        {/* Thumbnail Sidebar (1/3 width) */}
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2.5 h-full">
          {images.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`relative h-24 lg:h-full rounded-2xl lg:rounded-none overflow-hidden cursor-pointer transition-all border-2 ${
                selectedImage === idx ? 'border-[#00828A] opacity-100' : 'border-transparent opacity-75 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Left Content (2 Cols) + Right Sticky Card (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Columns: Details, Amenities, Rules, Reviews */}
        <div className="lg:col-span-2 space-y-8">
          {/* Host & Core Specs Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 figma-card-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                اقامتگاه به میزبانی {host_name}
              </h3>
              <p className="text-xs text-slate-500">
                پاسخ‌گویی سریع • میزبان برگزیده آشیانه با ۹۸٪ رضایت مهمانان
              </p>
            </div>

            <div className="flex items-center space-x-6 space-x-reverse text-xs text-slate-600 border-t sm:border-t-0 sm:border-r border-slate-100 pt-3 sm:pt-0 sm:pr-6">
              <div className="flex items-center space-x-1.5 space-x-reverse">
                <Maximize2 size={16} className="text-[#00828A]" />
                <span>{area_sqm} متر</span>
              </div>
              <div className="flex items-center space-x-1.5 space-x-reverse">
                <Users size={16} className="text-[#00828A]" />
                <span>تا {max_guests} نفر</span>
              </div>
              <div className="flex items-center space-x-1.5 space-x-reverse">
                <Bed size={16} className="text-[#00828A]" />
                <span>{rooms_count} خواب</span>
              </div>
              <div className="flex items-center space-x-1.5 space-x-reverse">
                <Bath size={16} className="text-[#00828A]" />
                <span>{bathrooms_count} حمام</span>
              </div>
            </div>
          </div>

          {/* Highlights & Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-4 flex items-start space-x-3 space-x-reverse">
              <Zap size={20} className="text-amber-600 shrink-0 mt-0.5 fill-amber-500/20" />
              <div>
                <h4 className="font-bold text-amber-900 text-xs mb-1">رزرو آنی و قطعی با آشیانه</h4>
                <p className="text-[11px] text-amber-800/80 leading-relaxed">
                  برای رزرو نهایی این اقامتگاه نیازی به انتظار برای تایید از سمت میزبان ندارید و رزرو بلافاصله ثبت می‌شود.
                </p>
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-2xl p-4 flex items-start space-x-3 space-x-reverse">
              <ShieldCheck size={20} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-900 text-xs mb-1">لغو رزرو بدون جریمه</h4>
                <p className="text-[11px] text-emerald-800/80 leading-relaxed">
                  امکان لغو بدون کسر کارمزد تا ۷۲ ساعت قبل از شروع سفر و عودت آنی کل وجه به کیف پول.
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 figma-card-shadow space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">توضیحات اقامتگاه</h3>
            <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
              {description}
            </p>
            <div className="pt-2 flex items-center space-x-6 space-x-reverse text-xs text-slate-500 border-t border-slate-100">
              <div className="flex items-center space-x-1.5 space-x-reverse">
                <Clock size={14} className="text-[#00828A]" />
                <span>ساعت ورود: <strong>۱۴:۰۰</strong></span>
              </div>
              <div className="flex items-center space-x-1.5 space-x-reverse">
                <Clock size={14} className="text-rose-500" />
                <span>ساعت خروج: <strong>۱۲:۰۰ ظهر</strong></span>
              </div>
            </div>
          </div>

          {/* Amenities Breakdown (Figma 4037:88333) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 figma-card-shadow space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">امکانات مهم اقامتگاه</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Provided Amenities */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-[#00828A] flex items-center space-x-1 space-x-reverse">
                  <CheckCircle2 size={14} />
                  <span>امکانات موجود و تایید شده</span>
                </p>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 space-x-reverse text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rules & Limitations */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-600 flex items-center space-x-1 space-x-reverse">
                  <AlertCircle size={14} />
                  <span>قوانین و محدودیت‌های مهم</span>
                </p>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="flex items-center space-x-2 space-x-reverse text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 figma-card-shadow space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">موقعیت مکانی اقامتگاه</h3>
            <p className="text-xs text-slate-500">{address}</p>
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-slate-200">
              <img src={pdpMap} alt="Location Map" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-[#00828A] text-white flex items-center justify-center shadow-xl ring-4 ring-white animate-bounce">
                  <MapPin size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Sticky Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl p-6 figma-card-shadow border border-slate-200/90 space-y-5">
            {/* Price Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400">قیمت هر شب از:</span>
                <div className="flex items-center space-x-1 space-x-reverse">
                  <span className="text-2xl font-black text-[#00828A] tracking-tight">
                    {Number(price_per_night).toLocaleString('fa-IR')}
                  </span>
                  <span className="text-xs text-slate-600 font-bold">تومان</span>
                </div>
              </div>

              <div className="flex items-center space-x-1 space-x-reverse font-bold text-xs text-slate-800 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100">
                <Star size={13} className="fill-amber-400 text-amber-400 stroke-none" />
                <span>{rating}</span>
              </div>
            </div>

            {/* Dates Inputs */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200/80 text-xs">
              <div className="p-2">
                <span className="text-[10px] text-slate-400 block mb-0.5">تاریخ ورود</span>
                <input
                  type="text"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="bg-transparent border-none p-0 text-slate-800 font-bold w-full focus:outline-none"
                />
              </div>
              <div className="p-2 border-r border-slate-200">
                <span className="text-[10px] text-slate-400 block mb-0.5">تاریخ خروج</span>
                <input
                  type="text"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="bg-transparent border-none p-0 text-slate-800 font-bold w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Guests & Nights Counters */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">تعداد شب‌های اقامت:</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => setNights(Math.max(1, nights - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold w-6 text-center">{nights} شب</span>
                  <button
                    onClick={() => setNights(nights + 1)}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700">تعداد مسافران:</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold w-6 text-center">{guestCount} نفر</span>
                  <button
                    onClick={() => setGuestCount(Math.min(max_guests, guestCount + 1))}
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{nights} شب × {Number(price_per_night).toLocaleString('fa-IR')} تومان:</span>
                <span className="font-mono">{Number(totalNightsPrice).toLocaleString('fa-IR')} تومان</span>
              </div>
              {extraGuestsTotal > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>هزینه نفرات اضافه ({extraGuestsCount} نفر):</span>
                  <span className="font-mono">{Number(extraGuestsTotal).toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>مالیات و خدمات قانونی:</span>
                <span className="font-mono">{Number(taxAmount).toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-extrabold text-slate-900 text-sm">
                <span>جمع کل قابل پرداخت:</span>
                <span className="text-[#00828A]">{Number(grandTotal).toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleBookingSubmit}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00828A] to-[#0E7490] text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-98 transition-all cursor-pointer flex items-center justify-center space-x-2 space-x-reverse"
            >
              <span>ثبت رزرو و دریافت پیش‌فاکتور</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center">
              ارسال درخواست رزرو برای شما هزینه‌ای ندارد
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
