from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

mongodb_uri = "mongodb://localhost:27778/"
username = "root"
password = "password"

origins = [
    "http://localhost:3000", # Example origin
    "http://localhost:8080", # Another example origin
    # Add more origins as needed
]

# Add CORSMiddleware to the FastAPI application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # Allows all origins listed above
    allow_credentials=True,
    allow_methods=["*"], # Allows all HTTP methods
    allow_headers=["*"], # Allows all headers
)

client = MongoClient(mongodb_uri, username=username, password=password)
db = client["OrderDetails"]


def get_data_from_mongo(data_name):
    data_cursor = db[data_name].find({})
    data_list = [data for data in data_cursor]
    for data in data_list:
        data["_id"] = str(data["_id"])
    return data_list


@app.get("/")
async def root():
    return {"Hiiii !!!! :3333"}


@app.get("/order_details")
async def get_products():
    return get_data_from_mongo("order_details")


@app.get("/orders")
async def get_products():
    return get_data_from_mongo("orders")


@app.get("/products")
async def get_products():
    return get_data_from_mongo("products")


@app.get("/categories")
async def get_products():
    return get_data_from_mongo("categories")


@app.get("/customers")
async def get_products():
    return get_data_from_mongo("customers")


@app.get("/employees")
async def get_products():
    return get_data_from_mongo("employees")


@app.get("/shippers")
async def get_products():
    return get_data_from_mongo("shippers")


@app.get("/suppliers")
async def get_products():
    return get_data_from_mongo("suppliers")


@app.get("/products/expanded")
async def get_products_expanded():
    pipeline = [
        {
            "$lookup": {
                "from": "suppliers",
                "localField": "SupplierID",
                "foreignField": "SupplierID",
                "as": "Supplier"
            }
        },
        {
            "$lookup": {
                "from": "categories",
                "localField": "CategoryID",
                "foreignField": "CategoryID",
                "as": "Category"
            }
        },
        {"$unwind": "$Supplier"},
        {"$unwind": "$Category"},
        {
            "$project": {
                "SupplierID": 0,
                "CategoryID": 0
            }
        }
    ]
    products_cursor = db["products"].aggregate(pipeline)
    products_list = [product for product in products_cursor]
    for product in products_list:
        product['_id'] = str(product['_id'])
        product['Supplier']['_id'] = str(product['Supplier']['_id'])
        product['Category']['_id'] = str(product['Category']['_id'])

    return products_list


@app.get("/orders/expanded")
async def get_orders_expanded():
    pipeline = [
        {
            "$lookup": {
                "from": "employees",
                "localField": "EmployeeID",
                "foreignField": "EmployeeID",
                "as": "Employee"
            }
        },
        {
            "$lookup": {
                "from": "customers",
                "localField": "CustomerID",
                "foreignField": "CustomerID",
                "as": "Customer"
            }
        },
        {
            "$lookup": {
                "from": "shippers",
                "localField": "ShipperID",
                "foreignField": "ShipperID",
                "as": "Shipper"
            }
        },
        {"$unwind": "$Customer"},
        {"$unwind": "$Employee"},
        {"$unwind": "$Shipper"},
        {
            "$project": {
                "EmployeeID": 0,
                "CustomerID": 0,
                "ShipperID": 0
            }
        }
    ]
    orders = db["orders"].aggregate(pipeline)
    orders_list = list(orders)
    return orders_list
