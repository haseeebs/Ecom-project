import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calculatePrices } from '../utils/calculatePrices.js';
import wrapAsync from '../utils/wrapAsync.js';

// Create new order
// Route: POST /api/orders
// Access Private
export const createOrder = wrapAsync(async (req, res) => {

    const { orderItems, paymentMethod, shippingAddress } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error("No order items")
    } else {
        const itemsFromDb = await Product.find({
            _id: { $in: orderItems.map(item => item._id) }
        })
    }

    const dbOrderItems = orderItems.map(itemFromClient => {
        const matchingItemFromDb = itemsFromDb.find(itemFromDb => itemFromDb._id === itemFromClient);

        return {
            ...itemFromClient,
            product: itemFromClient._id,
            price: matchingItemFromDb.price,
            _id: undefined
        };
    });

    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculatePrices(dbOrderItems);

    const order = new Order({
        user: req.user._id,
        orderItems: dbOrderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    });

    const createdOrder = await order.save();

    res.status(200).json(createdOrder);
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
// Route: PUT /api/orders/:id/pay
// Access Private
export const updateOrderToPaid = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id)

    if (!order) {
        res.status(404)
        throw new Error("Order not found")
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
})

// Update order to delivered
// Route: PUT /api/orders/:id/deliver
// Access Private/Admin
export const updateOrderToDelivered = wrapAsync(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        res.status(404);
        throw new Error('Order not found')
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
})

// Get all orders
// Route: GET /api/orders
// Access Private/Admin
export const getAllOrders = wrapAsync(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
})