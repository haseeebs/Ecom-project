import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.js'
import { admin, protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

// Route to get all products and create a product (Admin)
router.route('/').get(getProducts).post(protect, admin, createProduct);

// Route to get a specific product by ID
router.route('/:id').get(getProductById);

export default router;
