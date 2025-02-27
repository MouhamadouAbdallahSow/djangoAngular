
from django.contrib import admin
from django.urls import path, include
from . views import RegisterView, LoginView, UserView, LogoutView, UserListView, UpdateUserTypeView

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LoginView.as_view()),
  path('user/', UserView.as_view()),
  path('logout/', LogoutView.as_view()),
  path('users/', UserListView.as_view()),
  path('update-user-type/', UpdateUserTypeView.as_view()),
] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)