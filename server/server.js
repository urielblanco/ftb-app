import 'dotenv/config';

import mongoose from 'mongoose';
import { app } from './app.js';

process.on('uncaughtException', (err) => {
    console.log(err);
    console.log('Uncaught error, shutting down...');
    process.exit(1);
});

const databaseUrl =
    process.env.NODE_ENV === 'development' ? process.env.DATABASE_URL_LOCAL : process.env.DATABASE_URL_PRODUCTION;

mongoose
    .connect(databaseUrl, {
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to DB'))
    .catch(console.error);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// unhandled rejection
process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('Unhandled error, shutting down...');

    server.close(() => {
        process.exit(1); // 0- successfully, 1- something went wrong
    });
});

process.on('SIGTERM', () => {
    console.log('👋🏽 SIGTERM RECEIVED. Shutting down gracefully');

    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
