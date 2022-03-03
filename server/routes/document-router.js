import express from 'express';
import * as documentController from '../controllers/document-controller.js';

const documentRouter = express.Router();

documentRouter.route('/').get(documentController.getAllDocuments).post(documentController.createDocument);

documentRouter.route('/:id').put(documentController.updateDocument);

export { documentRouter };
