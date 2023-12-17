import requests
import json

api_key = 'your_api_key'
food_name = 'chicken'

data = {
   "query": food_name,
   "dataType": "Foundation"
}

response = requests.post('https://api.nal.usda.gov/fdc/v1/foods/search?api_key=vl5XPpYd1iF0LcsdCQ7b6Mccew17sM22NfyedsxW'.format(api_key), data=json.dumps(data))

print(response.json())