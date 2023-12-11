from rest_framework import serializers
from .models import *

class ProductsRuSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductsRu
    fields = '__all__'
