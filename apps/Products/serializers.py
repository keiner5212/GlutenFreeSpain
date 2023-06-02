from rest_framework import serializers
from .models import *


class ProductsSerializer(serializers.ModelSerializer):
    class Meta: 
        model=Products
        fields=[
            'id',
            'name',
            'description',
            'price',
            'is_vegetarian',
            'category',
            'image',
            'votaciones'
        ]