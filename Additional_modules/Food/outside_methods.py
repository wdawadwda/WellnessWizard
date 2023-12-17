
class Methods:

    def process_data(self, products_data:list, keyword:str):
        products_data = self.delete_doubles(products_data)
        products_data = self.priority_products(products_data, keyword)
        return products_data


    def delete_doubles(self, products_data:list):
        products_composed_dict = {}
        for item in products_data:
            if item['product_name'] not in products_composed_dict:
                products_composed_dict[item['product_name']] = []
            products_composed_dict[item['product_name']].append(item)

        for key in products_composed_dict:
            if len(products_composed_dict[key])>1:
                same_products_collection = {nutrient_key: 0 for nutrient_key in ['proteins', 'carbohydrates', 'fats', 'energy']}

                for item in products_composed_dict[key]:
                    for nutrients in item:
                        if nutrients in ['proteins', 'carbohydrates', 'fats', 'energy']:
                            same_products_collection[nutrients] += item[nutrients]

                for nutrients in same_products_collection:
                    if nutrients in ['proteins', 'carbohydrates', 'fats', 'energy']:
                        same_products_collection[nutrients] = round(same_products_collection[nutrients]/len(products_composed_dict[key]), 2)
                same_products_collection.update({"fdcId": None, "product_name": key})

                products_composed_dict[key] = []
                products_composed_dict[key].append(same_products_collection)
                pass
        products_composed_list = []
        for key in products_composed_dict:
            products_composed_list.extend(products_composed_dict[key])
        return products_composed_list

    def priority_products(self, products_data:list, keyword:str):
        regular_expression_key = r'keyword'
        return products_data



