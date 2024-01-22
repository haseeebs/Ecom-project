const notFound = (req , res , next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode || 500;
    let message = err.message;

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === "production" ? "Error details are not available in production" : err.stack
    });
}

export {notFound , errorHandler};
