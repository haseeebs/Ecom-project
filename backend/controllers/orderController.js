import Order from '../models/orderModel.js';
import wrapAsync from '../utils/wrapAsync.js';

// Create new order
// Route: POST /api/orders
// Access Private
export const createOrder = wrapAsync( async(req , res) => {
    res.send("Create order");
})

// Get logged in user orders
// Route: GET /api/orders/myorders
// Access Private
export const getMyOrders = wrapAsync( async(req , res) => {
    res.send("Get my orders");
})

// Get order by id
// Route: GET /api/orders/:id
// Access Private
export const getOrderById = wrapAsync( async(req , res) => {
    res.send("Get order by id");
})

// Update order to paid
// Route: GET /api/orders/:id/pay
// Access Private
export const updateOrderToPaid = wrapAsync( async(req , res) => {
    res.send("Update order to paid");
})

// Update order to delivered
// Route: GET /api/orders/:id/deliver
// Access Private/Admin
export const updateOrderToDelivered = wrapAsync( async(req , res) => {
    res.send("Update order to delivered");
})

// Get all orders
// Route: GET /api/orders
// Access Private/Admin
export const getAllOrders = wrapAsync( async(req , res) => {
    res.send("Get all orders");
})