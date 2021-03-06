import { AppError } from '../utils/app-error.js';

const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }

    console.error('ERROR 💥', err);

    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!'
    });
};

const handleValidatorErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    let error = Object.assign(err);

    if (error.name === 'ValidationError') error = handleValidatorErrorDB(error);

    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
   // if (process.NODE_ENV === 'production') sendErrorProd(error, req, res);
};

export { globalErrorHandler };
