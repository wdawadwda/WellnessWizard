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
## ***Registration and authorization***
- ### *Create user ^/auth/users/*
>{\
    "username": "second_user",\
    "email": "omsinfo@yandex.ru",\
    "password": "second22222"\
}
- ### *Activation ^/auth/users/activation/*
>{\
    "uid": "MTk",\
    "token": "bvsym0-97353cdb8c40ba144876a14d1f489fd0"\
}
- ### *Login and get JWT /api/v1/token/*
>{\
    "username": "second_user",\
    "email": "omsinfo@yandex.ru",\
    "password": "second22222"\
}
- ### *Get user data via JWT access ^/auth/users/me/*
>{\
> "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2ODQ0MDMwLCJpYXQiOjE2OTY4NDM3MzAsImp0aSI6IjMxNDRlMDEwZDM3MzRjNmQ5N2MzNzExNWI2MDdiZjUzIiwidXNlcl9pZCI6MTl9.0ZX3SvB62Qm765tsbY4tsd3FiZ5YGR_ZYpce7aKb5KQ"\
> }
- ### *Get access JWT via refresh ^/api/v1/token/refresh/*
>{\
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NjkzMDEzMCwiaWF0IjoxNjk2ODQzNzMwLCJqdGkiOiI2NWFhODU2ZjcxMWQ0YTc5YWQ2YjU3YmRiYmEwOWI1ZCIsInVzZXJfaWQiOjE5fQ.tBY3JhoDQqicbQud_zg-Tdy4EO3bFt-Q4zGqTxVLpIU"\
>}

- ### *AUTH via GOOGLE ^/accounts/google/login/*

