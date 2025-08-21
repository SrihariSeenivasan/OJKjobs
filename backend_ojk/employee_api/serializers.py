from rest_framework import serializers
from .models import empUser
from .models import EmployeeDetails
from decimal import Decimal 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = empUser
        fields = ['id', 'phone_number', 'name']  # Add more fields if needed
class RegisterSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    name = serializers.CharField()

    def create(self, validated_data):
        from .models import empUser
        return empUser.objects.create(**validated_data)

    
class OTPVerifySerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    name = serializers.CharField()
    otp = serializers.CharField()


class EmployeeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeDetails
        fields = [
            'id', 'user', 'full_name', 'mobile_number', 'company_name',
            'is_consultancy', 'employee_count', 'work_email', 'agree_terms',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    # Optional: Mobile number validation
    def validate_mobile_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Mobile number must contain only digits.")
        if len(value) != 10:
            raise serializers.ValidationError("Mobile number must be 10 digits.")
        return value