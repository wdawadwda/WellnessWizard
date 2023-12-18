from rest_framework import serializers
from .models import *

class ProductsRuSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductsRu
    fields = '__all__'

class ProductsEnSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductsEn
    fields = '__all__'

class ProductsRuSerializerGET(serializers.ModelSerializer):
  class Meta:
    model = ProductsRu
    fields = ('id', 'product_name', 'fats', 'proteins', 'carbohydrates', 'energy')

class ProductsEnSerializerGET(serializers.ModelSerializer):
  class Meta:
    model = ProductsEn
    fields = ('id', 'product_name', 'fats', 'proteins', 'carbohydrates', 'energy')
