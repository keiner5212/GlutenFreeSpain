from django.urls import path

from .views import *

urlpatterns = [
    path('list', ListsuscriptionTypesView.as_view())]
