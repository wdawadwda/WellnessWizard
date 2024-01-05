from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from WellnessWizard_backend.views import *
from Additional_modules.Variables import variables

urlpatterns = [
    path(variables.update_base_from_calorizator, CalorizatorParser.as_view()), # get products data from calorizator.ru
    path(variables.update_base_from_calorizator_with_chapters, CalorizatorChapterParser.as_view()), # get products data with chapters from calorizator.ru
    path(variables.update_usda_database, USDA_parser.as_view()), # get products data from USDA base
    path(variables.save_USDA_products, USDABaseView.as_view()), # get products data from USDA base with categories
    path(variables.update_beregifiguru_database, BeregiFiguruParserView.as_view()), # get products data from calorizator.ru
    path(variables.save_data_to_ProductRu, SaveProductView.as_view()), # save data
    path(variables.update_data_in_ProductRu, UpdateProductView.as_view()), # update data
    path(variables.search_products, ProductsRuView.as_view()),  # get products_from database by keyword
    path(variables.update_beregifiguru_chapter_database, BeregiFiguruParserChapterView.as_view()), # get products from Beregifiguru chapters
    path('accounts/', include('allauth.urls')),

    # registration
    path('auth/', include('djoser.urls.authtoken')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls')),  # auth by email
    path('auth/', include('djoser.urls.jwt')),  # auth by email
    path('auth/', include('rest_framework.urls')),
    path('api/v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

]

if settings.DEBUG:
    urlpatterns += static(settings.SITE_URL, document_root=settings.SITE_ROOT)
