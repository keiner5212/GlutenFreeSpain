from django.contrib import admin
from .models import *

# Register your models here.


class BillsAdmin(admin.ModelAdmin):
    list_display = ('id', 'CIF_sponsor', )
    list_display_links = ('id', )
    list_per_page = 25


admin.site.register(Bills, BillsAdmin)
