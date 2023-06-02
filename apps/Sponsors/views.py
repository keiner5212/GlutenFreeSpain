from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from rest_framework import permissions
from .models import Sponsors
from .serializers import SponsorsSerializer


class ListSponsorsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Sponsors.objects.all().exists():
            sponsors = Sponsors.objects.all()
            result = []
            for user in sponsors:
                item = {}
                item['CIF'] = user.CIF
                item['name'] = user.name
                item['icon'] = user.icon.url if user.icon else None
                item['email'] = user.email

                result.append(item)

            return JsonResponse({'Sponsors': result}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'No Sponsors found'}, status=status.HTTP_404_NOT_FOUND)


class CreateSponsorView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        print(request.FILES)
        print(request.data)
        data = request.data.copy()
        data['icon'] = request.FILES['icon']
        serializer = SponsorsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
