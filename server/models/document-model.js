import mongoose from 'mongoose';
import { provenDB } from '../database/mongo-connection.js';
import slugify from 'slugify';

const documentSchema = new mongoose.Schema({
    slug: {
        type: String,
        unique: true
    },
    state: {
        type: String,
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a user']
    },
    technicalSheet: {
        allergens: {
            type: [{ index: Number, value: Boolean }],
            default: []
        },
        conditionsInput: {
            type: String
        },
        descriptionInput: {
            type: String
        },
        ingredients: {
            type: [String],
            default: []
        },
        usefulLifeInput: {
            type: String
        }
    },
    backwardTraceability: {
        rawMaterials: {
            type: [
                {
                    contactInput: String,
                    dateExpirationInput: Date,
                    dateReceptionInput: Date,
                    locationInput: String,
                    lotInput: String,
                    nameInput: String,
                    providerInput: String,
                    quantityReceivedInput: Number,
                    unitMeasurementInput: String
                }
            ],
            default: []
        }
    },
    internalTraceability: {
        dateExpirationInput: Date,
        dateLotInput: Date,
        dateManufacturingInput: Date,
        productNameInput: String,
        productUsefulLifeInput: Number,
        quantityManufacturingInput: Number
    },
    forwardTraceability: {
        boxInput: Number,
        carRegistrationInput: String,
        clientCodeInput: String,
        clientDescriptionInput: String,
        dateInput: Date,
        deliveryNoteInput: Number,
        differenceInput: String
    },
    updateAt: Date
});

documentSchema.pre('save', function (next) {
    this.slug = slugify(this.technicalSheet.descriptionInput, { lower: true });
    this.updateAt = Date.now();
    next();
});

const Document = provenDB.model('Document', documentSchema);

export { Document };
