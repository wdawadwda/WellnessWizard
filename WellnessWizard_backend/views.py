from concurrent.futures import ThreadPoolExecutor
from rest_framework import generics
from WellnessWizard_backend.models import ProductsRu
from WellnessWizard_backend.serializers import ProductsRuSerializer
from rest_framework.response import Response
from Additional_modules.Parsers.calorizator import Calorizator


class ProductsRuView(generics.ListAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def get(self, request, *args, **kwargs):
        if 'product_ru' not in request.query_params or not request.query_params['product_ru']:
            return Response({"error": "Введите один или несколько символов для поиска"})
        product_keyword = request.query_params['product_ru']
        print(product_keyword)
        queryset = ProductsRu.objects.filter(product_name__icontains=product_keyword)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class CalorizatorParser(generics.ListAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def get(self, request, *args, **kwargs):
        Response({'message': "Done"})
        with ThreadPoolExecutor() as executor:
            executor.submit(self.calorizator)
        return Response({'message': "Done"})

    def calorizator(self):
        calorizator = Calorizator()
        calorizator.get_products()


class SaveProductView(generics.ListCreateAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def post(self, request, *args, **kwargs):
        if not ProductsRu.objects.filter(product_name=request.data['product_name']):
            return self.create(request, *args, **kwargs)
        else:
            print('exists')
        return Response({'message': 'done'})
