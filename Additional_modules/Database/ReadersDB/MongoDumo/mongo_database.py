from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client['products']
collection = db['products_collection']
documents = collection.find()

path = db.serverCmdLineOpts
path = path['dbpath']
pass

for document in documents:
    print(document)

# collection_names = db.list_collection_names()
# print(collection_names)
# f = db.client.collections.find()
pass
