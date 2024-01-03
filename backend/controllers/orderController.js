import Order from '../models/orderModel.js';
import wrapAsync from '../utils/wrapAsync.js';

// Create new order
// Route: POST /api/orders
// Access Private
export const createOrder = wrapAsync(async (req, res) => {
    const {
        orderItems,
        itemsPrice,
        paymentMethod,
        shippingAddress,
        shippingPrice,
        taxPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
    } else {
        const newOrder = new Order({
            user: req.user._id,
            orderItems: orderItems.map(orderItem => ({ ...orderItem, product: orderItem._id, _id: undefined })),
            itemsPrice,
            paymentMethod,
            shippingAddress,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const createdOrder = await newOrder.save();
        res.status(201).json({ order: createdOrder, message: 'Order created successfully' });
    }
})

// Get logged in user orders
// Route: GET /api/orders/myorders
// Access Private
export const getMyOrders = wrapAsync(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders)
})

// Get order by id
// Route: GET /api/orders/:id
// Access Private
export const getOrderById = wrapAsync(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404)
        throw new Error('Order nor found')
    }
})

// Update order to paid
// Route: GET /api/orders/:id/pay
// Access Private
export const updateOrderToPaid = wrapAsync(async (req, res) => {
    res.send("Update order to paid");
})

// Update order to delivered
// Route: GET /api/orders/:id/deliver
// Access Private/Admin
export const updateOrderToDelivered = wrapAsync(async (req, res) => {
    res.send("Update order to delivered");
})

// Get all orders
// Route: GET /api/orders
// Access Private/Admin
export const getAllOrders = wrapAsync(async (req, res) => {
    res.send("Get all orders");
})