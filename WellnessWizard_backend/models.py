from django.db import models

class ProductsRu(models.Model):
    product_name = models.CharField(max_length=150)
    fats = models.FloatField(blank=True, null=True)
    proteins = models.FloatField(blank=True, null=True)
    carbohydrates = models.FloatField(blank=True, null=True)
    energy = models.FloatField(blank=True, null=True)

    class Meta:
        # managed = False
        db_table = 'products_ru'

    def __str__(self):
        return str(self.product_name)

