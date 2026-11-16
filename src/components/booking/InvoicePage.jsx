import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  Percent,
  Check,
  CreditCard,
  X,
  PhoneCall,
  Sparkles,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InvoicePage({
  booking,
  onConfirmPayment,
  onCancelBooking,
  onBackToHome
}) {
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountMessage, setDiscountMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(booking?.status === 'confirmed');
  
  // Countdown timer state: 47:12:59
  const [timeLeft, setTimeLeft] = useState(47 * 3600 + 12 * 60 + 59);

  useEffect(() => {
    if (isPaid) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaid]);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  const discountAmount = discountApplied ? Math.round(booking.final_price * 0.15) : 0;
  const payableAmount = booking.final_price - discountAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = discountCode.trim().toUpperCase();
    if (code === 'ASHYANEH' || code === 'OFF1403' || code === 'NOROOZ') {
      setDiscountApplied(true);
      setDiscountMessage('کد تخفیف ۱۵ درصدی شگفت‌انگیز با موفقیت اعمال شد!');
    } else {
      setDiscountApplied(false);
      setDiscountMessage('کد تخفیف وارد شده معتبر نمی‌باشد.');
    }
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      onConfirmPayment(booking.tracking_code);

      // Fireworks celebration!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00828A', '#10B981', '#F59E0B', '#3B82F6']
      });
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-slate-800">
      {/* Top Back Link */}
      <button
        onClick={onBackToHome}
        className="flex items-center space-x-2 space-x-reverse text-slate-500 hover:text-[#00828A] font-bold text-xs cursor-pointer mb-6"
      >
        <ArrowRight size={16} />
        <span>بازگشت به صفحه اصلی</span>
      </button>

      {/* Booking Stepper Progress (Figma 4037:88784) */}
      <div className="bg-white rounded-3xl p-5 mb-8 border border-slate-100 figma-card-shadow">
        <div className="flex items-center justify-between max-w-xl mx-auto relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-1 bg-slate-100 -z-0">
            <div
              className={`h-full bg-[#00828A] transition-all duration-500 ${
                isPaid ? 'w-full' : 'w-2/3'
              }`}
            />
          </div>

          {/* Step 1: Request */}
          <div className="flex flex-col items-center space-y-1.5 z-10 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-[#00828A] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Check size={16} />
            </div>
            <span className="text-[11px] font-bold text-slate-700">ثبت درخواست</span>
          </div>

          {/* Step 2: Host Confirmation */}
          <div className="flex flex-col items-center space-y-1.5 z-10 bg-white px-2">
            <div className="w-8 h-8 rounded-full bg-[#00828A] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Check size={16} />
            </div>
            <span className="text-[11px] font-bold text-slate-700">تایید میزبان</span>
          </div>

          {/* Step 3: Payment */}
          <div className="flex flex-col items-center space-y-1.5 z-10 bg-white px-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                isPaid ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white animate-pulse'
              }`}
            >
              {isPaid ? <Check size={16} /> : <CreditCard size={15} />}
            </div>
            <span className="text-[11px] font-bold text-slate-900">
              {isPaid ? 'پرداخت شده' : 'پرداخت'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Status & Details on Right, Invoice Summary on Left */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Right 7 Cols: Status, Stay info, Discounts, Rules */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Box */}
          {isPaid ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-emerald-900 flex items-start space-x-4 space-x-reverse shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <FileCheck size={26} />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-base">رزرو شما قطعی و تایید شد!</h3>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  کد پیگیری اقامت شما: <strong className="font-mono text-sm underline">{booking.tracking_code}</strong>.
                  اطلاعات تماس میزبان و موقعیت دقیق برای شما پیامک شد.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 border border-slate-100 figma-card-shadow space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-6 h-6 rounded-md bg-amber-500 text-white flex items-center justify-center">
                  <Check size={16} className="stroke-[3]" />
                </div>
                <h2 className="text-base font-extrabold text-slate-900">در انتظار پرداخت</h2>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                میزبان شما درخواست رزرو را تایید کرد. با توجه به مهلت پرداخت و امکان از دست دادن رزرو، به موقع پرداخت کنید.
              </p>

              {/* Digital Countdown Timer (Figma 4037:88784) */}
              <div className="flex items-center justify-center space-x-2 space-x-reverse py-3">
                <div className="w-14 h-12 rounded-2xl bg-slate-100 text-slate-900 font-mono font-black text-lg flex items-center justify-center shadow-inner">
                  {hours}
                </div>
                <span className="font-bold text-slate-400">:</span>
                <div className="w-14 h-12 rounded-2xl bg-slate-100 text-slate-900 font-mono font-black text-lg flex items-center justify-center shadow-inner">
                  {minutes}
                </div>
                <span className="font-bold text-slate-400">:</span>
                <div className="w-14 h-12 rounded-2xl bg-rose-50 text-rose-600 font-mono font-black text-lg flex items-center justify-center shadow-inner border border-rose-200/50">
                  {seconds}
                </div>
              </div>
            </div>
          )}

          {/* Stay Info Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 figma-card-shadow space-y-3.5 text-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              مشخصات و مسافران
            </h3>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">تاریخ سفر:</span>
              <span className="font-bold text-slate-800">{booking.check_in} تا {booking.check_out} ({booking.nights_count} شب)</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-50">
              <span className="text-slate-500">تعداد مسافران:</span>
              <span className="font-bold text-slate-800">
                {booking.adults_count} نفر پایه {booking.extra_guests_count > 0 ? `+ ${booking.extra_guests_count} نفر اضافه` : ''}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-500">اطلاعات مسافر اصلی:</span>
              <span className="font-bold text-slate-800">{booking.guest_name} ({booking.guest_phone})</span>
            </div>
          </div>

          {/* Discount Coupon Form */}
          {!isPaid && (
            <div className="bg-white rounded-3xl p-5 border border-slate-100 figma-card-shadow">
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <span className="text-xs font-bold text-slate-700 block">اگر کد تخفیف دارید وارد کنید:</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="مثلاً ASHYANEH یا OFF1403"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00828A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 transition cursor-pointer"
                  >
                    اعمال تخفیف
                  </button>
                </div>
                {discountMessage && (
                  <p className={`text-[11px] font-semibold ${discountApplied ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {discountMessage}
                  </p>
                )}
              </form>
            </div>
          )}

          {/* Cancellation Policy Badges (Figma 4037:88784) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 figma-card-shadow space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">قوانین و شرایط لغو رزرو</h3>
            
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs">
                <strong>تا ۸ اسفند:</strong> ۱۰ درصد مبلغ شب اول + ۱۰ درصد مبلغ شب‌های باقیمانده کسر می‌گردد.
              </div>
              <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs">
                <strong>از ۸ اسفند تا ۱۲ اسفند:</strong> ۵۰ درصد مبلغ شب اول + ۲۰ درصد مبلغ شب‌های باقیمانده.
              </div>
              <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-rose-900 text-xs">
                <strong>دوازدهم اسفند به بعد:</strong> ۱۰۰ درصد مبلغ شب‌های سپری شده + ۵۰ درصد شب‌های باقیمانده.
              </div>
            </div>
          </div>
        </div>

        {/* Left 5 Cols: Payment Breakdown & Actions */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white rounded-3xl p-6 border border-slate-200/90 figma-card-shadow space-y-5">
            {/* Property Summary Header */}
            <div className="flex items-center space-x-3.5 space-x-reverse pb-4 border-b border-slate-100">
              <img
                src={booking.accommodation_image}
                alt={booking.accommodation_title}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shrink-0"
              />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm leading-tight line-clamp-1">
                  {booking.accommodation_title}
                </h4>
                <p className="text-xs text-slate-500 mt-1">استان {booking.accommodation_city}</p>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs text-slate-600">
              <h5 className="font-bold text-slate-800 text-xs">جزئیات پرداخت:</h5>

              <div className="flex justify-between">
                <span>{booking.nights_count} شب × {Number(booking.price_per_night).toLocaleString('fa-IR')} تومان:</span>
                <span className="font-mono">{Number(booking.total_nights_price).toLocaleString('fa-IR')} تومان</span>
              </div>

              {booking.extra_guests_price > 0 && (
                <div className="flex justify-between text-amber-700">
                  <span>نفرات اضافی ({booking.extra_guests_count} نفر):</span>
                  <span className="font-mono">{Number(booking.extra_guests_price).toLocaleString('fa-IR')} تومان</span>
                </div>
              )}

              <div className="flex justify-between text-slate-400">
                <span>مالیات و عوارض قانونی:</span>
                <span className="font-mono">{Number(booking.tax_amount).toLocaleString('fa-IR')} تومان</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>تخفیف ویژه کد آشیانه (۱۵٪):</span>
                  <span className="font-mono">- {Number(discountAmount).toLocaleString('fa-IR')} تومان</span>
                </div>
              )}

              <div className="flex justify-between pt-3 border-t border-slate-200 text-sm font-black text-slate-900">
                <span>جمع مبلغ قابل پرداخت:</span>
                <span className="text-[#00828A] font-mono text-base">
                  {Number(payableAmount).toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-2">
              {!isPaid ? (
                <>
                  <button
                    onClick={handlePayNow}
                    disabled={isProcessing}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00828A] to-[#0E7490] text-white font-black text-sm shadow-md hover:shadow-lg hover:brightness-105 active:scale-98 transition cursor-pointer flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <CreditCard size={18} />
                    <span>{isProcessing ? 'در حال اتصال به درگاه شاپرک...' : 'پرداخت آنلاین و نهایی‌سازی'}</span>
                  </button>

                  <button
                    onClick={onCancelBooking}
                    className="w-full py-2.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition cursor-pointer"
                  >
                    ویرایش یا لغو رزرو
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs font-bold text-emerald-800">
                    پرداخت با موفقیت انجام شد • فاکتور صادر گردید
                  </div>
                  <button
                    onClick={onBackToHome}
                    className="w-full py-3 rounded-2xl bg-[#00828A] text-white font-bold text-xs hover:bg-[#006e75] transition"
                  >
                    بازگشت به صفحه اصلی
                  </button>
                </div>
              )}
            </div>

            {/* Support Hotline */}
            <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100 flex items-center justify-center space-x-1.5 space-x-reverse">
              <PhoneCall size={13} className="text-[#00828A]" />
              <span>در صورت داشتن هرگونه سوال با ما تماس بگیرید: </span>
              <strong className="text-slate-700 font-mono">۰۲۱-۴۵۲۳۶۲۵۱۴</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
