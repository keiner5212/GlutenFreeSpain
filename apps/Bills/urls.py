from django.urls import path

from .views import *

urlpatterns = [
    path('list', ListBillsView.as_view()),
    path('create', CreateBillView.as_view()),
    path('validate', MarkBillAsPaidView.as_view()),
    path('generatePdf/<str:sponsor_id>/<int:bill_id>', GenerarPdf.as_view())
]
