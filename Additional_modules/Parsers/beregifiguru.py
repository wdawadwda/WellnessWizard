import re
import time

from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait

from Additional_modules.Parsers.calorizator import Calorizator

class Beregifiguru(Calorizator):
    def __init__(self):
        super().__init__()
        self.page = 1929
        self.url = f"https://beregifiguru.ru/%D0%9F%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D1%8B/%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0-%D0%BA%D0%B0%D0%BB%D0%BE%D1%80%D0%B8%D0%B9%D0%BD%D0%BE%D1%81%D1%82%D0%B8"

    def get_products(self):
        self.init_chrome()
        self.browser.get(self.url + f"/{self.page}")
        time.sleep(2)
        pages_amount = self.browser.find_elements(By.XPATH, "//a [@class='action inactive']")[-1].text
        for item in range(self.page, int(pages_amount)):
            self.page = item
            if self.page > 1:
                self.browser.get(self.url + f"/{self.page}")
                wait = WebDriverWait(self.browser, 10)
                wait.until(lambda d: d.execute_script("return document.readyState") == "complete")

            print("PAGE NUMBER", self.page)
            try:
                self.get_products_from_page()
            except Exception as ex:
                print(f'break cause | {ex}')
                break
        self.close_chrome()
        print("THE END")

    def get_products_from_page(self):
        products_name = self.browser.find_elements(By.XPATH, "//td [@class='title']/a")
        nutrients = self.browser.find_elements(By.XPATH, "//td [@class='kbzu']")

        if len(products_name) == len(nutrients):
            for index in range(0, len(products_name)):
                food_item = {}
                food_item['product_name'] = products_name[index].get_attribute('title').replace("«", "").replace("»", "")
                print('product_name:', food_item['product_name'])
                if len(food_item['product_name']) <= 150:

                    fats = nutrients[index].find_element(By.CSS_SELECTOR, "div.bg1.fat").find_element(By.CSS_SELECTOR, "div.bg2").text
                    if self.can_be_converted_to_number(fats):
                        food_item['fats'] = float(fats)
                        print('fat:', food_item['fats'])

                    carbohydrates = nutrients[index].find_element(By.CSS_SELECTOR, "div.bg1.cr").find_element(By.CSS_SELECTOR, "div.bg2").text
                    if self.can_be_converted_to_number(carbohydrates):
                        food_item['carbohydrates'] = float(carbohydrates)
                        print('carbohydrates:', food_item['carbohydrates'])

                    proteins = nutrients[index].find_element(By.CSS_SELECTOR, "div.bg1.pr").find_element(By.CSS_SELECTOR, "div.bg2").text
                    if self.can_be_converted_to_number(proteins):
                        food_item['proteins'] = float(proteins)
                        print('proteins:', food_item['proteins'])

                    energy = nutrients[index].find_element(By.CSS_SELECTOR, "div.bg1.cl").find_element(By.CSS_SELECTOR, "div.bg2").text
                    if self.can_be_converted_to_number(energy):
                        food_item['energy'] = float(energy)
                        print('energy:', food_item['energy'])

                    food_item['source'] = 'beregifiguru.ru'

                    self.save_data(food_item)
        pass

    def can_be_converted_to_number(self, value):
        pattern = r'^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$'
        return bool(re.match(pattern, value))