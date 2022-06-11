import express from 'express';
import * as documentController from '../controllers/document-controller.js';

const documentRouter = express.Router();

documentRouter.route('/').get(documentController.getAllDocuments).post(documentController.createDocument);

documentRouter.route('/history').get(documentController.getDocumentsHistory);

documentRouter.route('/:id').put(documentController.updateDocument).get(documentController.getDocument);

documentRouter.route('/history/:id').get(documentController.getDocumentHistory);

export { documentRouter };
