import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopRatedProducts } from '../controllers/productController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
import checkObjectId from '../middlewares/checkObjectId.js';

const router = express.Router();

// Route to get all products and create a product (Admin)
router.route('/').get(getProducts).post(protect, admin, createProduct);

// Route to get top 3 rated products 
router.route('/top').get(getTopRatedProducts);

// Route to get a specific product by ID and update/delete a product (Admin)
router.route('/:id')
    .get(checkObjectId, getProductById)
    .put(protect, admin, checkObjectId, updateProduct)
    .delete(protect, admin, checkObjectId, deleteProduct);

// Route to add a review for a specific product (Protected)
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
export default router;
