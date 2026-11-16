import card01 from '../assets/images/card-01.png';
import card02 from '../assets/images/card-02.png';
import card03 from '../assets/images/card-03.png';
import card04 from '../assets/images/card-04.png';
import card05 from '../assets/images/card-05.png';
import card06 from '../assets/images/card-06.png';
import card07 from '../assets/images/card-07.png';
import card08 from '../assets/images/card-08.png';
import card09 from '../assets/images/card-09.png';
import card10 from '../assets/images/card-10.png';
import card11 from '../assets/images/card-11.png';
import card12 from '../assets/images/card-12.png';

import pdpHero from '../assets/images/pdp-hero.png';
import pdpThumb1 from '../assets/images/pdp-thumb-1.png';
import pdpThumb2 from '../assets/images/pdp-thumb-2.png';
import pdpThumb3 from '../assets/images/pdp-thumb-3.png';
import pdpMap from '../assets/images/pdp-map.png';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const IMAGE_MAP = {
  'card-01.png': card01,
  'card-02.png': card02,
  'card-03.png': card03,
  'card-04.png': card04,
  'card-05.png': card05,
  'card-06.png': card06,
  'card-07.png': card07,
  'card-08.png': card08,
  'card-09.png': card09,
  'card-10.png': card10,
  'card-11.png': card11,
  'card-12.png': card12,
  'pdp-hero.png': pdpHero,
  'pdp-thumb-1.png': pdpThumb1,
  'pdp-thumb-2.png': pdpThumb2,
  'pdp-thumb-3.png': pdpThumb3,
  'pdp-map.png': pdpMap,
};

export { IMAGE_MAP };

const INITIAL_CATEGORIES = [
  { id: 1, name: 'محبوب‌ترین‌ها', slug: 'popular', icon: 'Heart' },
  { id: 2, name: 'بیشترین رزرو', slug: 'most-booked', icon: 'TrendingUp' },
  { id: 3, name: 'ویلا', slug: 'villa', icon: 'Home' },
  { id: 4, name: 'آپارتمان', slug: 'apartment', icon: 'Building2' },
  { id: 5, name: 'بوم‌گردی', slug: 'eco', icon: 'Palmtree' },
  { id: 6, name: 'کلبه جنگلی', slug: 'cottage', icon: 'Trees' },
  { id: 7, name: 'استخردار آبگرم', slug: 'pool', icon: 'Waves' },
  { id: 8, name: 'مرکز خرید', slug: 'shopping', icon: 'ShoppingCart' },
  { id: 9, name: 'ورزشی', slug: 'sports', icon: 'Dumbbell' },
  { id: 10, name: 'زیارتی', slug: 'pilgrimage', icon: 'Landmark' },
  { id: 11, name: 'تاریخی', slug: 'historical', icon: 'Castle' },
  { id: 12, name: 'ترندها', slug: 'trends', icon: 'Flame' },
];

const INITIAL_ACCOMMODATIONS = [
  {
    id: 1,
    title: 'اجاره کلبه فلت چوبی ورگانو کلاردشت',
    slug: 'vergano-cottage-kelardasht',
    type: 'cottage',
    category: 'cottage',
    province: 'مازندران',
    city: 'کلاردشت',
    address: 'مازندران، کلاردشت، روستای ورگانو، مجاورت جنگل‌های هیرکانی',
    host_name: 'سهراب رحمانی',
    rating: 3.9,
    reviews_count: 88,
    base_guests: 4,
    extra_guests: 1,
    max_guests: 5,
    rooms_count: 1,
    bathrooms_count: 1,
    area_sqm: 55,
    price_per_night: 1380000,
    discount_percent: 6,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card01,
    gallery_urls: [card01, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'کلبه چوبی مدرن و فلت در منطقه رویایی کلاردشت با چشم‌انداز ابدی کوهستان و جنگل. مجهز به شومینه چوبی، تراس باصفا، باربیکیو و دسترسی سریع به جاذبه‌های طبیعی مازندران.',
    amenities: ['سیستم گرمایشی پکیج', 'تلویزیون LED', 'پارکینگ اختصاصی', 'باربیکیو', 'آشپزخانه با وسایل پخت و پز', 'تراس رو به جنگل'],
    rules: ['ورود حیوانات خانگی مجاز نیست', 'استعمال دخانیات فقط در تراس', 'برگزاری مراسم با هماهنگی قبلی'],
    cancellation_policy: 'امکان لغو رایگان تا ۷۲ ساعت قبل از شروع اقامت. در صورت کنسلی در کمتر از ۷۲ ساعت، مبلغ شب اول کسر و مابقی عودت می‌گردد.',
    is_favorite: false,
  },
  {
    id: 2,
    title: 'کلبه چوبی در مازندران',
    slug: 'wooden-cottage-ramsar',
    type: 'cottage',
    category: 'popular',
    province: 'مازندران',
    city: 'رامسر',
    address: 'مازندران، رامسر، منطقه ییلاقی جواهرده، کوچه بهار',
    host_name: 'مائده مقصودلو',
    rating: 4.6,
    reviews_count: 58,
    base_guests: 2,
    extra_guests: 2,
    max_guests: 4,
    rooms_count: 1,
    bathrooms_count: 1,
    area_sqm: 70,
    price_per_night: 2960000,
    discount_percent: 3,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card02,
    gallery_urls: [card02, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'کلبه لوکس تمام چوبی مشرف به دریای ابر و اقیانوس آرام مازندران. استخر آبگرم روباز با دید پانوراما، فضای نشیمن مجلل با نورپردازی طبیعی، محوطه باغ اختصاصی و آرامش مطلق.',
    amenities: ['استخر آبگرم روباز', 'سیستم صوتی حرفه‌ای', 'اسپلیت سرمایشی/گرمایشی', 'مایکروویو و یخچال ساید', 'آلاچیق شیشه‌ای', 'وای‌فای رایگان'],
    rules: ['رزرو قطعی بدون کنسلی در تعطیلات', 'کارت شناسایی معتبر الزامی است', 'پذیرش خانواده و گروه‌های موجه'],
    cancellation_policy: 'امکان لغو رایگان تا ۵ روز قبل از ورود.',
    is_favorite: true,
  },
  {
    id: 3,
    title: 'اجاره کلبه یک خوابه جنگلی لفور - واحد انجیلی شیرگاه',
    slug: 'anjili-forest-cottage-lafour',
    type: 'cottage',
    category: 'most-booked',
    province: 'مازندران',
    city: 'شیرگاه',
    address: 'مازندران، سوادکوه شمالی، منطقه سد لفور، جنگل انجیلی',
    host_name: 'فرشید حسینی',
    rating: 5.0,
    reviews_count: 5,
    base_guests: 2,
    extra_guests: 2,
    max_guests: 4,
    rooms_count: 1,
    bathrooms_count: 1,
    area_sqm: 65,
    price_per_night: 3000000,
    discount_percent: 3,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card03,
    gallery_urls: [card03, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'واقع در قلب بکرترین جنگل‌های لفور، کلبه سنتی چوبی با استخر روباز فیروزه‌ای، تراس بزرگ رو به رودخانه و درختان سر به فلک کشیده افرا و انجیلی.',
    amenities: ['استخر حیاطی روباز', 'فوتبال دستی', 'باربیکیو سنگی', 'کولر گازی', 'بخاری هیزمی', 'پارکینگ روباز'],
    rules: ['استعمال قلیان در داخل کلبه اکیداً ممنوع', 'تحویل ساعت ۱۴ و تخلیه ساعت ۱۲'],
    cancellation_policy: 'لغو تا ۴۸ ساعت قبل از ورود بدون کسر جریمه.',
    is_favorite: false,
  },
  {
    id: 4,
    title: 'ویلا استخردار آبگرم کردان',
    slug: 'heated-pool-villa-kordan',
    type: 'villa',
    category: 'pool',
    province: 'البرز',
    city: 'کردان',
    address: 'استان البرز، کردان، سهیلیه، شهرک زعفرانیه، خیابان فلکه دوم',
    host_name: 'مهندس بهرامی',
    rating: 4.6,
    reviews_count: 58,
    base_guests: 4,
    extra_guests: 2,
    max_guests: 6,
    rooms_count: 2,
    bathrooms_count: 2,
    area_sqm: 120,
    price_per_night: 1770000,
    discount_percent: 7,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card04,
    gallery_urls: [card04, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'ویلای مدرن دوبلکس استخردار در منطقه خوش آب و هوای سهیلیه کردان. مجهز به استخر سرپوشیده چهارفصل با سیستم تصفیه اتوماتیک ۲۴ ساعته و حیاط سرسبز مشجر.',
    amenities: ['استخر سرپوشیده آبگرم با جکوزی', 'میز بیلیارد ۹ فوت', 'سیستم صوتی بلوتوثی', 'محوطه سازی با نورپردازی شب', 'دوربین مداربسته محوطه'],
    rules: ['پذیرش مجردها فقط با تایید قبلی', 'رعایت آرامش شهرک پس از ساعت ۲۳'],
    cancellation_policy: 'امکان لغو تا ۷۲ ساعت قبل از ورود.',
    is_favorite: true,
  },
  {
    id: 5,
    title: 'اجاره بوم گردی عمارت خلفان - واحد VIP قشم',
    slug: 'khalfan-mansion-vip-qeshm',
    type: 'eco',
    category: 'eco',
    province: 'هرمزگان',
    city: 'قشم',
    address: 'هرمزگان، جزیره قشم، روستای تاریخی طبل، عمارت بوم‌گردی خلفان',
    host_name: 'ناخدا خلفان',
    rating: 5.0,
    reviews_count: 8,
    base_guests: 3,
    extra_guests: 3,
    max_guests: 6,
    rooms_count: 2,
    bathrooms_count: 1,
    area_sqm: 90,
    price_per_night: 5310000,
    discount_percent: 3,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card05,
    gallery_urls: [card05, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'تجربه‌ای اصیل از معماری بومی جنوب و بادگیرهای تاریخی در دل جزیره شگفت‌انگیز قشم. در مجاورت جنگل حرا با سرو انواع غذاهای دریایی و محلی جنوب.',
    amenities: ['صبحانه محلی رایگان', 'چای‌خانه سنتی با قلیان عربی', 'اسپلیت سرمایشی قوی', 'گشت دریایی قایق موتوری اختصاصی', 'سرویس فرنگی'],
    rules: ['سکوت بعد از نیمه‌شب در صحن عمارت', 'پوشش مناسب طبق فرهنگ بومی منطقه'],
    cancellation_policy: 'کنسلی با کسر ۱۰ درصد هزینه اقامت شب اول.',
    is_favorite: false,
  },
  {
    id: 6,
    title: 'اقامتگاه سنتی آب - واحد کچا',
    slug: 'ab-traditional-cottage-rasht',
    type: 'eco',
    category: 'eco',
    province: 'گیلان',
    city: 'رشت',
    address: 'گیلان، رشت، روستای جنگلی کچا، حاشیه آبگیر طبیعی',
    host_name: 'عمو سیروس',
    rating: 4.2,
    reviews_count: 21,
    base_guests: 5,
    extra_guests: 2,
    max_guests: 7,
    rooms_count: 2,
    bathrooms_count: 1,
    area_sqm: 85,
    price_per_night: 1750000,
    discount_percent: 3,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card06,
    gallery_urls: [card06, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'کلبه چوبی بر روی ستون‌های چوبی روی آبگیر طبیعی کچا در گیلان با چشم‌انداز ۳۶۰ درجه از جنگل و کوهستان. صدای دل‌انگیز پرندگان و هوای مه‌آلود صبحگاهی.',
    amenities: ['بالکن بزرگ مشرف به برکه', 'قایق پدالی دونفره', 'کباب‌پز ذغالی', 'لوازم خواب سنتی تشک و لحاف پشم شیشه', 'سرمایش پنکه و کولر'],
    rules: ['شکار و ماهیگیری بدون مجوز ممنوع', 'رعایت تمیزی برکه و محیط زیست'],
    cancellation_policy: 'لغو رایگان تا ۳ روز قبل از ورود.',
    is_favorite: false,
  },
  {
    id: 7,
    title: 'اجاره بوم گردی جیزرو (مریخی) - واحد P1 قشم',
    slug: 'jezero-mars-dome-qeshm',
    type: 'eco',
    category: 'popular',
    province: 'هرمزگان',
    city: 'قشم',
    address: 'هرمزگان، قشم، روستای نقاشه، ژئوپارک جیزرو',
    host_name: 'امیرحسین رضایی',
    rating: 5.0,
    reviews_count: 25,
    base_guests: 2,
    extra_guests: 2,
    max_guests: 4,
    rooms_count: 1,
    bathrooms_count: 1,
    area_sqm: 45,
    price_per_night: 5000000,
    discount_percent: 3,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card07,
    gallery_urls: [card07, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'اقامت در گنبدهای ژئودزیک فضایی با طراحی مریخی در سواحل بکر خلیج فارس. شبیه به لوکیشن‌های فیلم مریخی با سقف شیشه‌ای برای رصد ستارگان در شب کویری.',
    amenities: ['تلسکوپ رصد نجومی', 'سیستم تهویه هوا اینورتر', 'مینی‌بار', 'حمام شیشه‌ای اختصاصی', 'تخت کینگ سایز', 'صبحانه سلف سرویس'],
    rules: ['همراه داشتن کارت ملی هوشمند', 'ممنوعیت استعمال آتش در اطراف گنبدها'],
    cancellation_policy: 'امکان لغو تا ۴۸ ساعت قبل از موعد اقامت.',
    is_favorite: true,
  },
  {
    id: 8,
    title: 'اجاره کلبه فلت فیروزجایی ۳ شیرگاه',
    slug: 'firoozjaee-flat-cottage-shirgah',
    type: 'cottage',
    category: 'cottage',
    province: 'مازندران',
    city: 'شیرگاه',
    address: 'مازندران، سوادکوه، شیرگاه، روستای کلیج‌خیل',
    host_name: 'حاج علی فیروزجایی',
    rating: 4.0,
    reviews_count: 128,
    base_guests: 3,
    extra_guests: 1,
    max_guests: 4,
    rooms_count: 1,
    bathrooms_count: 1,
    area_sqm: 50,
    price_per_night: 950000,
    discount_percent: 3,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card08,
    gallery_urls: [card08, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'اقامتگاهی ارزان‌قیمت و دنج در دل باغات مرکبات شیرگاه. دسترسی بسیار آسان و آسفالت، فاصله ۵ دقیقه‌ای تا سد سنبل‌رود و راه‌آهن تاریخی شمال.',
    amenities: ['حیاط بزرگ با جای پارک ۲ خودرو', 'کولر گازی', 'بخاری گازی', 'لوازم کامل آشپزی', 'سرویس ایرانی و فرنگی سیار'],
    rules: ['ساعت ورود ۱۴ و خروج ۱۲ ظهر', 'عدم تولید صدا و موسیقی نامتعارف'],
    cancellation_policy: 'لغو رایگان تا ۲۴ ساعت قبل از ورود.',
    is_favorite: false,
  },
  {
    id: 9,
    title: 'رزرو ویلا سه خوابه استخردار آبگرم شاهان ۲',
    slug: 'shahan2-three-bedroom-pool-villa-sorkhrood',
    type: 'villa',
    category: 'pool',
    province: 'مازندران',
    city: 'سرخرود',
    address: 'مازندران، سرخرود، بلوار دریا، پلاک ۶۲',
    host_name: 'خانم دکتر شایان',
    rating: 4.9,
    reviews_count: 248,
    base_guests: 6,
    extra_guests: 2,
    max_guests: 8,
    rooms_count: 3,
    bathrooms_count: 3,
    area_sqm: 250,
    price_per_night: 5000000,
    discount_percent: 9,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card09,
    gallery_urls: [card09, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'کاخ ویلای ساحلی لوکس تریپلکس در خط اول دریا. استخر آبگرم سرپوشیده با نورپردازی متغیر، روف‌گاردن مشرف به خزر، ۳ اتاق خواب مستر، فوتبال دستی و میز پینگ‌پنگ.',
    amenities: ['استخر آبگرم با آب‌نمای شیشه‌ای', 'روف گاردن با باربیکیو', 'میز بیلیارد و پینگ پنگ', '۳ خواب مستر با وان جکوزی', 'نگهبانی ۲۴ ساعته'],
    rules: ['ورود حیوان خانگی مطلقاً ممنوع', 'حفظ نظافت استخر و محوطه'],
    cancellation_policy: 'امکان لغو تا ۵ روز قبل از ورود.',
    is_favorite: true,
  },
  {
    id: 10,
    title: 'اجاره بوم گردی کیمه - واحد دوبلکس',
    slug: 'kimeh-duplex-eco-lodge-savadkooh',
    type: 'eco',
    category: 'eco',
    province: 'مازندران',
    city: 'سوادکوه',
    address: 'مازندران، سوادکوه، آلاشت، روستای لیند',
    host_name: 'مهندس کاظمی',
    rating: 3.7,
    reviews_count: 274,
    base_guests: 8,
    extra_guests: 1,
    max_guests: 9,
    rooms_count: 2,
    bathrooms_count: 2,
    area_sqm: 110,
    price_per_night: 1000000,
    discount_percent: 2,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card10,
    gallery_urls: [card10, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'مجموعه بوم‌گردی دوبلکس کیمه واقع در ارتفاعات سوادکوه، با بالکن وسیع رو به اقیانوس ابر و جنگل‌های هیرکانی. مناسب برای گردهمایی‌های خانوادگی و ریلکسیشن.',
    amenities: ['بالکن سرتاسری رو به کوهستان', 'شومینه هیزمی', 'آشپزخانه بزرگ', 'گرمایش از کف', 'پارکینگ اختصاصی'],
    rules: ['رعایت شئونات در فضای عمومی روستا', 'مراقبت از وسایل سنتی اقامتگاه'],
    cancellation_policy: 'امکان لغو تا ۷۲ ساعت قبل از ورود.',
    is_favorite: false,
  },
  {
    id: 11,
    title: 'اجاره ویلا دوخوابه استخردار آبگرم لوتوس ۲ کردان',
    slug: 'lotus2-two-bedroom-villa-kordan',
    type: 'villa',
    category: 'pool',
    province: 'البرز',
    city: 'کردان',
    address: 'البرز، کردان، کوهسار، بلوار کاج، بن‌بست لوتوس',
    host_name: 'آرش فربد',
    rating: 4.4,
    reviews_count: 78,
    base_guests: 4,
    extra_guests: 2,
    max_guests: 6,
    rooms_count: 2,
    bathrooms_count: 2,
    area_sqm: 135,
    price_per_night: 2925000,
    discount_percent: 3,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card11,
    gallery_urls: [card11, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'ویلای مدرن فول‌امکانات در منطقه کوهپایه‌ای کردان با آب و هوای خنک و پاک. دارای استخر آبگرم سرپوشیده با تصفیه کلر و ازن، سیستم نورپردازی هوشمند و آلاچیق هیزمی.',
    amenities: ['استخر آبگرم چهارفصل سرپوشیده', 'آلاچیق زمستانی هیزم‌سوز', 'سیستم صوتی محیطی', 'دو خواب مستر', 'باربیکیو گازی و ذغالی'],
    rules: ['ارائه کارت ملی جدید الزامی است', 'ورود با کفش داخل سالن ممنوع است'],
    cancellation_policy: 'امکان لغو تا ۴۸ ساعت قبل از موعد ورود.',
    is_favorite: false,
  },
  {
    id: 12,
    title: 'اجاره ویلا هفت خوابه عمارت مهرسام ماسال',
    slug: 'mehrsas-seven-bedroom-mansion-masal',
    type: 'villa',
    category: 'villa',
    province: 'گیلان',
    city: 'ماسال',
    address: 'گیلان، ماسال، کیلومتر ۳ جاده ییلاقی اولسبلنگاه',
    host_name: 'حاج صمد میرزایی',
    rating: 5.0,
    reviews_count: 512,
    base_guests: 15,
    extra_guests: 8,
    max_guests: 23,
    rooms_count: 7,
    bathrooms_count: 5,
    area_sqm: 450,
    price_per_night: 2000000,
    discount_percent: 3,
    is_instant_booking: true,
    is_competitive_price: true,
    image_url: card12,
    gallery_urls: [card12, pdpHero, pdpThumb1, pdpThumb2, pdpThumb3],
    description: 'بزرگترین عمارت ییلاقی ماسال با ظرفیت تا ۲۳ نفر، ۷ اتاق خواب مجزا، چشم‌انداز بی‌نظیر رودخانه خالکایی و مراتع سرسبز ییلاق اولسبلنگاه. مجهز به سالن غذاخوری بزرگ.',
    amenities: ['سالن پذیرایی ۱۲۰ متری', '۷ اتاق خواب مجهز به اسپلیت', 'محوطه اختصاصی ۲ هکتاری', 'زمین والیبال ساحلی', 'آشپزخانه صنعتی'],
    rules: ['مناسب تورها و سفرهای گروهی پرجمعیت', 'تخلیه به موقع جهت امور نظافتی'],
    cancellation_policy: 'لغو رایگان تا ۷ روز قبل از ورود.',
    is_favorite: true,
  },
];

const INITIAL_BOOKINGS = [
  {
    id: 1,
    tracking_code: 'ASH-84920',
    accommodation_id: 1,
    accommodation_title: 'اجاره کلبه فلت چوبی ورگانو کلاردشت',
    accommodation_city: 'کلاردشت',
    accommodation_image: card01,
    guest_name: 'محمدرضا مرادی',
    guest_phone: '۰۹۱۳۳۸۰۹۷۰۴',
    guest_national_id: '۰۰۱۸۲۹۳۸۴۷',
    check_in: '۲۷ بهمن ۱۴۰۳',
    check_out: '۲۹ بهمن ۱۴۰۳',
    nights_count: 2,
    adults_count: 2,
    extra_guests_count: 1,
    price_per_night: 1600000,
    total_nights_price: 1600000,
    extra_guests_price: 250000,
    tax_amount: 28000,
    discount_amount: 0,
    final_price: 1878000,
    status: 'pending_payment',
    created_at: 'امروز، ساعت ۱۱:۴۵',
  }
];

class LocalStore {
  constructor() {
    this.accommodations = this.load('ashyaneh_accommodations', INITIAL_ACCOMMODATIONS);
    this.bookings = this.load('ashyaneh_bookings', INITIAL_BOOKINGS);
    this.categories = INITIAL_CATEGORIES;
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {}
  }

  getAccommodations({ search = '', city = '', type = '', category = '', minPrice = null, maxPrice = null, instant = false } = {}) {
    let list = [...this.accommodations];
    if (city) {
      list = list.filter((a) => a.city.includes(city) || a.province.includes(city));
    }
    if (type) {
      list = list.filter((a) => a.type === type);
    }
    if (category && category !== 'all' && category !== 'popular') {
      list = list.filter((a) => a.category === category);
    }
    if (minPrice) {
      list = list.filter((a) => a.price_per_night >= minPrice);
    }
    if (maxPrice) {
      list = list.filter((a) => a.price_per_night <= maxPrice);
    }
    if (instant) {
      list = list.filter((a) => a.is_instant_booking);
    }
    if (search) {
      const q = search.trim();
      list = list.filter((a) => a.title.includes(q) || a.city.includes(q) || a.province.includes(q) || a.address.includes(q));
    }
    return list;
  }

  getAccommodation(id) {
    return this.accommodations.find((a) => a.id === Number(id)) || this.accommodations[0];
  }

  toggleFavorite(id) {
    this.accommodations = this.accommodations.map((a) => {
      if (a.id === Number(id)) {
        return { ...a, is_favorite: !a.is_favorite };
      }
      return a;
    });
    this.save('ashyaneh_accommodations', this.accommodations);
    return this.getAccommodation(id);
  }

  createBooking(data) {
    const trackingCode = `ASH-${Math.floor(10000 + Math.random() * 90000)}`;
    const acc = this.getAccommodation(data.accommodation_id);
    const newBooking = {
      id: Date.now(),
      tracking_code: trackingCode,
      accommodation_id: data.accommodation_id,
      accommodation_title: acc ? acc.title : 'اقامتگاه بوم‌گردی آشیانه',
      accommodation_city: acc ? acc.city : 'رامسر',
      accommodation_image: acc ? acc.image_url : card02,
      guest_name: data.guest_name,
      guest_phone: data.guest_phone,
      guest_national_id: data.guest_national_id || '۰۰۱۲۳۴۵۶۷۸',
      check_in: data.check_in,
      check_out: data.check_out,
      nights_count: data.nights_count || 1,
      adults_count: data.adults_count || 2,
      extra_guests_count: data.extra_guests_count || 0,
      price_per_night: data.price_per_night || (acc ? acc.price_per_night : 1500000),
      total_nights_price: data.total_nights_price,
      extra_guests_price: data.extra_guests_price || 0,
      tax_amount: data.tax_amount || 28000,
      discount_amount: data.discount_amount || 0,
      final_price: data.final_price,
      status: 'pending_payment',
      created_at: 'چند لحظه پیش',
    };
    this.bookings = [newBooking, ...this.bookings];
    this.save('ashyaneh_bookings', this.bookings);
    return newBooking;
  }

  confirmPayment(trackingCode) {
    this.bookings = this.bookings.map((b) => {
      if (b.tracking_code === trackingCode || b.id === Number(trackingCode)) {
        return { ...b, status: 'confirmed' };
      }
      return b;
    });
    this.save('ashyaneh_bookings', this.bookings);
    return this.bookings.find((b) => b.tracking_code === trackingCode || b.id === Number(trackingCode));
  }

  getBookings() {
    return [...this.bookings];
  }
}

const localStore = new LocalStore();

export const api = {
  async getCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/categories/`);
      if (res.ok) return await res.json();
    } catch {}
    return localStore.categories;
  },

  async getAccommodations(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.city) params.set('city', filters.city);
      if (filters.type) params.set('type', filters.type);
      if (filters.category) params.set('category', filters.category);
      if (filters.search) params.set('search', filters.search);
      const res = await fetch(`${API_BASE_URL}/accommodations/?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        // map image string names to imports
        return data.map((item) => ({
          ...item,
          image_url: IMAGE_MAP[item.image_url] || item.image_url || card02,
          gallery_urls: (item.gallery_urls || []).map((img) => IMAGE_MAP[img] || img),
        }));
      }
    } catch {}
    return localStore.getAccommodations(filters);
  },

  async getAccommodation(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/accommodations/${id}/`);
      if (res.ok) {
        const item = await res.json();
        return {
          ...item,
          image_url: IMAGE_MAP[item.image_url] || item.image_url || card02,
          gallery_urls: (item.gallery_urls || []).map((img) => IMAGE_MAP[img] || img),
        };
      }
    } catch {}
    return localStore.getAccommodation(id);
  },

  async toggleFavorite(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/accommodations/${id}/toggle_favorite/`, {
        method: 'POST',
      });
      if (res.ok) {
        const data = await res.json();
        return data.is_favorite;
      }
    } catch {}
    const updated = localStore.toggleFavorite(id);
    return updated.is_favorite;
  },

  async createBooking(bookingData) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
      if (res.ok) return await res.json();
    } catch {}
    return localStore.createBooking(bookingData);
  },

  async confirmBookingPayment(trackingCode) {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/${trackingCode}/confirm_payment/`, {
        method: 'POST',
      });
      if (res.ok) return await res.json();
    } catch {}
    return localStore.confirmPayment(trackingCode);
  },

  async getBookings() {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings/`);
      if (res.ok) return await res.json();
    } catch {}
    return localStore.getBookings();
  },

  validateCoupon(code) {
    const c = code.trim().toUpperCase();
    if (c === 'ASHYANEH' || c === 'OFF1403' || c === 'NOROOZ') {
      return { valid: true, percent: 15, message: 'کد تخفیف ۱۵ درصدی با موفقیت اعمال شد!' };
    }
    return { valid: false, percent: 0, message: 'کد تخفیف وارد شده معتبر نمی‌باشد.' };
  },
};
