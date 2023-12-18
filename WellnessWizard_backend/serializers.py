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

