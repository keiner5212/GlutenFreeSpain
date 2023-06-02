
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('api/Bills/', include('apps.Bills.urls')),
    path('api/Categories/', include('apps.Categories.urls')),
    path('api/Products/', include('apps.Products.urls')),
    path('api/Sponsors/', include('apps.Sponsors.urls')),
    path('api/suscriptionTypes/', include('apps.suscriptionTypes.urls')),
    path('api/Users/', include('apps.Users.urls')),

    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
