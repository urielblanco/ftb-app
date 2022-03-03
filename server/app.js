import express from 'express';
import cors from 'cors';

import { userRouter } from './routes/user-router.js';
import { documentRouter } from './routes/document-router.js';

import { globalErrorHandler } from './controllers/error-controller.js';

const app = express();

app.use(cors());
app.use('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/users', userRouter);
app.use('/api/documents', documentRouter);

app.use(globalErrorHandler);

export { app };
