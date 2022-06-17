import express from 'express';
import * as documentController from '../controllers/document-controller.js';

const documentRouter = express.Router();

documentRouter.route('/').get(documentController.getAllDocuments).post(documentController.createDocument);

documentRouter.route('/history').get(documentController.getDocumentsHistory);

documentRouter
    .route('/:id')
    .put(documentController.updateDocument)
    .get(documentController.getDocument)
    .patch(documentController.updateDocument);

documentRouter.route('/history/:id').get(documentController.getDocumentHistory);

documentRouter.route('/proof/list').get(documentController.getAllProofs).post(documentController.sendProof);

//documentRouter.route('/proof/:id').get(documentController.getProof);

export { documentRouter };
