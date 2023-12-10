from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from Database.database import Database

class Calorizator:
    def __init__(self):
        self.url = "https://calorizator.ru/product/all?page=78"
        self.products_cards = []
        self.db = Database()

    def init_chrome(self):
        try:
            self.browser = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=Options())
        except:
            pass

    def close_chrome(self):
        pass

    def get_products(self):
        self.init_chrome()
        self.browser.get(self.url)
        pages_amount = self.browser.find_element(By.XPATH, "//li [@class='pager-last']/a").text
        for item in range(1, int(pages_amount)):
            try:
                next_page = self.browser.find_element(By.XPATH, "//li [@class='pager-next last']")
                self.get_products_from_page()
                next_page.click()
                print('click')
            except:
                print('break')
                break

    def get_products_from_page(self):
        products_cards = []
        products_cards.extend(self.browser.find_elements(By.XPATH, "//*[@class='odd']"))
        products_cards.extend(self.browser.find_elements(By.XPATH, "//*[@class='even']"))
        print('get_products_from_page DOne')
        self.get_data_each_product(products_cards)

    def get_data_each_product(self, products_cards):
        for item in products_cards:
            data = {}
            product_name = item.find_element(By.CSS_SELECTOR, "td.views-field.views-field-title.active").text
            if product_name:
                if product_name == 'Шоколад Ritter Sport горький с нежным кремом à la Mousse au Chocolat':
                    pass
                data['product_name'] = product_name
                data['proteins'] = item.find_element(By.CSS_SELECTOR, "td.views-field.views-field-field-protein-value").text
                data['fats'] = item.find_element(By.CSS_SELECTOR, "td.views-field.views-field-field-fat-value").text
                try:
                    data['carbohydrates'] = item.find_element(By.CSS_SELECTOR, "td.views-field.views-field-field-carbohydrate-value").text
                except:
                    data['carbohydrates'] = 0
                data['energy'] = item.find_element(By.CSS_SELECTOR, "td.views-field.views-field-field-kcal-value").text
                try:
                    print(data)
                except Exception as ex:
                    print(ex)
                self.save_data(data)
            else:
                print('No data')

    def save_data(self, data):
        self.db.save(data=data, lock_doubles="product_name")

    # def remove_accents(self, input_str):
    #     nfkd_form = unicodedata.normalize('NFKD', input_str)
    #     return u"".join([c for c in nfkd_form if not unicodedata.combining(c)])

if __name__ == '__main__':
    c = Calorizator()
    c.get_products()