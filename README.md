# WellnessWizard_backend
backend for WellnessWizard app

Quick start:
1. pip install -r requirements.txt - install the libraries
2. python -m main - start project

Endpoints:
1. /search_product?product_name=str - return the matching list by product_name
json = {
"amount": int,
"responses": [
dict1, dict2, dictN]
