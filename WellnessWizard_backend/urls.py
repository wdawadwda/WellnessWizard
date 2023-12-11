from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from WellnessWizard_backend.views import *

urlpatterns = [
    path('search_product/', ProductsRuView.as_view()),
    path('update-calorizator-database/', CalorizatorParser.as_view()),
    path('save-product/', SaveProductView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.SITE_URL, document_root=settings.SITE_ROOT)
