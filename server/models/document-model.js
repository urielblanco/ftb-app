import mongoose from 'mongoose';
import { provenDB } from '../database/mongo-connection.js';

const documentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    count: {
        type: Number
    }
});

const Document = provenDB.model('document', documentSchema);

export { Document };
