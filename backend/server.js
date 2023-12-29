import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDb from './config/db.js'
import productRouter from './routes/productRoutes.js'
import userRouter from './routes/userRouters.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

// Connect to the database
connectDb();

const app = express();
const port = process.env.PORT || 5000;

// Parse cookies from incoming requests
app.use(cookieParser());

// Parse URL-encoded data from incoming requests (for HTML forms)
app.use(express.urlencoded({ extended: true }))
// Parse parse JSON data from incoming requests
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hii there Assalamu-Alaikum warahmatullahi wa-barakatuhu...");
})

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})