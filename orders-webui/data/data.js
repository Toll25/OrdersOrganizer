const columns = {
    categories: [
        {name: "CategoryID", uid: "CategoryID", sortable: true},
        {name: "CategoryName", uid: "CategoryName", sortable: true},
        {name: "Description", uid: "Description"}
    ],
    customers: [
        {name: "CustomerID", uid: "CustomerID", sortable: true},
        {name: "CustomerName", uid: "CustomerName", sortable: true},
        {name: "ContactName", uid: "ContactName", sortable: true},
        {name: "Address", uid: "Address", sortable: true},
        {name: "City", uid: "City", sortable: true},
        {name: "PostalCode", uid: "PostalCode", sortable: true},
        {name: "Country", uid: "Country", sortable: true}
    ],
    employees: [
        {name: "EmployeeID", uid: "EmployeeID", sortable: true},
        {name: "LastName", uid: "LastName", sortable: true},
        {name: "FirstName", uid: "FirstName", sortable: true},
        {name: "BirthDate", uid: "BirthDate", sortable: true},
        {name: "Photo", uid: "Photo"},
        {name: "Notes", uid: "Notes"}
    ],
    orders: [
        {name: "OrderID", uid: "OrderID", sortable: true},
        {name: "CustomerID", uid: "CustomerID", sortable: true},
        {name: "EmployeeID", uid: "EmployeeID", sortable: true},
        {name: "OrderDate", uid: "OrderDate", sortable: true},
        {name: "ShipperID", uid: "ShipperID", sortable: true}
    ],
    order_details: [
        {name: "OrderDetailID", uid: "OrderDetailID", sortable: true},
        {name: "OrderID", uid: "OrderID", sortable: true},
        {name: "ProductID", uid: "ProductID", sortable: true},
        {name: "Quantity", uid: "Quantity", sortable: true}
    ],
    products: [
        {name: "ProductID", uid: "ProductID", sortable: true},
        {name: "ProductName", uid: "ProductName", sortable: true},
        {name: "SupplierID", uid: "SupplierID", sortable: true},
        {name: "CategoryID", uid: "CategoryID", sortable: true},
        {name: "Unit", uid: "Unit", sortable: true},
        {name: "Price", uid: "Price", sortable: true}
    ],
    shippers: [
        {name: "ShipperID", uid: "ShipperID", sortable: true},
        {name: "ShipperName", uid: "ShipperName", sortable: true},
        {name: "Phone", uid: "Phone", sortable: true}
    ],
    suppliers: [
        {name: "SupplierID", uid: "SupplierID", sortable: true},
        {name: "SupplierName", uid: "SupplierName", sortable: true},
        {name: "ContactName", uid: "ContactName", sortable: true},
        {name: "Address", uid: "Address", sortable: true},
        {name: "City", uid: "City", sortable: true},
        {name: "PostalCode", uid: "PostalCode", sortable: true},
        {name: "Country", uid: "Country", sortable: true},
        {name: "Phone", uid: "Phone", sortable: true}
    ]
};

export {columns};
