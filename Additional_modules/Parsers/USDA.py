import json
from Additional_modules.Variables import variables
import requests

class FoodNutrients:
    def __init__(self):
        pass

    def get_USDA_nutrients_by_name(self, keyword):
        data = requests.get(variables.usda_food_searching_by_name + keyword)
        jsonResponse = json.loads(data.content.decode('utf-8'))
        food_data_list = self.separate_nutrients(jsonResponse['foods'])
        return food_data_list

    def get_USDA_nutrients_by_nbd(self, ndb_number):
        # ndb_number = "01009"  # NDB номер для конкретного продукта
        url = f"https://api.nal.usda.gov/fdc/v1/food/{ndb_number}?api_key={variables.USDA_api_key}"

        response = requests.get(url)
        data = json.loads(response.text)

        print(data)

    def get_all_products_save_data(self):
        datatype = {}
        page = 1
        while True:
            print('page: ', page)
            response = requests.get(f"https://api.nal.usda.gov/fdc/v1//foods/list?api_key={variables.USDA_api_key}&pageSize=100&pageNumber={page}")
            if str(response.status_code)[0:1] == '4':
                break
            page += 1
            jsonResponse = json.loads(response.content.decode('utf-8'))
            counter = 0

            for i in jsonResponse:
                if i['dataType'] == "Foundation":
                    counter += 1

                if i['dataType'] not in datatype:
                    datatype[i['dataType']] = []
                datatype[i['dataType']].append(i)

            print(counter)

            food_data_list = self.separate_nutrients(jsonResponse)
            pass


    def separate_nutrients(self, jsonResponseFoods:list):
        food_data_list = []
        for item in jsonResponseFoods:
            food_data = {}
            food_data['source'] = 'USDA'
            food_data['fdcId'] = item['fdcId']
            food_data['product_name'] = item['description']
            food_data['category'] = item['dataType']
            if item['foodNutrients']:
                for nutrient in item['foodNutrients']:
                    try:
                        nutrient_name = nutrient['nutrientName'] if 'nutrientName' in nutrient else nutrient['name']
                        match nutrient_name:
                            case 'Protein': food_data['proteins'] = nutrient['value'] if 'value' in nutrient else nutrient['amount']
                            case 'Carbohydrate, by difference': food_data['carbohydrates'] = nutrient['value'] if 'value' in nutrient else nutrient['amount']
                            case 'Total lipid (fat)': food_data['fats'] = nutrient['value'] if 'value' in nutrient else nutrient['amount']
                            case 'Energy': food_data['energy'] = nutrient['value'] if ('value' in nutrient and 'unitName' in nutrient) else (nutrient['amount'] if 'unitName' in nutrient else None)
                    except Exception as ex:
                        print(ex)
                        pass
                if 'energy' not in food_data:
                    energy = self.calories(food_data)
                    if energy:
                        food_data['energy'] = self.calories(food_data)
                else:
                    pass
            else:
                print('Not nutrients')

            food_data_list.append(food_data)
            requests.post(f"{variables.server_domain}{variables.save_USDA_products}", json=food_data)
        return food_data_list

    def calories(self, data:dict):
        try:
            calories = data['proteins']*4 + data['carbohydrates']*4 + data['fats']*9
        except:
            calories = 0
        return calories

if __name__ == "__main__":
    food = FoodNutrients()
    food_data_list = food.get_all_products_save_data()
    pass