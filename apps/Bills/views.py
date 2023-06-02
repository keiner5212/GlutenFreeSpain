from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from rest_framework import permissions
from datetime import datetime, timedelta
from .models import Bills
from django.shortcuts import get_object_or_404
from ..Sponsors.models import Sponsors
from ..suscriptionTypes.models import suscriptionTypes
from .utils import render_to_pdf
from django.views.generic import View
from django.http import HttpResponse
from django.core import serializers
import json


class ListBillsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Bills.objects.all().exists():
            bills = Bills.objects.all()
            data = serializers.serialize('json', bills)
            json_data = json.loads(data)
            return JsonResponse({'Bills': json_data}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'No Bills found'}, status=status.HTTP_404_NOT_FOUND)


class CreateBillView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        is_paid = request.data.get('is_paid')
        CIF_sponsor_id = request.data.get('CIF_sponsor')
        suscription_id = request.data.get('suscription')
        subscription_date = datetime.now().date()
        expiration_date = subscription_date + timedelta(days=30)
        sponsor = get_object_or_404(Sponsors, CIF=CIF_sponsor_id)
        suscription = get_object_or_404(suscriptionTypes, id=suscription_id)
        new_bill = Bills.objects.create(
            is_paid=is_paid,
            CIF_sponsor=sponsor,
            suscription=suscription,
            subscription_date=subscription_date,
            expiration_date=expiration_date
        )
        response_data = {
            'id': new_bill.id,
            'is_paid': new_bill.is_paid,
            'CIF_sponsor': new_bill.CIF_sponsor.CIF,
            'suscription': new_bill.suscription.id,
            'subscription_date': new_bill.subscription_date,
            'expiration_date': new_bill.expiration_date
        }
        return JsonResponse(response_data, status=status.HTTP_201_CREATED)


class MarkBillAsPaidView(APIView):
    permission_classes = (permissions.AllowAny,)

    def put(self, request, format=None):
        bill_id = request.data.get('id')
        try:
            bill = Bills.objects.get(id=bill_id)
            bill.is_paid = True
            bill.save()
            response_data = {
                'id': bill.id,
                'is_paid': bill.is_paid,
                'CIF_sponsor': bill.CIF_sponsor.CIF,
                'suscription': bill.suscription.id,
                'subscription_date': bill.subscription_date,
                'expiration_date': bill.expiration_date
            }
            return JsonResponse(response_data, status=status.HTTP_200_OK)
        except Bills.DoesNotExist:
            return JsonResponse({'error': 'Bill not found'}, status=status.HTTP_404_NOT_FOUND)


class GenerarPdf(View):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, sponsor_id, bill_id, *args, **kwargs):
        print(sponsor_id)
        print(bill_id)
        sponsor = get_object_or_404(Sponsors, CIF=sponsor_id)
        bill = get_object_or_404(Bills, id=bill_id, CIF_sponsor=sponsor)
        data = {
            'bill': bill,
        }
        pdf = render_to_pdf('recibo.html', data)
        if pdf:
            response = HttpResponse(pdf, content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="recibo.pdf"'
            return response
        return HttpResponse("Error al generar el PDF", status=500)
