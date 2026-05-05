# UMKM App API Documentation

API documentation for the UMKM Application. This application is a RESTful API designed to support small and medium enterprises (UMKM) with features like product management, cart, order processing, and payment integration.

## Tech Stack
- **Runtime Environment**: Node.js
- **Language**: TypeScript
- **Web Framework**: Express.js (v5)
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JSON Web Token (JWT) & BcryptJS for password hashing
- **File Upload**: Multer (for handling profile avatars and product images)
- **Email Service**: Nodemailer (for account verification)
- **Payment Gateway**: Midtrans Integration

---

## Base URL
`http://localhost:3052/api`

## Authentication
Protected endpoints require a Bearer Token in the `Authorization` header.
`Authorization: Bearer <your_token>`

---

## 1. Auth Module (`/auth`)
Handles user onboarding and security.

### Register
- **URL**: `/register`
- **Method**: `POST`
- **Description**: Registers a new user account. Sends a verification email upon success.
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `201 Created`

### Login
- **URL**: `/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token for protected requests.
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: `200 OK`

### Verify Email
- **URL**: `/verify/:token`
- **Method**: `GET`
- **Description**: Verifies a user's email address using the token sent to their email.
- **Response**: HTML success/error page.

---

## 2. User Module (`/users`)
User profile management.

### Get My Profile
- **URL**: `/myprofile`
- **Method**: `GET`
- **Auth**: Required
- **Description**: Retrieves the currently logged-in user's profile details including their addresses.
- **Response**: `200 OK`

### Update Profile
- **URL**: `/update-profile/:id`
- **Method**: `PUT`
- **Auth**: Required
- **Description**: Updates user profile info (name, phone) and avatar image. Users can only update their own profile.
- **Body**: `multipart/form-data`
- **Response**: `200 OK`

---

## 3. Address Module (`/addresses`)
Managing user delivery addresses.

### List All Addresses
- **URL**: `/`
- **Method**: `GET`
- **Auth**: Required
- **Description**: Retrieves all addresses registered by the current user.

### Add New Address
- **URL**: `/`
- **Method**: `POST`
- **Auth**: Required
- **Description**: Adds a new delivery address. If `isDefault` is true, it replaces the existing default address.
- **Body**:
  ```json
  {
    "provinceId": 1,
    "cityId": 1,
    "districtId": 1,
    "label": "Rumah",
    "recipient": "John Doe",
    "phone": "08123456789",
    "detail": "Jl. Mawar No. 123",
    "isDefault": true
  }
  ```

### Edit Address
- **URL**: `/:id`
- **Method**: `PUT`
- **Auth**: Required
- **Description**: Updates an existing address.

### Delete Address
- **URL**: `/:id`
- **Method**: `DELETE`
- **Auth**: Required
- **Description**: Removes an address from the user's list.

---

## 4. Region Module (`/regions`)
Fetch administrative region data (Indoregion).

### Data Provinces
- **URL**: `/provinces`
- **Method**: `GET`
- **Description**: Returns a list of all provinces in Indonesia.

### Cities per Province
- **URL**: `/cities?provinceId=1`
- **Method**: `GET`
- **Description**: Returns a list of cities/regencies based on the provided `provinceId`.

### Districts per City
- **URL**: `/districts?cityId=1`
- **Method**: `GET`
- **Description**: Returns a list of districts based on the provided `cityId`.

---

## 5. Category & Product Module
Product exploration and management.

### List Categories
- **URL**: `/categories`
- **Method**: `GET`
- **Description**: Retrieves all product categories.

### List & Search Products
- **URL**: `/products?search=&categoryId=`
- **Method**: `GET`
- **Description**: Lists active products with optional search query and category filter.

### Product Detail
- **URL**: `/products/:id`
- **Method**: `GET`
- **Description**: Retrieves detailed information about a single product, including its seller and user reviews.

### Create Product (Admin)
- **URL**: `/products`
- **Method**: `POST`
- **Auth**: Required (Admin)
- **Description**: Allows admins to create new products.

### Update Product (Admin)
- **URL**: `/:id`
- **Method**: `PUT`
- **Auth**: Required (Admin)
- **Description**: Allows admins to update product details and images.

### Delete Product (Admin)
- **URL**: `/:id`
- **Method**: `DELETE`
- **Auth**: Required (Admin)
- **Description**: Soft or hard delete a product.

---

## 6. Cart Module (`/cart`)
Shopping cart management for customers.

### Get Cart
- **URL**: `/`
- **Method**: `GET`
- **Auth**: Required
- **Description**: Retrieves all items currently in the user's cart.

### Add to Cart
- **URL**: `/`
- **Method**: `POST`
- **Auth**: Required
- **Description**: Adds a product to the cart or increases the quantity if already present.
- **Body**: `{ "productId": 1, "quantity": 1 }`

### Remove from Cart
- **URL**: `/:productId`
- **Method**: `DELETE`
- **Auth**: Required
- **Description**: Removes a specific product from the cart.

---

## 7. Order Module (`/orders`)
Transaction and order history.

### Checkout from Cart
- **URL**: `/checkout`
- **Method**: `POST`
- **Auth**: Required
- **Description**: Converts cart items into a formal order. Clears the cart upon success.
- **Body**: `{ "addressId": 1, "shippingCost": 15000 }`

### Order History
- **URL**: `/`
- **Method**: `GET`
- **Auth**: Required
- **Description**: Retrieves the history of orders made by the current user.

---

## 8. Payment Module (`/payments`)
Payment gateway integration with Midtrans.

### Request Snap Token
- **URL**: `/checkout`
- **Method**: `POST`
- **Auth**: Required
- **Description**: Requests a Snap Token from Midtrans for a specific order to initiate a secure payment.

### Midtrans Webhook
- **URL**: `/webhook`
- **Method**: `POST`
- **Description**: Public callback endpoint for Midtrans to update order payment status (settlement, expire, deny).

---

## 9. Report Module (`/reports`)
Sales and business analytics.

### Sales Report (Admin)
- **URL**: `/sales?from=2024-01-01&to=2024-01-31`
- **Method**: `GET`
- **Auth**: Required (Admin)
- **Description**: Generates a summary of successful sales within a date range, including total revenue and order count.
