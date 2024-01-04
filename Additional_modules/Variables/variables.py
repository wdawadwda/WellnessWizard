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
server_domain = "http://localhost:8000/"
update_base_from_calorizator = "update-calorizator-database/"
update_base_from_calorizator_with_chapters = "update-calorizator-chapters-database/" # update products_ru with chapter
update_usda_database = 'update-usda-database/'
update_beregifiguru_database = 'update-beregifiguru-database/' # update products_ru with chapter

save_data_to_ProductRu = 'save-product/'
update_data_in_ProductRu = 'update-product/'
save_USDA_products = 'save-USDA-product/'

search_products = 'search_product/'

limit_responses = 10

#------------- Chrome -------------
options = Options()
# options.add_argument('--headless')

# ------------- regex --------------
# separate_request = r"[à-ÿÀ-ßa-zA-Z0-9]{1, }"

