from django.contrib import admin
from .models import *

# Register your models here.


class ProductsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', )
    list_display_links = ('name', )
    list_per_page = 25


admin.site.register(Products, ProductsAdmin)
