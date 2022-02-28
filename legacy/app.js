import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import { userRouter } from './src/routers/user-router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const INDEX = '/public/index.html';

const app = express();

app.use(express.static(path.join(__dirname, 'client', 'dist', 'ftb-app')));

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/users', userRouter);

//app.use((req, res) => res.sendFile(INDEX, { root: __dirname }));

export { app };
