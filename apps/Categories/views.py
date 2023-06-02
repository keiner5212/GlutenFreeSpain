from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from rest_framework import permissions
from .models import Categories


class ListCategoriesView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Categories.objects.all().exists():
            users = Categories.objects.all()
            result = []
            for user in users:
                item = {}
                item['id'] = user.id
                item['name'] = user.name
                result.append(item)
            return JsonResponse({'Categories': result}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'No Categories found'}, status=status.HTTP_404_NOT_FOUND)
