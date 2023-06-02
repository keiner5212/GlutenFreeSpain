from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import status
from rest_framework import permissions
from .models import Products


class ListProductsView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        if Products.objects.all().exists():
            products = Products.objects.all()
            result = []
            for product in products:
                item = {}
                item['id'] = product.id
                item['name'] = product.name
                item['description'] = product.description
                item['price'] = product.price
                item['is_vegetarian'] = product.is_vegetarian
                item['category'] = {
                    'id': product.category.id,
                    'name': product.category.name
                }
                item['image'] = product.image.url if product.image else None
                item['votaciones'] = product.votaciones

                result.append(item)

            return JsonResponse({'Products': result}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'No Products found'}, status=status.HTTP_404_NOT_FOUND)


class GetProductView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, product_id, format=None):
        try:
            product = Products.objects.get(id=product_id)
            response = {
                'id': product.id,
                'name': product.name,
                'description': product.description,
                'price': product.price,
                'is_vegetarian': product.is_vegetarian,
                'category': {
                    'id': product.category.id,
                    'name': product.category.name
                },
                'image': product.image.url if product.image else None,
                'votaciones': product.votaciones
            }

            return JsonResponse(response, status=status.HTTP_200_OK)
        except Products.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
