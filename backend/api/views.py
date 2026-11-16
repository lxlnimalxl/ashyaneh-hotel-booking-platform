import uuid
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Accommodation, Booking, Review
from .serializers import CategorySerializer, AccommodationSerializer, BookingSerializer, ReviewSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AccommodationViewSet(viewsets.ModelViewSet):
    queryset = Accommodation.objects.all().order_by('-rating')
    serializer_class = AccommodationSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        city = self.request.query_params.get('city')
        acc_type = self.request.query_params.get('type')
        category = self.request.query_params.get('category')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')
        search = self.request.query_params.get('search')
        instant = self.request.query_params.get('instant')

        if city:
            qs = qs.filter(city__icontains=city)
        if acc_type:
            qs = qs.filter(type=acc_type)
        if category:
            qs = qs.filter(category__slug=category)
        if min_price:
            qs = qs.filter(price_per_night__gte=min_price)
        if max_price:
            qs = qs.filter(price_per_night__lte=max_price)
        if instant:
            qs = qs.filter(is_instant_booking=True)
        if search:
            qs = qs.filter(title__icontains=search) | qs.filter(city__icontains=search) | qs.filter(province__icontains=search)
        return qs

    @action(detail=True, methods=['post'])
    def toggle_favorite(self, request, pk=None):
        acc = self.get_object()
        acc.is_favorite = not acc.is_favorite
        acc.save()
        return Response({'status': 'ok', 'is_favorite': acc.is_favorite})

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if not data.get('tracking_code'):
            data['tracking_code'] = f"ASH-{uuid.uuid4().hex[:6].upper()}"
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def confirm_payment(self, request, pk=None):
        booking = self.get_object()
        booking.status = 'confirmed'
        booking.save()
        return Response({'status': 'confirmed', 'tracking_code': booking.tracking_code})

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-id')
    serializer_class = ReviewSerializer
