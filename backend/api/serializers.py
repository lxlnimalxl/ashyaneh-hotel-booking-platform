from rest_framework import serializers
from .models import Category, Accommodation, Booking, Review

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class AccommodationSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    final_price = serializers.ReadOnlyField()

    class Meta:
        model = Accommodation
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    accommodation_title = serializers.CharField(source='accommodation.title', read_only=True)
    accommodation_city = serializers.CharField(source='accommodation.city', read_only=True)
    accommodation_image = serializers.CharField(source='accommodation.image_url', read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
