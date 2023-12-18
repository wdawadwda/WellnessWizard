from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

class ProductsRu(models.Model):
    product_name = models.CharField(max_length=150)
    fats = models.FloatField(blank=True, null=True)
    proteins = models.FloatField(blank=True, null=True)
    carbohydrates = models.FloatField(blank=True, null=True)
    energy = models.FloatField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    source = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'products_ru'

    def __str__(self):
        return str(self.product_name)

class ProductsEn(models.Model):
    product_name = models.CharField(max_length=150)
    fats = models.FloatField(blank=True, null=True)
    proteins = models.FloatField(blank=True, null=True)
    carbohydrates = models.FloatField(blank=True, null=True)
    energy = models.FloatField(blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    source = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'products_en'

    def __str__(self):
        return str(self.product_name)

# class CustomUser(AbstractUser):
#     email = models.EmailField(db_index=True, unique=True)
#     USERNAME_FIELD = 'username'
#     REQUIRED_FIELDS = ['email', 'is_staff']
#     objects = UserManager()
#
#     def __str__(self):
#         return self.username
