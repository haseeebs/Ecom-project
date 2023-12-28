// Importing configuration for environment variables from '.env' file
import 'dotenv/config';

// Importing database connection function
import connectDb from "./config/db.js";

// Importing sample data for users and products
import users from './data/users.js';
import products from './data/products.js';

// Importing Mongoose models for User, Product, and Order
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

// Establishing a connection to the database
connectDb();

// Function to import sample data into the database
const importData = async () => {
    try {
        // Clearing existing user and product data
        await User.deleteMany({});
        await Product.deleteMany({});

        // Inserting sample users into the User collection
        const insertedUsers = await User.insertMany(users);

        // Inserting sample products into the Product collection,
        // associating each product with the first inserted user
        const insertedProducts = await Product.insertMany(
            products.map(product => (
                { ...product, user: insertedUsers[0]._id }
            ))
        );

        // Logging success message after data insertion
        console.log("Sample Data inserted successfully...");
    } catch (error) {
        // Logging an error message if there's an issue with data seeding
        console.error("Error seeding the database:", error);
    }
}

// Function to destroy all data in User, Product, and Order collections
const destroyData = async () => {
    try {
        // Deleting all documents in User, Product, and Order collections
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

        // Logging a success message after data destruction
        console.log("Data destroyed!");
    } catch (error) {
        // Logging an error message if there's an issue with data destruction
        console.error(error);
    }
}

// Checking the command line arguments to determine whether to import or destroy data
if (process.argv[2] === '-d') {
    // If the argument is '-d', call the destroyData function
    destroyData();
} else {
    // If no argument or any other argument is provided, call the importData function
    importData();
}
