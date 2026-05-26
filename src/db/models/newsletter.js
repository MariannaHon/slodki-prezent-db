import { Schema, model } from 'mongoose';

const newsletterSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const NewsletterCollection = model(
    'newsletter',
    newsletterSchema
);