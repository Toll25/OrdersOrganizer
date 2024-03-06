from fastapi import FastAPI
from pymongo import MongoClient

app = FastAPI()

client = MongoClient("mongodb://localhost:27017/")
db = client["OrderDetails"]

@app.get("/")
async def root():
    return {"Hiiii !!!! :3333"}


@app.get("/order_details")
async def get_products():
    products = db["order_details"].find({})
    print(products)
    products_list = list(products)
    return products_list

@app.get("/products")
async def get_products():
    products = db["products"].find({})
    print(products)
    products_list = list(products)
    return products_list


@app.get("/products/expanded")
async def get_products_expanded():
    pipeline = [
        {
            "$lookup": {
                "from": "suppliers",
                "localField": "Supplier",
                "foreignField": "_id",
                "as": "Supplier"
            }
        },
        {
            "$lookup": {
                "from": "categories",
                "localField": "Category",
                "foreignField": "_id",
                "as": "Category"
            }
        },
        {"$unwind": "$Supplier"},
        {"$unwind": "$Category"}
    ]
    products = db["products"].aggregate(pipeline)
    products_list = list(products)
    return products_list

@app.get("/orders")
async def get_orders():
    orders = db["orders"].find({})
    print(orders)
    orders_list = list(orders)
    return orders_list

@app.get("/orders/expanded")
async def get_orders_expanded():
    pipeline = [
        {
            "$lookup": {
                "from": "employees",
                "localField": "Employee",
                "foreignField": "_id",
                "as": "Employee"
            }
        },
        {
            "$lookup": {
                "from": "customers",
                "localField": "Customer",
                "foreignField": "_id",
                "as": "Customer"
            }
        },
        {
            "$lookup": {
                "from": "shippers",
                "localField": "Shipper",
                "foreignField": "_id",
                "as": "Shipper"
            }
        },
        {"$unwind": "$Customer"},
        {"$unwind": "$Employee"},
        {"$unwind": "$Shipper"}
    ]
    orders = db["orders"].aggregate(pipeline)
    orders_list = list(orders)
    return orders_list