import json
from Additional_modules.Variables import variables
import requests

class FoodNutrients:
    def __init__(self):
        pass

    def get_USDA_nutrients_by_name(self, keyword):
        food_data_list = []
        data = requests.get(variables.usda_food_searching_by_name + keyword)
        jsonResponse = json.loads(data.content.decode('utf-8'))
        for item in jsonResponse['foods']:
            food_data = {}
            food_data['fdcId'] = item['fdcId']
            food_data['product_name'] = item['description']
            for nutrient in item['foodNutrients']:
                match nutrient['nutrientName']:
                    case 'Protein': food_data['proteins'] = nutrient['value']
                    case 'Carbohydrate, by difference': food_data['carbohydrates'] = nutrient['value']
                    case 'Total lipid (fat)': food_data['fats'] = nutrient['value']
                    case 'Energy': food_data['energy'] = nutrient['value']

            food_data_list.append(food_data)
        return food_data_list

    def get_USDA_nutrients_by_nbd(self, ndb_number):
        # ndb_number = "01009"  # NDB номер для конкретного продукта
        url = f"https://api.nal.usda.gov/fdc/v1/food/{ndb_number}?api_key={variables.USDA_api_key}"

        response = requests.get(url)
        data = json.loads(response.text)

        print(data)

if __name__ == "__main__":
    food = FoodNutrients()
    food_data_list = food.get_USDA_nutrients_by_name("bread")
    pass