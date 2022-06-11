import mongoose from 'mongoose';
import { provenDB } from '../database/mongo-connection.js';
import slugify from 'slugify';

const documentSchema = new mongoose.Schema({
    slug: {
        type: String
    },
    state: {
        type: String,
        default: 'pending'
    },
    technicalSheet: {
        allergens: {
            type: [Number],
            default: []
        },
        conditionsInput: {
            type: String
        },
        descriptionInput: {
            type: String,
            unique: true,
            required: [true, 'A product must have a description'],
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
    }
});

documentSchema.pre('save', function (next) {
    this.slug = slugify(this.technicalSheet.descriptionInput, { lower: true });
    next();
});

const Document = provenDB.model('document', documentSchema);

export { Document };
