from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model=Users
        fields=[
            'id',
            'name',
            'last_name',
            'email',
            'password',
            'birth_date',
        ]