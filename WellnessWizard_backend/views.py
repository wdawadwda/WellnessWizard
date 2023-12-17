from concurrent.futures import ThreadPoolExecutor
from rest_framework import generics
from WellnessWizard_backend.models import ProductsRu
from WellnessWizard_backend.serializers import ProductsRuSerializer
from rest_framework.response import Response
from Additional_modules.Parsers.calorizator import Calorizator
from Additional_modules.Parsers.USDA import FoodNutrients
from Additional_modules.Food.outside_methods import Methods

class ProductsRuView(generics.ListAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def __init__(self):
        super().__init__()
        self.methods = Methods()


    def get(self, request, *args, **kwargs):
        if not len(set(request.query_params.keys()).intersection({'product_ru', 'product_en'})):
            return Response({"error": "Введите один или несколько символов для поиска"})
        if 'product_ru' in request.query_params:
            queryset = ProductsRu.objects.filter(product_name__icontains=request.query_params['product_ru'])
            serializer = self.get_serializer(queryset, many=True)
            processed_data_products = self.methods.process_data(serializer.data, request.query_params['product_ru'])
            return Response(processed_data_products)
        else:
            usda = FoodNutrients()
            foods_list = usda.get_USDA_nutrients_by_name(request.query_params['product_en'])
            processed_data_products = self.methods.process_data(foods_list, request.query_params['product_en'])
            return Response(processed_data_products)


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
