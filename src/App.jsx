import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSearch from './components/home/HeroSearch';
import CategoryBar from './components/home/CategoryBar';
import AccommodationCard from './components/home/AccommodationCard';
import ProductDetailPage from './components/detail/ProductDetailPage';
import InvoicePage from './components/booking/InvoicePage';
import FilterModal from './components/modals/FilterModal';
import MobileAppView from './components/mobile/MobileAppView';
import { api } from './services/api';
import { Sparkles, Compass, Heart, CheckCircle2, AlertTriangle, Phone, Search } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('desktop'); // 'desktop' | 'mobile'
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'detail' | 'invoice' | 'favorites' | 'trips'
  
  const [categories, setCategories] = useState([]);
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [bookingsList, setBookingsList] = useState([]);
  
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    category: 'popular',
    maxPrice: 10000000,
    instant: false
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      const [cats, accs, bks] = await Promise.all([
        api.getCategories(),
        api.getAccommodations(filters),
        api.getBookings()
      ]);
      setCategories(cats);
      setAccommodations(accs);
      setBookingsList(bks);
      if (bks && bks.length > 0) {
        setCurrentBooking(bks[0]);
      }

      // Check Django REST connection
      try {
        const res = await fetch('http://127.0.0.1:8000/api/accommodations/');
        if (res.ok) setIsBackendConnected(true);
      } catch {
        setIsBackendConnected(false);
      }
    }
    loadData();
  }, []);

  // Re-fetch on filter change
  useEffect(() => {
    async function updateList() {
      const accs = await api.getAccommodations(filters);
      setAccommodations(accs);
    }
    updateList();
  }, [filters]);

  const handleSelectCategory = (catSlug) => {
    setFilters((prev) => ({ ...prev, category: catSlug }));
  };

  const handleSearch = ({ city, dateRange, guestsCount }) => {
    setFilters((prev) => ({ ...prev, city }));
    setActiveTab('home');
  };

  const handleCardClick = (acc) => {
    setSelectedAccommodation(acc);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = async (id) => {
    setAccommodations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, is_favorite: !a.is_favorite } : a))
    );
    if (selectedAccommodation?.id === id) {
      setSelectedAccommodation((prev) => ({ ...prev, is_favorite: !prev.is_favorite }));
    }
    await api.toggleFavorite(id);
  };

  const handleProceedToBooking = async (bookingData) => {
    const created = await api.createBooking(bookingData);
    setCurrentBooking(created);
    setBookingsList((prev) => [created, ...prev]);
    setActiveTab('invoice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmPayment = async (trackingCode) => {
    const updated = await api.confirmBookingPayment(trackingCode);
    setCurrentBooking(updated);
    setBookingsList((prev) =>
      prev.map((b) => (b.tracking_code === trackingCode ? updated : b))
    );
  };

  const favorites = accommodations.filter((a) => a.is_favorite);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans selection:bg-[#00828A] selection:text-white text-slate-800">
      {/* Platform Header & Navbar */}
      <Navbar
        currentView={viewMode}
        onViewChange={setViewMode}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        favoritesCount={favorites.length}
        bookingsCount={bookingsList.length}
        onOpenAuth={() => alert('ورود با شماره موبایل و کد یکبار مصرف پیامکی (OTP)')}
        isLoggedIn={true}
      />

      {/* Backend & Production Status Pill */}
      <div className="bg-gradient-to-r from-[#00828A]/10 via-emerald-500/10 to-[#00828A]/10 border-b border-[#00828A]/20 py-1.5 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse font-medium text-slate-700">
            <Sparkles size={14} className="text-[#00828A]" />
            <span>سامانه ملی رزرو آنلاین اقامتگاه و هتل آشیانه — نسخه فول‌استک (React + Django REST)</span>
          </div>
          <div className="flex items-center space-x-1.5 space-x-reverse">
            <span
              className={`w-2 h-2 rounded-full ${
                isBackendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-cyan-500'
              }`}
            />
            <span className="text-[11px] font-semibold text-slate-600">
              {isBackendConnected ? 'اتصال زنده به سرور جنگو' : 'حالت پایدار کلاینت و گیت‌هاب'}
            </span>
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1">
        {viewMode === 'mobile' ? (
          /* Mobile Simulator Mode inside iPhone 14/15 Device Frame */
          <div className="py-10 px-4 flex flex-col items-center">
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-[#00828A] bg-[#E6F4F5] px-3 py-1 rounded-full">
                شبیه‌ساز رسمی اپلیکیشن موبایل آشیانه (Figma Frame 4037:83336)
              </span>
              <p className="text-xs text-slate-500 mt-2">
                برای رزرو یا مشاهده جزییات هر اقامتگاه، روی کارت مورد نظر ضربه بزنید.
              </p>
            </div>

            <MobileAppView
              accommodations={accommodations}
              activeCategory={filters.category}
              onSelectCategory={handleSelectCategory}
              onSelectAccommodation={(acc) => {
                setSelectedAccommodation(acc);
                setActiveTab('detail');
              }}
              onToggleFavorite={handleToggleFavorite}
              activeMobileTab={activeTab === 'home' ? 'home' : activeTab}
              onMobileTabChange={setActiveTab}
            />
          </div>
        ) : (
          /* Desktop Web View */
          <>
            {activeTab === 'home' && (
              <div className="py-6">
                {/* Hero Search Box (Figma DesktopHeader) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                  <HeroSearch
                    onSearch={handleSearch}
                    initialFilters={filters}
                  />
                </div>

                {/* Categories Bar */}
                <CategoryBar
                  categories={categories}
                  activeCategory={filters.category}
                  onSelectCategory={handleSelectCategory}
                  onOpenFilters={() => setIsFilterOpen(true)}
                  activeFiltersCount={filters.type || filters.instant ? 1 : 0}
                />

                {/* Accommodations Grid (12 Cards - Figma 4037:83410) */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {accommodations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {accommodations.map((acc) => (
                        <AccommodationCard
                          key={acc.id}
                          accommodation={acc}
                          onSelect={handleCardClick}
                          onToggleFavorite={handleToggleFavorite}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8">
                      <Search size={40} className="mx-auto text-slate-300 mb-3" />
                      <h3 className="font-bold text-slate-800 text-base mb-1">
                        اقامتگاهی با مشخصات انتخابی شما یافت نشد!
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">
                        لطفاً فیلترهای جستجو را بازنشانی کرده یا شهر دیگری را جستجو کنید.
                      </p>
                      <button
                        onClick={() => setFilters({ city: '', type: '', category: 'popular', maxPrice: 10000000, instant: false })}
                        className="px-5 py-2 rounded-xl bg-[#00828A] text-white font-bold text-xs"
                      >
                        نمایش همه اقامتگاه‌ها
                      </button>
                    </div>
                  )}

                  {/* Load More & Host Invitation Banner (Figma 4037:83423) */}
                  <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-[#0E7490] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                    <div className="space-y-1.5 text-center md:text-right">
                      <h3 className="text-lg font-black tracking-tight">
                        اقامتگاه خود را نیافتید یا مایل به میزبانی در آشیانه هستید؟
                      </h3>
                      <p className="text-xs text-slate-200 max-w-xl">
                        با ثبت اقامتگاه در سامانه آشیانه، درآمد میلیونی پایدار کسب کنید و با بیش از ۱۰۰ هزار مسافر سراسر ایران در ارتباط باشید.
                      </p>
                    </div>

                    <div className="flex items-center space-x-3 space-x-reverse">
                      <button
                        onClick={() => alert('فرم ثبت‌نام و دریافت مدارک اقامتگاه')}
                        className="px-6 py-3 rounded-2xl bg-[#00828A] hover:bg-[#006e75] text-white font-extrabold text-xs shadow-md transition cursor-pointer"
                      >
                        ثبت اقامتگاه در آشیانه
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'detail' && selectedAccommodation && (
              <ProductDetailPage
                accommodation={selectedAccommodation}
                onBack={() => setActiveTab('home')}
                onProceedToBooking={handleProceedToBooking}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {activeTab === 'invoice' && currentBooking && (
              <InvoicePage
                booking={currentBooking}
                onConfirmPayment={handleConfirmPayment}
                onCancelBooking={() => {
                  alert('رزرو شما لغو گردید.');
                  setActiveTab('home');
                }}
                onBackToHome={() => setActiveTab('home')}
              />
            )}

            {activeTab === 'favorites' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <div className="flex items-center space-x-2 space-x-reverse mb-6">
                  <Heart size={20} className="fill-rose-500 text-rose-500" />
                  <h2 className="text-xl font-bold text-slate-900">اقامتگاه‌های مورد علاقه شما</h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold">
                    {favorites.length} مورد
                  </span>
                </div>

                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((acc) => (
                      <AccommodationCard
                        key={acc.id}
                        accommodation={acc}
                        onSelect={handleCardClick}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8">
                    <Heart size={44} className="mx-auto text-slate-300 mb-3" />
                    <h3 className="font-bold text-slate-800 text-sm mb-1">
                      هنوز اقامتگاهی به لیست علاقه‌مندی‌ها اضافه نکرده‌اید!
                    </h3>
                    <p className="text-xs text-slate-400 mb-4">
                      با کلیک بر روی آیکون قلب هر کارت، می‌توانید ویلاهای دلخواه را اینجا ذخیره کنید.
                    </p>
                    <button
                      onClick={() => setActiveTab('home')}
                      className="px-5 py-2 rounded-xl bg-[#00828A] text-white font-bold text-xs"
                    >
                      مشاهده اقامتگاه‌ها
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'trips' && (
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                <div className="flex items-center space-x-2 space-x-reverse mb-6">
                  <Compass size={20} className="text-[#00828A]" />
                  <h2 className="text-xl font-bold text-slate-900">سفرهای من و سوابق رزرو</h2>
                </div>

                <div className="space-y-4">
                  {bookingsList.map((b) => (
                    <div
                      key={b.id || b.tracking_code}
                      className="bg-white rounded-3xl p-5 border border-slate-200/90 figma-card-shadow flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                      <div className="flex items-center space-x-4 space-x-reverse w-full sm:w-auto">
                        <img
                          src={b.accommodation_image}
                          alt={b.accommodation_title}
                          className="w-20 h-20 rounded-2xl object-cover shrink-0 border"
                        />
                        <div className="space-y-1">
                          <span className="text-[11px] font-mono text-slate-400">کد رهگیری: {b.tracking_code}</span>
                          <h4 className="font-extrabold text-slate-900 text-sm">{b.accommodation_title}</h4>
                          <p className="text-xs text-slate-500">تاریخ: {b.check_in} تا {b.check_out} ({b.nights_count} شب)</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 space-x-reverse w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <span className="text-[11px] text-slate-400 block">مبلغ پرداختی:</span>
                          <span className="font-bold text-sm text-[#00828A] font-mono">
                            {Number(b.final_price).toLocaleString('fa-IR')} تومان
                          </span>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-xl text-xs font-bold ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {b.status === 'confirmed' ? 'رزرو قطعی و تایید شده' : 'در انتظار پرداخت'}
                        </span>

                        <button
                          onClick={() => {
                            setCurrentBooking(b);
                            setActiveTab('invoice');
                          }}
                          className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                        >
                          مشاهده فاکتور
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Advanced Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={(f) => setFilters((prev) => ({ ...prev, ...f }))}
        initialFilters={filters}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
