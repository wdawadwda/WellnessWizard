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

class CalorieControlSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = ('id', 'is_superuser', 'username', 'first_name', 'last_name', 'is_staff', 'is_active', 'email', 'calorie_control')

