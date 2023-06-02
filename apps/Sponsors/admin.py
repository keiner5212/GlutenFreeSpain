from django.contrib import admin
from .models import *

# Register your models here.


class SponsorsAdmin(admin.ModelAdmin):
    list_display = ('CIF', 'name', )
    list_display_links = ('name', )
    list_per_page = 25


admin.site.register(Sponsors, SponsorsAdmin)
