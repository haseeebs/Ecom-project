import Product from "../models/productModel.js";
import wrapAsync from "../utils/wrapAsync.js";

// Fetch all products
// Route: GET /api/products
const getProducts = wrapAsync(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Fetch a product by ID
// Route: GET /api/products/:id
const getProductById = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
        return res.json(product);
    }

    res.status(404)
    throw new Error("Resource not found");
});

export { getProducts, getProductById };
