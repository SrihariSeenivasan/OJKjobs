from rest_framework import serializers
from .models import candidateUser,Candidate_details
from decimal import Decimal 
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = candidateUser
        fields = ['id', 'phone_number', 'name']  # Add more fields if needed
class RegisterSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    name = serializers.CharField()

    def create(self, validated_data):
        from .models import candidateUser
        return candidateUser.objects.create(**validated_data)

    
class OTPVerifySerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    name = serializers.CharField()
    otp = serializers.CharField()


from rest_framework import serializers
from .models import Candidate_details

class CandidateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate_details
        fields = '__all__'
        read_only_fields = ['user']  # user field auto set aagum
