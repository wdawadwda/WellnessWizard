from concurrent.futures import ThreadPoolExecutor
from django.db.models import Q
from rest_framework import generics, status
from Additional_modules.Variables import variables
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
            processed_data_products = self.get_from_db(db_class=ProductsRu, serializer_class=ProductsRuSerializerGET, request_param=request.query_params['product_ru'])
            return Response(processed_data_products)

        else:
            # usda = FoodNutrients()
            # foods_list = usda.get_USDA_nutrients_by_name(request.query_params['product_en'])
            # processed_data_products = self.methods.process_data(foods_list, request.query_params['product_en'])
            processed_data_products = self.get_from_db(db_class=ProductsEn, serializer_class=ProductsEnSerializerGET, request_param=request.query_params['product_en'])
            return Response(processed_data_products)

    def get_from_db(self, db_class, serializer_class, request_param, limit=variables.limit_responses):
        queryset = None
        processed_data_products = []
        n = 0
        while len(processed_data_products) < limit:
            match n:
                case 0: queryset = db_class.objects.filter(product_name__startswith=request_param).filter(category='Foundation').order_by('product_name')[:limit]
                # case 1: queryset = db_class.objects.filter(product_name__startswith=request_param).filter(chapter__startswith=request_param)[:limit]
                case 1: queryset = db_class.objects.filter(Q(chapter__startswith=request_param.title()) | Q(chapter__startswith=request_param.capitalize()) | Q(chapter__startswith=request_param.lower())).filter(Q(product_name__startswith=request_param.title()) | Q(product_name__startswith=request_param.capitalize()) | Q(product_name__startswith=request_param.lower())).order_by('product_name')[:limit]
                case 2: queryset = db_class.objects.filter(Q(product_name__startswith=request_param.title()) | Q(product_name__startswith=request_param.capitalize()) | Q(product_name__startswith=request_param.lower())).order_by('product_name')[:limit]
                case 3: queryset = db_class.objects.filter(Q(product_name__icontains=request_param.title()) | Q(product_name__icontains=request_param.capitalize()) | Q(product_name__icontains=request_param.lower())).order_by('product_name')[:limit]
            n += 1
            serializer = serializer_class(queryset, many=True)
            processed_data_products_add = self.methods.process_data(serializer.data, request_param)
            processed_data_products_add_unique_elements = list(filter(lambda x: x not in processed_data_products, processed_data_products_add))
            processed_data_products.extend(processed_data_products_add_unique_elements)
            if n > 3:
                break
        return processed_data_products[0:limit]

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

class CalorizatorChapterParser(generics.ListAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def get(self, request, *args, **kwargs):
        Response({'message': "Done"})
        with ThreadPoolExecutor() as executor:
            executor.submit(self.calorizator)
        return Response({'message': "Done"})

    def calorizator(self):
        calorizator = Calorizator()
        calorizator.get_chapters()

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

class UpdateProductView(generics.RetrieveUpdateDestroyAPIView, generics.CreateAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def post(self, request, *args, **kwargs):
        product_exists = ProductsRu.objects.filter(product_name=request.data['product_name'])
        product_exists = list(self.get_serializer(product_exists, many=True).data)
        if product_exists:
            for product in product_exists:
                self.update(request, *args, pk=product['id'])
                print('updated')
        else:
            serializer = ProductsRuSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                print('created')
        return Response({"message": "done"})

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = ProductsRu.objects.get(id=kwargs['pk'])
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

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

