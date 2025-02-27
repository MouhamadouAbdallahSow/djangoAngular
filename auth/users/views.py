from django.shortcuts import render

from .models import User
from .serializers import UserSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status

import jwt, datetime

class RegisterView(APIView):
  parser_classes = (MultiPartParser, FormParser)

  def post(self, request):
    print("Donnees recues : ", request.data) 
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
      serializer.save()
      # return Response(serializer.data, status=201)
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    print("Erreurs :", serializer.errors)  # Debug
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
  parser_classes = (MultiPartParser, FormParser, JSONParser)
  def post(self, request):
    email = request.data['email']
    password = request.data['password']
    
    user = User.objects.filter(email=email).first()
    
    if user is None:
        raise AuthenticationFailed('User not found')
        
    if not user.check_password(password):
        raise AuthenticationFailed('Incorrect password')
        
    payload = {
        'id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }
    
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    
    # Inclure les informations de l'utilisateur dans la réponse
    return Response({
        'jwt': token,
        'user': {
            'id': user.id,
            'email': user.email,
            'name': user.name,
            'userType': user.userType,
            'profile_photo': user.profile_photo.url if user.profile_photo else None,
            'cover_photo': user.cover_photo.url if user.cover_photo else None,
        }
    })

class UserView(APIView):
  def get(self, request):
    auth_header = request.headers.get('Authorization')
    
    if not auth_header or not auth_header.startswith('Bearer '):
        raise AuthenticationFailed('Unauthenticated')
    
    # Extraire le token (enlever 'Bearer ' du début)
    token = auth_header.split(' ')[1]
    
    try:
        payload = jwt.decode(token, 'secret', algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Unauthenticated')
        
    user = User.objects.filter(id=payload['id']).first()
    serializer = UserSerializer(user)
    return Response(serializer.data)

class LogoutView(APIView):
  def post(self, request):
    response = Response({"message": "succes"})
    response.delete_cookie('jwt')
    response.data = {
      'message': 'succes'
    }
    return response

class UserListView(ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  # permissions_classes = [IsAuthenticated]

class UpdateUserTypeView(APIView):
  def patch(self, request):
    user_id = request.data.get('userId')
    user_type = request.data.get('userType')
    
    try:
      user = User.objects.get(id=user_id)
      user.userType = user_type
      user.save()
      
      serializer = UserSerializer(user)
      return Response(serializer.data)
    except User.DoesNotExist:
      raise AuthenticationFailed('User not found')
