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

// Create a product
// Route: POST /api/products
const createProduct = wrapAsync(async (req, res) => {
    const product = new Product({
        user: req.user._id,
        name: "Sample name",
        image: "https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        description: "Sample description",
        brand: "Sample brand",
        category: "Sample catregory",
        price: 0,
        countInStock: 0,
        numReviews: 0
    })

    const createProduct = await product.save();
    res.status(201).json(createProduct);
})

export { getProducts, getProductById, createProduct };
