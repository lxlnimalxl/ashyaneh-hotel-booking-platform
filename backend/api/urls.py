from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, AccommodationViewSet, BookingViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'accommodations', AccommodationViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
