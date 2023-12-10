import os
from flask_cors import CORS
from flask import request, Flask, jsonify
from Database.database import Database
from Variables import variables


class WellnessEndpoints:
    def __init__(self):
        self.db = Database()

    def main_handlers(self):
        app = Flask(__name__)
        CORS(app)

        @app.route("/search_product", methods=['GET'])
        def search_product():
            """
            request must be: ^/search_product?product_name=<str>
            :return: List(dict1, ... dictN)
            """
            product_name = request.args['product_name']
            query = f"SELECT * FROM {variables.database_products_ru_table_name} WHERE product_name LIKE '%{product_name}%'"
            responses_list = self.db.get_data(query)
            return jsonify(responses_list)



        app.run(host='localhost', port=int(os.environ.get('PORT', 5000)))

    def transform_to_dict(self, responses):
        responses_list = []
        for item in responses:
            response_dict = {}
            for field in variables.products_ru_database_fields:
                response_dict[field] = item[variables.products_ru_database_fields.index((field))]
            responses_list.append(response_dict)
        return responses_list

if __name__ == "__main__":
    w = WellnessEndpoints()
    w.main_handlers()