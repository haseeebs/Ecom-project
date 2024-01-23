> E-Commerce platform built with the MERN stack & Redux toolkit.

<img src="./frontend/public/images/screens.png">

## Features
- **Full-Featured Shopping Cart:**
- **Product Reviews and Ratings:**
- **Top Products Carousel:**
- **Product Pagination:**
- **Product Search Feature:**
- **User Profile with Orders:**
- **Admin Product Management:**
- **Admin User Management:**
- **Admin Order Details Page:**
- **Mark Orders as Delivered Option:**
- **Checkout Process:**
- **PayPal / Credit Card Integration:**
- **Database Seeder:**

## Usage
1. Create a MongoDB database and obtain your MongoDB URI from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a PayPal account and obtain your Client ID from [PayPal Developer](https://developer.paypal.com/).
3. Set up your environment variables by renaming the `.env.example` file to `.env` and adding the following:

    ```makefile
    NODE_ENV = development
    PORT = 5000
    MONGO_URI = your MongoDB URI
    JWT_SECRET = 'abc123'
    PAYPAL_CLIENT_ID = your PayPal Client ID
    PAGINATION_LIMIT = 8
    ```

    Adjust `JWT_SECRET` and `PAGINATION_LIMIT` to your preferences.
4. Install dependencies for both the frontend and backend:

    ```bash
    npm install
    cd frontend
    npm install
    ```
5. Run the project:

    ```bash
    # Run frontend (:3000) & backend (:5000)
    npm run dev

    # Run backend only
    npm run server
    ```

## Build & Deploy
1. Create a production build for the frontend:

    ```bash
    cd frontend
    npm run build
    ```

2. Seed the Database:

    Use the following commands to seed the database with sample users and products or to destroy all data:

    ```bash
    # Import data
    npm run dataImport

    # Destroy data
    npm run dataDestroy
    ```

## Sample User Logins
**Admin:**
- Email: haseebshaikh25ks@gmail.com
- Password: haseebAdmin

**Customer:**
- Email: hanzalashaikh@gmail.com
- Password: hnnzlie
