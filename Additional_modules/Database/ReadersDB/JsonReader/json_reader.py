import json

path = "./Additional_modules/Database/JSONs/CompoundAlternateParent.json"

def openJson(path):
    with open(path, 'r') as f:
       data = f.read()
    return data

if __name__ == '__main__':
    path = "./../../JSONs/Food.json"
    data = openJson(path)
    for line in data.split("\n"):
        record = json.loads(line)
        pass
