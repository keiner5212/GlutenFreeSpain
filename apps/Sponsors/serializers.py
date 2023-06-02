from rest_framework import serializers
from .models import *


class SponsorsSerializer(serializers.ModelSerializer):
    class Meta: 
        model=Sponsors
        fields=[
            'CIF',
            'name',
            'icon',
            'email',
        ]