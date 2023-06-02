from rest_framework import serializers
from .models import *


class CategoriesSerializer(serializers.ModelSerializer):
    class Meta: 
        model=Categories
        fields=[
            'id',
            'name',
        ]