

def main_func():

    def run_calorizator():
        calorizator = Calorizator()
        calorizator.get_products()

    def run_endpoints():
        pass



if __name__ == "__main__":
    class Endpoints:
        def __init__(self):
            self.db_request = None

        async def main_endpoints(self):
            app = Flask(__name__)
            CORS(app)
