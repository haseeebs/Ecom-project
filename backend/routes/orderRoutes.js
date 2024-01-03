import express from 'express';
import {
    createOrder,
    getAllOrders,
    getMyOrders,
    getOrderById,
    updateOrderToDelivered,
    updateOrderToPaid
} from "../controllers/orderController.js";
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all orders and create a new order (admin only)
router.route('/').get(protect, admin, getAllOrders).post(protect, createOrder);

// Get orders for the logged-in user
router.route('/mine').get(protect, getMyOrders);

// Get a specific order by ID (admin only)
router.route('/:id').get(protect, admin, getOrderById);

// Update order status to "Paid" (admin only)
router.route('/:id/pay').put(protect, updateOrderToPaid);

// Update order status to "Delivered" (admin only)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
