import { app } from './app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

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
