import express from 'express';
const router = express.Router();
import Product from '../models/productModel.js';
import wrapAsync from '../utils/wrapAsync.js'

router.get('/', wrapAsync(async (req, res) => {
    const products = await Product.find({}); 
    res.json(products);
}))

router.get('/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Product Not Found" });
    }
}));

export default router;