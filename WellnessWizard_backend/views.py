from concurrent.futures import ThreadPoolExecutor
from rest_framework import generics, status
from WellnessWizard_backend.models import *
from WellnessWizard_backend.serializers import *
from rest_framework.response import Response
from Additional_modules.Parsers.calorizator import Calorizator
from Additional_modules.Parsers.USDA import FoodNutrients
from Additional_modules.Food.outside_methods import Methods
from Additional_modules.Parsers.beregifiguru import Beregifiguru

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
            # queryset = ProductsRu.objects.filter(product_name__icontains=request.query_params['product_ru'])
            queryset = ProductsRu.objects.filter(product_name__startswith=request.query_params['product_ru'])
            serializer = self.get_serializer(queryset, many=True)
            processed_data_products = self.methods.process_data(serializer.data, request.query_params['product_ru'])
            return Response(processed_data_products)
        else:
            # usda = FoodNutrients()
            # foods_list = usda.get_USDA_nutrients_by_name(request.query_params['product_en'])
            # processed_data_products = self.methods.process_data(foods_list, request.query_params['product_en'])
            queryset = ProductsEn.objects.filter(product_name__startswith=request.query_params['product_en'])[:10]
            serializer = ProductsEnSerializer(queryset, many=True)
            processed_data_products = self.methods.process_data(serializer.data, request.query_params['product_en'])
            if len(processed_data_products) < 10:
                queryset_add = ProductsEn.objects.filter(product_name__icontains=request.query_params['product_en'])[:20]
                serializer_add = ProductsEnSerializer(queryset_add, many=True)
                processed_data_products_add = self.methods.process_data(serializer_add.data, request.query_params['product_en'])
                # processed_data_products_add = set(frozenset(d.items()) for d in processed_data_products_add)
                # processed_data_products = set(frozenset(d.items()) for d in processed_data_products)
                processed_data_products = processed_data_products.intersection(processed_data_products_add)
                # processed_data_products = list(processed_data_products)
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

class USDA_parser(generics.ListAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def get(self, request, *args, **kwargs):
        Response({'message': "Done"})
        with ThreadPoolExecutor() as executor:
            executor.submit(self.usda)
        return Response({'message': "Done"})

    def usda(self):
        usda = FoodNutrients()
        usda.get_all_products_save_data()

class BeregiFiguruParserView(generics.ListAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def get(self, request, *args, **kwargs):
        Response({'message': "Done"})
        with ThreadPoolExecutor() as executor:
            executor.submit(self.bregifiguru_parser)
        return Response({'message': "Done"})

    def bregifiguru_parser(self):
        bregifiguru = Beregifiguru()
        bregifiguru.get_products()

class SaveProductView(generics.ListCreateAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def __init__(self):
        super().__init__()
        self.database = ProductsRu

    def post(self, request, *args, **kwargs):
        if len(request.data['product_name']) <= 150:
            if not self.database.objects.filter(product_name=request.data['product_name']):
                self.create(request, *args, **kwargs)
                return Response({"message": "Done"})
            else:
                print('exists')
            return Response({'message': 'done'})

class USDABaseView(generics.ListCreateAPIView):
    serializer_class = ProductsEnSerializer
    queryset = ProductsEn.objects.all()

    def post(self, request, *args, **kwargs):
        if not ProductsEn.objects.filter(product_name=request.data['product_name']):
            self.create(request, *args, **kwargs)
            print(request.data['product_name'], "added")
            return Response({"message": "added"})
        else:
            print('exists')
            return Response({'message': 'exists'})

