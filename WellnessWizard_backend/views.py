import re
from concurrent.futures import ThreadPoolExecutor
from django.db.models import Q
from django.db.models.functions import Length
from django.forms import model_to_dict
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
            processed_data_products = self.get_from_db(db_class=ProductsEn, serializer_class=ProductsEnSerializerGET, request_param=request.query_params['product_en'])
            return Response(processed_data_products)

    def get_from_db(self, db_class, serializer_class, request_param, limit=variables.limit_responses):
        request_param_list = re.findall("[а-яА-Яa-zA-Z0-9]{1,}", request_param)
        queryset = self.custom_get_queryset('product_name', request_param_list, db_class, limit=limit)
        return list(serializer_class(queryset, many=True).data)

    def custom_get_queryset(self, *args, **kwargs):
        """

        :param args:
        :param kwargs: search_field: str; request_param_list: list, db_model: models.Model
        :return: raw queryset
        """
        search_field, request_param_list, db_model, limit = None, None, None, None
        if args:
            for i in args:
                if type(i) is str: search_field = i
                elif type(i) is list: request_param_list = i
                elif type(i) is int: limit = i
                else: db_model = i

        if kwargs:
            search_field = kwargs['search_field'] if not search_field else search_field
            request_param_list = kwargs['request_param_list'] if not request_param_list else request_param_list
            db_model = kwargs['db_model'] if not db_model else db_model
            limit = kwargs['limit'] if not limit else limit

        queryset = db_model.objects.all()
        for keyword in request_param_list:
            if request_param_list.index(keyword) == 0:
                queryset &= db_model.objects.filter(Q(product_name__iregex=rf"^{keyword}[ ,.]")).order_by(Length(search_field))[:limit]
            else:
                queryset &= db_model.objects.filter(Q(product_name__iregex=rf"{keyword}")).order_by(Length(search_field))[:limit]

        print('queryset len =', queryset.count())
        if queryset.count() < limit:
            queryset2 = db_model.objects.all()
            for keyword in request_param_list:
                if request_param_list.index(keyword) == 0:
                    queryset2 &= db_model.objects.filter(Q(product_name__iregex=rf"^{keyword}")).order_by(Length(search_field))[:limit]
                else:
                    queryset2 &= db_model.objects.filter(Q(product_name__iregex=rf"{keyword}")).order_by(Length(search_field))[:limit]
            queryset = queryset | queryset2

        print('queryset len =', queryset.count())
        if queryset.count() < limit:
            queryset2 = db_model.objects.all()
            for keyword in request_param_list:
                if request_param_list.index(keyword) == 0:
                    queryset2 &= db_model.objects.filter(Q(product_name__iregex=rf"{keyword}")).order_by(Length(search_field))[:limit]
                else:
                    queryset2 &= db_model.objects.filter(Q(product_name__iregex=rf"{keyword}")).order_by(Length(search_field))[:limit]
            queryset = queryset | queryset2
        return queryset[:limit]

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

class BeregiFiguruParserChapterView(generics.ListAPIView):
    serializer_class = ProductsRuSerializer
    queryset = ProductsRu.objects.all()

    def get(self, request, *args, **kwargs):
        Response({'message': "Done"})
        with ThreadPoolExecutor() as executor:
            executor.submit(self.bregifiguru_parser)
        return Response({'message': "Done"})

    def bregifiguru_parser(self):
        bregifiguru = Beregifiguru()
        bregifiguru.get_chapters()


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

class CalorieControlView(generics.ListCreateAPIView, generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CalorieControlSerializer
    queryset = CustomUser.objects.all()

    def patch(self, request, *args, **kwargs):
        pk = kwargs['pk']
        CustomUser.objects.filter(id=pk).update(calorie_control=['dd', 'gg'])
        queryset = CustomUser.objects.get(id=pk)
        queryset = self.get_serializer(queryset).data
        return Response(queryset)
