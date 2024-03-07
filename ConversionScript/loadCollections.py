import pymongo
import json

def load_data_to_mongodb(mongodb_uri, username, password):
    # Connect to MongoDB with authentication
    client = pymongo.MongoClient(mongodb_uri, username=username, password=password)
    db = client.get_database("OrderDetails")

    # Load data from JSON file
    with open('data.json') as json_file:
        data = json.load(json_file)

    # Insert data into corresponding MongoDB collections
    for collection_name, collection_data in data.items():
        db_collection = db[collection_name]
        db_collection.insert_many(collection_data)

# Set your MongoDB URI, username, and password
mongodb_uri = "mongodb://localhost:27778/"
username = "root"
password = "password"

# Call the function to load data into MongoDB
load_data_to_mongodb(mongodb_uri, username, password)
