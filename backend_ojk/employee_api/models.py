from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class empUserManager(BaseUserManager):
    def create_user(self, phone_number):
        user = self.model(phone_number=phone_number)
        user.save()
        return user

class empUser(AbstractBaseUser):
    phone_number = models.CharField(max_length=15, unique=True,null=True)
    name = models.CharField(max_length=100, null=True, blank=True)  # ✅ Add this
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    objects = empUserManager()

class OTP(models.Model):
    phone_number = models.CharField(max_length=15)
    name = models.CharField(max_length=100, null=True, blank=True) 
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)




class EmployeeDetails(models.Model):
    user = models.OneToOneField(
        empUser,  # one to one with user
        on_delete=models.CASCADE,
        related_name="employee_details"
    )
    full_name = models.CharField(max_length=255)
    mobile_number = models.CharField(max_length=10, unique=True)
    company_name = models.CharField(max_length=255)
    is_consultancy = models.BooleanField(default=False)

    EMPLOYEE_COUNT_CHOICES = [
        ("0-50", "0-50"),
        ("51-100", "51-100"),
        ("101-300", "101-300"),
        ("301-500", "301-500"),
        ("501-1000", "501-1000"),
        ("1000+", "1000+"),
    ]
    employee_count = models.CharField(
        max_length=20, choices=EMPLOYEE_COUNT_CHOICES
    )

    work_email = models.EmailField(blank=True, null=True)
    agree_terms = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} - {self.company_name}"
