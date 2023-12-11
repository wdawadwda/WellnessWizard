# WellnessWizard_backend
backend for WellnessWizard app

---
Technical data:
1. Python 3.10.4
2. host = http:/127.0.0.1:8000/ or http://localhost:8000/

---
Quick start
1. python -m venv venv (or other environment name) - create the virtual environment
2. venv\scripts\activate - activate environment
3. python manage.py migrate - make migrations to the database (using SQLite -> file wellness.db in the base dir)
4. python manage.py runserver - run the backend project

---- 
Endpoints:
1. GET host/search_product?product_ru=one and more letters:str for searching in the database by the product_name
return LIST with the many matched objects
2. GET host/update-calorizator-database - turn on the parser of calorizator source for database updating
3. POST host/save-product/ - throw this endpoint you can save some products
