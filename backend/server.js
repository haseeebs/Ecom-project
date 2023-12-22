import express from 'express'
import 'dotenv/config'
import connectDb from './config/db.js'
import productRouter from './routes/productRoutes.js'
import { notFound, errorHandler } from './utils/errorMiddleware.js';

// Connect to the database
connectDb();

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Hii there Assalamu-Alaikum warahmatullahi wa-barakatuhu...");
})

app.use('/api/products', productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})