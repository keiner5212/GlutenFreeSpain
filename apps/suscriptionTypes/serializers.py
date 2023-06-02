from rest_framework import serializers
from .models import *


class suscriptionTypesSerializer(serializers.ModelSerializer):
    class Meta: 
        model=suscriptionTypes
        fields=[
            'id',
            'name',
            'description',
            'price',
        ]