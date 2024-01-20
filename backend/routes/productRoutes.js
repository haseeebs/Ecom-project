import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview } from '../controllers/productController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to get all products and create a product (Admin)
router.route('/').get(getProducts).post(protect, admin, createProduct);

// Route to get a specific product by ID and update/delete a product (Admin)
router.route('/:id')
    .get(getProductById)
    .put(protect, admin, updateProduct)
    .delete(protect, admin, deleteProduct);

// Route to add a review for a specific product (Protected)
router.route('/:id/reviews').post(protect , createProductReview);
export default router;
