import mariadb
import json
from bson import ObjectId
import loadCollections

def getAllItemsFromCategory(category, cur):
    cur.execute(f"SELECT * FROM {category}")
    results = []
    for row in cur.fetchall():
        result = {}
        for i, entry in enumerate(row):
            if cur.description[i][0] == "BirthDate":
                entry = entry.strftime('%Y-%m-%dT%H:%M:%S')
            elif cur.description[i][0] == "OrderDate":
                entry = entry.strftime('%Y-%m-%dT%H:%M:%S')
            result[cur.description[i][0]] = entry
        results.append(result)
    return results

def convert_to_json(db_host, db_port, db_user, db_password, db_name):
    conn = mariadb.connect(
        host=db_host,
        user=db_user,
        port=db_port,
        password=db_password,
        database=db_name,

    )
    cur = conn.cursor()

    suppliers = getAllItemsFromCategory("suppliers", cur)
    categories = getAllItemsFromCategory("categories", cur)
    customers = getAllItemsFromCategory("customers", cur)
    employees = getAllItemsFromCategory("employees", cur)
    shippers = getAllItemsFromCategory("shippers", cur)
    orders = getAllItemsFromCategory("orders", cur)
    products = getAllItemsFromCategory("products", cur)
    order_details = getAllItemsFromCategory("order_details", cur)

    # Combine all collections into a single dictionary
    data = {
        "suppliers": suppliers,
        "categories": categories,
        "customers": customers,
        "employees": employees,
        "shippers": shippers,
        "orders": orders,
        "products": products,
        "order_details": order_details
    }

    # Write documents to JSON file
    with open('data.json', 'w') as json_file:
        json.dump(data, json_file)
        json_file.write('\n')

    conn.close()


convert_to_json('mariadb', 3306, 'root', 'password', 'w3schools')

mongodb_uri = "mongodb://mongodb:27778/"
username = "root"
password = "password"

loadCollections.load_data_to_mongodb(mongodb_uri, username,password)