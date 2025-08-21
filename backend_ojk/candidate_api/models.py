from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class candidateUserManager(BaseUserManager):
    def create_user(self, phone_number):
        user = self.model(phone_number=phone_number)
        user.save()
        return user

class candidateUser(AbstractBaseUser):
    phone_number = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=100, null=True, blank=True)  # ✅ Add this
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    objects = candidateUserManager()

class OTP(models.Model):
    phone_number = models.CharField(max_length=15)
    name = models.CharField(max_length=100, null=True, blank=True) 
    otp_code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)


from django.db import models

class Candidate_details(models.Model):
    user = models.ForeignKey('candidateUser', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    mobile = models.CharField(max_length=20)
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)

    # Experience
    experience_title = models.CharField(max_length=255, null=True, blank=True)
    experience_company = models.CharField(max_length=255, null=True, blank=True)
    experience_duration = models.CharField(max_length=100, null=True, blank=True)
    experience_salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    experience_skills = models.JSONField(default=list, blank=True)  # JSON/Array

    # Education
    education_degree = models.CharField(max_length=255, null=True, blank=True)
    education_institution = models.CharField(max_length=255, null=True, blank=True)
    education_batch = models.CharField(max_length=50, null=True, blank=True)
    education_medium = models.CharField(max_length=50, null=True, blank=True)

    # Other Skills
    skills = models.JSONField(default=list, blank=True)
    certifications = models.JSONField(default=list, blank=True)
    languages = models.JSONField(default=list, blank=True)

    # Resume File
    resume = models.FileField(upload_to="resumes/", null=True, blank=True)

    # Preferences
    preference_job_title = models.CharField(max_length=255, null=True, blank=True)
    preference_location = models.CharField(max_length=255, null=True, blank=True)
    preference_job_type = models.JSONField(default=list, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
