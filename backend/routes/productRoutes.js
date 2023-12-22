import express from 'express';
import Product from '../models/productModel.js';
import wrapAsync from '../utils/wrapAsync.js';

const router = express.Router();

router.get('/', wrapAsync(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
}));

router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
        return res.json(product);
    }

    throw new Error("Resource not found");
}));

export default router;
