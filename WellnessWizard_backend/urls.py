from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from WellnessWizard_backend.views import *
from Additional_modules.Variables import variables

urlpatterns = [
    path('search_product/', ProductsRuView.as_view()),
    path('update-calorizator-database/', CalorizatorParser.as_view()),
    path('update-usda-database/', USDA_parser.as_view()),
    path('save-product/', SaveProductView.as_view()),
    path(variables.save_USDA_products, USDABaseView.as_view()),
    path('update-beregifiguru-database/', BeregiFiguruParserView.as_view()),

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
