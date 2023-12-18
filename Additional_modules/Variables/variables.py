import configparser

from selenium.webdriver.chrome.options import Options

config = configparser.ConfigParser()
config.read("./Settings/config.ini")
# USDA_api_key = config['USDA']['api_key']

USDA_api_key = "vl5XPpYd1iF0LcsdCQ7b6Mccew17sM22NfyedsxW"

# usda_food_searching_by_name = f"https://api.nal.usda.gov/fdc/v1/foods/search?api_key={USDA_api_key}&query="
usda_food_searching_by_name = f"https://api.nal.usda.gov/fdc/v1/foods/search?dataType=Foundation&api_key={USDA_api_key}&query="
usda_food_searching_by_code = f"https://api.nal.usda.gov/fdc/v1/food/01009?api_key={USDA_api_key}"

#------------- database variables -------------
database_products_ru_table_name = "products_ru"
database_products_en_table_name = "products_en"
products_ru_database_fields = ["product_name", "fats", "proteins", "carbohydrates", "energy"]



#------------- server -------------
server_domain = "http://localhost:8000"
save_data_to_ProductRu = '/save-product/'
save_USDA_products = 'save-USDA-product/'


#------------- Chrome -------------
options = Options()
# options.add_argument('--headless')

