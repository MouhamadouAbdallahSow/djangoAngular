from rest_framework import serializers
from .models import User
from django.conf import settings

class UserSerializer(serializers.ModelSerializer):
  prenom = serializers.CharField(write_only=True)
  nom = serializers.CharField(write_only=True)
  password = serializers.CharField(write_only=True)
  userType = serializers.CharField(required=False, default='visitor')

  profile_photo = serializers.ImageField(required=False, allow_null=True)
  cover_photo = serializers.ImageField(required=False, allow_null=True)

  profile_photo_url = serializers.SerializerMethodField()
  cover_photo_url = serializers.SerializerMethodField()


  class Meta:
    model = User
    fields = ('id', 'prenom', 'nom', 'email', 'name', 'password', 'userType', 'profile_photo', 'cover_photo','profile_photo_url', 'cover_photo_url')

    # mot de passe en mode read seulement 
    extra_kwargs = {
      'password': {'write_only': True},
      'userType': {'required': False, 'default': 'visitor'}  # Rend userType optionnel
    }

  def get_profile_photo_url(self, obj):
    if obj.profile_photo:
      return f"{settings.MEDIA_URL}{obj.profile_photo}"
    return None
  
  def get_cover_photo_url(self, obj):
    if obj.cover_photo:
      return f"{settings.MEDIA_URL}{obj.cover_photo}"
    return None

  # pour hacher le password on definit la methode create 
  def create(self, validated_data):
    prenom = validated_data.pop('prenom')
    nom = validated_data.pop('nom')
    validated_data['name'] = f"{prenom} {nom}".strip()
    userType = validated_data.get('userType', 'visitor')
    password = validated_data.pop('password', None)

    profile_photo = validated_data.get('profile_photo')
    cover_photo = validated_data.get('cover_photo')

    instance = self.Meta.model(**validated_data)
    if password is not None:
      instance.set_password(password)
    instance.userType = userType

    if profile_photo:
        instance.profile_photo = profile_photo
    if cover_photo:
        instance.cover_photo = cover_photo

    instance.save()
    return instance