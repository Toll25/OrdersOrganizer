## Daten-Ansichten
Mit Folgenden SQL queries kann man die gewünschten Daten abfragen
### Orders
```sql
SELECT  
    o.OrderID,  
    c.CustomerName,  
    c.ContactName,  
    c.Address,  
    c.PostalCode,  
    c.Country,  
    s.ShipperName,  
    s.Phone AS ShipperPhone,  
    e.LastName,  
    e.FirstName,  
    e.BirthDate,  
    e.Photo,  
    e.Notes  
FROM  
    orders o  
JOIN  
    customers c ON o.CustomerID = c.CustomerID  
JOIN  
    shippers s ON o.ShipperID = s.ShipperID  
JOIN  
    employees e ON o.EmployeeID = e.EmployeeID  
WHERE  
    o.OrderID = ?;  
```
### Products
```sql
SELECT  
    p.ProductID,  
    p.ProductName,  
    p.Price,  
    p.Unit,  
    c.CategoryName,  
    c.Description,  
    s.SupplierName,  
    s.ContactName,  
    s.Address,  
    s.City,  
    s.PostalCode,  
    s.Country,  
    s.Phone  
FROM  
    products p  
JOIN  
    suppliers s ON p.SupplierID = s.SupplierID  
JOIN  
    categories c ON p.CategoryID = c.CategoryID  
WHERE  
    p.ProductID = ?;
```

## MongoDB Migration
Im Python script `convert.py` wird eine Verbindung hergestellt und der Inhalt der Datenbank zu Bson (MongoDB Datenformat) verwandelt, das Ergebnis davon wird in `data.json` gespeichert und in die MongoDB geladen. 

## API
Um die Daten in der Webansicht einfach zugänglich zu machen wird eine Restful API, geschrieben mit dem FastAPI Framework, verwendet.

## Web Ansicht
Die Webansicht ist mithelfe des Frameworks NextJS geschrieben und bietet ansichten für alle Datentypen der Datenbank. 
Zudem kann man auch auf nach jeder Spalte sowohl suchen als auch sortieren.

## Docker
Alle Teile der Applikation können durch Docker gestartet werden. In einem zentralen Docker-Compose file wird alles automatisch gestartet. Um dies zu ermöglichen, gibt es mehrere Dockerfiles die sich in den entsprechenden Directories befinden. 
Manchmal beim Starten der Applikationen muss der Conversion Container neu gestartet werden, weil ab und zu MariaDB nicht fertig ist, wenn dieser Ausgeführt wird.