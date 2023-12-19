import express from 'express';
import products from './data/products.js';
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;

app.get( '/' , (req , res) => {
    res.send("Hii there Assalamu-Alaikum warahmatullahi wa-barakatuhu...")
})

app.get( '/api/products' , (req , res) => {
    res.json(products);
})

app.get( '/api/products/:id' , (req , res) => {
    const {id} = req.params;
    const product = products.find( (product) => product._id === parseInt(id));
    res.status(200).send(product)
})

app.listen(port , () => {
    console.log(`Server running on http://localhost:${port}`);
})