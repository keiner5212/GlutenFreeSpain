from django.urls import path

from .views import *

urlpatterns = [
    path('list/', ListUsersView.as_view()),
    path('create/', CreateUserView.as_view()),
    path('login/', CustomLoginView.as_view()),
    path('check-authentication/', CheckAuthenticationView.as_view()),
]
