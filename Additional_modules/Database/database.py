import psycopg2
import configparser

import unicodedata

from Additional_modules.Variables import variables
import sqlite3

class Database:
    def __init__(self):
        self.database = None
        self.conn = None
        self.product_table = False

    def PostgresConnect(self):

        if not self.conn:
            config = configparser.ConfigParser()
            config.read("./Settings/config.ini")
            self.conn = psycopg2.connect(
                database=config['Postgres_local']['database'],
                user=config['Postgres_local']['user'],
                password=config['Postgres_local']['password'],
                host=config['Postgres_local']['host'],
                port=config['Postgres_local']['port']
            )
            print("connection is ready")

    def SQLiteConnect(self, database="wellness.db"):
        # config = configparser.ConfigParser()
        # config.read("./Settings/config.ini")
        self.conn = sqlite3.connect(database)


    # def connect(func):
    #     def wrapper(self, *args, **kwargs):
    #         if not self.conn:
    #             config = configparser.ConfigParser()
    #             config.read("./Settings/config.ini")
    #             self.conn = psycopg2.connect(
    #                 database = config['Postgres_local']['database'],
    #                 user = config['Postgres_local']['user'],
    #                 password = config['Postgres_local']['password'],
    #                 host = config['Postgres_local']['host'],
    #                 port = config['Postgres_local']['port']
    #             )
    #             print("connection is ready")
    #             func(self, *args, **kwargs)
    #     return wrapper

    def products_table_create(self, table=variables.database_products_ru_table_name):
        query = f"""CREATE TABLE IF NOT EXISTS {table} (
        id INTEGER PRIMARY KEY,
        product_name VARCHAR, 
        fats NUMERIC, 
        proteins NUMERIC, 
        carbohydrates NUMERIC, 
        energy NUMERIC
        );"""
        cur = self.conn.cursor()
        cur.execute(query)

    # def products_table_create(func, table=variables.database_products_ru_table_name):
    #     def wrapper(self, *args, **kwargs):
    #         query = f"""CREATE TABLE IF NOT EXISTS {table} (
    #         product_name VARCHAR(100),
    #         fats NUMERIC,
    #         proteins NUMERIC,
    #         carbohydrates NUMERIC,
    #         energy NUMERIC
    #         );"""
    #         print(query)
    #         if self.query_execute(query):
    #             print('table has been created')
    #         func(self, *args, **kwargs)
    #     return wrapper

    def query_execute(self, query):
        try:
            with self.conn:
                cur = self.conn.cursor()
                cur.execute(query)
                # print(query)
                print('executed')
                return True
        except Exception as e:
            print(f"ERROR EXECUTE {query} | {e}")
            return False

    def get_data(self, query):
        self.SQLiteConnect()
        self.products_table_create()
        try:
            with self.conn:
                cur = self.conn.cursor()
                cur.execute(query)
            return cur.fetchall()
        except Exception as e:
            print(e)
            return False

    def save(self, data:dict, table=variables.database_products_ru_table_name, lock_doubles=None):
        if "\xe0" in data['product_name']:
            data['product_name'] = self.strip_unicode(data['product_name'])
        if "'" in data['product_name']:
            data['product_name'] = "''".join(data['product_name'].split("'"))
        if lock_doubles:
            query = f"SELECT * FROM {table} WHERE {lock_doubles}='{data[lock_doubles]}'" if type(data[lock_doubles]) in [str, bool] else f"SELECT * FROM {table} WHERE {lock_doubles}={data[lock_doubles]}"

            response = self.get_data(query)
            if len(response) > 0:
                return print(f"{data['product_name']} exists")

        self.SQLiteConnect()
        self.products_table_create()
        keys = []
        values = ""
        for key in data:
            if data[key]:
                keys.append(key)
                if type(data[key]) in [int, float]:
                    values += f"{data[key]}, "
                else:
                    values += f"'{data[key]}', "

        query = f"INSERT INTO {table} ({', '.join(keys)}) VALUES ({values[:-2]})"
        self.query_execute(query)

    def strip_accents(self, text):
        text = unicodedata.normalize('NFD', text) \
            .encode('ascii', 'ignore') \
            .decode("utf-8")
        return str(text)

if __name__ == "__main__":
    db = Database()
    pass


