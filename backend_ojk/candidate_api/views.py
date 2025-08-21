import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import candidateUser, OTP,Candidate_details


from .serializers import *

from .utils import send_otp_sms  # or from same file
import random
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
 
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterView(APIView):
    def get(self, request):
        phone = request.query_params.get('phone_number')
        if not phone:
            return Response({'error': 'phone_number query param required'}, status=400)
        if not phone.startswith('+'):
            phone = '+91' + phone
        try:
            user = candidateUser.objects.get(phone_number=phone)
            return Response({
                'name': user.name,
                'phone_number': user.phone_number,
                'is_verified': user.is_verified
            }, status=200)
        except candidateUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data['phone_number']
            input_name = serializer.validated_data['name']

            if not phone.startswith('+'):
                phone = '+91' + phone

            otp = str(random.randint(100000, 999999))
            print("Generated OTP:", otp)

            try:
                user, created = candidateUser.objects.get_or_create(
                    phone_number=phone,
                    defaults={"name": input_name}
                )

                OTP.objects.create(phone_number=phone, otp_code=otp, name=user.name)
                send_otp_sms(phone, otp, user.name)

                # ✅ Filter by mobile instead of user
                candidate = Candidate_details.objects.filter(user=user.id).last()
                if candidate:
                    from .serializers import CandidateUserSerializer
                    candidate_data = CandidateUserSerializer(candidate).data
                    return Response({
                        "message": "OTP sent successfully",
                        "already_registered": True,
                        "role":"candidate",
                        "candidate_data": candidate_data
                    })

                return Response({
                    "message": "OTP sent successfully",
                    "already_registered": not created,
                    "role":"candidate"
                })

            except Exception as e:
                return Response({
                    "error": "Failed to send OTP",
                    "details": str(e)
                }, status=500)

        return Response(serializer.errors, status=400)













class OTPVerifyView(APIView):
    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        if serializer.is_valid():
            phone = serializer.validated_data['phone_number']
            otp = serializer.validated_data['otp']
            name = serializer.validated_data['name']

            if not phone.startswith('+'):
                phone = '+91' + phone

            # Validate OTP
            otp_qs = OTP.objects.filter(phone_number=phone, otp_code=otp).order_by('-created_at')
            if not otp_qs.exists():
                return Response({'verified': False, 'message': 'Invalid OTP or phone number.'}, status=HTTP_400_BAD_REQUEST)
            otp_obj = otp_qs.first()
            # Optional: check expiry (e.g., valid for 10 minutes)
            from datetime import timedelta, timezone, datetime
            expiry_minutes = 10
            now = datetime.now(timezone.utc)
            if hasattr(otp_obj, 'created_at'):
                if (now - otp_obj.created_at) > timedelta(minutes=expiry_minutes):
                    return Response({'verified': False, 'message': 'OTP expired. Please request a new one.'}, status=HTTP_400_BAD_REQUEST)

            # Create or get user, only set name if newly created
            user, created = candidateUser.objects.get_or_create(phone_number=phone)
            if created and name:
                user.name = name
            user.is_verified = True
            user.save()

            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'verified': True,
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
            }, status=HTTP_200_OK)

        # If serializer is invalid, return errors
        return Response({'verified': False, 'message': 'Invalid input', 'details': serializer.errors}, status=HTTP_400_BAD_REQUEST)



from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Candidate_details
from .serializers import CandidateUserSerializer

class CandidateListCreate(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = Candidate_details.objects.filter(user=request.user)
        serializer = CandidateUserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        data["user"] = request.user.id
        serializer = CandidateUserSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CandidateDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):
        try:
            return Candidate_details.objects.get(pk=pk, user=user)
        except Candidate_details.DoesNotExist:
            return None

    def get(self, request, pk):
        user_data = self.get_object(pk, request.user)
        if not user_data:
            return Response({"error": "User not found"}, status=404)
        serializer = CandidateUserSerializer(user_data)
        return Response(serializer.data)

    def put(self, request, pk):
        user_data = self.get_object(pk, request.user)
        if not user_data:
            return Response({"error": "User not found"}, status=404)

        data = request.data.copy()
        data["user"] = request.user.id
        serializer = CandidateUserSerializer(user_data, data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request, pk):
        user_data = self.get_object(pk, request.user)
        if not user_data:
            return Response({"error": "User not found"}, status=404)
        user_data.delete()
        return Response({"message": "User deleted"}, status=204)
