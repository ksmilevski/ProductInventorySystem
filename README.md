# Product Inventory System

A full-stack web application built using .NET 9 for the backend and Angular for the frontend. The application allows users to manage a product inventory with features such as CRUD operations, search, sorting, pagination, and image uploads.

## ✅ Features

* Add, edit, delete products
* View product details
* Search and filter products by name and category
* Pagination for product listings
* Image upload for products
* Form validation and feedback messages

---

## 🛠️ Technologies Used

* Backend: .NET 9, Entity Framework Core
* Frontend: Angular
* Database: SQL Server
* Styling: Bootstrap

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ksmilevski/ProductInventorySystem.git
cd ProductInventorySystem
```

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd ProductInventorySystem
```

#### Install .NET 9 SDK:

Ensure you have .NET 9 SDK installed.
[Download .NET SDK](https://dotnet.microsoft.com/download/dotnet/9.0)

#### Install Dependencies:

```bash
dotnet restore
```

#### Database Configuration:

* Open `appsettings.json` and update the connection string:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=ProductInventoryDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

#### Apply Migrations:

```bash
dotnet ef database update
```

#### Run the Backend Server:

```bash
dotnet run
```

The backend server will run at `http://localhost:5272`.

---

### 3. Frontend Setup

Navigate to the frontend folder:

```bash
cd product-inventory-frontend
```

#### Install Angular CLI:

```bash
npm install -g @angular/cli
```

#### Install Dependencies:

```bash
npm install
```

#### Run the Frontend Application:

```bash
ng serve
```

The frontend will run at `http://localhost:4200`.

---

### 4. API Endpoints

| Method | Endpoint          | Description       |
| ------ | ----------------- | ----------------- |
| GET    | /api/product      | Get all products  |
| GET    | /api/product/{id} | Get product by ID |
| POST   | /api/product      | Add new product   |
| PUT    | /api/product/{id} | Update product    |
| DELETE | /api/product/{id} | Delete product    |

---

### 5. Additional Functionalities

* Search products by name and category
* Pagination for product listings
* Image upload for products
* Success and error feedback messages

---

### 6. Contact

For any queries or issues, please contact:

* Email: [ksmilevski02@gmail.com](mailto:ksmilevski02@gmail.com)
