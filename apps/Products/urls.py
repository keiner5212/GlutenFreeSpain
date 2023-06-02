from django.urls import path
from .views import *


urlpatterns = [
    path('list', ListProductsView.as_view()),
    path('<int:product_id>', GetProductView.as_view()),]
