def init(func):
    def wrapper():
        print("init")
        func()
    return wrapper


def connect(func):
    def wrapper():
        print("connection")
        func()
    return wrapper


def products_table_create(func):
    def wrapper():
        print("table")
        func()
    return wrapper