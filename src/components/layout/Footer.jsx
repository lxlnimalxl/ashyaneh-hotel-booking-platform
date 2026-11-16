import React from 'react';
import Logo from './Logo';
import badgeBazaar from '../../assets/images/badge-bazaar.png';
import badgeGooglePlay from '../../assets/images/badge-googleplay.png';
import { Phone, Mail, ShieldCheck, Clock, Award, Globe, Share2, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-14 pb-8 text-slate-600 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 mb-12 border-b border-slate-100 text-center sm:text-right">
          <div className="flex items-center space-x-3.5 space-x-reverse justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-[#E6F4F5] text-[#00828A] flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">ضمانت تطابق و تحویل اقامتگاه</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">در صورت مغایرت، تا ۲۴ ساعت کل مبلغ عودت می‌گردد</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 space-x-reverse justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">رزرو آنی و بدون معطلی</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">بدون نیاز به انتظار برای تایید میزبان در اقامتگاه‌های آنی</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5 space-x-reverse justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">پشتیبانی ۲۴ ساعته در تمام سفر</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">تیم پشتیبانی آشیانه در تمامی روزهای سال همراه شماست</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info & Socials */}
          <div className="col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm pl-4">
              آشیانه، معتبرترین سامانه آنلاین اجاره ویلا، سوئیت، کلبه‌های جنگلی و اقامتگاه‌های بوم‌گردی در سراسر ایران. سفری مطمئن، بدون واسطه و با تضمین کمترین قیمت.
            </p>
            <div className="pt-2">
              <p className="font-semibold text-slate-700 mb-2.5">آشیانه را در شبکه‌های اجتماعی دنبال کنید</p>
              <div className="flex items-center space-x-3 space-x-reverse text-slate-500">
                <a href="#instagram" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#00828A] hover:text-white transition" title="Instagram">
                  <Share2 size={16} />
                </a>
                <a href="#twitter" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#00828A] hover:text-white transition" title="Twitter">
                  <Send size={15} />
                </a>
                <a href="#linkedin" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-[#00828A] hover:text-white transition" title="LinkedIn">
                  <Globe size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">نحوه رزرو اقامتگاه</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#guide" className="hover:text-[#00828A] transition">راهنمای رزرو اقامتگاه</a></li>
              <li><a href="#payment" className="hover:text-[#00828A] transition">شیوه‌های پرداخت</a></li>
              <li><a href="#cancel" className="hover:text-[#00828A] transition">قوانین لغو رزرو</a></li>
              <li><a href="#insurance" className="hover:text-[#00828A] transition">بیمه مسافرتی آشیانه</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">خدمات مشتریان</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#guest-faq" className="hover:text-[#00828A] transition">پرسش‌های متداول مهمان</a></li>
              <li><a href="#host-faq" className="hover:text-[#00828A] transition">پرسش‌های متداول میزبان</a></li>
              <li><a href="#register-host" className="hover:text-[#00828A] transition font-semibold text-[#00828A]">چطور اقامتگاه ثبت کنم؟</a></li>
              <li><a href="#privacy" className="hover:text-[#00828A] transition">حریم شخصی کاربران</a></li>
            </ul>
          </div>

          {/* Col 3: App Downloads */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">دانلود اپلیکیشن آشیانه</h4>
            <p className="text-[11px] text-slate-500">دسترسی سریع و رزرو آسان‌تر با اپلیکیشن موبایل</p>
            <div className="space-y-2.5 pt-1">
              <a href="#bazaar" className="block hover:opacity-90 transition">
                <img src={badgeBazaar} alt="دانلود از کافه بازار" className="h-10 rounded-lg shadow-xs border border-slate-200" />
              </a>
              <a href="#googleplay" className="block hover:opacity-90 transition">
                <img src={badgeGooglePlay} alt="Get it on Google Play" className="h-10 rounded-lg shadow-xs border border-slate-200" />
              </a>
            </div>
          </div>
        </div>

        {/* 24/7 Call Center Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Phone size={20} className="animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold">در تمامی سفرهای شما، ۲۴ ساعته در کنارتان هستیم</p>
              <p className="text-xs text-slate-400">بدون تعطیلی، آماده پاسخگویی به سوالات و پیگیری رزروهای شما</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 space-x-reverse text-xs font-semibold">
            <a href="tel:02123456789" className="flex items-center space-x-2 space-x-reverse bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition">
              <Phone size={14} className="text-[#00828A]" />
              <span className="font-mono text-sm">۰۲۱-۲۳۴۵۶۷۸۹</span>
            </a>
            <a href="mailto:support@ashianeh.ir" className="flex items-center space-x-2 space-x-reverse bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition">
              <Mail size={14} className="text-[#00828A]" />
              <span className="font-mono">Support@ashianeh.ir</span>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-2">
          <p>© ۱۴۰۳ تمامی حقوق این سامانه متعلق به شرکت فناوری سفر و گردشگری آشیانه می‌باشد.</p>
          <p>طراحی شده بر اساس کیت دیزاین Figma • پیاده‌سازی شده با React 19 و Django REST</p>
        </div>
      </div>
    </footer>
  );
}
