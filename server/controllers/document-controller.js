import { catchAsync } from '../utils/catch-async.js';
import { Document } from '../models/document-model.js';
import { provenDB } from '../database/mongo-connection.js';
import { AppError } from '../utils/app-error.js';

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

const updateDocument = catchAsync(async (req, res, next) => {
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

const getDocumentsHistory = catchAsync(async (req, res) => {
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

const getAllDocuments = catchAsync(async (req, res) => {
    const docs = await Document.find({});

    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: {
            documents: docs
        }
    });
});

const getDocument = catchAsync(async (req, res, next) => {
    const doc = await Document.findById(req.params.id);

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

const getDocumentHistory = catchAsync(async (req, res, next) => {
    const doc = await provenDB.db.command({
        docHistory: {
            collection: 'documents',
            filter: { slug: req.params.id },
            projection: { slug: 1 }
        }
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

const sendProof = catchAsync(async (req, res, next) => {
    const db = await provenDB.db.command({
        getVersion: 1
    });

    const proof = await provenDB.db.command({ submitProof: db.version });

    res.status(200).json({
        status: 'success',
        data: {
            proof
        }
    });
});

const getProof = catchAsync(async (req, res, next) => {
    const proof = await provenDB.db.command({
        getProof: req.params.id
    });

    res.status(200).json({
        status: 'success',
        data: {
            proof
        }
    });
});

const getAllProofs = catchAsync(async (req, res, next) => {
    const proofs = await provenDB.db.collection('_provendb_versionProofs').find({ status: 'valid' }).toArray();

    res.status(200).json({
        status: 'success',
        data: {
            proofs
        }
    });
});
export {
    createDocument,
    getAllDocuments,
    updateDocument,
    getDocument,
    getDocumentsHistory,
    getDocumentHistory,
    sendProof,
    getProof,
    getAllProofs
};
