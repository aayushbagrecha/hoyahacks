# from pymongo import MongoClient
# from app.config import MONGO_URI, DATABASE_NAME
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus

username = quote_plus('knarvekar31')
password = quote_plus('Demo123456')

uri = 'mongodb+srv://'+ username + ':' + password + '@' + 'cluster0.s5gaayu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
    
db = client["hoyahax"]
user_collection = db["users"]
consultations_collection = db["consultations"]