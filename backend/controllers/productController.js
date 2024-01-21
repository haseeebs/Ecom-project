import Product from "../models/productModel.js";
import wrapAsync from "../utils/wrapAsync.js";

// Fetch all products
// Route: GET /api/products
const getProducts = wrapAsync(async (req, res) => {
    const pageSize = 8;
    const pageNumber = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments();

    const products = await Product.find({}).limit(pageSize).skip(pageSize * (pageNumber - 1));
    res.json({ products, pageSize, pages: Math.ceil(count / pageSize) });
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
});

// Update a product
// Route: PUT /api/products/:id
const updateProduct = wrapAsync(async (req, res) => {
    const { name, image, description, brand, category, price, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404);
        throw new Error('Resource not found');
    }

    product.name = name;
    product.image = image;
    product.description = description;
    product.brand = brand;
    product.category = category;
    product.price = price;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
});

// Delete a product
// Route: DELETE /api/products/:id
const deleteProduct = wrapAsync(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        res.status(404);
        throw new Error('Resource not found');
    }

    await Product.deleteOne({ _id: product._id });
    return res.status(200).json({ message: 'Product deleted' });
});

// Create a new review
// Route: POST /api/products/:id/reviews
const createProductReview = wrapAsync(async (req, res) => {
    const { _id: userId, name: userName } = req.user;
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404)
        throw new Error('Resource not found');
    }

    const alreadyReviewed = product.reviews.find(review => review.user.toString() === userId.toString());

    if (alreadyReviewed) {
        res.status(404)
        throw new Error('User has already reviewed this product')
    }

    const review = {
        user: userId,
        name: userName,
        comment,
        rating: Number(rating)
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.calculateRatings();

    await product.save();

    res.status(201).json({ message: 'Review added' })
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview };