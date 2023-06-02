from rest_framework import serializers
from .models import *


class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bills
        fields = [
            'id',
            'is_paid',
            'CIF_sponsor',
            'suscription',
            "subscription_date",
            "expiration_date"
        ]
