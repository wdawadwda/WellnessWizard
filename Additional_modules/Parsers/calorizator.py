import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from Additional_modules.Variables import variables
from Additional_modules.Database.database import Database

class Calorizator:
    def __init__(self):
        self.page = 0
        self.url = f"https://calorizator.ru/product/all?page={self.page}" if self.page else f"https://calorizator.ru/product/all"
        self.products_cards = []
        self.db = Database()

    def init_chrome(self):
        self.browser = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=variables.options)

    def close_chrome(self):
        self.browser.close()

    def get_products(self):
        self.init_chrome()
        self.browser.get(self.url)
        pages_amount = self.browser.find_element(By.XPATH, "//li [@class='pager-last']/a").text
        for item in range(self.page, int(pages_amount)):
            self.item = item
            print("PAGE NUMBER", self.item+1)
            try:
                try:
                    next_page = self.browser.find_element(By.XPATH, "//li [@class='pager-next last']")
                except:
                    next_page = self.browser.find_elements(By.XPATH, "//li [@class='pager-item']")[-1]
                self.get_products_from_page()
                next_page.click()
                print('click')
            except Exception as ex:
                print(f'break cause | {ex}')
                break
        self.close_chrome()
        print("THE END")

    def get_products_from_page(self):
        products_cards = []
        products_cards.extend(self.browser.find_elements(By.XPATH, "//*[@class='odd']"))
        products_cards.extend(self.browser.find_elements(By.XPATH, "//*[@class='even']"))
        self.get_data_each_product(products_cards)

    def get_data_each_product(self, products_cards):
        for item in products_cards:
            data = {}
            product_name = item.find_element(By.CSS_SELECTOR, "td.views-field.views-field-title.active").text
            if product_name:
                data['product_name'] = product_name

                proteins = self.get_value_by_html(container=item, html="td.views-field.views-field-field-protein-value")
                if proteins:
                    data['proteins'] = proteins

                fats = self.get_value_by_html(container=item, html="td.views-field.views-field-field-fat-value")
                if fats:
                    data['fats'] = fats

                carbohydrates = self.get_value_by_html(container=item, html="td.views-field.views-field-field-carbohydrate-value")
                if carbohydrates:
                    data['carbohydrates'] = carbohydrates

                energy = self.get_value_by_html(container=item, html="td.views-field.views-field-field-kcal-value")
                if energy:
                    data['energy'] = energy

                self.save_data(data)
            else:
                print('No data')

    def get_value_by_html(self, container, html):
        try:
            value = container.find_element(By.CSS_SELECTOR, html).text
            return value if value else None
        except:
            return None

    def save_data(self, data):
        while True:
            response = requests.post(variables.server_domain + variables.save_data_to_ProductRu, json=data)
            if response.status_code in [200, 201]:
                break
            else:
                print('request:', response.request.body)
                print('status_code::', response.status_code)
                print('cause:', response.text)
                print('invalid_data:', data)
                print('page:', self.item)

if __name__ == '__main__':
    c = Calorizator()
    c.get_products()