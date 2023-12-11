import json
from Additional_modules.Variables import variables
import requests

class FoodNutrients:
    def __init__(self):
        pass

    def get_USDA_nutrients(self, keyword):
        food_data = {}
        data = requests.get(variables.usda_food_searching_by_name + keyword)
        jsonResponse = json.loads(data.content.decode('utf-8'))
        for item in jsonResponse['foods']:
            pass
            food_data[item['fdcId']] = {}
            food_data[item['fdcId']]['description'] = item['description']
            # food_data[item['fdcId']]['brandOwner'] = item['brandOwner']
            # food_data[item['fdcId']]['brandName'] = item['brandName']
            for nutrient in item['foodNutrients']:
                if nutrient['nutrientName'] in ['Protein', 'Carbohydrate, by difference', 'Total lipid (fat)']:
                    food_data[item['fdcId']][nutrient['nutrientName']] = nutrient['value']

        return food_data
