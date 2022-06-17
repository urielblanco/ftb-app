import mongoose from 'mongoose';
import { provenDB } from '../database/mongo-connection.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'A user must have a password']
    },
    role: {
        type: String,
        required: [true, 'A user must have a role'],
        enum: {
            values: ['admin', 'client'],
            message: 'Role is either: admin or client'
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
});

const User = provenDB.model('User', userSchema);

export { User };
