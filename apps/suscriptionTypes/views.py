from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from rest_framework import permissions
from .models import suscriptionTypes


class ListsuscriptionTypesView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if suscriptionTypes.objects.all().exists():
            users = suscriptionTypes.objects.all()
            result = []
            for user in users:
                item = {}
                item['id'] = user.id
                item['name'] = user.name
                item['description'] = user.description
                item['price'] = user.price
                item['footer'] = user.footer
                item['productScreen'] = user.productScreen
                result.append(item)
            return JsonResponse({'suscriptionTypes': result}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'No suscriptionTypes found'}, status=status.HTTP_404_NOT_FOUND)
