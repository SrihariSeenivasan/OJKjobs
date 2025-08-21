from django.urls import path
from .views import RegisterView, OTPVerifyView

# urls.py
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('verify/', OTPVerifyView.as_view(), name='verify'),
    
    
]
