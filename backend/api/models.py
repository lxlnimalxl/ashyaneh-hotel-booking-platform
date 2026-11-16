from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=50, blank=True, default='Home')

    def __str__(self):
        return self.name

class Accommodation(models.Model):
    ACCOMMODATION_TYPES = [
        ('villa', 'ویلا'),
        ('apartment', 'آپارتمان'),
        ('eco', 'بوم‌گردی'),
        ('cottage', 'کلبه جنگلی'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='accommodations')
    type = models.CharField(max_length=20, choices=ACCOMMODATION_TYPES, default='villa')
    
    province = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    address = models.CharField(max_length=300, blank=True)
    
    host_name = models.CharField(max_length=100, default='مائده مقصودلو')
    host_avatar = models.CharField(max_length=300, blank=True)
    
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.8)
    reviews_count = models.IntegerField(default=24)
    
    base_guests = models.IntegerField(default=2)
    extra_guests = models.IntegerField(default=2)
    max_guests = models.IntegerField(default=4)
    rooms_count = models.IntegerField(default=1)
    bathrooms_count = models.IntegerField(default=1)
    area_sqm = models.IntegerField(default=65)
    
    price_per_night = models.BigIntegerField(default=2000000)
    discount_percent = models.IntegerField(default=0)
    is_instant_booking = models.BooleanField(default=True)
    is_competitive_price = models.BooleanField(default=True)
    
    image_url = models.CharField(max_length=300)
    gallery_urls = models.JSONField(default=list, blank=True)
    
    description = models.TextField(blank=True)
    amenities = models.JSONField(default=list, blank=True)
    rules = models.JSONField(default=list, blank=True)
    cancellation_policy = models.TextField(blank=True)
    is_favorite = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.city}"

    @property
    def final_price(self):
        if self.discount_percent > 0:
            return int(self.price_per_night * (100 - self.discount_percent) / 100)
        return self.price_per_night

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending_payment', 'در انتظار پرداخت'),
        ('confirmed', 'تایید شده و رزرو قطعی'),
        ('cancelled', 'لغو شده'),
        ('completed', 'پایان اقامت'),
    ]

    tracking_code = models.CharField(max_length=50, unique=True)
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE, related_name='bookings')
    
    guest_name = models.CharField(max_length=150)
    guest_phone = models.CharField(max_length=50)
    guest_national_id = models.CharField(max_length=50, blank=True)
    
    check_in = models.CharField(max_length=50)
    check_out = models.CharField(max_length=50)
    nights_count = models.IntegerField(default=1)
    
    adults_count = models.IntegerField(default=2)
    extra_guests_count = models.IntegerField(default=0)
    
    price_per_night = models.BigIntegerField()
    total_nights_price = models.BigIntegerField()
    extra_guests_price = models.BigIntegerField(default=0)
    tax_amount = models.BigIntegerField(default=28000)
    discount_amount = models.BigIntegerField(default=0)
    final_price = models.BigIntegerField()
    
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending_payment')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"رزرو {self.tracking_code} - {self.guest_name}"

class Review(models.Model):
    accommodation = models.ForeignKey(Accommodation, on_delete=models.CASCADE, related_name='reviews')
    author_name = models.CharField(max_length=100)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=5.0)
    nights_stayed = models.IntegerField(default=1)
    text = models.TextField()
    created_at = models.CharField(max_length=50, default='چند روز پیش')

    def __str__(self):
        return f"نظر {self.author_name} برای {self.accommodation.title}"
