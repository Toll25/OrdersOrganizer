import pymongo
import json

def load_data_to_mongodb(mongodb_uri):
    # Connect to MongoDB
    client = pymongo.MongoClient(mongodb_uri)
    db = client.get_database("OrderDetails")

    # Load data from JSON file
    with open('data.json') as json_file:
        data = json.load(json_file)

    # Insert data into corresponding MongoDB collections
    for collection_name, collection_data in data.items():
        db_collection = db[collection_name]
        db_collection.insert_many(collection_data)

# Set your MongoDB URI
mongodb_uri = "mongodb://localhost:27017/"

# Call the function to load data into MongoDB
load_data_to_mongodb(mongodb_uri)
