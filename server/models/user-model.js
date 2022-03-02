import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have a email']
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
    }
});

const User = mongoose.model('user', userSchema);

export { User };
