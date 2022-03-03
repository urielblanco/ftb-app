import { catchAsync } from '../utils/catch-async.js';
import { Document } from '../models/document-model.js';
import { provenDB } from '../database/mongo-connection.js';

const createDocument = (req, res) => {
    const { body } = req;

    const doc = new Document(body);

    doc.save().then((document) => {
        res.status(201).json({
            status: 'success',
            data: { document }
        });
    });
};

const updateDocument = catchAsync(async (req, res) => {
    const doc = await Document.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doc) {
        return next(new AppError(`No document found with this ID`, 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            document: doc
        }
    });
});

const getAllDocuments = catchAsync(async (req, res) => {
    const docs = await provenDB.db.command({
        docHistory: {
            collection: 'documents'
        }
    });

    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
            documents: docs
        }
    });
});

export { createDocument, getAllDocuments, updateDocument };
